import { Trash2, X ,History} from "lucide-react";

const HistoryPanel = ({ history, onHistoryClick, onClearHistory, showHistory, onClose }) => (
    <div 
      className={`fixed right-0 top-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        showHistory ? 'translate-x-0' : 'translate-x-full'
      } z-50 w-full sm:w-80`}
    >
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Calculation History</h3>
                <div className="flex gap-2">
                    <button onClick={onClearHistory} className="p-2 hover:bg-red-50 rounded-full text-red-500" title="Clear history">
                        <Trash2 className="h-5 w-5" />
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <History className="h-12 w-12 mb-2 opacity-50" />
                        <p>No calculations yet</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {history.map((item, idx) => (
                            <li key={idx} onClick={() => onHistoryClick(item.result)} className="cursor-pointer p-2 rounded-md hover:bg-gray-50">
                                <div className="text-sm">{item.equation}</div>
                                <div className="text-lg font-semibold">{item.result}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    </div>
  );

export default HistoryPanel;