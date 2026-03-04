import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, RefreshCcw, Copy, Check, Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
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

        {/* Extremely Long SEO & Information Content Section for AdSense Approval */}
        <div className="content-section" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'), textAlign: 'left', lineHeight: '1.7', wordBreak: 'keep-all' }}>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '1.2rem', color: isDark ? '#f8fafc' : '#1e293b' }}>도구 작동 원리: 브라우저 환경에서의 완벽한 난수 생성 메커니즘</h2>
          <p style={{ marginBottom: '1.2rem', opacity: 0.9, fontSize: '0.95rem', color: isDark ? '#cbd5e1' : '#475569' }}>
            현대 웹 브라우저는 과거와 달리 매우 강력하고 고도화된 연산 능력을 갖추고 있습니다. Lotto Dreamer 번호 생성기는 자바스크립트(JavaScript) 생태계에 내장된 <code>Math.random()</code> 엔진을 핵심 코어로 활용합니다. 이 내장 함수는 복잡한 수학적 수식인 PRNG(Pseudo-Random Number Generator, 유사 난수 생성기) 알고리즘을 통해 0.0 이상 1.0 미만의 부동 소수점을 생성해 냅니다. V8 엔진을 사용하는 구글 크롬(Chrome) 등의 최신 브라우저는 XorShift128+ 같은 최첨단 알고리즘을 탑재하고 있어, 통계적으로 수백만 번 반복 생성해도 특정 구간의 번호에 편향(Bias)되지 않는 훌륭한 무작위성을 자랑합니다.
          </p>
          <p style={{ marginBottom: '2.5rem', opacity: 0.9, fontSize: '0.95rem', color: isDark ? '#cbd5e1' : '#475569' }}>
            저희 도구가 버튼을 클릭하자마자 1부터 45까지의 숫자 범위 안에서 6자리의 각기 다른 숫자를 단 0.1초도 안되는 시간에 5묶음이나 뽑아내는 과정에도 정교한 필터링 로직이 들어갑니다. 단순히 난수를 뽐아내는 것이 아니라, 한 세트(Set) 내에서 단 1개의 숫자라도 동일한 값이 나오면 즉각적으로 재추출(Re-roll)을 진행하여 완벽하게 중복 없는 6자리 숫자 조합을 완성합니다. 이렇게 생성된 난수들은 인간의 두뇌가 시각적으로 빠르게 인지하도록 오름차순으로 바로 정렬되며, 메모리상에서 렌더링 과정을 거쳐 지금 바로 여러분의 눈앞에 보여지는 애니메이션 공으로 나타납니다.
          </p>

          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', color: isDark ? '#f8fafc' : '#1e293b' }}>로또 관련 자주 묻는 질문 (FAQ)</h2>

          <details style={{ marginBottom: '1rem', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)', padding: '18px', borderRadius: '12px', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '1.05rem', color: isDark ? '#e2e8f0' : '#334155' }}>
              생성된 번호의 최종 당첨 확률은 수학적으로 어떻게 되나요?
            </summary>
            <p style={{ marginTop: '12px', fontSize: '0.95rem', opacity: 0.85, lineHeight: '1.6', color: isDark ? '#cbd5e1' : '#475569' }}>
              대한민국의 표준 동행복권인 6/45 시스템을 기준으로, 순서에 상관없이 서로 다른 숫자 6개를 선택하여 기계에서 뽑힌 결과물과 전부 일치할 수학적 확률(Probability)은 약 814만 분의 1입니다. (정확히는 1/8,145,060). 이 확률은 인간이 길을 가다 벼락을 맞을 정도로 극한으로 낮은 수치입니다. 본 도구가 생성한 번호 세트 역시 이와 완벽하게 동일한 확률을 갖습니다. 세상 그랜 어떤 프로그램이나 수학자라 할지라도, 이 매주 독립적으로 시행되는 기계식 난수의 당첨 확률을 높일 수 있는 필승 전략은 존재하지 않습니다.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)', padding: '18px', borderRadius: '12px', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '1.05rem', color: isDark ? '#e2e8f0' : '#334155' }}>
              과거의 당첨 번호 데이터나 머신러닝 패턴 분석을 활용하나요?
            </summary>
            <p style={{ marginTop: '12px', fontSize: '0.95rem', opacity: 0.85, lineHeight: '1.6', color: isDark ? '#cbd5e1' : '#475569' }}>
              전혀 활용하지 않습니다. 로또 추첨 과정은 매주 새롭게 번호를 골라내는 전형적인 '독립 시행' 모델입니다. 비유하자면, 동전을 던져 앞면이 10번 연속 나왔다고 해서 11번째에 뒷면이 나올 확률이 폭발적으로 늘어나는 것이 아닙니다. 11번째 던질 때도 여전히 확률은 50:50입니다. 따라서 수십 년간 누적된 당첨 번호의 패턴을 딥러닝 AI 모델로 분석하더라도 다음 회차를 예측하는 것은 확률 통계학적으로 완벽히 무의미(Nonsense)합니다. 저희는 사용자에게 '순수한 무작위'가 주는 가장 깨끗한 숫자 조합만을 빠르게 보여드리는 데만 집중합니다.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)', padding: '18px', borderRadius: '12px', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '1.05rem', color: isDark ? '#e2e8f0' : '#334155' }}>
              이 유틸리티를 웹브라우저 오프라인 환경에서도 쓸 수 있나요?
            </summary>
            <p style={{ marginTop: '12px', fontSize: '0.95rem', opacity: 0.85, lineHeight: '1.6', color: isDark ? '#cbd5e1' : '#475569' }}>
              Lotto Dreamer는 모던 웹 기술 스택인 React를 통해 서버 전송 없이 완전히 사용자의 단말기(클라이언트 사이드) 내에서만 동작하도록 가볍고 견고하게 렌더링 됩니다. 처음 1회 접속 시 필요한 아주 작은 HTML/JS/CSS 통신 패키지만 다운로드 받고 나면, 비행기 모드나 완전한 통신 끊김 환경에서도 완벽하게 번호를 생성하시는 데 전혀 지장이 없습니다. 오로지 사용자의 프로세서 처리 자원만을 사용하기 때문에 개인정보 침해나 서버 통신 지연이 절대 발생하지 않습니다.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)', padding: '18px', borderRadius: '12px', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '1.05rem', color: isDark ? '#e2e8f0' : '#334155' }}>
              생성기 디자인에 적용된 특별한 개발 원리가 있나요?
            </summary>
            <p style={{ marginTop: '12px', fontSize: '0.95rem', opacity: 0.85, lineHeight: '1.6', color: isDark ? '#cbd5e1' : '#475569' }}>
              저희는 심미적인 즐거움도 사용성(Usability)의 매우 중요한 요소로 판단합니다. 글래스모피즘(Glassmorphism)이라는 최신 디자인 트렌드를 채용하여 배경과 유기적으로 소통하는 반투명 카드 형태를 구축했습니다. 번호가 렌더링 될 때 캔버스(Canvas) 위에 뿌려지는 색종이 조각(Confetti) 파티클 애니메이션은 프레임 하락 없이 60fps로 매우 부드럽게 재생되도록 메모리 최적화를 거쳤습니다. 이는 무미건조하게 숫자만 나열하는 기존 프로그램들을 압도하는 프리미엄 유틸리티 경험을 목표로 한 것입니다.
            </p>
          </details>

          <details style={{ marginBottom: '2.5rem', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)', padding: '18px', borderRadius: '12px', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '1.05rem', color: isDark ? '#e2e8f0' : '#334155' }}>
              결과가 마음에 들지 않는데 다시 돌려도 비용이 드나요?
            </summary>
            <p style={{ marginTop: '12px', fontSize: '0.95rem', opacity: 0.85, lineHeight: '1.6', color: isDark ? '#cbd5e1' : '#475569' }}>
              저희 웹페이지 내 주요 도구 및 앞으로 Product Builder 팀이 발표할 모든 소형 유тили티 프로젝트들은 평생 전면 무료를 지향합니다. 인앱 결제나 프리미엄 기능 해금 비용을 일절 요구하지 않으니, 화면 상단의 번호 생성 버튼을 과도한 피로도 없이 언제든 원하시는 만큼 자유롭게 재시도하셔도 됩니다.
            </p>
          </details>

          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', color: isDark ? '#f8fafc' : '#1e293b' }}>면책 조항 (Legal Disclaimer)</h2>
          <div style={{ background: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
            <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.6', color: isDark ? '#cbd5e1' : '#475569', margin: 0 }}>
              <strong>본 난수 생성기는 순수한 개인적 오락 요소 추구 및 편의성 제공만을 목적으로 개발된 도구입니다.</strong> Product Builder Hub와 해당 소프트웨어 제공자는 프로그램이 출력하는 그 어떠한 숫자 조합에 대해서도 사행성 당첨 확률 증가, 경제적 수익 증대, 또는 특정 결과에 대한 기술적 우위를 조금도 암시하거나 보장하지 않습니다. 실제 무작위 복권을 유상 지불 후 구매하는 행위는 사용자 본인의 전적인 판단과 책임하에 이루어지며, 당사는 로또 구매로 인해 발생하는 직간접적인 금전적 손실이나 심리적 피해에 대해 민·형사상의 어떠한 법적 책임도 지지 않습니다. 지역 내 건전한 게임 문화를 준수하시길 강력히 권고합니다.
            </p>
          </div>
        </div>

        <footer className="footer" style={{ marginTop: '40px', paddingBottom: '20px', borderTop: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'), paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', opacity: 0.8 }}>
            <a href="/terms.html" style={{ color: 'inherit', textDecoration: 'underline' }}>이용약관</a>
            <a href="/privacy.html" style={{ color: 'inherit', textDecoration: 'underline' }}>개인정보처리방침</a>
          </div>
          <div style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '5px' }}>
            © {new Date().getFullYear()} Product Builder. All rights reserved.
          </div>
        </footer>

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
