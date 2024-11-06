const NumericPad = ({ onNumberClick, onDecimalClick, onEqualClick , onOperatorClick }) => (
  <div className="grid grid-cols-4 gap-2 mt-2">
            {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '='].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (typeof item === 'number') onNumberClick(item.toString());
                  else if (item === '=') onEqualClick();
                  else onOperatorClick(item);
                }}
                className={`rounded-xl p-4 text-xl font-semibold ${
                  typeof item === 'number'
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : item === '='
                    ? 'bg-blue-500 text-white hover:bg-blue-600 row-span-2'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
                data-key={item === '=' ? 'Enter' : item}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => onNumberClick('0')}
              className="col-span-2 rounded-xl bg-gray-100 p-4 text-xl font-semibold hover:bg-gray-200"
              data-key="0"
            >
              0
            </button>
            <button
              onClick={() => onDecimalClick('.')}
              className="rounded-xl bg-gray-100 p-4 text-xl font-semibold hover:bg-gray-200"
              data-key="."
            >
              .
            </button>
          </div>
);

export default NumericPad;
