import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Search, Edit3, Trash2, Save } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  color: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Study Plan',
      content: 'Review calculus chapters 1-3\nPractice integration problems\nPrepare for midterm exam',
      createdAt: new Date(),
      color: 'gradient-blue'
    },
    {
      id: '2',
      title: 'Research Ideas',
      content: 'AI in education\nMachine learning applications\nNatural language processing',
      createdAt: new Date(),
      color: 'gradient-purple'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const colors = ['gradient-blue', 'gradient-purple', 'gradient-pink', 'gradient-orange', 'gradient-green'];

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      createdAt: new Date(),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setNotes([newNote, ...notes]);
    setEditingNote(newNote);
    setIsCreating(false);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

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
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-orange rounded-full mb-4 float">
            <FileText className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Smart Notes</h1>
          <p className="text-gray-600">Organize your thoughts and ideas</p>
        </motion.div>

        {/* Search and Add */}
        <motion.div
          className="flex gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <motion.button
            onClick={createNote}
            className="gradient-primary text-white p-3 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={24} />
          </motion.button>
        </motion.div>

        {/* Notes Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          layout
        >
          <AnimatePresence>
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                className="group"
              >
                <motion.div
                  className={`${note.color} p-1 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-64 flex flex-col">
                    {editingNote?.id === note.id ? (
                      <div className="flex-1 flex flex-col">
                        <input
                          type="text"
                          value={note.title}
                          onChange={(e) => updateNote(note.id, { title: e.target.value })}
                          className="text-lg font-semibold mb-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2 py-1"
                          autoFocus
                        />
                        <textarea
                          value={note.content}
                          onChange={(e) => updateNote(note.id, { content: e.target.value })}
                          className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2 py-1 resize-none"
                          placeholder="Start writing..."
                        />
                        <div className="flex justify-end gap-2 mt-3">
                          <motion.button
                            onClick={() => setEditingNote(null)}
                            className="gradient-primary text-white p-2 rounded-xl"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Save size={16} />
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                            {note.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-4 whitespace-pre-wrap">
                            {note.content}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-gray-400">
                            {note.createdAt.toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            <motion.button
                              onClick={() => setEditingNote(note)}
                              className="text-gray-400 hover:text-primary p-1"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              <Edit3 size={16} />
                            </motion.button>
                            <motion.button
                              onClick={() => deleteNote(note.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredNotes.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FileText className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No notes found' : 'No notes yet. Create your first note!'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}