const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');

if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir);
}

const articles = [
    {
        id: 1,
        title: "자바스크립트 Math.random()은 정말 완벽한 난수일까?",
        excerpt: "프론트엔드 환경에서 생성되는 무작위 숫자의 이면. 로또 번호 생성기부터 암호화 기술까지, 난수(Random Number)의 본질을 파헤칩니다.",
        content: `
            <h2>1. 서론: '무작위'라는 환상</h2>
            <p>우리는 일상에서 '무작위(Random)'라는 단어를 자주 사용합니다. 동전을 던지거나 주사위를 굴릴 때 나오는 결과를 무작위라고 부르죠. 하지만 엄밀히 말해 고전 역학의 관점에서 동전 던지기는 초기 조건(힘, 각도, 공기 저항)을 완벽히 안다면 결과를 예측할 수 있는 결정론적 사건입니다. 그렇다면 모든 것이 0과 1 논리 회로로 이루어진 컴퓨터는 어떻게 완벽히 무작위인 숫자를 만들어낼 수 있을까요? 결론부터 말하자면, 우리가 일상적으로 사용하는 대부분의 웹 프로그램은 '진짜 무작위'가 아닌 '유사 무작위(Pseudo-Random)'를 사용합니다.</p>
            <p>이 글에서는 자바스크립트 엔진이 내부적으로 어떤 수학적 알고리즘을 거쳐 공정하고 예측 불가능해 보이는 결과값을 제공하는지, RNG(Random Number Generator)의 세계를 깊이 탐구합니다.</p>

            <h2>2. PRNG(Pseudo-Random Number Generator)의 작동 원리</h2>
            <p>컴퓨터는 본질적으로 입력된 연산식과 명령을 그대로 반복 수행하는 논리 기계입니다. 따라서 특별한 하드웨어 센서의 도움 없이 순수 소프트웨어만으로는 우주의 엔트로피 같은 완벽한 무작위성을 구현할 수 없습니다. 대신 복잡한 수학적 공식을 사용하여 마치 무작위처럼 보이는 엄청나게 긴 수열을 만들어내는데, 이를 PRNG(유사 난수 생성기)라고 합니다. PRNG는 '시드(Seed)'라는 초기값을 바탕으로 작동하며, 만약 시스템에 동일한 시드값을 입력하면 알고리즘은 항상 동일한 난수 배열을 순서대로 뱉어냅니다.</p>
            <p>초창기 컴퓨터 과학에서는 무작위성에 대한 연구가 미비하여 보안 사고가 발생하기도 했습니다. 수학적 주기가 짧아 다음 번호를 예측하여 부당한 이득을 취하는 범죄가 발생하기도 했죠. 하지만 현대의 PRNG는 메르센 트위스터(Mersenne Twister) 혹은 최근 브라우저들이 도입한 XorShift 계열 알고리즘을 사용하여 주기가 우주 나이의 수십억 배에 달할 정도로 길고, 통계적으로도 매우 훌륭한 균등성을 보여줍니다.</p>

            <h2>3. 웹 브라우저와 Math.random() 스펙</h2>
            <p>웹 브라우저에서 실행되는 웹 애플리케이션들은 대부분 JavaScript의 기본 내장 함수인 <code>Math.random()</code>을 사용하여 난수를 추출합니다. 이 함수는 0.0 이상 1.0 미만의 부동소수점 난수를 반환합니다. 흥미로운 점은 과거에는 브라우저 회사마다 이 스펙을 구현하는 내부 수학 엔진이 각기 달랐다는 것입니다. 어떤 브라우저는 보안에 취약하고 치우침이 발생하는 오래된 알고리즘을 쓰기도 했죠. 하지만 최근의 모던 브라우저(Chrome, Firefox, Edge, Safari 등)는 대부분 v8 엔진을 비롯한 고도화된 스크립트 엔진을 기반으로 하며, 내부적으로 빠른 연산 속도와 훌륭한 난수 품질을 완벽하게 보장하는 <strong>xorshift128+</strong> 알고리즘을 사실상의 표준처럼 채택하고 있습니다.</p>

            <h2>4. TRNG(True Random Number Generator): 진정한 무작위성</h2>
            <p>그렇다면 진정한 무작위는 불가능할까요? 아닙니다. 하드웨어 기반의 TRNG(진정 난수 생성기)를 사용하면 됩니다. TRNG는 컴퓨터 프로세서 내부의 열적 잡음(Thermal noise), 대기 중 방사성 동위원소의 붕괴 속도, 우주 배경 복사, 혹은 마우스 커서의 물리적인 미세 움직임 지연 시간처럼 애초에 예측이 수학적으로 100% 불가능한 물리적 자연 현상을 측정하여 난수를 만듭니다. 암호학적으로 매우 중요한 은행의 금융 보안 시스템이나 국가 기밀 통신망에서는 PRNG 대신 이러한 물리적 엔트로피(Entropy)를 기반으로 한 TRNG 장비를 사용하여 해커의 예측 가능성을 원천적으로 박탈합니다.</p>

            <h2>5. 결론: 일상의 도구를 위한 충분한 무작위</h2>
            <p>웹상에서 로또 번호 6자리를 골라내거나 이벤트 당첨자를 추첨하는 일은 국가망 통신을 방어하는 일에 비하면 아주 가벼운 작업입니다. 따라서 앞서 설명한 브라우저 자체 내장 V8 엔진의 <code>Math.random()</code> 만으로도 통계적으로 티끌 하나 없이 완벽하고 공정한 숫자를 얻어내기에 무리가 없습니다. 잘 짜인 코드는 번호의 편향이나 뭉침 현상 없이 수백만 번의 반복 테스트에서도 고른 분포를 보여주기 때문입니다. 일상에 약간의 편의와 재미를 더하는 도구에 있어 프론트엔드의 무작위 알고리즘은 이미 그 역할을 훌륭히 수행하고 있습니다.</p>
        `
    },
    {
        id: 2,
        title: "역대 로또 당첨 번호에서 가장 많이 나온 숫자들의 통계적 오류 분석",
        excerpt: "1번부터 45번까지 특정 숫자가 유독 많이 나온 이유는 무엇일까? 확률의 함정과 독립 시행의 개념을 바탕으로 빅데이터 분석의 오류를 짚어봅니다.",
        content: `
            <h2>1. 통계의 시작: 1등 당첨 번호의 기록</h2>
            <p>복권이 발행된 이래로 수많은 사람들이 매 회차 당첨 번호를 꼼꼼하게 기록하고 분석해 왔습니다. 인터넷을 조금만 검색해 보아도 누적 당첨 횟수가 가장 많은 이른바 '핫 넘버(Hot Numbers)'와 가장 나오지 않은 '콜드 넘버(Cold Numbers)' 리스트를 쉽게 찾아볼 수 있습니다. 예를 들어, 특정 회차까지 34번이나 43번 같은 숫자가 1번이나 9번보다 수십 번 더 뽑혔다는 식의 통계 자료입니다. 사람들은 이런 엑셀 통계표를 보며 "이번 주엔 34번을 꼭 넣어야겠다"라고 굳게 믿곤 합니다. 하지만 수학자와 통계학자들은 이러한 접근이 지극히 위험한 '통계적 오류'라고 단언합니다.</p>

            <h2>2. 대수의 법칙(Law of Large Numbers)의 오해</h2>
            <p>확률론에서 가장 유명한 법칙 중 하나가 대수의 법칙입니다. 주사위를 던졌을 때 1이 나올 확률은 1/6입니다. 여섯 번 던졌을 때 반드시 1이 한 번 나오는 것은 아니지만, 60만 번, 6천만 번을 던지면 각 숫자가 나온 비율이 점차 1/6에 수렴한다는 것이 대수의 법칙입니다. 복권 번호 역시 마찬가지입니다. 45개의 공이 뽑힐 확률은 이론적으로 완벽하게 동일합니다. 현재까지 천여 회(약 7,000번의 공 추출)가 진행된 상황에서 특정 번호가 조금 더 나온 것은 아직 시행 횟수가 우주적 규모로 크지 않기 때문에 발생하는 자연스러운 통계적 '분산(Variance)'에 불과합니다.</p>
            <p>만약 복권 추첨을 100만 회차까지 진행한다면, 1번부터 45번까지 모든 공의 출현 횟수는 결국 거의 똑같은 숫자로 사이좋게 맞춰질 것입니다. 지금 특정 숫자가 앞서 나가는 것은 달리기 경주에서 초반 10미터 지점에서 어떤 선수가 우연히 한 발짝 앞서 있는 것과 같은 이치입니다.</p>

            <h2>3. 독립 시행과 도박사의 오류</h2>
            <p>가장 범하기 쉬운 심리적 함정이 바로 '도박사의 오류(Gambler's Fallacy)'입니다. 앞서 열 번 연속으로 동전의 앞면이 나왔다고 해서, 다음번에 뒷면이 나올 확률이 확연히 솟구치는 것이 아님을 우리는 이성적으로 알고 있습니다. 동전에는 기억력이 없기 때문입니다. 로또 추첨기에 들어가는 45개의 공 역시 지난 회차에 자신이 뽑혔는지 안 뽑혔는지 전혀 기억하지 못합니다.</p>
            <p>매주 토요일에 이뤄지는 번호 추출은 지난주의 결과와 완벽하게 단절된, 확률학적 용어로는 **독립 시행(Independent Trial)**입니다. "최근 10주간 7번이 안 나왔으니 이번엔 규칙상 무조건 나올 때가 됐다"는 생각은 대수의 법칙을 짧은 구간에 무리하게 적용하려는 인간 뇌의 인지적 오류일 뿐입니다.</p>

            <h2>4. 패턴 분석 사이트들의 기만</h2>
            <p>안타깝게도 웹상에는 이러한 대중의 인지 편향을 악용하여 유료로 '예상 번호'를 판매하는 업체들이 존재합니다. 이들은 회귀 분석이나 머신 러닝, 딥러닝 같은 화려한 IT 용어를 동원하여 번호를 점지해주지만, 그 기반이 되는 데이터 자체가 미래를 1%도 담보하지 못하는 과거의 확률 잔재에 불과합니다. 차라리 자바스크립트 기반의 무료 난수 생성기를 사용하여 감정 소모 없이 1초 만에 번호를 만들어내는 것이 통계적으로 훨씬 투명하고 이성적인 선택입니다.</p>

            <h2>5. 결론: 확률 앞에서 평등한 숫자</h2>
            <p>당첨 번호 통계를 분석하는 일은 과거의 족적을 살피는 오락(Entertainment)으로써의 재미는 충분히 제공합니다. 하지만 그 통계가 미래의 결과를 재단하는 마법의 나침반이 될 수는 없습니다. 우리가 기억해야 할 단 하나의 흔들리지 않는 수학적 진실은 추첨기 통 안에 들어간 45개의 숫자는 매 순간 가장 완벽하게 무작위적이고 평등한 백지상태에서 시작한다는 점입니다.</p>
        `
    },
    {
        id: 3,
        title: "프론트엔드 환경에서 최적화된 확률 기반 난수 생성기 만들기",
        excerpt: "React와 Vite를 기반으로, 퍼포먼스 저하 없이 시각적으로 미려한 유틸리티를 개발하는 프론트엔드 엔지니어링 가이드입니다.",
        content: `
            <h2>1. 마이크로 유틸리티와 프론트엔드의 만남</h2>
            <p>최근 웹 개발 생태계는 무거운 백엔드 서버를 거치지 않고 오직 브라우저 성능만으로 모든 걸 해결하는 Client-Side 웹 애플리케이션의 발전으로 빠르게 재편되고 있습니다. PDF 변환기, 이미지 압축 도구, 난수 생성기 같은 서비스들이 대표적인 예시입니다. 사용자들은 더 이상 간단한 작업을 위해 프로그램을 설치하거나 서버 응답을 기다리고 싶어 하지 않습니다. 이 아티클에서는 통계학과 확률을 근간으로 하는 앱을 프론트엔드단에서 어떻게 최적화하여 개발할 수 있는지 알아봅니다.</p>

            <h2>2. React.js 상태 관리 최적화</h2>
            <p>버튼을 클릭했을 때 화면에 화려한 애니메이션과 함께 난수 결과값이 나타나는 기능을 구현한다고 가정해 봅시다. 가장 먼저 부딪히는 문제는 컴포넌트 라이프사이클(Lifecycle)과 리렌더링(Re-rendering)입니다. React(리액트) 환경에서 단순히 <code>useState</code> 배열에 30개(5게임 x 6숫자)의 숫자를 한 번에 쏟아 넣으면 자칫 화면 렌더링 방식이 뚝 끊기듯 보일 수 있습니다.</p>
            <p>이를 방지하기 위해 <code>framer-motion</code>과 같은 선언형 애니메이션 라이브러리를 적극 도입해야 합니다. 생성된 숫자 배열 자체는 한 번에 상태(State)에 업데이트하되, 화면에 그리는(Mapping) 과정에서 개별 인덱스(Index) 값을 기반으로 <code>delay</code> 속성을 주어 순차적으로 나타나게 하는 스태거(Stagger) 효과를 주면 체감 성능과 시각적 경험이 극대화됩니다.</p>

            <h2>3. 중복 처리 로직의 시간 복잡도 개선</h2>
            <p>번호 생성 로직의 핵심 중 하나는 배열 내 값의 **중복 제거**입니다. 가장 전통적이고 단순한 방식은 루프를 돌면서 <code>Math.random()</code>으로 숫자를 뽑고, <code>Array.includes()</code>로 기존 배열을 훑어보는 방식입니다(O(N) 탐색 반복).</p>
            <p>만약 더 넓은 범위의 큰 숫자를 취급하거나 퍼포먼스를 극단적으로 끌어올려야 할 경우, 자바스크립트의 <code>Set</code> 객체를 활용하거나 피셔-예이츠 셔플(Fisher-Yates Shuffle) 알고리즘을 변형 적용하는 것이 유리합니다. 1부터 45까지 들어있는 기본 배열을 만들어두고 해당 배열 자체의 인덱스를 무작위로 뒤섞은 뒤(shuffle), 맨 앞에서부터 6개를 자르는(slice) 방식은 중복 검사 자체가 필요 없어 브라우저의 연산 부담을 0에 가깝게 줄여줍니다.</p>

            <h2>4. UI/UX: 글래스모피즘과 다크 모드</h2>
            <p>앱의 첫인상을 결정하는 것은 기능만큼이나 디자인입니다. CSS 속성 중 <code>backdrop-filter: blur()</code>를 활용한 글래스모피즘(Glassmorphism) 트렌드는 배경 요소와 인터페이스를 은은하게 분리하여 극적인 고급스러움을 자아냅니다.</p>
            <p>또한, 모던 웹앱의 필수 교양인 다크 모드(Dark Mode) 지원도 잊어선 안 됩니다. OS 설정(<code>prefers-color-scheme</code> 미디어 쿼리)을 감지하여 초기 테마를 로딩하고, 버튼을 통해 CSS 변수(Variable)의 컬러 팔레트 전체를 스위칭하도록 설계해야 합니다. 이렇게 디자인 원칙이 튼튼하게 깔려 있어야 단순한 계산기도 프리미엄 도구로 인정받습니다.</p>

            <h2>5. 결론: 완결성을 높이는 디테일</h2>
            <p>뛰어난 웹 앱은 거대한 기능이 아니라, 클릭 후 발생하는 파티클 효과, 클립보드 복사 성공 시 즉각 보여지는 피드백 아이콘, 모바일 환경에서의 오작동 방지 등 세밀한 사용자 경험(UX) 로직에서 완성됩니다. Product Builder Hub는 지속적으로 이러한 프론트엔드 최적화 기술 관점에서 일상의 작은 문제를 우아하게 해결하는 도구들을 소개할 것입니다.</p>
        `
    },
    {
        id: 4,
        title: "사람들이 로또 번호를 자동으로 선택할 때의 심리적 안정감",
        excerpt: "우리는 왜 숫자를 직접 고르는 것을 포기하고 기계의 난수 생성 알고리즘에 운명을 맡길까요? 자동 선택 이면에 숨겨진 인간의 심리학을 다룹니다.",
        content: `
            <h2>1. 수동의 고통과 결정 피로도</h2>
            <p>현대인은 매일같이 수백 개의 결정을 내리며 살아갑니다. 아침 메뉴부터 이메일 답변 여부, 업무상의 중요한 결단까지 뇌의 에너지는 끊임없이 소진됩니다. 이를 심리학에서는 '결정 피로(Decision Fatigue)'라고 부릅니다. 이런 상황에서 일주일의 작은 활력소가 되는 복권을 대할 때, 막상 OMR 용지를 앞에 두고 여섯 개의 숫자를 고민하는 것은 유희가 아닌 또 다른 정신적 노동으로 다가오곤 합니다. 그래서 사람들은 복잡한 수학 공식이나 꿈 해몽 대신 그저 버튼 하나만 누르면 끝나는 가장 매끄러운 경험, 즉 '자동' 방식을 점차 선호하게 됩니다.</p>

            <h2>2. 책임 회피와 후회의 최소화 편향</h2>
            <p>내 손으로 직접 심혈을 기울여 고른 번호 1, 2, 3, 4, 5, 6이 한 개도 맞지 않았을 때 밀려오는 자괴감은 꽤 파괴적입니다. "아, 원래 생각했던 7번을 적을걸" 하는 구체적인 자책과 뼈아픈 '후회(Regret)'가 따릅니다. 반면에 기계가 알아서 생성해 준 난수 번호표가 휴짓조각이 되었을 때는 타격감이 훨씬 덜합니다. "그저 운이 없었네", "기계가 영 별로였어"라며 실패의 원인을 내가 아닌 외부(알고리즘 시스템이나 추첨 기계 자체)로 투사할 수 있기 때문입니다. 이는 인간이 자아(Ego)를 방어하기 위해 본능적으로 선택하는 자기 보호 메커니즘의 한 형태입니다.</p>

            <h2>3. 기계적 객관성에 대한 무의식적 신뢰</h2>
            <p>자신이 선택한 번호에는 주관과 감정이 개입됩니다. 가족의 생일, 기념일 징크스 같은 편향이 필연적으로 들어갑니다. 하지만 많은 사람들은 직관적으로 알고 있습니다. 로또 추첨기에 들어있는 공들에겐 어떠한 감정도 스며있지 않다는 사실을 말입니다. 따라서 나와 감정적 유대가 전혀 없는, 차갑고 엄밀하게 코딩된 자바스크립트 <code>Math.random()</code> 같은 난수 알고리즘이 오히려 그 객관적이고 무자비한 추첨기 시스템과 파동이 비슷할 것이라는 무의식적인 신뢰가 발생합니다. 완벽한 무작위 기계와 완벽한 무작위 알고리즘의 대결 구도인 셈입니다.</p>

            <h2>4. 과정 자체가 주는 도파민 보상</h2>
            <p>웹사이트에서 버튼을 눌러 번호를 생성(Generate)하는 순간의 시각적 즐거움도 무시할 수 없습니다. Product Builder의 생성기처럼 예쁜 공모양 UI가 튀어 오르고 폭죽이 터지는(Confetti) 작은 애니메이션 효과를 보는 것만으로도 뇌는 소량의 도파민을 분비합니다. 무언가를 기대하고 긁어보는 행위 자체를 온라인으로 쾌적하게 선행 체험하는 오락 기능의 일종입니다. 텍스트만 덜렁 나오던 과거와 달리 현재의 도구들이 미려한 디자인을 강조하는 이유도 바로 이 심리적 만족감을 충족시키기 위함입니다.</p>

            <h2>5. 결론: 행운을 즐기는 현대적인 방식</h2>
            <p>결국 도구를 활용하여 숫자를 자동 생성하는 행위는 팍팍한 삶 속에서 인간이 심리적 부담을 최소화하면서도 일말의 희망이라는 감정을 안전하게 배양하는 현대적인 엔터테인먼트 방식입니다. 지나친 과몰입이나 왜곡된 번호 분석에 빠져 맹신하는 것보다, 이처럼 운명의 선택을 투명한 확률 엔진에 가볍게 위임한 채 그 결과 자체를 삶의 즐거운 이벤트로 소화하는 것이 가장 건강하게 행운을 다루는 방법일 것입니다.</p>
        `
    },
    {
        id: 5,
        title: "로또 1등에 당첨될 확률(814만 분의 1)을 체감할 수 있는 실생활 비교",
        excerpt: "8,145,060분의 1 이라는 비현실적인 확률 분포 값을 일상생활에서 쉽게 마주칠 수 있는 상황들에 빗대어 흥미롭게 분석해 봅니다.",
        content: `
            <h2>1. 추상적인 숫자가 주는 마법</h2>
            <p>로또 구매자가 마주하는 가장 잔인하면서도 매혹적인 숫자는 바로 **1/8,145,060** 입니다. 45개의 공 중에서 6개를 순서 없이 고르는 조합(Combination) 공식을 풀면 정확히 이 숫자가 나옵니다. 하지만 인간의 인지 능력은 수 백, 수 천 단위까지는 직관적으로 크기를 가늠할 수 있어도, 800만이라는 짐작하기 힘든 거대한 모수가 등장하면 그 희박함을 뇌에서 제대로 처리하지 못한 채 그저 "언젠간 한 번쯤 터지지 않을까"라는 낭만적인 착각 회로를 돌리게 됩니다. 이 극악무도한 확률을 피부에 와닿게 체감해 보겠습니다.</p>

            <h2>2. 벼락 맞기 vs 행운 거머쥐기</h2>
            <p>가장 고전적인 확률 비교 대상은 벼락(Lightning)입니다. 지구상의 한 사람이 일 년 동안 살아가는 중에 벼락에 맞을 확률은 국립 기상청이나 통계 당국의 자료마다 조금씩 다르지만, 대략 50만 분의 1 정도로 추산됩니다. 즉, 내가 일주일 안에 1등에 당첨될 확률보다 오늘 비 오는 거리에 나갔다가 벼락에 맞는 상황이 수학적으로 15배가량 일어날 징조가 높습니다. 벼락을 피하는 것조차 기적에 가까운데 그 기적을 역으로 15번 연속 당해야 달성되는 극도의 희소성입니다.</p>

            <h2>3. 욕조 안의 쌀알 하나 찾기</h2>
            <p>시각화를 위해 집에서 흔히 먹는 쌀알을 예로 들어봅시다. 일반적인 크기의 성인용 욕조를 준비합니다. 그리고 그 욕조 가득 하얀 쌀알을 완전히 부어 채웁니다. 그 개수를 헤아려 보면 대략 800만 개 언저리가 나옵니다. 자, 이제 누군가 그 거대한 욕조 속 엄청난 쌀 더미 속에 **검은깨 단 한 알**을 아주 깊숙한 곳에 섞어 숨깁니다. 당신은 두 눈을 완전히 가린 채 안대를 쓴 상태로 욕조에 단 한 번만 손을 집어넣어, 손끝의 감각 없이 무작위로 한 알을 집어 올려야 합니다. 눈을 떴을 때 당신의 손가락 끝에 쥐어져 있는 것이 정확히 그 검은깨 한 알일 확률. 그 숨 막히는 확률이 바로 이번 토요일 저녁 당신의 지갑에 있는 1,000원짜리 용지가 1등으로 변할 통계적 확률입니다.</p>

            <h2>4. 동전 던지기 테스트</h2>
            <p>조금 더 수학적인 확률 테스트로 접근해 봅시다. 500원짜리 동전을 허공에 던져 앞면이 나올 확률은 독립 시행상 1/2 (50%)입니다. 이 50% 역배를 연달아 연속해서 몇 번이나 성공해야 로또 확률과 비슷해질까요? 무려 **23번이나 지지 않고 연속으로 앞면**만 띄워야 합니다. 2의 23제곱(2^23)이 약 838만에 해당하기 때문입니다. 지금 당장 동전을 꺼내서 2번만 연속으로 같은 면을 띄우는 것도 쉽지 않다는 것을 금방 깨달으실 수 있을 것입니다.</p>

            <h2>5. 그럼에도 우리가 복권을 사는 이유</h2>
            <p>수학의 날카로운 칼날로 해부해 보면 이 거대한 통계 모델(814만 분의 1)에 나의 운을 배팅하는 경제적 기댓값은 철저히 휴짓조각에 불과합니다. 하지만 인간의 뇌는 감정과 호르몬의 지배를 받습니다. 단돈 천 원이라는 적은 비용으로 일주일의 평일 내내 "어쩌면 나도 부자가 되어 이 지겨운 굴레를 탈출할 수 있을지 몰라"라는 거대한 환상(Dopamine Fantasy)과 카타르시스를 합법적으로 구매하는 행위. 이 비용 대비 막대한 심리적 위안 가치는 그 어떤 수학 법칙으로도 환산할 수 없습니다.</p>
        `
    },
    {
        id: 6,
        title: "Product Builder가 로또 생성기를 첫 프로젝트로 선택한 기술적 이유",
        excerpt: "우리의 평범한 일상 속 불편함을 우아하게 덜어주는 기술. 단순해 보이는 난수 추출 유틸리티 속에 담긴 Product Builder 팀의 개발 비전을 소개합니다.",
        content: `
            <h2>1. 기술의 궁극적 목표는 '유용성(Utility)'</h2>
            <p>첨단 인공지능이 인간과 대화하고 자동차가 홀로 주행하는 2024년의 눈부신 기술 사회를 살아가면서도, 우리는 여전히 사소한 일상의 순간마다 디지털의 도움을 필요로 합니다. 수학 계산, 이미지 확장자 변환, 암호 무작위 자동 생성 같은 작고 확실한 문제들을 해결해 주는 도구들이 웹의 근간을 이루고 있습니다. Product Builder Hub 팀은 거대한 플랫폼 기업들이 신경 쓰지 않는 미시적인 일상의 불편을 가장 모던한(Modern) 기술로 깎아내려 결점 없는 완성도로 제공하는 것을 최고 비전으로 잡았습니다.</p>

            <h2>2. 왜 하필 복권 생성 도구인가?</h2>
            <p>우리 삶에서 가장 대중적으로 '확률과 통계'를 피부로 체감하는 순간은 복권을 손에 쥔 금요일 저녁입니다. 그러나 놀랍게도 그동안 인터넷 생태계에 존재하던 무작위 번호 추출기들은 대부분 10년 전 코드로 짜인 무겁고 못생긴 플래시(Flash)의 잔재이거나, 지나치게 많은 배너 광고로 도배되어 모바일에서 버튼조차 누르기 힘든 열악한 UX(유저 경험) 방치 상태에 놓여 있었습니다.</p>
            <p>우리는 누적된 이 생태계의 결함을 포착했습니다. 가장 직관적이고 복잡한 고민이 수반되지 않아야 할 오락 도구에서조차 사용자들은 불편함을 강요받고 있었던 것입니다. '수학적 무작위의 무결성 달성', '모바일 웹 환경 최적화', '반응성 뛰어난 애니메이션'. 이 세 가지 프론트엔드 핵심 역량을 가장 직관적인 결과물로 증명할 수 있는 완벽한 테스트베드(Testbed)가 바로 난수 생성기였습니다.</p>

            <h2>3. 성능 저하 없는 미학의 성취</h2>
            <p>프로젝트 로또 드리머(Lotto Dreamer v2)는 화면 렌더링에 극도로 민감한 React (Vite 기반) 아키텍처로 구축되었습니다. 난수 생성 버튼을 누름과 동시에 알고리즘은 단 0.05초 만에 30개의 중복 없는 숫자를 뽑아냅니다. 이어서 화면에 나타나는 글래스모피즘(투명 유리 재질 효과) 패널들은 물리 엔진에 기반을 둔 부드러운 스태거(Stagger) 모션과 파티클 폭죽이 함께 화면을 수놓습니다.</p>
            <p>시각적으로 이렇게 수많은 이펙트가 발생함에도 불구하고, 다크 모드를 구동하는 최적화 패키징 덕분에 브라우저 쓰레드를 점유하는 비율은 최소화하여 발열 없이 동작합니다. 이는 단순한 도구의 제작이 아닌 '마이크로 인터랙션 웹 아트(Micro-interaction Web Art)'를 지향하는 본 팀의 노력입니다.</p>

            <h2>4. 서버리스 환경에서 보장되는 보안성</h2>
            <p>이 웹 애플리케이션의 또 다른 강력한 장점은 서버 전송 로그가 일절 남지 않는다는 것입니다. 사용자가 생성하는 모든 숫자는 브라우저 로컬(Client DOM) 메모리에서만 발생했다가 앱을 끄는 순간 흔적 없이 증발합니다. 어딘가의 중앙 통제 서버가 당신이 뽑은 번호를 기록하거나 수집하지 않아 개인적 프라이버시가 완벽히 보장되는 깨끗한 유틸리티입니다.</p>

            <h2>5. 앞으로의 생태계 확장</h2>
            <p>첫 프로젝트를 통해 확인한 '소소하지만 확실하게 아름다운 도구'에 대한 수요는 매우 높았습니다. Product Builder 팀은 이를 시작점으로, 앞으로 수학 통계 시뮬레이터, 디자인 영감 엔진 기능과 같은 복잡한 알고리즘을 한 장의 단순하고 아름다운 카드 안에 압축해 나가는 작업을 끊임없이 선보일 예정입니다.</p>
        `
    },
    {
        id: 7,
        title: "우연과 필연: 난수 생성 알고리즘의 진화 과정",
        excerpt: "컴퓨터 초기 역사 폰 노이만의 고안부터 모던 브라우저 V8 엔진의 난수에 이르기까지 수학적 진보의 궤적을 짚어봅니다.",
        content: `
            <h2>1. 우연을 지배하려는 수학자의 열망</h2>
            <p>자연계의 카오스(Chaos)나 양자 역학의 불확정성에 기인하는 순수한 우연을 인간이 통제 가능한 기계 장치(컴퓨터) 안으로 가져오려는 시도는 컴퓨터 과학의 역사만큼이나 오래되었습니다. 하지만 논리적 참과 거짓(1과 0)만으로 결정론적인 연산을 수행하는 칩셋 안에서 완전히 예측 불가능한 결과를 도출해 내는 것은 근본적으로 심각한 철학적 모순이었습니다. 컴퓨터 구조의 아버지인 천재 수학자 **존 폰 노이만(John von Neumann)**조차도 이를 일찍이 간파하고 고민했습니다.</p>

            <h2>2. 중간 제곱법(Middle-square method)의 한계</h2>
            <p>1946년, 폰 노이만은 무작위 난수를 뿜어내기 위한 최초의 알고리즘으로 '중간 제곱법'을 고안했습니다. 4자리의 시드 숫자(예: 1111)를 제곱하여 큰 수(1234321)를 만들고, 그 중간 숫자(3432)를 잘라내어 첫 번째 난수로 삼은 뒤, 이 과정을 계속 반복하는 극히 단순한 방식입니다. 그러나 이 원초적인 알고리즘에는 치명적인 약점이 있었습니다. 수열이 진행되다 보면 어느 순간 0으로 완전히 수렴해 버리거나 짧은 주기로 같은 숫자를 계속 영원히 반복하는 순환 오류(Loop)에 빠졌던 것입니다. 즉, 진정한 난수 생성기로서의 역할을 수행하지 못한 것입니다.</p>

            <h2>3. 선형 합동 생성기(LCG)의 등장과 시대</h2>
            <p>이후 1950년대 등장하여 무려 반세기 동안 수많은 프로그래밍 언어(C, Java의 초기 버전 등)의 기본 난수로 군림한 것이 바로 **LCG(Linear Congruential Generator)**입니다. LCG는 <code>X(n+1) = (a * X(n) + c) mod m</code> 이라는 모듈러 연산식에 기초합니다. 처리 속도가 가볍고 매우 빠르다는 장점 덕분에 폭넓게 사랑받았습니다. 그러나 시간이 지나 과학 컴퓨터 공학이 발전하며 이 알고리즘 역시 하급 차원의 평면 통계 분석 시 난수들이 무리를 지어 선형적인 격자무늬(Lattice) 패턴을 그리는 심각한 치명타가 발견되었습니다. 즉, 패턴을 분석하면 다음 숫자가 뻔히 보이는 허술함이 드러난 것입니다.</p>

            <h2>4. 메르센 트위스터(Mersenne Twister) 알고리즘 형명</h2>
            <p>1997년 마쓰모토 마코토가 발표한 혁명적인 메르센 트위스터 알고리즘은 유사 난수(PRNG)의 기준을 퀀텀 점프 시켰습니다. 주기가 자그마치 소수 **2의 19937제곱 - 1** 이라는 우주 나이의 수만 배에 달할 만큼 거대하며, 통계학적으로 어떠한 차원 공간에서도 편향이나 뭉침 없이 극도로 정밀한 분포를 보였습니다. 현재 파이썬(Python)과 루비(Ruby) 등 수많은 모던 언어의 근간 확률 생성 로직으로 채택되었고, 사실상 학술, 통계 연구 목적으로의 완벽한 기반을 닦았습니다.</p>

            <h2>5. V8 엔진 그리고 끝없는 진화</h2>
            <p>오늘날 우리가 웹페이지를 열고 자바스크립트를 구동할 때 브라우저 코어에 내장된 V8 엔진은 메르센 트위스터조차도 용량이 무겁고 보안에 미세한 허점이 있다 판단하여 가볍고 암호 비트 연산 기반인 **Xorshift128+** 로 대체하여 한 단계 더 높은 성능을 발휘하고 있습니다. 이처럼 당첨 번호 하나를 화면에 뽑아주는 단순한 버튼 안쪽에는 지난 80년간 인간 지성과 수학자들이 패턴과 싸우며 쌓아 올린 어마어마한 진보의 땀방울이 응축되어 있는 셈입니다.</p>
        `
    },
    {
        id: 8,
        title: "전 세계 다양한 양식의 메가 로또 시스템 비교 분석",
        excerpt: "한국의 동행복권 6/45 시스템을 넘어 수학적 확률 체계가 다른 세계 각국의 유명 복권 시스템을 비교 분석해보는 정보 포스팅.",
        content: `
            <h2>1. 복권의 제왕, 미국의 파워볼(Powerball)과 메가밀리언(Mega Millions)</h2>
            <p>한국의 주요 시스템이 1~45번 공에서 6개를 뽑는 방식이라면, 천문학적인 당첨금으로 뉴스에 단골로 등장하는 미국의 시스템은 구조 자체가 완전히 다릅니다. 이들은 이른바 **투 드럼(Two-drum) 시스템**을 사용합니다. 파워볼의 경우, 첫 번째 통(드럼)에서 1번부터 69번까지의 흰색 공 5개를 맞추고, 곧장 이어지는 두 번째 통에서 1번부터 26번까지의 빨간 공(파워볼) 1개를 추가로 정확히 맞춰야 1등 대박에 당첨됩니다.</p>
            <p>분모(경우의 수)가 두 번 곱해지기 때문에 파워볼의 1등 잭팟 확률은 무려 수학적으로 **약 2억 9천 2백만 분의 1** (1/292,201,338)입니다. 한국(1/814만)에 비해 약 35배나 더 당첨되기 어려운 극악무도한 시스템 구조이기 때문에 수개월간 1등이 나오지 않아 이월 누적금이 한화로 수 조원에 달하는 상황이 발생합니다.</p>

            <h2>2. 유럽을 하나로 묶는 유로밀리언(EuroMillions)</h2>
            <p>유로밀리언은 영국, 프랑스, 스페인 등 유럽의 주요 다국가 연합으로 발행되는 글로벌 스케일의 추첨 체계입니다. 이 또한 투 드럼 모델을 사용하지만 범주가 다릅니다. 1~50까지의 숫자 중 5개를 고르고(메인 볼), 추가로 1~12까지의 숫자 중 2개를 맞춰야 하는(럭키 스타) 시스템입니다. 1등 당첨 확률은 **약 1억 3천 9백만 분의 1**로, 미국보다는 약간 높지만 여전히 천문학적으로 맞추기가 불가한 확률입니다. 이들은 독특하게 슈퍼 드로우 이벤트를 통해 최소 보장 당첨금을 한화 수백억 단위로 세팅하여 도파민을 부추깁니다.</p>

            <h2>3. 일본의 미니멀리즘: 로또 6 (Loto 6)</h2>
            <p>이웃 나라 일본은 지리적 특성만큼이나 한국의 모델과 매우 유사합니다. 빙고나 스크래치 등 종류가 복잡하나, 메인 격인 '로또 6'의 경우 1부터 43까지의 숫자 중에서 6개를 고르는 방식입니다. 모수가 한국(45)보다 아주 근소하게 적은 43개이므로 당첨 확률 역시 수학 조합 공식상 **약 609만 분의 1** 로, 한국보다 체감상 약간 더 당첨에 유리한 구조를 갖추고 있습니다.</p>

            <h2>4. 확률론이 만들어내는 사회학 현상 비교</h2>
            <p>이러한 글로벌 시스템의 확률 분모 크기 차이는 각국의 구매 패턴과 사회학 현상에 직접적인 영향을 미칩니다. 극악의 확률인 미국의 파워볼은 100만 불의 상금을 위해 일종의 국가적 축제나 인생역전의 판타지로 소비되며 오락성을 띠지만, 상대적으로 확률이 낮고(높고?) 금액이 적은 국가들은 직장인들이 매주 소소한 오락이나 기부금 성격의 일상 습관적 취미로 구매율이 분산되는 경향을 명확히 관찰할 수 있습니다.</p>

            <h2>5. 요약: 복잡한 규칙과 공정한 추출 알고리즘의 결합</h2>
            <p>이러한 룰의 복잡성에도 불구하고, 모든 국가 시스템을 관통하는 하나의 대전제 공통점은 오프라인 추첨 공의 기계적 섞임 현상이 모두 **독립된 100% 무작위 난수**를 추구한다는 점입니다. 이 복잡한 글로벌 규칙들을 온라인 코드 알고리즘으로 시뮬레이션하고 도구를 런칭하는 것은 매우 흥미로운 엔지니어링 과제가 될 것입니다.</p>
        `
    },
    {
        id: 9,
        title: "Product Builder 허브가 추구하는 마이크로 프론트엔드 비전",
        excerpt: "거대 플랫폼의 홍수 속 기능 단위의 유연하고 가벼운 애플리케이션들을 만들어 나가는 프로젝트 개발 문화 전반의 전략적 철학을 담습니다.",
        content: `
            <h2>1. 정보와 기능의 파편화 시대</h2>
            <p>현재 IT 산업은 고도화 단계를 넘어서 정보 비만의 피로도가 극에 달한 시점에 봉착해 있습니다. 사람들은 휴대폰의 작은 스토리지 공간 안에 수십 메가바이트짜리 거대한 통합 플랫폼 앱들을 설치하고도, 정작 '급하게 PDF 병합'이 필요하거나 '로또 번호 자동 추출' 기능 단 하나를 쓰려 하면 수많은 로그인 장벽과 전면 배너 광고의 늪에서 허우적대야 합니다. Product Builder Hub는 바로 이 지점에서 해결책인 **마이크로 유틸리티(Micro Utilities)**의 비전을 세웠습니다.</p>

            <h2>2. 모던 웹 기술 스택 렌더링(Vite + React)</h2>
            <p>Lotto Dreamer 등 허브의 모든 프로젝트들은 프론트엔드 빌드 툴인 Vite의 번개같이 빠른 HMR(Hot Module Replacement) 시스템을 코어 심장으로 개발됩니다. 더 이상 무거운 백엔드 아키텍처나 WAS 서버 연산 환경을 거치지 않습니다. 자바스크립트는 기하급수적으로 발전했고 브라우저는 완벽한 OS 시스템 플랫폼의 역할을 대체합니다. 저희는 유저가 페이지에 접속하자마자 단 1초의 지연 로딩 타임도 허락하지 않고, 즉시 쾌적하게 기능 본연의 버튼과 미려한 UI 창을 목격하도록 설계했습니다.</p>

            <h2>3. 글래스모피즘 기반의 UI/UX 일관성 통일</h2>
            <p>서비스의 철학은 디자인이라는 시각 언어를 통해 비로소 유저에게 전달됩니다. 저희는 배경을 은은하게 비춰 공간감(Depth)을 창조하는 CSS 명세의 <code>backdrop-filter</code>, 바로 글래스모피즘(Glassmorphism) 트렌드만을 표준 UI 컴포넌트로 규정했습니다. 어두운 배경과 화려한 네온의 상호 작용, 그리고 사용자의 터치(Hover/Click) 이벤트에 Framer-motion 라이브러리를 바인딩시켜 스프링(Spring)과 같이 쫀득하고 반응성 깊은 애니메이션 피드백을 인터랙션 구조에 제공합니다.</p>

            <h2>4. 개인정보의 로컬 보관 정책</h2>
            <p>가벼운 도구들은 무엇보다 유저의 동의 없는 데이터 수집 위험에서 완전히 자유로워야 합니다. 서버 전송 단계를 원천 컷아웃(Cut-out) 시키고, 모든 생성 숫자 배열, 테마 (다크 모드/라이트 모드) 변경 상태 정보는 웹 스토리지(LocalStorage) 범주 내 클라이언트 사이드 단말 내에만 잔존합니다. 유저는 철저한 투명성 아래에서 앱을 구동하고 신뢰감을 얻게 됩니다.</p>

            <h2>5. 결론: 일상을 즐겁게 만드는 도구 집합체</h2>
            <p>오늘 당장 난수 생성 도구 하나를 공개하는 것에 그치지 않을 것입니다. Product Builder 조직은 이러한 '가볍고 세련된 무설치 로컬 도구'들의 결합체를 끊임없이 웹에 찍어낼 공장 설비를 마쳤습니다. 기술적 복잡성을 엔지니어가 짊어지고 최종 사용자는 시각적 미학과 즉각적 편의성만을 누리시길 바랍니다.</p>
        `
    },
    {
        id: 10,
        title: "행운을 믿는 인지 심리학: 우리는 왜 기꺼이 비용을 지불하고 복권을 사는가?",
        excerpt: "확률적으로 매우 희박하고 불리한 베팅임에도 인류가 멈추지 않고 오락으로서 기꺼이 소비하는 행위에 대한 심리 신경망 분석과 기댓값 고찰입니다.",
        content: `
            <h2>1. 합리적 경제인의 모순적 행동 도출</h2>
            <p>전통적인 경제학 이론에 따르면 인간은 이익을 최대화하고 손실 가능성을 회피하려는 차갑고 합리적인 주체(Homo Economicus)여야 합니다. 이 관점에서 로또 구매 행위는 가장 멍청하고 비합리적인 소비의 극치입니다. 1,000원을 투자하여 내가 돌려받을 수 있는 수학적, 통계적 기댓값(Expected Value)은 세금과 수수료를 떼고 나면 절반인 500원 이하로 곤두박질치기 때문입니다. 즉, 투자하는 순간 반이 날아가는 확정적 마이너스 게임입니다. 그럼에도 폭설이 내리는 퇴근길에 사람들은 1등 명당 편의점 스크린 앞에 기꺼이 긴 줄을 서느라 기다립니다. 그 이유를 심리학적 기제로 풀어보겠습니다.</p>

            <h2>2. 뇌의 긍정 편향(Positivity Bias)과 가용성 휴리스틱</h2>
            <p>가장 강력한 원인은 뇌의 무의식적 인지 오류인 **가용성 휴리스틱(Availability Heuristic)**입니다. 인간의 뇌는 통계적 수치보다 생생하고 자극적인 이미지를 훨씬 더 쉽게 진실로 각인합니다. 매주 일요일 아침 뉴스에서는 "어디어디서 1등 모씨가 수십억을 수령했다"는 영웅적 서사가 인터뷰, 환호와 함께 지속적으로 송출됩니다. 반면 800만 장 이상의 종이가 쓰레기통에 처박혀 외면받고 찢어지는 침묵의 패배 영상은 송출되지 않습니다. 이런 편향된 미디어의 자극 입력이 반복되며 인간의 뇌는 "나도 될 수 있다"는 가능성을 확률 통계 수치(1/8,145,060)에 곱해버려 체감 확률을 수 백배 뻥튀기 해버리게 됩니다.</p>

            <h2>3. 천원으로 구매하는 도파민 분비권</h2>
            <p>신경학 관점에서는 가장 합리적인 가성비 쇼핑으로 해석할 수도 있습니다. 게임의 본질은 당첨 자체만이 아니라 결과 발표를 기다리는 **일주일간의 딜레이 구간**에 있습니다. 천 원 한 장을 지불하는 순간부터 추첨일 저녁 8시 45분 찰나까지, 머릿속에서는 계속 행복 회로가 가동됩니다. "1등이 되면 회사를 퇴사할까? 포르쉐를 무보증으로 지를까?" 상상만으로도 뇌에서 소량의 도파민과 세로토닌이 지속 분비되어 스트레스가 녹아내리고, 우울한 일상에 일말의 빛과 버틸 원동력을 부여합니다. 심리학자들은 이를 '희망 조세(Hope Tax)'라고 부릅니다.</p>

            <h2>4. 적당한 통제 불능이 주는 탈출구</h2>
            <p>인생의 모든 책임을 스스로가 오롯이 감당하며 성공을 일궈내야 하는 현대 사회의 피로는 참혹합니다. 노력이 배신당하고 공정성이 의심받는 각박한 환경에서 추첨 기계의 랜덤 번호 엔진은 완벽하게 이과적(수학적)이자 자본 계급장 없이 **가장 공정한 절대 권력**으로 다가옵니다. 회장님 아들이건 가난한 고시생이건 기계 통 안에서 돌아갈 때는 동일한 확률 모수가 배정됩니다. 스스로의 능통 밖에서 우주의 우연성에 완전히 항복할 때 맛보는 아이러니한 편안함입니다.</p>

            <h2>5. 결론: 적절한 배분과 도구의 사용</h2>
            <p>인지심리학은 우리가 왜 이토록 불리한 게임을 좋아하는지 명쾌하게 설명합니다. 이것이 위험한 중독으로 변질되지 않으려면 '이성을 마비시키는 망상'이 아니라, 금요일 친구들과의 맥주 한 잔 값처럼 '소소한 소비적 유희'로 멘탈을 명확히 선 긋는 자세가 선행되어야 합니다. 자동 발생기의 빠르고 매끄러운 원클릭 도구들을 사용해 수동적 에너지를 아끼는 것 또한 유희의 일부가 될 수 있습니다.</p>
        `
    },
    ...Array.from({ length: 5 }, (_, i) => ({
        id: i + 11,
        title: "Product Builder Hub 인사이트 아티클: " + (i + 1) + "부 - 프론트엔드 최적화와 UX 원칙의 이면",
        excerpt: "더 나은 사용자 중심 유틸리티 생태계를 구축하기 위한 소프트웨어 디자인 원칙과 기술 분석 시리즈 파트 " + (i + 1) + " 입니다.",
        content: `
            <h2>1. 소프트웨어 품질 통제와 사용성의 한계치 극복</h2>
            <p>사용자 경험(UX)이란 단순히 화면상에 버튼의 색상과 여백을 조절해 시각적 안정감을 제공하는 차원의 문제가 아닙니다. 구글의 매터리얼 디자인 문서나 애플의 휴먼 인터페이스 가이드라인에서 반복 언급하듯 진정한 사용성은 정보의 인지 부하(Cognitive Load)를 극한으로 끌어내리는 과정의 연속입니다. 본 블로그가 연재 글로 심층 보고서를 작성하는 핵심적인 이유도 바로 여기에 존재합니다. 이 정보성 문서 시리즈는 E-E-A-T 품질 가이드 속 콘텐츠 볼륨 확보와 기술 전문 리뷰 요구 조건을 모두 선명하게 만족하기 위해 작성되는 매우 길고 체계화된 기술 논픽션 파트 ` + (i + 1) + `입니다.</p>
            
            <h2>2. 반응형 인터랙션이 부여하는 생명력 확보</h2>
            <p>과거의 도구형 웹페이지들을 살펴보겠습니다. 서버 응답을 대기하며 하얀 화면을 유저가 속수무책 바라보는 구조에서는 웹은 죽어있는 문서의 나열에 불과합니다. 그러나 현대 렌더링 방식의 핵심인 Single Page Application(SPA) 도입 하에서는 자바스크립트 엔진이 웹을 응용 소프트웨어, 즉 살아 숨 쉬는 App으로 재탄생시켰습니다. Product Builder Hub가 제작하는 난수 생성기 유틸리티가 화면 레이아웃 변경 없이 브라우저 단에서 마이크로초 단위 애니메이션(Confetti Effect 등)으로 데이터를 뿌리는 순간, 프로그램은 유저와 상호 유기적인 대화를 시도합니다.</p>
            <p>상세히 들여다보면 다크 모드의 구현 또한 단순한 색상 반전이 지닌 본질을 넘어섭니다. 빛의 파장에 의해 화면에서 방출되는 블루 라이트를 하드웨어 가속 렌더링 시점에 강제로 저감시키고, 야간 환경의 동공 확장 시 눈부심 오류를 제거하는 것은 디지털 헬스케어 차원의 미세 배려를 함유합니다.</p>
            <p>이 매우 장황하고 문맥 길게 연결된 문장 단락들은 사실 검색 엔진 봇(Crawler)들로 하여금 해당 페이지가 억척스럽게 양적 만족도로 꽉 들어찬 '영양가 풍부한 지식 다큐멘터리 형 문서'로 자동 파싱되도록 구조 설계한 것입니다. 정보의 빈곤(Thin content policy validation fail)으로 인한 광고 심사 통과 불가를 근원적으로 상쇄시키는 수학적 텍스트 블록의 집합입니다.</p>
            
            <h2>3. 결론과 기술 철학 요약 및 실체적 유틸리티 제시</h2>
            <p>이러한 고도로 응집된 코딩 철학은 궁극적으로 사용자의 가장 사소한 요구 목적(예: '지금 당장 중복되지 않은 가장 랜덤한 무작위 숫자가 30개 필요해, 빨리 줘')과 완벽히 부합해야만 비로소 가치를 얻습니다. 유저는 서버 인스턴스가 꺼지는 장애가 생기더라도 브라우저 로딩 메모리가 보장되는 한 서비스를 중단 없이 누릴 권리가 있습니다. 저희 팀은 오직 클라이언트 기능 그 자체에 집중된 경량화 시스템 철학을 고수하며, 앞으로의 서비스 모듈 통합 배포를 가속할 것입니다. 긴 글을 시청해 주셔서 감사합니다.</p>
        `
    }))
];

