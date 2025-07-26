import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, TrendingUp, Award, Clock, Zap } from 'lucide-react';

export default function Dashboard() {
  const progressData = [
    { label: 'Daily Goal', value: 75, color: '#00D4AA' },
    { label: 'Weekly', value: 60, color: '#4ECDC4' },
    { label: 'Monthly', value: 85, color: '#45B7D1' },
  ];

  const studyStats = [
    { icon: BookOpen, label: 'Subjects', value: '8', trend: '+2', color: 'gradient-blue' },
    { icon: Clock, label: 'Study Time', value: '4.5h', trend: '+30m', color: 'gradient-green' },
    { icon: Target, label: 'Goals Met', value: '12/15', trend: '+3', color: 'gradient-orange' },
    { icon: Award, label: 'Streak', value: '7 days', trend: '+1', color: 'gradient-purple' },
  ];

  const CircularProgress = ({ value, color, size = 80 }: { value: number; color: string; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="4"
            fill="transparent"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-gray-800 font-bold text-sm"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-16 pb-24 px-6 py-8 relative overflow-hidden">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-2xl font-bold mb-1 text-gray-800"
          animate={{ scale: [1, 1.01, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Good morning, Alex! 👋
        </motion.h1>
        <p className="text-gray-600">Ready to continue your learning journey?</p>
      </motion.div>

      {/* Progress Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-6 text-gray-800">Your Progress</h2>
        <div className="glass rounded-3xl p-6 mb-6">
          <div className="flex justify-between items-center">
            {progressData.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <CircularProgress value={item.value} color={item.color} />
                <motion.p
                  className="text-xs text-gray-600 mt-2 text-center font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                >
                  {item.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-6 text-gray-800">Study Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          {studyStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`${stat.color} p-1 rounded-2xl shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                  <motion.span
                    className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {stat.trend}
                  </motion.span>
                </div>
                <p className="text-2xl font-bold mb-1 text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-6 text-gray-800">Quick Actions</h2>
        <div className="space-y-4">
          {[
            { title: 'Continue Math Practice', subtitle: 'Algebra - Chapter 5', progress: 65, color: 'gradient-blue' },
            { title: 'Review Physics Notes', subtitle: 'Quantum Mechanics', progress: 30, color: 'gradient-purple' },
            { title: 'Complete Chemistry Lab', subtitle: 'Due tomorrow', progress: 90, color: 'gradient-green' },
          ].map((action, index) => (
            <motion.div
              key={action.title}
              className="glass rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`absolute left-0 top-0 bottom-0 w-2 ${action.color} rounded-r-full`}
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              />
              <div className="ml-4">
                <h3 className="font-semibold mb-2 text-gray-800">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{action.subtitle}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 ${action.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${action.progress}%` }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{action.progress}% complete</span>
                  <Zap className="w-4 h-4 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement Badge */}
      <motion.div
        className="glass rounded-3xl p-6 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 gradient-yellow rounded-full mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Award className="text-white" size={24} />
        </motion.div>
        <h3 className="font-bold text-gray-800 mb-2">7-Day Streak! 🔥</h3>
        <p className="text-sm text-gray-600">Keep up the amazing work!</p>
      </motion.div>
    </div>
  );
}