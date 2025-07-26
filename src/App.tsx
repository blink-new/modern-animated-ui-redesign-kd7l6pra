import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import Assistants from './components/Assistants';
import CalculatorPage from './components/CalculatorPage';
import NotesPage from './components/NotesPage';
import QuizPage from './components/QuizPage';
import FlashcardsPage from './components/FlashcardsPage';
import FloatingTabBar from './components/FloatingTabBar';

function App() {
  const [activeScreen, setActiveScreen] = useState('welcome');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'dashboard':
        return <Dashboard />;
      case 'assistants':
        return <Assistants />;
      case 'calculator':
        return <CalculatorPage />;
      case 'notes':
        return <NotesPage />;
      case 'quiz':
        return <QuizPage />;
      case 'flashcards':
        return <FlashcardsPage />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-black flex items-center justify-center text-white text-sm font-medium z-50">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span className="mx-4">StudyGenie</span>
          <div className="flex items-center gap-1">
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-1 bg-white rounded-sm m-0.5"></div>
            </div>
            <span className="text-xs">100%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            duration: 0.4, 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          className="relative"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Floating Tab Bar */}
      <FloatingTabBar 
        activeTab={activeScreen} 
        onTabChange={setActiveScreen} 
      />

      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;