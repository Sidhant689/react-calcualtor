import { useState, useEffect } from "react";
import Display from "./Display";
import NumericPad from "./NumericPad";
import OperatorPad from "./OperatorPad";
import MemoryPad from "./MemoryPad";
import ScientificPad from "./ScientificPad";
import HistoryPanel from "./HistoryPanel";
import { History } from "lucide-react";


const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const [hasResult, setHasResult] = useState(false);
    const [memory, setMemory] = useState(null);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    // const [lastOperation, setLastOperation] = useState(null);
  
    const handleNumber = (number) => {
      if (hasResult) {
        setDisplay(number);
        setEquation(number);
        setHasResult(false);
      } else {
        setDisplay(display === '0' ? number : display + number);
        setEquation(equation + number);
      }
    };
  
    const handleOperator = (operator) => {
      setHasResult(false);
      if (equation && !/[+\-×÷^]$/.test(equation)) {
        setEquation(equation + operator);
        setDisplay('0');
      }
    };
  
    const addToHistory = (eq, res) => {
        setHistory(prev => [{
          equation: eq,
          result: res,
          timestamp: new Date().getTime()
        }, ...prev].slice(0, 50)); // Keep last 50 calculations
      };
    
      // Add overlay click handler to close history on mobile
      const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
          setShowHistory(false);
        }
      };
    
  
    const handleEqual = () => {
      try {
        const evalEquation = equation
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, Math.PI);
        const result = eval(evalEquation).toString();
        setDisplay(result);
        setEquation(equation + '=' + result);
        setHasResult(true);
        addToHistory(equation, result);
      } catch (error) {
        setDisplay('Error');
        setEquation('');
        setHasResult(true);
      }
    };
  
    const handleScientific = (func) => {
      try {
        const value = parseFloat(display);
        let scientificResult;
        
        switch(func) {
          case 'sqrt':
            scientificResult = Math.sqrt(value);
            break;
          case 'square':
            scientificResult = value * value;
            break;
          case 'power':
            setLastOperation = { type: 'power', value };
            return;
          case 'pi':
            scientificResult = Math.PI;
            break;
          case 'sin':
            scientificResult = Math.sin(value * Math.PI / 180);
            break;
          case 'cos':
            scientificResult = Math.cos(value * Math.PI / 180);
            break;
          case 'tan':
            scientificResult = Math.tan(value * Math.PI / 180);
            break;
          case 'log':
            scientificResult = Math.log10(value);
            break;
          default:
            throw new Error('Invalid function');
        }
        
        const formattedResult = parseFloat(scientificResult.toFixed(8)).toString();
        setDisplay(formattedResult);
        setEquation(`${func}(${value})=${formattedResult}`);
        setHasResult(true);
        addToHistory(`${func}(${value})`, formattedResult);
      } catch (error) {
        setDisplay('Error');
        setEquation('');
        setHasResult(true);
      }
    };
  
    const handleMemory = (operation) => {
      const currentValue = parseFloat(display);
      
      switch(operation) {
        case 'MC':
          setMemory(null);
          break;
        case 'MR':
          if (memory !== null) {
            setDisplay(memory.toString());
            setEquation(memory.toString());
            setHasResult(true);
          }
          break;
        case 'M+':
          setMemory((memory || 0) + currentValue);
          setHasResult(true);
          break;
        case 'M-':
          setMemory((memory || 0) - currentValue);
          setHasResult(true);
          break;
      }
    };

    const handleClear = () => {
        setDisplay('0');
        setEquation('');
        setHasResult(false);
    }
  
    useEffect(() => {
      const handleKeyPress = (event) => {
        // Prevent default for calculator keys
        if (/[\d+\-*/.=Enter]/.test(event.key)) {
          event.preventDefault();
        }
  
        // Handle Alt + number combinations for memory operations
        if (event.altKey && /[1-4]/.test(event.key)) {
          event.preventDefault();
          const memoryOps = { '1': 'MC', '2': 'MR', '3': 'M+', '4': 'M-' };
          handleMemory(memoryOps[event.key]);
          return;
        }
  
        // Scientific operations shortcuts
        const scientificShortcuts = {
          q: 'sqrt',
          '@': 'square',
          '^': 'power',
          p: 'pi',
          s: 'sin',
          c: 'cos',
          t: 'tan',
          l: 'log'
        };
  
        if (scientificShortcuts[event.key]) {
          handleScientific(scientificShortcuts[event.key]);
          return;
        }
  
        // Regular calculator operations
        if (/\d/.test(event.key)) {
          handleNumber(event.key);
        } else if (['+', '-', '*', '/', '^'].includes(event.key)) {
          handleOperator(event.key.replace('*', '×').replace('/', '÷'));
        } else if (event.key === 'Enter' || event.key === '=') {
          handleEqual();
        } else if (event.key === 'Escape') {
          handleClear();
        } else if (event.key === 'h') {
          setShowHistory(prev => !prev);
        }
  
        // Visual feedback
        const button = document.querySelector(`[data-key="${event.key}"]`);
        if (button) {
          button.classList.add('bg-opacity-75');
          setTimeout(() => button.classList.remove('bg-opacity-75'), 100);
        }
      };
  
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [display, equation, hasResult, memory]);
  
    return (
        <div className="relative min-h-screen bg-gray-100">
            <div className="calculator flex flex-col items-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-xs sm:max-w-sm lg:max-w-md p-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Scientific Calculator</span>
                    <button
                            onClick={() => setShowHistory(prev => !prev)}
                            className={`p-2 hover:bg-gray-100 rounded-full ${showHistory ? 'bg-gray-100' : ''}`}
                            title="Show history"
                        >
                        <History className="h-5 w-5" />
                    </button>
                </div>
                
                <Display equation={equation} display={display} memory={memory} />

                {/* Overlay for mobile */}
                {showHistory && (
                    <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={handleOverlayClick}
                    />
                )}

                
                {/* History Panel */}
                <HistoryPanel
                    history={history}
                    showHistory={showHistory}
                    onHistoryClick={(value) => {
                    setDisplay(value);
                    setEquation(value);
                    setHasResult(true);
                    setShowHistory(false); // Close panel after selecting
                    }}
                    onClearHistory={() => {
                    setHistory([]);
                    }}
                    onClose={() => setShowHistory(false)}
                />

        
                <MemoryPad onMemoryClick={handleMemory} />
                <ScientificPad onScientificClick={handleScientific} />
                
                <OperatorPad onOperatorClick={handleOperator} onClearClick={handleClear} />

                <NumericPad onNumberClick={handleNumber} onDecimalClick={() => handleNumber('.')} onEqualClick={handleEqual} onOperatorClick={handleOperator} />
        
                </div>
            </div>
      </div>
    );
  };
  
  export default Calculator;