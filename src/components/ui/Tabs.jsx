import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl border border-border mb-6 overflow-x-auto">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={cn(
              "relative px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              activeTab === index
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
