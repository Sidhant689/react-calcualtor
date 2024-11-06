import ScientificPad from "./ScientificPad";

const OperatorPad = ({ onOperatorClick, onClearClick }) => (
    <div className="grid grid-cols-4 gap-2 mt-2">
    <button
      onClick={() => onClearClick()}
      className="col-span-2 rounded-xl bg-red-100 text-red-600 p-4 text-xl font-semibold hover:bg-red-200"
      data-key="Escape"
    >
      AC
    </button>
    <button
      onClick={() => onOperatorClick('×')}
      className="rounded-xl bg-blue-100 text-blue-600 p-4 text-xl font-semibold hover:bg-blue-200"
      data-key="*"
    >
      ×
    </button>
    <button
      onClick={() => onOperatorClick('÷')}
      className="rounded-xl bg-blue-100 text-blue-600 p-4 text-xl font-semibold hover:bg-blue-200"
      data-key="/"
    >
      ÷
    </button>
  </div>
);

export default OperatorPad;
