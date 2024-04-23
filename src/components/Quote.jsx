import React, { useState, useEffect } from 'react';
import './Quote.css';

/**
 * Renders a random quote fetched from an API.
 */
const Quote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
    } catch (error) {
      console.log('Error fetching quote:', error);
    }
  };

  return (
    <div className="quote">
      <p>{quote}</p>
    </div>
  );
};

export default Quote;