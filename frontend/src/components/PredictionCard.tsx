
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import type { Prediction } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface PredictionCardProps extends Prediction {}

export const PredictionCard = ({
  title,
  image_url,
  category,
  stake_amount,
  total_stake,
  end_date,
  yes_votes,
  no_votes,
  status
}: PredictionCardProps) => {
  const daysLeft = formatDistanceToNow(new Date(end_date), { addSuffix: true });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
    >
      <img src={image_url} alt={title} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 bg-emerald/10 text-emerald rounded-full">
            {category}
          </span>
          <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 rounded-full">
            {daysLeft}
          </span>
          {status !== 'active' && (
            <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded-full">
              {status}
            </span>
          )}
        </div>

        <h3 className="text-white text-lg font-medium mb-4">{title}</h3>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Stake Amount</p>
            <p className="text-white font-medium">{stake_amount} LSK</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Stake</p>
            <p className="text-white font-medium">{total_stake} LSK</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="default"
            className="w-full bg-emerald hover:bg-emerald/90 text-white"
            disabled={status !== 'active'}
          >
            Yes ({yes_votes})
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10"
            disabled={status !== 'active'}
          >
            No ({no_votes})
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
