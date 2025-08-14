import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

const GradeCalculator: React.FC = () => {
  const [grade, setGrade] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const calculateGrade = () => {
    setError('');
    setResult('');

    const numericGrade = parseFloat(grade);
    
    if (isNaN(numericGrade)) {
      setError('Invalid input. Please enter a valid number.');
      return;
    }

    if (numericGrade < 0 || numericGrade > 100) {
      setError('Grade must be between 0 and 100.');
      return;
    }

    let letterGrade: string;
    let gradeDescription: string;
    let gradeColor: string;

    if (numericGrade >= 90) {
      letterGrade = 'A';
      gradeDescription = 'Excellent';
      gradeColor = 'text-green-600';
    } else if (numericGrade >= 80) {
      letterGrade = 'B';
      gradeDescription = 'Good';
      gradeColor = 'text-blue-600';
    } else if (numericGrade >= 70) {
      letterGrade = 'C';
      gradeDescription = 'Satisfactory';
      gradeColor = 'text-yellow-600';
    } else if (numericGrade >= 60) {
      letterGrade = 'D';
      gradeDescription = 'Needs Improvement';
      gradeColor = 'text-orange-600';
    } else {
      letterGrade = 'F';
      gradeDescription = 'Failing';
      gradeColor = 'text-red-600';
    }

    setResult(`${letterGrade} - ${gradeDescription}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateGrade();
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <GraduationCap className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Grade Calculator</h2>
      </div>
      
      <p className="text-gray-600 mb-8">
        Enter a numerical grade (0-100) to get the corresponding letter grade
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
            Numerical Grade
          </label>
          <input
            type="number"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            min="0"
            max="100"
            step="0.1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter grade (0-100)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Calculate Letter Grade
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
          <p className={`text-2xl font-bold ${result.includes('A') ? 'text-green-600' : 
                                            result.includes('B') ? 'text-blue-600' :
                                            result.includes('C') ? 'text-yellow-600' :
                                            result.includes('D') ? 'text-orange-600' : 'text-red-600'}`}>
            {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default GradeCalculator;