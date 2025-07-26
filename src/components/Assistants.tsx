import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Calculator, 
  BookOpen, 
  FileText, 
  Lightbulb, 
  MessageCircle,
  Search,
  Zap,
  Star,
  ArrowRight,
  Users
} from 'lucide-react';

export default function Assistants() {
  const assistantTools = [
    {
      icon: Brain,
      title: 'AI Tutor',
      subtitle: 'Get personalized help',
      color: 'gradient-purple',
      popular: true
    },
    {
      icon: Calculator,
      title: 'Math Solver',
      subtitle: 'Step-by-step solutions',
      color: 'gradient-blue'
    },
    {
      icon: FileText,
      title: 'Essay Writer',
      subtitle: 'Writing assistance',
      color: 'gradient-orange'
    },
    {
      icon: BookOpen,
      title: 'Study Guide',
      subtitle: 'Summarize content',
      color: 'gradient-green'
    },
    {
      icon: Lightbulb,
      title: 'Idea Generator',
      subtitle: 'Creative brainstorming',
      color: 'gradient-yellow'
    },
    {
      icon: MessageCircle,
      title: 'Study Buddy',
      subtitle: 'Interactive learning',
      color: 'gradient-pink'
    },
    {
      icon: Search,
      title: 'Research Helper',
      subtitle: 'Find reliable sources',
      color: 'gradient-blue'
    },
    {
      icon: Zap,
      title: 'Quick Quiz',
      subtitle: 'Test your knowledge',
      color: 'gradient-purple'
    }
  ];

  const recentActivity = [
    { tool: 'AI Tutor', subject: 'Physics', time: '2 min ago', progress: 85, color: 'gradient-purple' },
    { tool: 'Math Solver', subject: 'Calculus', time: '15 min ago', progress: 92, color: 'gradient-blue' },
    { tool: 'Essay Writer', subject: 'Literature', time: '1 hour ago', progress: 67, color: 'gradient-orange' }
  ];

  return (
    <div className="min-h-screen pt-16 pb-24 px-6 py-8 relative overflow-hidden">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 gradient-pink rounded-full mb-4 float">
          <Users className="text-white" size={24} />
        </div>
        <motion.h1
          className="text-2xl font-bold mb-2 text-gray-800"
          animate={{ scale: [1, 1.01, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          AI Assistants ✨
        </motion.h1>
        <p className="text-gray-600">Choose your learning companion</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <motion.input
            type="text"
            placeholder="Search assistants..."
            className="w-full glass rounded-2xl pl-12 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 border-0"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-6 text-gray-800">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.tool}
              className="glass rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <span className="font-semibold text-gray-800">{activity.tool}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 font-medium">{activity.subject}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 ${activity.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${activity.progress}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{activity.progress}% complete</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors ml-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Assistant Tools Grid */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-6 text-gray-800">All Assistants</h2>
        <div className="grid grid-cols-2 gap-4">
          {assistantTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              className={`relative ${tool.color} p-1 rounded-3xl cursor-pointer group overflow-hidden shadow-lg`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 0.5 + index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Popular Badge */}
              {tool.popular && (
                <motion.div
                  className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 z-20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                >
                  <Star className="w-3 h-3" />
                  Popular
                </motion.div>
              )}

              {/* Content */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 relative z-10 h-32 flex flex-col">
                <motion.div
                  className="mb-4"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <tool.icon className="w-5 h-5 text-gray-700" />
                  </div>
                </motion.div>

                <div className="flex-1">
                  <motion.h3
                    className="font-semibold mb-1 text-gray-800 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {tool.title}
                  </motion.h3>

                  <motion.p
                    className="text-xs text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {tool.subtitle}
                  </motion.p>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 text-gray-700" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="glass rounded-3xl p-6 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-full mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="text-white" size={24} />
        </motion.div>
        <h3 className="font-bold text-gray-800 mb-2">Ready to learn?</h3>
        <p className="text-sm text-gray-600 mb-4">Pick an assistant and start your learning journey!</p>
        <motion.button
          className="gradient-primary text-white px-6 py-3 rounded-2xl font-medium shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}