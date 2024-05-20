// pages/tests.jsx

import React from 'react';
import TestItem from '@/components/TestItem';
import TestComponent from '@/components/TestComponent';

const Tests = () => {
  const testItems = [
    {
      title: 'Test Index.html',
      testCount: 8,
      passPercentage: 90,
      passedTests: ['No.1', 'No.2', 'No.3'],
      rejectedTests: ['No.4', 'No.6'],
      notExecutedTests: ['No.5'],
    },
    {
      title: 'Test Content.js',
      testCount: 5,
      passPercentage: 80,
      passedTests: ['No.1', 'No.2', 'No.3', 'No.4'],
      rejectedTests: ['No.5'],
      notExecutedTests: [],
    },
    {
      title: 'Tuputamadre.js',
      testCount: 5,
      passPercentage: 40,
      passedTests: ['Chupala puto', 'No.2', 'No.3', 'No.4'],
      rejectedTests: ['No.5'],
      notExecutedTests: [],
    },
    {
      title: 'Envergados.js',
      testCount: 7,
      passPercentage: 70,
      passedTests: ['Chupala puto', 'No.2', 'No.3', 'No.4'],
      rejectedTests: ['No.5'],
      notExecutedTests: [],
    },
    {
      title: 'mierdas.js',
      testCount: 13,
      passPercentage: 20,
      passedTests: ['Chupala puto', 'No.2', 'No.3', 'No.4'],
      rejectedTests: ['No.5'],
      notExecutedTests: [],
    },
   
  ];

  return (
    <div className="p-6 bg-gray-100 flex justify-center">
      <div className="flex flex-col md:flex-row md:space-x-4 max-w-6xl w-full">
        <div className="flex-1 space-y-4">
          {testItems.map((item, index) => (
            <TestItem
              key={index}
              title={item.title}
              testCount={item.testCount}
              passPercentage={item.passPercentage}
            />
          ))}
        </div>

        {/*componente de la drecha con progress bar pinches putos de cagada */}
        <div className="mt-4 md:mt-0 md:ml-2 lg:ml-4 flex justify-center md:justify-start">
          <TestComponent
            name={testItems[0].title}
            percentage={testItems[0].passPercentage}
            passedTests={testItems[0].passedTests}
            rejectedTests={testItems[0].rejectedTests}
            notExecutedTests={testItems[0].notExecutedTests}
          />
        </div>
      </div>
    </div>
  );
};

export default Tests;
