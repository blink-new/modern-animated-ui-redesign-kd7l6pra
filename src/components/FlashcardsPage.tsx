import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, RotateCcw, ChevronLeft, ChevronRight, Plus, Edit3, Trash2 } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const sampleCards: Flashcard[] = [
  {
    id: '1',
    front: 'What is the derivative of sin(x)?',
    back: 'cos(x)',
    category: 'Calculus',
    difficulty: 'medium'
  },
  {
    id: '2',
    front: 'What does HTML stand for?',
    back: 'HyperText Markup Language',
    category: 'Web Development',
    difficulty: 'easy'
  },
  {
    id: '3',
    front: 'What is the time complexity of binary search?',
    back: 'O(log n)',
    category: 'Computer Science',
    difficulty: 'hard'
  }
];

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>(sampleCards);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '', category: '', difficulty: 'medium' as const });

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const resetCards = () => {
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const createCard = () => {
    if (newCard.front && newCard.back) {
      const card: Flashcard = {
        id: Date.now().toString(),
        ...newCard
      };
      setCards([...cards, card]);
      setNewCard({ front: '', back: '', category: '', difficulty: 'medium' });
      setIsCreating(false);
    }
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
    if (currentCard >= cards.length - 1) {
      setCurrentCard(0);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'gradient-green';
      case 'medium': return 'gradient-yellow';
      case 'hard': return 'gradient-pink';
      default: return 'gradient-blue';
    }
  };

  if (showAll) {
    return (
      <div className="min-h-screen pt-16 pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">All Flashcards</h1>
              <p className="text-gray-600">{cards.length} cards total</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={() => setIsCreating(true)}
                className="gradient-primary text-white p-3 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={20} />
              </motion.button>
              <motion.button
                onClick={() => setShowAll(false)}
                className="bg-white text-gray-700 px-4 py-3 rounded-2xl shadow-lg border"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Study Mode
              </motion.button>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence>
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className={`${getDifficultyColor(card.difficulty)} p-1 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-64 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {card.category}
                        </span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            onClick={() => deleteCard(card.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-3">
                          {card.front}
                        </h3>
                        <div className="border-t pt-3">
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {card.back}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          card.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {card.difficulty}
                        </span>
                        <motion.button
                          onClick={() => {
                            setCurrentCard(index);
                            setShowAll(false);
                          }}
                          className="text-primary hover:text-primary/80 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Study →
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Create Card Modal */}
          <AnimatePresence>
            {isCreating && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCreating(false)}
              >
                <motion.div
                  className="glass rounded-3xl p-8 max-w-md w-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Create New Card</h2>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Front of card..."
                      value={newCard.front}
                      onChange={(e) => setNewCard({...newCard, front: e.target.value})}
                      className="w-full p-3 rounded-2xl border-0 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    
                    <textarea
                      placeholder="Back of card..."
                      value={newCard.back}
                      onChange={(e) => setNewCard({...newCard, back: e.target.value})}
                      className="w-full p-3 rounded-2xl border-0 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 h-24 resize-none"
                    />
                    
                    <input
                      type="text"
                      placeholder="Category..."
                      value={newCard.category}
                      onChange={(e) => setNewCard({...newCard, category: e.target.value})}
                      className="w-full p-3 rounded-2xl border-0 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    
                    <select
                      value={newCard.difficulty}
                      onChange={(e) => setNewCard({...newCard, difficulty: e.target.value as 'easy' | 'medium' | 'hard'})}
                      className="w-full p-3 rounded-2xl border-0 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      onClick={() => setIsCreating(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={createCard}
                      className="flex-1 gradient-primary text-white py-3 rounded-2xl font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen pt-16 pb-24 px-4 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Zap className="mx-auto text-gray-300 mb-4" size={64} />
          <h2 className="text-xl font-bold text-gray-800 mb-2">No flashcards yet</h2>
          <p className="text-gray-600 mb-6">Create your first flashcard to get started!</p>
          <motion.button
            onClick={() => setIsCreating(true)}
            className="gradient-primary text-white px-6 py-3 rounded-2xl font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Flashcard
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
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-yellow rounded-full mb-4 float">
            <Zap className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Flashcards</h1>
          <p className="text-gray-600">Study with interactive cards</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-sm text-gray-600">
            Card {currentCard + 1} of {cards.length}
          </div>
          <motion.button
            onClick={() => setShowAll(true)}
            className="text-primary hover:text-primary/80 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Cards
          </motion.button>
        </motion.div>

        {/* Card */}
        <motion.div
          className="relative h-80 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCard}-${isFlipped}`}
              className={`absolute inset-0 ${getDifficultyColor(cards[currentCard].difficulty)} p-1 rounded-3xl shadow-xl cursor-pointer`}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={flipCard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 h-full flex flex-col justify-center items-center text-center">
                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {cards[currentCard].category}
                  </span>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xl font-medium text-gray-800 leading-relaxed">
                    {isFlipped ? cards[currentCard].back : cards[currentCard].front}
                  </p>
                </div>
                
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    cards[currentCard].difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    cards[currentCard].difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cards[currentCard].difficulty}
                  </span>
                  
                  <span className="text-xs text-gray-400">
                    {isFlipped ? 'Answer' : 'Question'} • Tap to flip
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={prevCard}
            className="glass p-4 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            disabled={cards.length <= 1}
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </motion.button>
          
          <motion.button
            onClick={resetCards}
            className="glass p-4 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={24} className="text-gray-700" />
          </motion.button>
          
          <motion.button
            onClick={nextCard}
            className="glass p-4 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            disabled={cards.length <= 1}
          >
            <ChevronRight size={24} className="text-gray-700" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}