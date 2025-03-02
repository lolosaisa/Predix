
import { motion } from "framer-motion";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="w-12 h-12 border-4 border-emerald rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};
