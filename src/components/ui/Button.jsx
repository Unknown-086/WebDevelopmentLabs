import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border-2 border-primary bg-transparent hover:bg-primary/10 text-primary",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  shimmer: "relative overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white",
};

const sizes = {
  default: "h-11 px-6 py-2",
  sm: "h-9 px-4 text-sm",
  lg: "h-14 px-8 text-lg",
  icon: "h-10 w-10",
};

export const Button = ({ 
  className, 
  variant = "default", 
  size = "default", 
  children,
  disabled,
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium",
        "ring-offset-background transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "relative group",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {variant === 'shimmer' && (
        <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
};
