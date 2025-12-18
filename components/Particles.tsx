
import React, { useMemo } from 'react';
import { ParticleData } from '../types';

const Particles: React.FC = () => {
  const particles = useMemo(() => {
    const arr: ParticleData[] = [];
    for (let i = 0; i < 40; i++) {
      arr.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * -20,
      });
    }
    return arr;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            bottom: `-20px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
