"use client";

import { motion } from "framer-motion";

// template.jsx remounts on every navigation, giving each page the same
// fade-in transition. The wrapper must span the full width — .App is a
// centered flex column, so an unstyled div would shrink to fit-content.
export default function Template({ children }) {
  return (
    <motion.div
      className="page-template"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
