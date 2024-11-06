const MemoryPad = ({ onMemoryClick }) => (
    <div className="grid grid-cols-4 gap-2 mt-2">
      {[
        { key: 'MC', shortcut: '1' },
        { key: 'MR', shortcut: '2' },
        { key: 'M+', shortcut: '3' },
        { key: 'M-', shortcut: '4' }
      ].map((op) => (
        <button
          key={op.key}
          onClick={() => onMemoryClick(op.key)}
          className="bg-purple-100 text-purple-600 rounded-xl p-4 text-lg font-semibold hover:bg-purple-200"
          data-key={`Alt+${op.shortcut}`}
        >
          {op.key}
        </button>
      ))}
    </div>
  );

export default MemoryPad;