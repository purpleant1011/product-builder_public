import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [lottoSets, setLottoSets] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const generateLottoNumbers = () => {
    const sets = [];
    for (let i = 0; i < 5; i++) {
      const numbers = [];
      while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) {
          numbers.push(num);
        }
      }
      sets.push(numbers.sort((a, b) => a - b));
    }
    return sets;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate some loading for a "premium" feel
    setTimeout(() => {
      setLottoSets(generateLottoNumbers());
      setIsGenerating(false);
    }, 600);
  };

  const getBallColor = (num) => {
    if (num <= 10) return 'var(--ball-color-1)';
    if (num <= 20) return 'var(--ball-color-2)';
    if (num <= 30) return 'var(--ball-color-3)';
    if (num <= 40) return 'var(--ball-color-4)';
    return 'var(--ball-color-5)';
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '600px', width: '100%' }}>
      <button 
        className="theme-toggle glass-card"
        onClick={() => setIsDark(!isDark)}
      >
        {isDark ? <Sun size={24} color="#fbbf24" /> : <Moon size={24} color="#6366f1" />}
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ padding: '2.5rem', textAlign: 'center' }}
      >
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Lotto Dreamer
          </h1>
          <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>행운의 여신은 당신과 함께합니다.</p>
        </header>

        <button 
          className="btn-primary" 
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto 2rem' }}
        >
          {isGenerating ? <RefreshCcw className="animate-spin" size={20} /> : <Sparkles size={20} />}
          {lottoSets.length > 0 ? '다시 생성하기' : '행운 번호 뽑기'}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence mode="popLayout">
            {lottoSets.map((set, setIndex) => (
              <motion.div
                key={setIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: setIndex * 0.1 }}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  borderRadius: '16px',
                  background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.8rem', opacity: 0.5, marginRight: '1rem' }}>#{setIndex + 1}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {set.map((num, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: setIndex * 0.1 + i * 0.05 }}
                      className="ball"
                      style={{ backgroundColor: getBallColor(num) }}
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}

export default App;
