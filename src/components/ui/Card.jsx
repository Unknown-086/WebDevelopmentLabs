import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, variant = 'default', ...props }) => {
  const variants = {
    default: "bg-card border-border",
    glass: "glass-effect",
    gradient: "bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border-violet-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-xl border shadow-lg p-6 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:shadow-2xl hover:shadow-primary/20",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ className, children }) => (
  <div className={cn("flex flex-col space-y-1.5 pb-4", className)}>
    {children}
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={cn("text-2xl font-bold tracking-tight gradient-text", className)}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children }) => (
  <p className={cn("text-sm text-muted-foreground", className)}>
    {children}
  </p>
);

export const CardContent = ({ className, children }) => (
  <div className={cn("pt-0", className)}>
    {children}
  </div>
);

export const CardFooter = ({ className, children }) => (
  <div className={cn("flex items-center pt-4", className)}>
    {children}
  </div>
);