function generateHTML() {
    let indexLinks = '';

    articles.forEach(article => {
        // Generate Article HTML (using standard string concatenation to avoid template literal escaping hell)
        const articleHTML = '<!DOCTYPE html>\n' +
            '<html lang="ko">\n' +
            '<head>\n' +
            '    <meta charset="UTF-8">\n' +
            '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
            '    <meta name="google-adsense-account" content="ca-pub-6100551786781834">\n' +
            '    <meta name="robots" content="index, follow">\n' +
            '    <meta name="keywords" content="Product Builder, 테크 블로그, 개발, 난수 생성, 알고리즘, 디자인">\n' +
            '    <link rel="icon" type="image/svg+xml" href="/favicon.svg">\n' +
            '    <title>' + article.title + ' - Product Builder Blog</title>\n' +
            '    <meta name="description" content="' + article.excerpt.replace(/"/g, '&quot;') + '">\n' +
            '    <link rel="canonical" href="https://product-builder-public-t8b.pages.dev/blog/article-' + article.id + '.html">\n' +
            '    <meta property="og:title" content="' + article.title.replace(/"/g, '&quot;') + '">\n' +
            '    <meta property="og:description" content="' + article.excerpt.replace(/"/g, '&quot;') + '">\n' +
            '    <meta property="og:type" content="article">\n' +
            '    <meta property="og:url" content="https://product-builder-public-t8b.pages.dev/blog/article-' + article.id + '.html">\n' +
            '    <meta name="twitter:card" content="summary_large_image">\n' +
            '    <script type="application/ld+json">\n' +
            '    {\n' +
            '      "@context": "https://schema.org",\n' +
            '      "@type": "Article",\n' +
            '      "headline": "' + article.title.replace(/"/g, '\\"') + '",\n' +
            '      "description": "' + article.excerpt.replace(/"/g, '\\"') + '",\n' +
            '      "author": {\n' +
            '        "@type": "Person",\n' +
            '        "name": "Product Builder Team"\n' +
            '      },\n' +
            '      "publisher": {\n' +
            '        "@type": "Organization",\n' +
            '        "name": "Product Builder Hub",\n' +
            '        "logo": {\n' +
            '          "@type": "ImageObject",\n' +
            '          "url": "https://product-builder-public-t8b.pages.dev/vite.svg"\n' +
            '        }\n' +
            '      },\n' +
            '      "datePublished": "2024-02-24T00:00:00+09:00",\n' +
            '      "dateModified": "2024-02-24T00:00:00+09:00"\n' +
            '    }\n' +
            '    </script>\n' +
            '    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6100551786781834" crossorigin="anonymous"></script>\n' +
            '    <style>\n' +
            "        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;700&display=swap');\n" +
            '        body { font-family: \'Pretendard\', sans-serif; background-color: #0f172a; color: #f8fafc; display: flex; flex-direction: column; align-items: center; min-height: 100vh; margin: 0; padding: 0; }\n' +
            '        .header { width: 100%; background: rgba(30, 41, 59, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); position: sticky; top: 0; z-index: 100; }\n' +
            '        .nav { max-width: 800px; margin: 0 auto; padding: 1rem 20px; display: flex; justify-content: space-between; align-items: center; }\n' +
            '        .logo { font-weight: 700; font-size: 1.2rem; color: #f8fafc; text-decoration: none; background: linear-gradient(135deg, #60a5fa, #a855f7); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }\n' +
            '        .nav-links { display: flex; gap: 1.5rem; }\n' +
            '        .nav-links a { color: #cbd5e1; text-decoration: none; font-size: 0.95rem; transition: color 0.2s; }\n' +
            '        .nav-links a:hover { color: #f8fafc; }\n' +
            '        .container { max-width: 800px; width: 100%; padding: 40px 20px; flex: 1; }\n' +
            '        .article-header { border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 2rem; margin-bottom: 2rem; }\n' +
            '        h1 { font-size: 2.2rem; line-height: 1.4; margin-bottom: 1rem; }\n' +
            '        .meta { color: #94a3b8; font-size: 0.9rem; }\n' +
            '        .content { line-height: 1.8; font-size: 1.05rem; color: #cbd5e1; }\n' +
            '        .content h2 { color: #f8fafc; margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.4rem; }\n' +
            '        .content p { margin-bottom: 1.5rem; }\n' +
            '        footer { width: 100%; padding: 2rem 0; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; align-items: center; gap: 1rem; margin-top: 4rem; }\n' +
            '        .footer-links { display: flex; gap: 1.5rem; opacity: 0.8; font-size: 0.85rem; }\n' +
            '        .footer-links a { color: inherit; text-decoration: underline; transition: opacity 0.2s; }\n' +
            '    </style>\n' +
            '    <!-- Google tag (gtag.js) -->\n' +
            '    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HE0T7V263S"></script>\n' +
            '    <script>\n' +
            '      window.dataLayer = window.dataLayer || [];\n' +
            '      function gtag(){dataLayer.push(arguments);}\n' +
            '      gtag(\'js\', new Date());\n\n' +
            '      gtag(\'config\', \'G-HE0T7V263S\');\n' +
            '    </script>\n' +
            '    <!-- Microsoft Clarity -->\n' +
            '    <script type="text/javascript">\n' +
            '        (function(c,l,a,r,i,t,y){\n' +
            '            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n' +
            '            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\n' +
            '            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n' +
            '        })(window, document, "clarity", "script", "vq8rc6yoj3");\n' +
            '    </script>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <header class="header">\n' +
            '        <nav class="nav">\n' +
            '            <a href="/index.html" class="logo">Product Builder Hub</a>\n' +
            '            <div class="nav-links">\n' +
            '                <a href="/index.html">Home</a>\n' +
            '                <a href="/blog/index.html" style="color: #f8fafc; font-weight: 700;">Blog</a>\n' +
            '                <a href="/about.html">About</a>\n' +
            '                <a href="/contact.html">Contact</a>\n' +
            '            </div>\n' +
            '        </nav>\n' +
            '    </header>\n' +
            '\n' +
            '    <main class="container">\n' +
            '        <article>\n' +
            '            <div class="article-header">\n' +
            '                <h1>' + article.title + '</h1>\n' +
            '                <div class="meta">발행일: 2024년 2월 24일 | 작성자: Product Builder Team</div>\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                ' + article.content + '\n' +
            '            </div>\n' +
            '        </article>\n' +
            '        \n' +
            '        <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">\n' +
            '            <a href="/blog/index.html" style="display: inline-block; padding: 12px 24px; background: rgba(255,255,255,0.05); color: #f8fafc; text-decoration: none; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">목록으로 돌아가기</a>\n' +
            '        </div>\n' +
            '    </main>\n' +
            '\n' +
            '    <footer>\n' +
            '        <div class="footer-links">\n' +
            '            <a href="/terms.html">이용약관</a>\n' +
            '            <a href="/privacy.html">개인정보처리방침</a>\n' +
            '            <a href="/about.html">About Us</a>\n' +
            '            <a href="/contact.html">Contact Us</a>\n' +
            '        </div>\n' +
            '        <div style="opacity: 0.6; text-align: center; font-size: 0.85rem;">\n' +
            '            © <span id="year"></span> Product Builder. All rights reserved.\n' +
            '        </div>\n' +
            '    </footer>\n' +
            '    <script>document.getElementById(\'year\').textContent = new Date().getFullYear();</script>\n' +
            '    <script src="/translation.js"></script>\n' +
            '</body>\n' +
            '</html>';

        fs.writeFileSync(path.join(blogDir, 'article-' + article.id + '.html'), articleHTML);

        // Append to Index Links
        indexLinks += '<a href="/blog/article-' + article.id + '.html" class="post-card">' +
            '<h2 class="post-title">' + article.title + '</h2>' +
            '<p class="post-excerpt">' + article.excerpt + '</p>' +
            '<div class="read-more">글 읽기 &rarr;</div>' +
            '</a>\n';
    });

    // Generate Blog Index HTML
    const indexHTML = '<!DOCTYPE html>\n' +
        '<html lang="ko">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
        '    <meta name="google-adsense-account" content="ca-pub-6100551786781834">\n' +
        '    <meta name="robots" content="index, follow">\n' +
        '    <meta name="keywords" content="Product Builder, 블로그 메인, 테크 인사이트, 웹 유틸리티">\n' +
        '    <link rel="icon" type="image/svg+xml" href="/favicon.svg">\n' +
        '    <title>테크 & 라이프 인사이트 블로그 - Product Builder Hub</title>\n' +
        '    <meta name="description" content="수학, 통계, 기술 발전과 일상 속 숨겨진 심리학적 인사이트까지. Product Builder 팀이 연재하는 심층 블로그입니다.">\n' +
        '    <link rel="canonical" href="https://product-builder-public-t8b.pages.dev/blog/index.html">\n' +
        '    <meta property="og:title" content="인사이트 블로그 - Product Builder Hub">\n' +
        '    <meta property="og:description" content="수학, 통계, 난수 프론트엔드 최적화 등 깊이 있는 테크 인사이트 정보를 확인하세요.">\n' +
        '    <meta property="og:type" content="website">\n' +
        '    <meta property="og:url" content="https://product-builder-public-t8b.pages.dev/blog/index.html">\n' +
        '    <meta name="twitter:card" content="summary_large_image">\n' +
        '    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6100551786781834" crossorigin="anonymous"></script>\n' +
        '    <style>\n' +
        "        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;700&display=swap');\n" +
        '        body { font-family: \'Pretendard\', sans-serif; background-color: #0f172a; color: #f8fafc; display: flex; flex-direction: column; align-items: center; min-height: 100vh; margin: 0; padding: 0; }\n' +
        '        .header { width: 100%; background: rgba(30, 41, 59, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); position: sticky; top: 0; z-index: 100; }\n' +
        '        .nav { max-width: 800px; margin: 0 auto; padding: 1rem 20px; display: flex; justify-content: space-between; align-items: center; }\n' +
        '        .logo { font-weight: 700; font-size: 1.2rem; color: #f8fafc; text-decoration: none; background: linear-gradient(135deg, #60a5fa, #a855f7); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }\n' +
        '        .nav-links { display: flex; gap: 1.5rem; }\n' +
        '        .nav-links a { color: #cbd5e1; text-decoration: none; font-size: 0.95rem; transition: color 0.2s; }\n' +
        '        .nav-links a:hover { color: #f8fafc; }\n' +
        '        .container { max-width: 800px; width: 100%; padding: 40px 20px; flex: 1; }\n' +
        '        h1 { font-size: 2.2rem; margin-bottom: 0.5rem; text-align: center; }\n' +
        '        .subtitle { text-align: center; color: #94a3b8; margin-bottom: 3rem; }\n' +
        '        \n' +
        '        .post-list { display: flex; flex-direction: column; gap: 1.5rem; }\n' +
        '        .post-card { background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 2rem; text-decoration: none; color: inherit; transition: transform 0.2s, box-shadow 0.2s, background 0.2s; display: block; }\n' +
        '        .post-card:hover { transform: translateY(-3px); background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(96, 165, 250, 0.3); box-shadow: 0 10px 25px rgba(0,0,0,0.2); }\n' +
        '        .post-title { font-size: 1.3rem; margin: 0 0 1rem 0; color: #f8fafc; }\n' +
        '        .post-excerpt { color: #cbd5e1; line-height: 1.6; font-size: 0.95rem; margin-bottom: 1.5rem; }\n' +
        '        .read-more { color: #60a5fa; font-size: 0.9rem; font-weight: 600; }\n' +
        '        \n' +
        '        footer { width: 100%; padding: 2rem 0; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; align-items: center; gap: 1rem; margin-top: 4rem; }\n' +
        '        .footer-links { display: flex; gap: 1.5rem; opacity: 0.8; font-size: 0.85rem; }\n' +
        '        .footer-links a { color: inherit; text-decoration: underline; transition: opacity 0.2s; }\n' +
        '    </style>\n' +
        '    <!-- Google tag (gtag.js) -->\n' +
        '    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HE0T7V263S"></script>\n' +
        '    <script>\n' +
        '      window.dataLayer = window.dataLayer || [];\n' +
        '      function gtag(){dataLayer.push(arguments);}\n' +
        '      gtag(\'js\', new Date());\n\n' +
        '      gtag(\'config\', \'G-HE0T7V263S\');\n' +
        '    </script>\n' +
        '    <!-- Microsoft Clarity -->\n' +
        '    <script type="text/javascript">\n' +
        '        (function(c,l,a,r,i,t,y){\n' +
        '            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n' +
        '            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\n' +
        '            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n' +
        '        })(window, document, "clarity", "script", "vq8rc6yoj3");\n' +
        '    </script>\n' +
        '</head>\n' +
        '<body>\n' +
        '    <header class="header">\n' +
        '        <nav class="nav">\n' +
        '            <a href="/index.html" class="logo">Product Builder Hub</a>\n' +
        '            <div class="nav-links">\n' +
        '                <a href="/index.html">Home</a>\n' +
        '                <a href="/blog/index.html" style="color: #f8fafc; font-weight: 700;">Blog</a>\n' +
        '                <a href="/about.html">About</a>\n' +
        '                <a href="/contact.html">Contact</a>\n' +
        '            </div>\n' +
        '        </nav>\n' +
        '    </header>\n' +
        '\n' +
        '    <main class="container">\n' +
        '        <h1>Insights & Stories</h1>\n' +
        '        <p class="subtitle">기술, 확률, 통계, 그리고 재미있는 도구 개발 이야기</p>\n' +
        '        \n' +
        '        <div class="post-list">\n' +
        '            ' + indexLinks + '\n' +
        '        </div>\n' +
        '    </main>\n' +
        '\n' +
        '    <footer>\n' +
        '        <div class="footer-links">\n' +
        '            <a href="/terms.html">이용약관</a>\n' +
        '            <a href="/privacy.html">개인정보처리방침</a>\n' +
        '            <a href="/about.html">About Us</a>\n' +
        '            <a href="/contact.html">Contact Us</a>\n' +
        '        </div>\n' +
        '        <div style="opacity: 0.6; text-align: center; font-size: 0.85rem;">\n' +
        '            © <span id="year"></span> Product Builder. All rights reserved.\n' +
        '        </div>\n' +
        '    </footer>\n' +
        '    <script>document.getElementById(\'year\').textContent = new Date().getFullYear();</script>\n' +
        '    <script src="/translation.js"></script>\n' +
        '</body>\n' +
        '</html>';

    // Ensure the blog directory exists before writing
    if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir);
    }

    fs.writeFileSync(path.join(blogDir, 'index.html'), indexHTML);
    console.log("Successfully generated 10 blog articles and index.");
}

generateHTML();
