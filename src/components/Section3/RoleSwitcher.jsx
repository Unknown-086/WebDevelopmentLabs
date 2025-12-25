import { motion } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { Shield, User } from 'lucide-react';

export const RoleSwitcher = ({ compact = false }) => {
  const { role, toggleRole, isAdmin } = useRole();

  if (compact) {
    return (
      <motion.button
        onClick={toggleRole}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 hover:border-primary/40 transition-all"
      >
        <motion.div
          key={role}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {isAdmin ? (
            <Shield className="w-5 h-5 text-primary" />
          ) : (
            <User className="w-5 h-5 text-primary" />
          )}
        </motion.div>
        <span className="font-medium text-sm">
          {isAdmin ? 'Admin' : 'User'}
        </span>
      </motion.button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">Current Role:</span>
      
      <div className="relative">
        {/* Toggle Switch */}
        <motion.button
          onClick={toggleRole}
          className="relative w-32 h-12 rounded-full bg-secondary border-2 border-primary/30 p-1 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Sliding Background */}
          <motion.div
            className="absolute inset-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
            animate={{
              x: isAdmin ? '0%' : '100%',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: '45%' }}
          />

          {/* Icons */}
          <div className="relative flex items-center justify-between px-2 h-full">
            <motion.div
              animate={{
                scale: isAdmin ? 1.2 : 0.8,
                opacity: isAdmin ? 1 : 0.5,
              }}
              transition={{ duration: 0.2 }}
            >
              <Shield className="w-5 h-5 text-white relative z-10" />
            </motion.div>
            <motion.div
              animate={{
                scale: !isAdmin ? 1.2 : 0.8,
                opacity: !isAdmin ? 1 : 0.5,
              }}
              transition={{ duration: 0.2 }}
            >
              <User className="w-5 h-5 text-white relative z-10" />
            </motion.div>
          </div>
        </motion.button>
      </div>

      {/* Role Label */}
      <motion.div
        key={role}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/30"
      >
        <span className="font-bold gradient-text text-lg">
          {isAdmin ? 'Admin' : 'User'}
        </span>
      </motion.div>
    </div>
  );
};
