import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaXmark } from 'react-icons/fa6';

interface Props {
  src: string | null;
  alt: string;
  onClose: () => void;
}

export function Lightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/95 p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={onClose}
            className="absolute right-6 top-6 z-[3001] text-4xl text-white transition-transform hover:scale-110"
          >
            <FaXmark />
          </button>
          <motion.img
            src={src}
            alt={alt}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90%] rounded-lg object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
