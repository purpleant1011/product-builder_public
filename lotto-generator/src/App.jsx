import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, RefreshCcw, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [lottoSets, setLottoSets] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const triggerConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#a855f7', '#fbbf24']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#a855f7', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

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
    setLottoSets([]); // Clear current to trigger stagger animation again
    setCopiedIndex(null);

    setTimeout(() => {
      setLottoSets(generateLottoNumbers());
      setIsGenerating(false);
      // Wait for all animations to almost finish before popping confetti
      setTimeout(triggerConfetti, 1200);
    }, 400);
  };

  const handleCopy = (numbers, index) => {
    navigator.clipboard.writeText(numbers.join(', '));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getBallBg = (num) => {
    if (num <= 10) return 'var(--ball-bg-1)';
    if (num <= 20) return 'var(--ball-bg-2)';
    if (num <= 30) return 'var(--ball-bg-3)';
    if (num <= 40) return 'var(--ball-bg-4)';
    return 'var(--ball-bg-5)';
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '650px', width: '100%' }}>
      <button
        className="theme-toggle glass-card"
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle Theme"
      >
        {isDark ? <Sun size={24} color="#fbbf24" /> : <Moon size={24} color="#6366f1" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card"
        style={{ padding: '3rem 2rem', textAlign: 'center' }}
      >
        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Lotto Dreamer <span style={{ fontSize: '1rem', verticalAlign: 'top', color: '#f59e0b' }}>V2</span>
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.05rem' }}>당신의 완벽한 행운을 스케치합니다.</p>
        </header>

        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto 3rem' }}
        >
          {isGenerating ? <RefreshCcw className="animate-spin" size={22} /> : <Sparkles size={22} />}
          {lottoSets.length > 0 ? '새로운 행운 스케치' : '행운 번호 뽑기'}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <AnimatePresence mode="wait">
            {lottoSets.map((set, setIndex) => (
              <motion.div
                key={setIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{
                  delay: setIndex * 0.15,
                  duration: 0.4,
                  ease: "easeOut"
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.2rem 1.5rem',
                  borderRadius: '20px',
                  background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
                  border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)'),
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', opacity: 0.6 }}>SET {setIndex + 1}</div>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(set, setIndex)}
                      aria-label="Copy numbers"
                    >
                      {copiedIndex === setIndex ? <Check size={14} /> : <Copy size={14} />}
                      {copiedIndex === setIndex ? '복사됨' : '복사'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {set.map((num, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                          delay: (setIndex * 0.15) + (i * 0.08)
                        }}
                        className="ball"
                        style={{ background: getBallBg(num) }}
                      >
                        {num}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
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
