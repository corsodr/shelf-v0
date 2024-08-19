'use client'
import React, { useState, useEffect } from 'react';

// type anything?
const RotatingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // update list  
  const words = ["anything", "knowledge", "inspiration"];

  // review this 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [words, 2000]);

  return (
    <span>{words[currentIndex]}</span>
  );
};

export default RotatingText;