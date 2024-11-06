import { Trash2, X ,History} from "lucide-react";

const HistoryPanel = ({ history, onHistoryClick, onClearHistory, showHistory, onClose }) => (
    <div 
      className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        showHistory ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Calculation History</h3>
          <div className="flex gap-2">
            <button
              onClick={onClearHistory}
              className="p-2 hover:bg-red-50 rounded-full text-red-500"
              title="Clear history"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
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
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={index}
                  onClick={() => onHistoryClick(item.result)}
                  className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="text-sm text-gray-500 break-all">{item.equation}</div>
                  <div className="text-lg font-medium break-all">{item.result}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

export default HistoryPanel;