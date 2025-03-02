
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Poll, PollOption } from "@/types";

interface PollCardProps {
  id: number;
  question: string;
  options: PollOption[];
  endDate: string;
  totalVotes: number;
  category: string;
}

export const PollCard = ({ question, options, endDate, totalVotes, category }: PollCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-2 py-1 bg-emerald/10 text-emerald rounded-full">
          {category}
        </span>
        <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 rounded-full">
          {totalVotes} votes
        </span>
      </div>

      <h3 className="text-white text-lg font-medium mb-4">{question}</h3>

      <div className="space-y-3 mb-4">
        {options.map((option) => (
          <div
            key={option.id}
            className="relative bg-white/5 rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-white">{option.text}</span>
              <span className="text-gray-400 text-sm">
                {Math.round((option.votes / (totalVotes || 1)) * 100)}%
              </span>
            </div>
            <div className="absolute left-0 top-0 h-full bg-emerald/10 rounded-lg" 
                 style={{ width: `${(option.votes / (totalVotes || 1)) * 100}%` }} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Ends {new Date(endDate).toLocaleDateString()}</span>
        <Button variant="outline" className="text-emerald hover:text-emerald hover:bg-emerald/10">
          Vote Now
        </Button>
      </div>
    </motion.div>
  );
};