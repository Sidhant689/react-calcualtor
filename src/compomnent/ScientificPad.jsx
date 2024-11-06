const ScientificPad = ({ onScientificClick }) => (
    <div className="grid grid-cols-4 gap-2 mt-2">
      {[
        { key: 'sqrt', label: '√', shortcut: 'q' },
        { key: 'square', label: 'x²', shortcut: '@' },
        { key: 'power', label: 'xʸ', shortcut: '^' },
        { key: 'pi', label: 'π', shortcut: 'p' },
        { key: 'sin', label: 'sin', shortcut: 's' },
        { key: 'cos', label: 'cos', shortcut: 'c' },
        { key: 'tan', label: 'tan', shortcut: 't' },
        { key: 'log', label: 'log', shortcut: 'l' }
      ].map((func) => (
        <button
          key={func.key}
          onClick={() => onScientificClick(func.key)}
          className="bg-green-100 text-green-600 rounded-xl p-4 text-lg font-semibold hover:bg-green-200"
          data-key={func.shortcut}
        >
          {func.label}
        </button>
      ))}
    </div>
  );
  
  export default ScientificPad;
  