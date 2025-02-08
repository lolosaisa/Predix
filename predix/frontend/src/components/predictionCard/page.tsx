import { Button } from "@/components/ui/button/page";
import { motion } from 'framer-motion';

interface PredictionCardProps {
  title: string;
  image: string;
  category: string;
  stakeAmount: number;
  totalStake: number;
  daysLeft: number;
}

export const PredictionCard = ({
  title,
  image,
  category,
  stakeAmount,
  totalStake,
  daysLeft,
}: PredictionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 bg-emerald/10 text-emerald rounded-full">
            {category}
          </span>
          <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 rounded-full">
            {daysLeft} days left
          </span>
        </div>

        <h3 className="text-white text-lg font-medium mb-4">{title}</h3>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Stake Amount</p>
            <p className="text-white font-medium">{stakeAmount} LSK</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Stake</p>
            <p className="text-white font-medium">{totalStake} LSK</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="default"
            className="w-full bg-emerald hover:bg-emerald/90 text-white"
          >
            Predict Yes
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10"
          >
            Predict No
          </Button>
        </div>
      </div>
    </motion.div>
  );
};