import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

function App() {
  const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

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
        setStatus('success');
        form.reset();
      } else {
        const responseData = await response.json();
        if (Object.hasOwn(responseData, 'errors')) {
          setErrorMessage(responseData.errors.map(error => error.message).join(', '));
        } else {
          setErrorMessage('폼 전송 중 문제가 발생했습니다. 다시 시도해 주세요.');
        }
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      setStatus('error');
    }
  };

  return (
    <div className="container">
      <a href="/" className="back-link">
        <ArrowLeft size={16} /> 허브로 돌아가기
      </a>

      <div className="form-card">
        <div className="form-header">
          <h1>제휴 문의</h1>
          <p>비즈니스 파트너십, 입점 등 다양한 제안을 환영합니다.</p>
        </div>

        {status === 'success' && (
          <div className="alert alert-success">
            <CheckCircle className="shrink-0 mt-0.5" size={20} />
            <div>
              <strong>문의가 성공적으로 접수되었습니다.</strong>
              <p style={{ marginTop: '4px', opacity: 0.9 }}>빠른 시일 내에 남겨주신 연락처로 회신드리겠습니다.</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="alert alert-error">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <div>
              <strong>오류가 발생했습니다.</strong>
              <p style={{ marginTop: '4px', opacity: 0.9 }}>{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: status === 'success' ? 'none' : 'block' }}>
          <div className="form-group">
            <label htmlFor="name">이름 / 회사명 <span style={{ color: 'var(--error)' }}>*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              required
              placeholder="홍길동 / (주)프로덕트빌더"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">회신받을 이메일 <span style={{ color: 'var(--error)' }}>*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              required
              placeholder="example@domain.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">문의 유형</label>
            <select id="category" name="category" className="form-control">
              <option value="partnership">일반 제휴 문의</option>
              <option value="store">입점 문의</option>
              <option value="marketing">마케팅 제안</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">문의 내용 <span style={{ color: 'var(--error)' }}>*</span></label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              required
              placeholder="구체적인 제안 내용이나 문의 사항을 남겨주세요."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <><Loader2 className="spinner" size={20} /> 전송 중...</>
            ) : (
              <><Send size={20} /> 문의 보내기</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
