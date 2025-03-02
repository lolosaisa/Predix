
import { useState, useEffect } from "react";
import { Home, TrendingUp, Wallet, Gift, User, HeadphonesIcon, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "./ui/button";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: TrendingUp, label: "Challenge Pools", path: "/pools" },
  { icon: TrendingUp, label: "AI Predictions", path: "/predictions" },
  { icon: Wallet, label: "My Wallet", path: "/wallet" },
  { icon: Gift, label: "Airdrop", path: "/airdrop" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: HeadphonesIcon, label: "Support", path: "/support" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const { selectedWallet } = useWallet();
  const navigate = useNavigate();
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobile && isOpen && !target.closest('.sidebar')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && !isOpen) {
        setIsOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, isOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-emerald/90 text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      <div 
        className={`sidebar fixed top-0 left-0 h-screen bg-emerald-dark/95 backdrop-blur-xl border-r border-white/10 p-4 transition-all duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isMobile ? 'w-[250px]' : 'w-64'} 
          md:translate-x-0`}
      >
        <div className="flex items-center gap-2 mb-8 px-2">
          <img src="/lovable-uploads/8d874809-8eb1-4fce-b86f-38f8c123cf52.png" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold text-xl">Predix</span>
        </div>
        
        {user && (
          <div className="mb-6 p-3 bg-white/5 rounded-lg">
            <div className="text-sm text-gray-400">Logged in as</div>
            <div className="text-white font-medium truncate">{user.email}</div>
            {selectedWallet && (
              <div className="mt-2">
                <div className="text-sm text-gray-400">Wallet</div>
                <div className="text-white text-xs truncate">{selectedWallet.wallet_address}</div>
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg px-3 py-2 transition-all duration-200"
              onClick={() => isMobile && setIsOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        {user && (
          <div className="absolute bottom-8 left-0 right-0 px-4">
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              className="w-full border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
