import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function EditionCard({ edition }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative h-96 w-full overflow-hidden rounded-xl cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
    >
    
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white rounded-xl z-0"
          />
        )}
      </AnimatePresence>

      
      {edition.thumbnail && (
        <motion.img
          src={edition.thumbnail}
          alt={edition.name}
          className="absolute inset-0 w-full h-full object-cover rounded-xl z-10"
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}


      <div className="relative z-20 mt-16 p-4 text-white">
        <h2 className="text-2xl font-bold">{edition.name}</h2>
        <p className="text-sm mb-2">Edition #{edition.edition_id}</p>
        <p className="text-xs">
          Published:{" "}
          {edition.published_at
            ? new Date(edition.published_at).toLocaleDateString()
            : "Not Published Yet"}
        </p>
      </div>

      <Link
        to={`/editions/${edition._id}`}
        className="absolute bottom-4 left-4 right-4 bg-white text-black font-bold py-2 rounded text-center hover:bg-white/80 transition z-20"
      >
        View Edition
      </Link>
    </motion.div>
  );
}

export default EditionCard;
