import React, { useState } from 'react';
import { X, FileText, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModals({ isDark }) {
    const [activeModal, setActiveModal] = useState(null); // 'terms' or 'privacy'

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    const overlayStyle = {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
    };

    const modalStyle = {
        background: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        color: isDark ? '#f8fafc' : '#1e293b'
    };

    const closeBtnStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'none',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        opacity: 0.6,
        transition: 'opacity 0.2s'
    };

    const footerStyle = {
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        opacity: 0.8,
        fontSize: '0.9rem'
    };

    const linkStyle = {
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'color 0.2s'
    };

    const TermsContent = () => (
        <>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText /> 이용약관</h2>
            <div style={{ lineHeight: 1.6, fontSize: '0.95rem', opacity: 0.9 }}>
                <p><strong>제1조 (목적)</strong><br />본 약관은 Lotto Dreamer(이하 "서비스")가 제공하는 로또 번호 생성 도구 및 관련 제반 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                <br />
                <p><strong>제2조 (서비스의 내용)</strong><br />본 서비스는 사용자가 임의의 숫자를 추출하여 조합할 수 있도록 돕는 단순 난수 생성 도구입니다. 생성된 번호의 당첨 확률은 수학적 난수에 기반하며, 당첨을 보장하지 않습니다.</p>
                <br />
                <p><strong>제3조 (책임 제한)</strong><br />1. 본 서비스에서 생성된 번호를 사용하여 발생한 금전적 손실이나 기타 결과에 대해 서비스 제공자는 일체의 책임을 지지 않습니다.<br />2. 복권 구매는 전적으로 사용자의 자유 의지에 따른 책임 하에 유희 목적으로만 이루어져야 합니다.</p>
                <br />
                <p><strong>제4조 (지식재산권)</strong><br />서비스 내의 모든 콘텐츠, 로고, 디자인 요소 등에 대한 지식재산권은 서비스 제공자에게 있습니다.</p>
            </div>
        </>
    );

    const PrivacyContent = () => (
        <>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Shield /> 개인정보처리방침</h2>
            <div style={{ lineHeight: 1.6, fontSize: '0.95rem', opacity: 0.9 }}>
                <p><strong>1. 기본 원칙</strong><br />Lotto Dreamer는 사용자의 개인정보를 중요시하며, 서비스를 이용함에 있어 어떠한 개인식별정보(이름, 연락처, 주민등록번호 등)도 기본적으로 수집하거나 저장하지 않습니다.</p>
                <br />
                <p><strong>2. 제휴 문의 시 수집하는 정보</strong><br />사용자가 자발적으로 '제휴 및 통합 문의' 폼을 작성하여 제출할 경우에 한하여, 원활한 의사소통을 위해 다음과 같은 정보를 수집합니다.<br />- 수집 항목: 이름/회사명, 이메일 주소, 문의 내용<br />- 정보의 보관: 해당 정보는 Formspree 서비스를 통해 이메일로 전달되며, 별도의 데이터베이스에 영구 저장되지 않고 문의 처리가 완료된 후 파기됩니다.</p>
                <br />
                <p><strong>3. 쿠키(Cookie) 및 웹 스토리지 제한적 사용</strong><br />서비스는 사용자의 편의(다크모드 설정 유지, 최근 보았던 번호 임시 저장 등)를 위해 기기 내 로컬 스토리지(Local Storage) 기능을 사용할 수 있으나, 이는 서버로 전송되지 않으며 언제든 브라우저 설정에서 삭제하실 수 있습니다.</p>
                <br />
                <p><strong>4. 광고 게재</strong><br />본 사이트는 Google AdSense 등 제3자 광고 파트너의 광고를 게재할 수 있습니다. 제3자 공급업체는 사용자의 이전 웹사이트 방문 기록 및 기타 웹사이트 방문 기록에 기반하여 맞춤 광고를 게재하기 위해 쿠키를 사용할 수 있습니다. 사용자는 Google 광고 설정에서 맞춤 광고를 선택 해제할 수 있습니다.</p>
            </div>
        </>
    );

    return (
        <>
            <footer style={footerStyle}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <button style={{ ...linkStyle, background: 'none', border: 'none', padding: 0 }} onClick={() => openModal('terms')} className="hover:text-indigo-400">
                        <FileText size={16} /> 이용약관
                    </button>
                    <button style={{ ...linkStyle, background: 'none', border: 'none', padding: 0 }} onClick={() => openModal('privacy')} className="hover:text-indigo-400">
                        <Shield size={16} /> 개인정보처리방침
                    </button>
                </div>
                <div style={{ opacity: 0.6, fontSize: '0.85rem', textAlign: 'center' }}>
                    © {new Date().getFullYear()} Lotto Dreamer. All rights reserved.<br />
                    본 서비스는 오락용 난수 생성 도구이며 당첨을 보장하지 않습니다.
                </div>
            </footer>

            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={overlayStyle}
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            style={modalStyle}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button style={closeBtnStyle} onClick={closeModal} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.6}>
                                <X size={24} />
                            </button>
                            {activeModal === 'terms' ? <TermsContent /> : <PrivacyContent />}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
