import React, { useState } from 'react';
import { Triangle } from 'lucide-react';

const TriangleTypeIdentifier: React.FC = () => {
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const identifyTriangleType = () => {
    setError('');
    setResult('');

    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    // Validate inputs
    if (isNaN(a) || a <= 0) {
      setError('Invalid input for side A. Must be a positive number.');
      return;
    }
    if (isNaN(b) || b <= 0) {
      setError('Invalid input for side B. Must be a positive number.');
      return;
    }
    if (isNaN(c) || c <= 0) {
      setError('Invalid input for side C. Must be a positive number.');
      return;
    }

    // Check if it's a valid triangle
    if (a + b <= c || a + c <= b || b + c <= a) {
      setError('These sides do not form a valid triangle.');
      return;
    }

    // Determine triangle type
    let triangleType: string;
    let description: string;

    if (a === b && b === c) {
      triangleType = 'Equilateral';
      description = 'All three sides are equal';
    } else if (a === b || b === c || a === c) {
      triangleType = 'Isosceles';
      description = 'Two sides are equal';
    } else {
      triangleType = 'Scalene';
      description = 'All three sides are different';
    }

    setResult(`${triangleType} Triangle - ${description}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    identifyTriangleType();
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Triangle className="w-8 h-8 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-800">Triangle Type Identifier</h2>
      </div>
      
      <p className="text-gray-600 mb-8">
        Enter the lengths of the three sides to identify the triangle type
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-gray-800 mb-2">Triangle Types:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Equilateral:</strong> All sides equal</p>
          <p><strong>Isosceles:</strong> Two sides equal</p>
          <p><strong>Scalene:</strong> All sides different</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="sideA" className="block text-sm font-medium text-gray-700 mb-2">
              Side A
            </label>
            <input
              type="number"
              id="sideA"
              value={sideA}
              onChange={(e) => setSideA(e.target.value)}
              min="0.01"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter side A"
            />
          </div>
          
          <div>
            <label htmlFor="sideB" className="block text-sm font-medium text-gray-700 mb-2">
              Side B
            </label>
            <input
              type="number"
              id="sideB"
              value={sideB}
              onChange={(e) => setSideB(e.target.value)}
              min="0.01"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter side B"
            />
          </div>
          
          <div>
            <label htmlFor="sideC" className="block text-sm font-medium text-gray-700 mb-2">
              Side C
            </label>
            <input
              type="number"
              id="sideC"
              value={sideC}
              onChange={(e) => setSideC(e.target.value)}
              min="0.01"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter side C"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Identify Triangle Type
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Result:</h3>
          <p className="text-2xl font-bold text-purple-600">{result}</p>
        </div>
      )}
    </div>
  );
};

export default TriangleTypeIdentifier;