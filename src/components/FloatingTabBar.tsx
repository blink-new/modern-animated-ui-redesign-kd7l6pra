import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Users, Calculator, FileText, Brain, Zap } from 'lucide-react';

interface FloatingTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'welcome', icon: Home, label: 'Home' },
  { id: 'dashboard', icon: BookOpen, label: 'Dashboard' },
  { id: 'assistants', icon: Users, label: 'Assistants' },
  { id: 'calculator', icon: Calculator, label: 'Calculator' },
  { id: 'notes', icon: FileText, label: 'Notes' },
  { id: 'quiz', icon: Brain, label: 'Quiz' },
  { id: 'flashcards', icon: Zap, label: 'Cards' },
];

export default function FloatingTabBar({ activeTab, onTabChange }: FloatingTabBarProps) {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
    >
      <motion.div
        className="glass rounded-full px-4 py-3 tab-float"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center space-x-2">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative p-3 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-primary hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 gradient-primary rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon 
                  size={20} 
                  className={`relative z-10 ${isActive ? 'animate-pulse' : ''}`} 
                />
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.label}
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}