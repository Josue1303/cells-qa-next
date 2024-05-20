// pages/tests.js

import React from 'react';
import TestItem from '@/components/TestItem';

const Tests = () => {
  const testItems = [
    {
      title: 'Test Index.html',
      testCount: 8,
      passPercentage: 24,
    },
    {
      title: 'Test Content.js',
      testCount: 5,
      passPercentage: 80,
    },
    {
      title: 'Test home.html',
      testCount: 8,
      passPercentage: 50,
    },
    {
      title: 'Test home.html',
      testCount: 8,
      passPercentage: 50,
    },
    {
      title: 'Test Content.js',
      testCount: 5,
      passPercentage: 80,
    },
  ];

  return (
    <div className="p-6 bg-gray-100">
      {testItems.map((item, index) => (
        <TestItem
          key={index}
          title={item.title}
          testCount={item.testCount}
          passPercentage={item.passPercentage}
        />
      ))}
    </div>
  );
};

export default Tests;
