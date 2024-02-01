"use client";
import { motion } from "framer-motion";

export default function template({ children }: { children: React.ReactNode }) {
  const variants = {
    hidden: { opacity: 1, x: 20, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear" }}
    >
      {children}
    </motion.div>
  );
}
