import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, Copy, Moon, RefreshCcw, ShieldAlert, Sparkles, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const ROUTES = {
  intro: '/tools/lotto-randomizer',
  tools: '/tools/',
  guide: '/blog/article-6',
  privacy: '/privacy',
  terms: '/terms',
  editorial: '/editorial-policy',
};

const MotionDiv = motion.div;

function App() {
  const [isDark, setIsDark] = useState(false);
  const [lottoSets, setLottoSets] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
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
    const end = Date.now() + 2200;

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 50,
        origin: { x: 0 },
        colors: ['#117a7b', '#ef7b45', '#2a9d8f'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 50,
        origin: { x: 1 },
        colors: ['#117a7b', '#ef7b45', '#2a9d8f'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const generateLottoNumbers = () => {
    const sets = [];
    for (let setIndex = 0; setIndex < 5; setIndex += 1) {
      const numbers = [];
      while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) numbers.push(num);
      }
      sets.push(numbers.sort((a, b) => a - b));
    }
    return sets;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setLottoSets([]);
    setCopiedIndex(null);

    setTimeout(() => {
      setLottoSets(generateLottoNumbers());
      setIsGenerating(false);
      setTimeout(triggerConfetti, 850);
    }, 300);
  };

  const handleCopy = (numbers, index) => {
    navigator.clipboard.writeText(numbers.join(', '));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const getBallBackground = (num) => {
    if (num <= 10) return 'var(--ball-bg-1)';
    if (num <= 20) return 'var(--ball-bg-2)';
    if (num <= 30) return 'var(--ball-bg-3)';
    if (num <= 40) return 'var(--ball-bg-4)';
    return 'var(--ball-bg-5)';
  };

  return (
    <div className="app-shell">
      <button
        className="theme-toggle glass-card"
        onClick={() => setIsDark(!isDark)}
        aria-label="테마 전환"
      >
        {isDark ? <Sun size={24} color="#fbbf24" /> : <Moon size={24} color="#117a7b" />}
      </button>

      <header className="glass-card hero-card">
        <div className="hero-top-links">
          <a href={ROUTES.intro} className="top-link">
            <ArrowLeft size={16} />
            도구 소개 페이지로
          </a>
          <a href={ROUTES.tools} className="top-link">
            전체 도구 보기
          </a>
        </div>

        <div className="pill-row">
          <span className="pill">Entertainment tool</span>
          <span className="pill">Browser-side randomizer</span>
        </div>

        <h1 className="hero-title">
          Lotto Dreamer
          <span className="hero-title__tag"> V2</span>
        </h1>
        <p className="hero-subtitle">
          서버에 번호를 저장하지 않고 브라우저 안에서 무작위 조합을 생성해 보는 오락용 번호 샘플러입니다.
        </p>

        <div className="note-box note-box--warning">
          <ShieldAlert size={18} />
          <div>
            <strong>중요 안내</strong>
            <p>
              이 도구는 당첨 확률을 높이거나 결과를 예측하지 않습니다. 무작위 숫자 조합을 생성해 보는
              엔터테인먼트 기능이며, 실제 구매나 경제적 판단에 대한 보장을 제공하지 않습니다.
            </p>
          </div>
        </div>

        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={handleGenerate}
            disabled={isGenerating}
            type="button"
          >
            {isGenerating ? <RefreshCcw className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {lottoSets.length ? '새 조합 다시 만들기' : '무작위 조합 만들기'}
          </button>
        </div>
      </header>

      <main className="glass-card generator-card">
        <div className="content-heading">
          <div>
            <h2>생성된 번호</h2>
            <p>한 번에 5세트를 생성합니다. 각 세트는 중복 없는 6개 숫자로 구성됩니다.</p>
          </div>
          <div className="mini-note">입력 데이터 없이 브라우저 내부에서 계산</div>
        </div>

        <div className="sets-column">
          <AnimatePresence mode="wait">
            {lottoSets.map((set, setIndex) => (
              <MotionDiv
                key={setIndex}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ delay: setIndex * 0.12, duration: 0.32, ease: 'easeOut' }}
                className="set-card"
              >
                <div className="set-card__header">
                  <strong>SET {setIndex + 1}</strong>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(set, setIndex)}
                    type="button"
                  >
                    {copiedIndex === setIndex ? <Check size={14} /> : <Copy size={14} />}
                    {copiedIndex === setIndex ? '복사됨' : '복사'}
                  </button>
                </div>
                <div className="number-row">
                  {set.map((num, numberIndex) => (
                    <MotionDiv
                      key={numberIndex}
                      className="ball"
                      initial={{ scale: 0, rotate: -160 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 18,
                        delay: setIndex * 0.12 + numberIndex * 0.06,
                      }}
                      style={{ background: getBallBackground(num) }}
                    >
                      {num}
                    </MotionDiv>
                  ))}
                </div>
              </MotionDiv>
            ))}
          </AnimatePresence>

          {!lottoSets.length && (
            <div className="empty-state">
              <p>아직 생성된 조합이 없습니다. 위 버튼을 눌러 샘플 조합을 만들어 보세요.</p>
            </div>
          )}
        </div>
      </main>

      <section className="glass-card helper-card">
        <h2>이 페이지에서 먼저 확인해 두면 좋은 점</h2>
        <div className="helper-grid">
          <article>
            <h3>어떻게 동작하나요?</h3>
            <p>
              버튼을 누르면 브라우저 내부의 JavaScript 난수 함수를 이용해 1부터 45까지의 숫자 중 중복 없는
              조합을 만듭니다. 각 세트는 보기 쉽게 오름차순으로 정렬해 보여 줍니다.
            </p>
          </article>
          <article>
            <h3>무엇을 보장하지 않나요?</h3>
            <p>
              과거 당첨 번호 분석, 예측 모델, 확률 향상 로직은 제공하지 않습니다. 이 도구는 어디까지나 무작위
              조합을 시각적으로 생성해 보는 체험형 페이지입니다.
            </p>
          </article>
          <article>
            <h3>관련 문서</h3>
            <p>
              기능 범위와 한계를 더 자세히 알고 싶다면
              {' '}
              <a href={ROUTES.intro}>도구 소개 페이지</a>
              와
              {' '}
              <a href={ROUTES.guide}>관련 가이드</a>
              를 함께 읽어 보세요.
            </p>
          </article>
        </div>
      </section>

      <footer className="lotto-footer">
        <a href={ROUTES.privacy}>개인정보처리방침</a>
        <a href={ROUTES.terms}>이용약관</a>
        <a href={ROUTES.editorial}>편집 기준</a>
      </footer>
    </div>
  );
}

export default App;
