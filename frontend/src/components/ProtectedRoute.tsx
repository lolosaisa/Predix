
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Spinner } from "./Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireWallet?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requireWallet = false 
}: ProtectedRouteProps) => {
  const { user, isLoading: authLoading } = useAuth();
  const { isWalletConnected, isLoading: walletLoading } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (!walletLoading && requireWallet && !isWalletConnected && user) {
      navigate("/wallet");
    }
  }, [user, authLoading, navigate, requireWallet, isWalletConnected, walletLoading]);

  if (authLoading || (requireWallet && walletLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-dark">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireWallet && !isWalletConnected) {
    return null;
  }

  return <>{children}</>;
};