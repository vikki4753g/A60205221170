import React, { useState, useEffect } from "react";

const backend_Url = "http://20.244.56.144/test"; // Replace this with the backend URL

const Calculator = () => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchNumbers = async (endpoint) => {
    try {
      console.log(`Fetching numbers from endpoint: ${endpoint}`);
      const response = await fetch(`${backend_Url}/${endpoint}`);
      if (!response.ok) {
        throw new Error("Data fetching failed");
      }
      const data = await response.json();
      console.log("Fetched data:", data);

      const { numbers } = data;
      setWindowPrevState(windowCurrState); // Move current state to previous state
      setWindowCurrState(numbers);
      setNumbers(numbers);
      setAverage(numbers.reduce((acc, num) => acc + num, 0) / numbers.length);
    } catch (error) {
      console.error("Data fetching failed", error);
    }
  };

  useEffect(() => {
    // Fetch data initially on component mount
    fetchNumbers("even");
  }, []);

  const handleButtonClick = (endpoint) => {
    console.log(`Button clicked for endpoint: ${endpoint}`);
    fetchNumbers(endpoint);
  };

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col">
          <h3>Window Previous State: {JSON.stringify(windowPrevState)}</h3>
        </div>
        <div className="col">
          <h3>Window Current State: {JSON.stringify(windowCurrState)}</h3>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <h4>Numbers: {JSON.stringify(numbers)}</h4>
        </div>
        <div className="col">
          <h4>Average: {average}</h4>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="btn btn-primary mr-2"
          onClick={() => handleButtonClick("primes")}
        >
          Fetch Primes
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={() => handleButtonClick("fibo")}
        >
          Fetch Fibonacci
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={() => handleButtonClick("even")}
        >
          Fetch Even Numbers
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleButtonClick("rand")}
        >
          Fetch Random Numbers
        </button>
      </div>
    </div>
  );
};

export default Calculator;
