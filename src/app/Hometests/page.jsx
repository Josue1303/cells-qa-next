// pages/tests.jsx

"use client";

import React from 'react';
import TestItem from '@/components/TestItem';
import TestComponent from '@/components/TestComponent';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DownloadButton from '@/components/DownloadComponent';
import Sidebar from '@/components/Sidebar';

const Tests = () => {
  const [testItems, setTestItems] = useState([]);

  useEffect(() => {
    const fetchTestMetrics = async () => {
      try {
        const directoryId = 46; 
        const response = await axios.get(`/api/tests/test-metrics/${directoryId}`); 
        setTestItems(response.data);
        console.log("Test metrics fetched:", response.data)
      } catch (error) {
        console.error("Error fetching test metrics:", error);
      }
    };

    fetchTestMetrics();
  }, []);

  if (testItems.length === 0) {
    
    return <div> 
      <Sidebar page="Test"></Sidebar> 
      <h1 className='ml-40 pt-10'> Loading... </h1>
    </div>;
  }


  return (
    
    <div className="p-6 bg-gray-100 flex justify-center">
      <Sidebar page="Test"></Sidebar>
      <div className="flex flex-col md:flex-row md:space-x-4 max-w-6xl w-full">
        <div className="flex-1 space-y-4">
          {testItems.map((item, index) => (
            <TestItem
              key={index}
              testId={item.testId}
              title={item.title}
              testCount={item.testCount}
              passPercentage={item.passPercentage}
            />
          ))}
          <DownloadButton directoryId={46} /> 
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
