// Custom Translation Widget for Product Builder Hub
// Uses Google Translate under the hood, but hides the native UI in favor of a custom Glassmorphism Select Dropdown.

// Add global styles for the translation UI
const style = document.createElement('style');
style.textContent = `
    /* Translate Widget Container */
    #custom-translate-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    /* Hide Google Native Widget and Tooltips */
    body { top: 0 !important; }
    .skiptranslate,
    .goog-te-banner-frame,
    #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
    .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
    #google_translate_element { display: none !important; }

    /* Custom Select Glassmorphism Styling */
    .custom-translate-select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #cbd5e1;
        padding: 8px 30px 8px 15px;
        border-radius: 8px;
        font-family: 'Pretendard', sans-serif;
        font-size: 0.9rem;
        cursor: pointer;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: all 0.2s ease;
        outline: none;
    }

    /* Custom Arrow for Select */
    .custom-translate-wrapper {
        position: relative;
    }
    .custom-translate-wrapper::after {
        content: '▼';
        font-size: 0.6rem;
        color: #60a5fa;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    }

    .custom-translate-select:hover {
        border-color: #60a5fa;
        color: #f8fafc;
        box-shadow: 0 0 10px rgba(96, 165, 250, 0.2);
    }

    .custom-translate-select option {
        background: #1e293b;
        color: #f8fafc;
    }
    
    /* Icon wrapper */
    .translate-icon {
        font-size: 1.2rem;
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Inject Native Google Translate Container (Hidden)
const googleContainer = document.createElement('div');
googleContainer.id = 'google_translate_element';
document.body.appendChild(googleContainer);

// Create Custom UI Container
const customContainer = document.createElement('div');
customContainer.id = 'custom-translate-container';

// Create Language Selection Dropdown
const selectWrapper = document.createElement('div');
selectWrapper.className = 'custom-translate-wrapper';

const selectBox = document.createElement('select');
selectBox.className = 'custom-translate-select';
selectBox.id = 'custom-language-select';

// Define the 8 target languages + Korean
const languages = [
    { code: 'ko', name: '🇰🇷 한국어 (Korean)' },
    { code: 'en', name: '🇺🇸 English' },
    { code: 'ja', name: '🇯🇵 日本語 (Japanese)' },
    { code: 'zh-CN', name: '🇨🇳 中文(简体) (Chinese)' },
    { code: 'es', name: '🇪🇸 Español (Spanish)' },
    { code: 'fr', name: '🇫🇷 Français (French)' },
    { code: 'de', name: '🇩🇪 Deutsch (German)' },
    { code: 'ru', name: '🇷🇺 Русский (Russian)' },
    { code: 'ar', name: '🇸🇦 العربية (Arabic)' }
];

languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    selectBox.appendChild(option);
});

selectWrapper.appendChild(selectBox);
customContainer.appendChild(selectWrapper);
document.body.appendChild(customContainer);


// --- Logic to sync Custom UI with Google Translate ---

// Translate Init Function called by the Google Script
window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
        pageLanguage: 'ko',
        includedLanguages: 'ko,en,ja,zh-CN,es,fr,de,ru,ar',
        autoDisplay: false,
    }, 'google_translate_element');
};

// Inject the Google Translate Script
const gtScript = document.createElement('script');
gtScript.type = 'text/javascript';
gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
document.body.appendChild(gtScript);

// Utility to set cookies (needed to control Google Translate)
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Sync Dropdown on Load based on googtrans cookie
window.addEventListener('load', () => {
    const defaultLang = getCookie('googtrans');
    if (defaultLang) {
        // format is usually /ko/en
        const parts = defaultLang.split('/');
        if (parts.length > 2) {
            const currentLangCode = parts[2];
            selectBox.value = currentLangCode;
        }
    }
});

// User Changes Language via Custom UI
selectBox.addEventListener('change', function () {
    const selectedLang = this.value;

    if (selectedLang === 'ko') {
        // If Korean is selected (origin page lang), clear translation cookie and reload
        setCookie('googtrans', '', -1);
        setCookie('googtrans', '', -1, '.product-builder-public-t8b.pages.dev'); // Catch domain specific
        window.location.reload();
    } else {
        // Set the google translate cookie to force translation
        // Pattern: /origin_lang/target_lang
        setCookie('googtrans', '/ko/' + selectedLang, 30);
        window.location.reload();
    }
});
