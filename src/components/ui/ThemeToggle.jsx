import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-14 h-14 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sun Icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 180 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Sun className="w-6 h-6 text-yellow-500" />
      </motion.div>

      {/* Moon Icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -180,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Moon className="w-6 h-6 text-violet-400" />
      </motion.div>
    </motion.button>
  );
};
