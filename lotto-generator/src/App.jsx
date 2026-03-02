import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, RefreshCcw, Copy, Check, Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { LegalModals } from './components/LegalModals';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [lottoSets, setLottoSets] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Contact Form State
  const [formStatus, setFormStatus] = useState(null); // 'submitting', 'success', 'error'
  const [formError, setFormError] = useState('');

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mojnowrk', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: data
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        const responseData = await response.json();
        if (Object.hasOwn(responseData, 'errors')) {
          setFormError(responseData.errors.map(err => err.message).join(', '));
        } else {
          setFormError('전송 중 문제가 발생했습니다.');
        }
        setFormStatus('error');
      }
    } catch (error) {
      setFormError('네트워크 오류가 발생했습니다.');
      setFormStatus('error');
    }
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

        {/* Contact Form Section */}
        <div className="contact-form-section">
          <h2>제휴 및 통합 문의</h2>
          <p>비즈니스 파트너십, 입점 등 다양한 제안을 환영합니다.</p>

          {formStatus === 'success' && (
            <div className="alert alert-success">
              <CheckCircle size={18} /> 성공적으로 메시지가 전송되었습니다.
            </div>
          )}

          {formStatus === 'error' && (
            <div className="alert alert-error">
              <AlertCircle size={18} /> {formError}
            </div>
          )}

          <form onSubmit={handleFormSubmit} style={{ display: formStatus === 'success' ? 'none' : 'block' }}>
            <div className="form-group">
              <label htmlFor="name">이름 / 회사명</label>
              <input type="text" id="name" name="name" className="form-control" required placeholder="(주)프로덕트빌더" />
            </div>
            <div className="form-group">
              <label htmlFor="email">회신받을 이메일</label>
              <input type="email" id="email" name="email" className="form-control" required placeholder="contact@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="message">문의 내용</label>
              <textarea id="message" name="message" className="form-control" required placeholder="제안하실 내용을 간단히 작성해주세요."></textarea>
            </div>
            <button type="submit" className="btn-submit" disabled={formStatus === 'submitting'}>
              {formStatus === 'submitting' ? (
                <><Loader2 className="animate-spin" size={18} /> 전송 중...</>
              ) : (
                <><Send size={18} /> 문의 보내기</>
              )}
            </button>
          </form>
        </div>

        {/* SEO & Information Content Section */}
        <div className="content-section" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'), textAlign: 'left', lineHeight: '1.6' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Lotto Dreamer 로또 번호 생성기란?</h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.9, fontSize: '0.95rem' }}>
            Lotto Dreamer는 직관적인 글래스모피즘(Glassmorphism) 기반의 아름다운 UI를 자랑하는 <strong>무료 로또 번호 생성 도구</strong>입니다.
            기존의 복잡하고 불편한 난수 생성기들과 달리, 단 번의 클릭만으로 가장 이상적인 5게임(총 30개의 번호) 세트를 빠르고 화려하게 추출합니다.
            수학적 무작위 알고리즘을 사용하여 중복 없는 번호 6자리를 공정하게 조합하며, 생성된 번호를 손쉽게 복사하여 보관하거나 공유할 수 있습니다.
            이번 V2 업데이트를 통해 더욱 화려한 폭죽 애니메이션과 다크 모드를 완벽하게 지원하여, 단순히 번호를 뽑는 행위 이상의 훌륭한 사용자 경험(UX)을 선사합니다.
          </p>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', marginTop: '2rem' }}>자주 묻는 질문 (FAQ)</h3>
          <details style={{ marginBottom: '1rem', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)', padding: '15px', borderRadius: '12px' }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer' }}>1. 사용하는데 비용이 발생하나요?</summary>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.85 }}>아니요, Lotto Dreamer는 모든 기능(애니메이션, 다크 테마, 클립보드 복사 등)을 100% 무료로 제한 없이 사용할 수 있는 오픈형 웹 도구입니다. 가입이나 로그인 절차도 필요하지 않습니다.</p>
          </details>

          <details style={{ marginBottom: '1rem', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)', padding: '15px', borderRadius: '12px' }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer' }}>2. 번호는 어떤 방식으로 생성되나요?</summary>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.85 }}>JavaScript의 기본 <code>Math.random()</code> 엔진을 베이스로 활용하여 1부터 45까지의 숫자 중 무작위 값 난수를 추출합니다. 한 세트에 동일한 숫자가 중복해서 나오지 않도록 별도의 로직 검증을 거친 후, 보기 편하도록 오름차순으로 바로 정렬하여 제공합니다.</p>
          </details>

          <details style={{ marginBottom: '1rem', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)', padding: '15px', borderRadius: '12px' }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer' }}>3. 생성된 번호를 사용하면 당첨 확률이 높아지나요?</summary>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.85 }}>이 도구는 단순한 난수 생성 서비스이므로 실제 로또 당첨 확률을 수학적으로 높여주지는 못합니다. 번호를 수동으로 고르기 어려울 때, 공정하고 무작위적인 숫자를 편리하게 얻기 위한 재미 용도로만 사용해 주시기 바랍니다.</p>
          </details>
        </div>

        <LegalModals isDark={isDark} />

      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .content-section details > summary {
          list-style: none; /* remove default triangle for some browsers */
        }
        .content-section details > summary::-webkit-details-marker {
          display: none; /* remove default triangle for Webkit */
        }
        .content-section details > summary::before {
          content: '▶';
          display: inline-block;
          margin-right: 8px;
          font-size: 0.8rem;
          transition: transform 0.2s;
        }
        .content-section details[open] > summary::before {
          transform: rotate(90deg);
        }
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
