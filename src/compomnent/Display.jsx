import {Database } from 'lucide-react';

const Display = ({ equation, display, memory }) => (
  <div className="mb-4">
    <div className="flex justify-between text-gray-500 text-sm h-6">
      <span>{memory !== null && <Database className="inline h-4 w-4" />}</span>
      <span className="overflow-hidden">{equation}</span>
    </div>
    <div className="text-4xl font-bold text-right overflow-hidden">
      {display}
    </div>
  </div>
);

export default Display;
