
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface Wallet {
  id: string;
  wallet_address: string;
  wallet_type: string;
  is_primary: boolean;
}

interface WalletContextType {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  isWalletConnected: boolean;
  isLoading: boolean;
  connectWallet: (address: string, type: string) => Promise<void>;
  disconnectWallet: (id: string) => Promise<void>;
  setAsPrimary: (id: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWallets = async () => {
    if (!user) {
      setWallets([]);
      setSelectedWallet(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .order('is_primary', { ascending: false });

      if (error) throw error;

      setWallets(data || []);
      
      // Set the primary wallet as selected
      const primaryWallet = data?.find(wallet => wallet.is_primary) || data?.[0] || null;
      setSelectedWallet(primaryWallet);
    } catch (error) {
      console.error('Error fetching wallets:', error);
      toast({
        title: "Error",
        description: "Failed to load your wallets. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [user]);

  const connectWallet = async (address: string, type: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to connect a wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if wallet already exists
      const { data: existingWallet } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('wallet_address', address)
        .single();

      if (existingWallet) {
        toast({
          title: "Info",
          description: "This wallet is already connected to your account.",
        });
        return;
      }

      // Set all existing wallets as non-primary if this is the first wallet
      const isPrimary = wallets.length === 0;

      // Insert new wallet
      const { error } = await supabase.from('wallets').insert({
        user_id: user.id,
        wallet_address: address,
        wallet_type: type,
        is_primary: isPrimary,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Wallet connected successfully.",
      });

      fetchWallets();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Error",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = async (id: string) => {
    try {
      const { error } = await supabase
        .from('wallets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Wallet disconnected successfully.",
      });

      fetchWallets();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const setAsPrimary = async (id: string) => {
    try {
      // First, set all wallets as non-primary
      await supabase
        .from('wallets')
        .update({ is_primary: false })
        .eq('user_id', user?.id);

      // Then set the selected wallet as primary
      const { error } = await supabase
        .from('wallets')
        .update({ is_primary: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Primary wallet updated.",
      });

      fetchWallets();
    } catch (error) {
      console.error('Error setting primary wallet:', error);
      toast({
        title: "Error",
        description: "Failed to update primary wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallets,
        selectedWallet,
        isWalletConnected: !!selectedWallet,
        isLoading,
        connectWallet,
        disconnectWallet,
        setAsPrimary,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};