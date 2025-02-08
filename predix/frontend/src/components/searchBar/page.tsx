import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search predictions..."
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald/50 transition-all duration-200"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
  );
};