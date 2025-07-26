import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomeScreen() {
  const [isBlinking, setIsBlinking] = useState(false);

  // Blinking animation for the AI mascot
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}

      {/* AI Mascot */}
      <motion.div
        className="relative mb-8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-32 h-32 gradient-primary rounded-3xl flex items-center justify-center relative pulse-glow"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Robot Face */}
          <div className="relative">
            {/* Eyes */}
            <motion.div
              className="flex gap-4 mb-2"
              animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
              transition={{ duration: 0.1 }}
            >
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </motion.div>
            
            {/* Mouth */}
            <motion.div
              className="w-6 h-1 bg-white rounded-full mx-auto"
              animate={{ width: [24, 20, 24] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Antenna */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-0.5 h-6 bg-white rounded-full"></div>
              <motion.div
                className="w-2 h-2 bg-accent rounded-full mx-auto -mt-1"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Welcome Text */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-4"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          StudyGenie
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Your AI-powered study companion
          <br />
          Ready to boost your learning?
        </motion.p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 mb-12 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {[
          { icon: '🧮', label: 'Calculator', color: 'gradient-blue' },
          { icon: '📝', label: 'Notes', color: 'gradient-orange' },
          { icon: '🧠', label: 'Quiz', color: 'gradient-purple' },
          { icon: '⚡', label: 'Cards', color: 'gradient-yellow' }
        ].map((feature, index) => (
          <motion.div
            key={feature.label}
            className={`${feature.color} p-1 rounded-2xl`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="text-sm font-medium text-gray-700">{feature.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Get Started Button */}
      <motion.div
        className="group relative px-8 py-4 gradient-primary rounded-2xl text-white font-semibold text-lg shadow-lg overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-white/20 shimmer"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
        <div className="relative flex items-center gap-3">
          <Sparkles className="w-5 h-5" />
          Swipe to explore
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom indicator */}
      <motion.div
        className="absolute bottom-32 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className="w-8 h-1 gradient-primary rounded-full"></div>
        <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
      </motion.div>
    </div>
  );
}