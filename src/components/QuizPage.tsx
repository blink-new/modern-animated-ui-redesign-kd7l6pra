import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy, Clock } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the derivative of x²?',
    options: ['x', '2x', 'x²', '2x²'],
    correctAnswer: 1,
    explanation: 'The derivative of x² is 2x using the power rule.'
  },
  {
    id: '2',
    question: 'Which programming language is known for AI development?',
    options: ['HTML', 'Python', 'CSS', 'SQL'],
    correctAnswer: 1,
    explanation: 'Python is widely used in AI and machine learning due to its extensive libraries.'
  },
  {
    id: '3',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    explanation: 'Paris is the capital and largest city of France.'
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const handleAnswer = useCallback(() => {
    if (selectedAnswer === null && timeLeft > 0) return;
    
    setShowResult(true);
    const isCorrect = selectedAnswer === sampleQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, selectedAnswer || -1]);
  }, [selectedAnswer, timeLeft, currentQuestion, score, answeredQuestions]);

  React.useEffect(() => {
    if (!showResult && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer();
    }
  }, [timeLeft, showResult, quizCompleted, handleAnswer]);

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
    setTimeLeft(30);
  };

  const getScoreColor = () => {
    const percentage = (score / sampleQuestions.length) * 100;
    if (percentage >= 80) return 'gradient-green';
    if (percentage >= 60) return 'gradient-yellow';
    return 'gradient-pink';
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen pt-16 pb-24 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="max-w-md mx-auto text-center"
        >
          <motion.div
            className={`inline-flex items-center justify-center w-24 h-24 ${getScoreColor()} rounded-full mb-6`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Trophy className="text-white" size={32} />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h1>
          
          <motion.div
            className="glass rounded-3xl p-8 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
              {score}/{sampleQuestions.length}
            </div>
            <p className="text-gray-600 mb-4">
              {((score / sampleQuestions.length) * 100).toFixed(0)}% Correct
            </p>
            
            <div className="space-y-2">
              {sampleQuestions.map((_, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>Question {index + 1}</span>
                  {answeredQuestions[index] === sampleQuestions[index].correctAnswer ? (
                    <CheckCircle className="text-green-500" size={16} />
                  ) : (
                    <XCircle className="text-red-500" size={16} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.button
            onClick={resetQuiz}
            className="gradient-primary text-white px-8 py-4 rounded-2xl font-medium shadow-lg flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <RotateCcw size={20} />
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-purple rounded-full mb-4 float">
            <Brain className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Smart Quiz</h1>
          <p className="text-gray-600">Test your knowledge</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {sampleQuestions.length}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            <span className={timeLeft <= 10 ? 'text-red-500 font-bold' : ''}>{timeLeft}s</span>
          </div>
        </motion.div>

        <motion.div
          className="w-full bg-gray-200 rounded-full h-2 mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="gradient-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            className="glass rounded-3xl p-8 mb-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {sampleQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {sampleQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 ${
                    showResult
                      ? index === sampleQuestions[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : selectedAnswer === index
                        ? 'bg-red-100 border-2 border-red-500 text-red-800'
                        : 'bg-gray-100 text-gray-600'
                      : selectedAnswer === index
                      ? 'gradient-primary text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary/30'
                  }`}
                  whileHover={!showResult ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      showResult
                        ? index === sampleQuestions[currentQuestion].correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : selectedAnswer === index
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-gray-300'
                        : selectedAnswer === index
                        ? 'border-white bg-white text-primary'
                        : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>

            {showResult && (
              <motion.div
                className="mt-6 p-4 bg-blue-50 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-blue-800 text-sm">
                  <strong>Explanation:</strong> {sampleQuestions[currentQuestion].explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {!showResult ? (
            <motion.button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className={`px-8 py-4 rounded-2xl font-medium shadow-lg ${
                selectedAnswer !== null
                  ? 'gradient-primary text-white hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={selectedAnswer !== null ? { scale: 1.05, y: -2 } : {}}
              whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
            >
              Submit Answer
            </motion.button>
          ) : (
            <motion.button
              onClick={nextQuestion}
              className="gradient-primary text-white px-8 py-4 rounded-2xl font-medium shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'View Results'}
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}