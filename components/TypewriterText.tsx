
import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 15, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      timerRef.current = window.setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
    } else if (onComplete) {
      onComplete();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, text, speed, onComplete]);

  return (
    <div className="serif text-lg md:text-xl leading-relaxed whitespace-pre-wrap typewriter-cursor">
      {displayedText}
    </div>
  );
};

export default TypewriterText;
