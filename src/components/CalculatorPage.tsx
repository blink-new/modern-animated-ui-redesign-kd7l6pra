import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Delete, Equal } from 'lucide-react';

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <div className="min-h-screen pt-16 pb-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-sm mx-auto"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-blue rounded-full mb-4 float">
            <Calculator className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Calculator</h1>
          <p className="text-gray-600">Smart calculation tool</p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          className="glass rounded-3xl p-6 shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Display */}
          <motion.div
            className="bg-gray-900 rounded-2xl p-6 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-right text-3xl font-light text-white overflow-hidden">
              {display}
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="space-y-3">
            {buttons.map((row, rowIndex) => (
              <div key={rowIndex} className="flex space-x-3">
                {row.map((button, buttonIndex) => {
                  const isOperation = ['÷', '×', '-', '+', '='].includes(button);
                  const isSpecial = ['C', '±', '%'].includes(button);
                  const isZero = button === '0';
                  
                  return (
                    <motion.button
                      key={button}
                      className={`
                        h-16 rounded-2xl font-medium text-lg transition-all duration-200
                        ${isZero ? 'flex-1' : 'flex-1'}
                        ${isOperation 
                          ? 'gradient-primary text-white shadow-lg' 
                          : isSpecial 
                          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                          : 'bg-white text-gray-800 hover:bg-gray-50 shadow-md'
                        }
                      `}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: (rowIndex * 4 + buttonIndex) * 0.05,
                        type: "spring",
                        stiffness: 300
                      }}
                      onClick={() => {
                        if (button === 'C') {
                          clear();
                        } else if (button === '=') {
                          performCalculation();
                        } else if (['÷', '×', '-', '+'].includes(button)) {
                          inputOperation(button);
                        } else if (button === '±') {
                          setDisplay(String(parseFloat(display) * -1));
                        } else if (button === '%') {
                          setDisplay(String(parseFloat(display) / 100));
                        } else {
                          inputNumber(button);
                        }
                      }}
                    >
                      {button === '=' && <Equal size={20} />}
                      {button !== '=' && button}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}