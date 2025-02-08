import { Home, TrendingUp, Wallet, Gift, User, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-emerald-dark/95 backdrop-blur-xl border-r border-white/10 p-4 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-2 mb-8 px-2">
        <img src="public/lovable-uploads/8d874809-8eb1-4fce-b86f-38f8c123cf52.png" alt="Logo" className="w-8 h-8" />
        <span className="text-white font-semibold text-xl">Predix</span>
      </div>
      
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg px-3 py-2 transition-all duration-200"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};