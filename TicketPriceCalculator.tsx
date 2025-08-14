import React, { useState } from 'react';
import { Ticket } from 'lucide-react';

const TicketPriceCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const calculateTicketPrice = () => {
    setError('');
    setResult('');

    const numericAge = parseInt(age);
    
    if (isNaN(numericAge)) {
      setError('Invalid input. Please enter a valid age.');
      return;
    }

    if (numericAge < 0) {
      setError('Age cannot be negative.');
      return;
    }

    const ticketPrice = (numericAge <= 12 || numericAge >= 65) ? 7.00 : 10.00;
    const category = numericAge <= 12 ? 'Child' : numericAge >= 65 ? 'Senior' : 'Adult';
    
    setResult(`GHC ${ticketPrice.toFixed(2)} (${category} Ticket)`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTicketPrice();
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Ticket className="w-8 h-8 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-800">Ticket Price Calculator</h2>
      </div>
      
      <p className="text-gray-600 mb-8">
        Enter your age to determine your ticket price
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-gray-800 mb-2">Pricing Structure:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Children (12 & under): GHC 7.00</p>
          <p>Adults (13-64): GHC 10.00</p>
          <p>Seniors (65+): GHC 7.00</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            Your Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="0"
            max="150"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your age"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Calculate Ticket Price
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Ticket Price:</h3>
          <p className="text-2xl font-bold text-green-600">{result}</p>
        </div>
      )}
    </div>
  );
};

export default TicketPriceCalculator;