const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = {
  name: 'Product Builder Hub',
  baseUrl: 'https://product-builder-public-t8b.pages.dev',
  googleSiteVerification: 'zXNqTgnAS36FBBnvfpLXH49pqZ-6LGzRd4ihomkeRLg',
  adsenseAccount: 'ca-pub-6100551786781834',
  gaId: 'G-HE0T7V263S',
  clarityId: 'vq8rc6yoj3',
  repoUrl: 'https://github.com/purpleant1011/product-builder_public',
  lastUpdated: '2026-03-20',
  brandSummary: '설치 없이 바로 쓰는 브라우저 기반 도구와 실무형 가이드를 운영하는 Product Builder Hub입니다.',
};

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/tools/index.html', label: 'Tools' },
  { href: '/blog/index.html', label: 'Guides' },
  { href: '/about.html', label: 'About' },
  { href: '/contact.html', label: 'Contact' },
];

const FOOTER_LINKS = [
  { href: '/about.html', label: 'About' },
  { href: '/contact.html', label: 'Contact' },
  { href: '/editorial-policy.html', label: 'Editorial Policy' },
  { href: '/privacy.html', label: 'Privacy' },
  { href: '/terms.html', label: 'Terms' },
  { href: SITE.repoUrl, label: 'GitHub', external: true },
];

const TOOLS = [
  {
    slug: 'random-picker',
    outputId: 'random-picker-output',
    title: '랜덤 추첨기',
    category: '결정 지원',
    summary: '줄 단위나 쉼표 단위로 입력한 항목에서 중복 없이 무작위로 선택합니다.',
    description: '팀 이름, 경품 대상, 발표 순서처럼 빠르게 공정한 선택이 필요할 때 쓰는 브라우저 기반 랜덤 추첨기입니다.',
    ctaLabel: '추첨 실행',
    outputTitle: '추첨 결과',
    useCases: ['이벤트 경품 추첨', '팀 배정', '발표 순서 정하기'],
    heroPoints: ['설치 없이 즉시 사용', '입력 목록 서버 미전송', '중복 없는 선택 지원'],
    form: `
      <form id="random-picker-form" class="tool-form">
        <div class="field-group">
          <label for="random-picker-items">항목 목록</label>
          <textarea id="random-picker-items" name="items" placeholder="예:&#10;김하늘&#10;박서준&#10;이민정&#10;또는 사과, 배, 귤"></textarea>
          <p class="helper-text">줄바꿈, 쉼표, 세미콜론으로 항목을 구분할 수 있습니다.</p>
        </div>
        <div class="field-grid">
          <div class="field-group">
            <label for="random-picker-count">선택 개수</label>
            <select id="random-picker-count" name="count">
              <option value="1">1개</option>
              <option value="2">2개</option>
              <option value="3">3개</option>
              <option value="4">4개</option>
              <option value="5">5개</option>
            </select>
          </div>
          <div class="field-group">
            <span class="fieldset-label">추천 방식</span>
            <div class="notice">
              <h3>중복 없는 단일 셔플</h3>
              <p>입력 항목을 한 번 섞은 뒤 앞에서부터 필요한 개수만 보여줍니다.</p>
            </div>
          </div>
        </div>
        <button class="button" type="submit">추첨 실행</button>
      </form>
    `,
    sections: [
      {
        title: '언제 이 도구가 특히 유용한가요?',
        paragraphs: [
          '무언가를 랜덤으로 뽑아야 할 때 가장 난감한 순간은 공정성보다 “정말 공정하게 보였는가”가 중요해지는 상황입니다. 팀 회의에서 발표 순서를 정하거나, 작은 행사에서 경품 당첨자를 뽑거나, 수업에서 질문 대상을 고를 때 사람들은 종종 엑셀과 메신저, 메모장을 번갈아 열며 임시방편으로 처리합니다.',
          '랜덤 추첨기는 이런 순간에 필요한 최소한의 구조를 제공합니다. 입력 목록을 정리하고, 중복 없는 결과를 한 번에 보여주며, 설명 가능한 방식으로 선택 결과를 남길 수 있습니다. 별도 회원가입이나 업로드 절차가 없기 때문에 일회성 운영 업무에도 부담이 적습니다.',
        ],
      },
      {
        title: '공정한 운영을 위해 꼭 함께 확인할 점',
        paragraphs: [
          '추첨 도구 자체보다 더 중요한 것은 운영자의 설명입니다. 참여자 목록이 빠짐없이 반영되었는지, 중복 항목이 없는지, 당첨 개수를 미리 합의했는지 같은 기본 조건이 먼저 정리되어야 결과를 둘러싼 불필요한 오해를 줄일 수 있습니다.',
          '법적 추첨이나 고가 경품 지급처럼 기록 보존이 필요한 경우에는 화면 공유, 참여자 확인, 결과 캡처와 같은 운영 절차를 추가하는 편이 좋습니다. 이 페이지의 도구는 일상적인 운영 편의를 위한 용도로 설계되었으며, 감사 추적이 필요한 공식 추첨 시스템을 대체하지는 않습니다.',
        ],
      },
      {
        title: '개인정보와 목록 데이터는 어떻게 다루나요?',
        paragraphs: [
          '입력한 목록은 브라우저 안에서만 처리됩니다. 항목을 서버에 업로드하지 않기 때문에 사내 팀명, 임시 참가자 명단, 회의용 선택지처럼 민감도가 낮지만 외부 공유는 원하지 않는 데이터를 빠르게 다루기에 적합합니다.',
          '다만 개인정보 보호가 매우 중요한 상황이라면 화면 공유 범위, 입력 목록 보관 위치, 캡처본 처리 방식까지 함께 검토해야 합니다. 도구가 브라우저 안에서 실행된다고 해서 운영 과정 전체의 개인정보 리스크가 자동으로 사라지는 것은 아니기 때문입니다.',
        ],
      },
    ],
    faq: [
      {
        q: '동일한 목록으로 다시 실행하면 결과가 바뀌나요?',
        a: '네. 브라우저에서 목록을 다시 섞기 때문에 실행할 때마다 다른 결과가 나올 수 있습니다.',
      },
      {
        q: '법적 효력이 필요한 추첨에도 써도 되나요?',
        a: '이 도구는 일상적인 운영 편의를 위한 용도입니다. 법적 분쟁 가능성이 있는 공식 추첨이라면 별도의 기록 체계와 감사 가능한 시스템을 권장합니다.',
      },
      {
        q: '중복 항목은 자동으로 제거되나요?',
        a: '완전히 동일한 문자열은 한 번만 반영됩니다. 이름과 부서처럼 구분값이 필요하면 입력 단계에서 함께 적어 주세요.',
      },
    ],
    relatedGuides: ['article-2.html', 'article-1.html'],
    schemaCategory: 'UtilitiesApplication',
  },
  {
    slug: 'percentage-calculator',
    outputId: 'percentage-output',
    title: '퍼센트 변화 계산기',
    category: '분석 지원',
    summary: '기준값과 결과값을 입력하면 변화율, 차이, 배수를 함께 계산합니다.',
    description: '가격 인상, 할인율, 목표 대비 실적, 전년 대비 수치처럼 퍼센트 보고가 필요한 순간에 쓰는 실무형 계산기입니다.',
    ctaLabel: '계산하기',
    outputTitle: '계산 결과',
    useCases: ['매출 변화율 보고', '할인율 계산', '성과 리뷰'],
    heroPoints: ['변화율과 절대값 차이 동시 표시', '증가/감소 자동 판별', '보고서 실수 줄이기'],
    form: `
      <form id="percentage-form" class="tool-form">
        <div class="field-grid">
          <div class="field-group">
            <label for="percentage-before">기준값</label>
            <input id="percentage-before" name="before" type="number" step="0.01" placeholder="예: 120000" />
          </div>
          <div class="field-group">
            <label for="percentage-after">결과값</label>
            <input id="percentage-after" name="after" type="number" step="0.01" placeholder="예: 138000" />
          </div>
        </div>
        <p class="helper-text">예산, 단가, 방문자 수, 전환율의 분자처럼 같은 기준의 수치를 넣어 주세요.</p>
        <button class="button" type="submit">계산하기</button>
      </form>
    `,
    sections: [
      {
        title: '퍼센트 계산이 자주 오해되는 이유',
        paragraphs: [
          '퍼센트는 작은 기호 하나지만 해석은 생각보다 까다롭습니다. 20% 할인과 20% 증가, 20%p 상승은 서로 다른 의미인데도 실제 문서에서는 이 표현이 뒤섞여 사용됩니다. 그래서 회의 중에는 모두 이해했다고 생각했지만, 실행 단계에서 숫자 해석이 달라지는 일이 자주 생깁니다.',
          '이 계산기는 “얼마나 달라졌는가”와 “원래 값 대비 몇 퍼센트인가”를 동시에 보여주는 방식을 택합니다. 변화율만 단독으로 제시하면 체감이 어려운 경우가 많기 때문에 절대값 차이와 배수 정보도 함께 확인하도록 구성했습니다.',
        ],
      },
      {
        title: '보고서에 함께 적으면 좋은 항목',
        paragraphs: [
          '실무 보고서에서는 퍼센트 변화율만 단독으로 적지 않는 편이 안전합니다. 예를 들어 50% 증가라는 표현은 매우 커 보이지만, 실제로는 2건에서 3건으로 늘어난 것일 수도 있습니다. 반대로 절대값만 적으면 변화의 강도를 놓칠 수 있습니다.',
          '그래서 기준값, 결과값, 절대 차이, 변화율을 한 세트로 적는 습관이 중요합니다. 이 도구는 그 네 가지를 한 번에 정리해 주기 때문에 광고 성과, 물가 변동, 가격표 개편 같은 문서 작업에서 특히 자주 쓰입니다.',
        ],
      },
      {
        title: '할인율이나 인상률에 바로 적용하는 팁',
        paragraphs: [
          '상품 가격이나 용역 단가를 다룰 때는 세전/세후 기준이 섞이지 않도록 먼저 기준을 통일해야 합니다. 실제 현장에서는 VAT 포함 가격과 제외 가격이 뒤섞이면서 퍼센트가 틀어지는 경우가 많습니다.',
          '또한 퍼센트 수치가 큰 경우일수록 분모가 무엇인지 문장으로 다시 적어 두는 편이 좋습니다. “기존 가격 대비 18.3% 인상”처럼 기준을 분명히 적으면 수치를 보는 사람이 같은 계산식을 떠올릴 가능성이 높아집니다.',
        ],
      },
    ],
    faq: [
      {
        q: '기준값이 0일 때는 왜 계산할 수 없나요?',
        a: '변화율은 기준값을 분모로 사용하기 때문에 0을 기준으로 한 퍼센트 계산은 정의하기 어렵습니다.',
      },
      {
        q: '증가율과 감소율을 따로 계산해야 하나요?',
        a: '아니요. 결과값이 기준값보다 크면 증가, 작으면 감소로 자동 표시됩니다.',
      },
      {
        q: '퍼센트포인트 계산기인가요?',
        a: '이 페이지는 일반적인 변화율 계산에 초점을 맞춥니다. 비율 자체를 다룰 때는 퍼센트와 퍼센트포인트를 구분해 별도 문구를 적어 주세요.',
      },
    ],
    relatedGuides: ['article-3.html'],
    schemaCategory: 'FinanceApplication',
  },
  {
    slug: 'date-difference',
    outputId: 'date-difference-output',
    title: '날짜 차이 계산기',
    category: '일정 관리',
    summary: '두 날짜 사이의 달력 일수, 포함 기준 일수, 평일 기준 일수를 함께 계산합니다.',
    description: '캠페인 기간, 계약 일정, 휴가 길이, 제작 리드타임처럼 날짜 간격을 빠르게 확인해야 할 때 쓰는 일정 계산 도구입니다.',
    ctaLabel: '기간 계산',
    outputTitle: '기간 결과',
    useCases: ['캠페인 일정', '프로젝트 리드타임', '휴가 기간 정리'],
    heroPoints: ['달력 일수와 평일 수 동시 확인', '포함 기준 계산 제공', '브라우저에서 즉시 실행'],
    form: `
      <form id="date-difference-form" class="tool-form">
        <div class="field-grid">
          <div class="field-group">
            <label for="date-difference-start">시작일</label>
            <input id="date-difference-start" name="start" type="date" />
          </div>
          <div class="field-group">
            <label for="date-difference-end">종료일</label>
            <input id="date-difference-end" name="end" type="date" />
          </div>
        </div>
        <p class="helper-text">평일 계산은 토요일과 일요일만 제외하며 공휴일은 별도로 반영하지 않습니다.</p>
        <button class="button" type="submit">기간 계산</button>
      </form>
    `,
    sections: [
      {
        title: '같은 날짜 차이라도 숫자가 달라지는 이유',
        paragraphs: [
          '실무에서 날짜를 계산하다 보면 “3일 일정”이라는 말이 서로 다른 뜻으로 쓰이는 경우가 많습니다. 3월 1일부터 3월 3일까지를 포함 기준으로 보면 3일이지만, 순수 차이만 보면 2일이기 때문입니다. 이 차이를 설명하지 않으면 팀 내에서 일정 이해가 엇갈립니다.',
          '그래서 이 도구는 달력 기준 차이와 포함 기준 일수를 함께 보여줍니다. 프로젝트 킥오프 문서나 일정 공유 메시지를 작성할 때 어떤 기준을 썼는지 바로 설명할 수 있도록 돕기 위한 구성입니다.',
        ],
      },
      {
        title: '평일 기준 일수는 어디에 유용한가요?',
        paragraphs: [
          '리드타임을 계산할 때는 달력 일수보다 평일 수가 더 중요할 때가 많습니다. 디자인 검토, 개발 일정, 법무 검토처럼 실제 업무가 진행되는 날만 세어야 예측이 정확해지기 때문입니다.',
          '물론 공휴일이나 회사별 휴무 정책은 별도로 고려해야 합니다. 이 페이지의 평일 계산은 토요일과 일요일을 제외한 기본값을 제공하므로, 팀마다 다른 휴무 조건은 결과를 참고한 뒤 다시 조정하면 됩니다.',
        ],
      },
      {
        title: '일정 커뮤니케이션에서 자주 생기는 실수',
        paragraphs: [
          '일정이 촉박할수록 사람들은 날짜를 감각적으로 이해합니다. “다음 주 초”, “이번 달 말”, “3주 정도” 같은 표현은 편하지만 문서화하면 서로 다른 이미지를 떠올리게 합니다. 그래서 일정이 중요한 작업일수록 수치를 먼저 맞추는 습관이 필요합니다.',
          '정확한 날짜 차이를 확인한 뒤, 그 위에 여유일과 검토일을 얹는 방식이 더 안전합니다. 계산 도구는 화려하지 않지만 일정 관리에서는 이런 기초 숫자가 가장 큰 오해를 줄여 줍니다.',
        ],
      },
    ],
    faq: [
      {
        q: '종료일이 시작일보다 빠르면 어떻게 되나요?',
        a: '음수 값으로 표시됩니다. 일정이 거꾸로 입력된 경우를 빠르게 확인하는 데 도움이 됩니다.',
      },
      {
        q: '공휴일도 자동으로 제외되나요?',
        a: '아니요. 현재는 주말만 제외합니다. 국가별 공휴일이나 사내 휴무는 별도로 반영해 주세요.',
      },
      {
        q: '계약 기간 계산에도 써도 되나요?',
        a: '초안 확인용으로는 유용하지만, 법적 계약일 산정은 문서 기준과 관할 규정에 맞춰 별도 검토해야 합니다.',
      },
    ],
    relatedGuides: ['article-4.html', 'article-1.html'],
    schemaCategory: 'UtilitiesApplication',
  },
  {
    slug: 'meeting-cost',
    outputId: 'meeting-cost-output',
    title: '회의 비용 계산기',
    category: '운영 효율',
    summary: '참여 인원, 시간, 평균 시급을 입력하면 한 번의 회의가 쓰는 인건비를 추정합니다.',
    description: '반복 회의의 비용 감각을 수치로 확인하고, 회의 길이와 참석 범위를 조정할 근거를 만드는 데 쓰는 팀 운영 도구입니다.',
    ctaLabel: '비용 계산',
    outputTitle: '회의 비용 결과',
    useCases: ['정례 회의 검토', '리더십 보고', '운영 효율 개선'],
    heroPoints: ['1회 비용과 월간 비용 동시 계산', '10분 단축 시 절감 추정', '운영 의사결정 근거 제공'],
    form: `
      <form id="meeting-cost-form" class="tool-form">
        <div class="field-grid">
          <div class="field-group">
            <label for="meeting-cost-people">참여 인원</label>
            <input id="meeting-cost-people" name="people" type="number" min="1" step="1" placeholder="예: 7" />
          </div>
          <div class="field-group">
            <label for="meeting-cost-hourly-rate">평균 시급(원)</label>
            <input id="meeting-cost-hourly-rate" name="hourlyRate" type="number" min="1" step="1000" placeholder="예: 45000" />
          </div>
          <div class="field-group">
            <label for="meeting-cost-minutes">회의 길이(분)</label>
            <input id="meeting-cost-minutes" name="minutes" type="number" min="1" step="1" placeholder="예: 45" />
          </div>
          <div class="field-group">
            <label for="meeting-cost-monthly-count">월간 횟수</label>
            <input id="meeting-cost-monthly-count" name="monthlyCount" type="number" min="1" step="1" placeholder="예: 8" />
          </div>
        </div>
        <button class="button" type="submit">비용 계산</button>
      </form>
    `,
    sections: [
      {
        title: '회의 비용을 숫자로 보는 이유',
        paragraphs: [
          '많은 팀이 회의의 필요성은 토론하면서도 회의의 비용은 거의 계산하지 않습니다. 하지만 참석자가 여럿이고 반복 주기가 짧을수록 회의는 눈에 보이지 않는 운영 비용으로 빠르게 커집니다. 특히 여러 직무가 동시에 모이는 정례 회의일수록 한 번의 10분이 생각보다 비싸집니다.',
          '회의 비용 계산기는 사람을 숫자로 환원하려는 도구가 아니라, 시간을 어떻게 더 잘 쓸지 대화를 시작하기 위한 장치입니다. 무조건 회의를 줄이라는 뜻이 아니라, 정말 필요한 사람과 정말 필요한 안건이 모였는지 점검할 계기를 만들어 줍니다.',
        ],
      },
      {
        title: '결과를 어떻게 해석하면 좋을까요?',
        paragraphs: [
          '이 페이지에서 계산되는 비용은 평균 시급을 기반으로 한 단순 추정치입니다. 실제로는 준비 시간, 회의 후속 작업, 문서 공유, 맥락 전환 비용까지 포함하면 더 커질 수 있습니다. 그렇다고 해서 수치를 절대값처럼 받아들일 필요는 없습니다.',
          '핵심은 비교 기준을 만드는 데 있습니다. 지난달과 이번 달의 회의 구조를 비교하거나, 60분 회의를 40분으로 줄였을 때 절감되는 비용을 보는 식의 상대 비교가 더 실용적입니다. 팀 운영 도구는 정답을 주기보다 개선 방향을 보여줄 때 가장 유용합니다.',
        ],
      },
      {
        title: '회의를 없애기보다 구조를 개선하는 데 사용하세요',
        paragraphs: [
          '모든 회의가 낭비는 아닙니다. 문제는 목적이 모호하거나 참석자가 과도하거나, 읽을 수 있는 내용을 굳이 회의에서 다시 공유하는 패턴입니다. 비용을 확인한 뒤에는 “없앨까?”보다 “어떻게 바꿀까?”를 먼저 질문하는 편이 건강합니다.',
          '예를 들어 읽기 자료를 사전 배포하고 의사결정 안건만 회의에서 다루거나, 고정 참석자 대신 안건별 참석 체계로 바꾸거나, 50분 회의를 40분으로 표준화하는 식의 개선은 실제로 체감이 큽니다. 작은 조정 하나가 월 단위로는 상당한 시간을 돌려줍니다.',
        ],
      },
    ],
    faq: [
      {
        q: '평균 시급을 어떻게 정해야 하나요?',
        a: '팀 전체의 평균 인건비 감각을 파악하기 위한 추정치로 입력해도 충분합니다. 정확한 급여 계산 용도는 아닙니다.',
      },
      {
        q: '준비 시간과 후속 작업도 포함하나요?',
        a: '현재 계산은 회의 본 시간만 반영합니다. 실제 운영 비용은 더 클 수 있으므로 참고치로 보세요.',
      },
      {
        q: '회의를 줄이는 용도로만 써야 하나요?',
        a: '아니요. 더 짧고 더 집중된 회의를 설계하는 근거를 만들기 위한 도구로 보는 편이 적절합니다.',
      },
    ],
    relatedGuides: ['article-5.html'],
    schemaCategory: 'BusinessApplication',
  },
  {
    slug: 'lotto-randomizer',
    outputId: 'lotto-randomizer-output',
    title: '로또 번호 샘플러',
    category: '엔터테인먼트',
    summary: '브라우저에서 무작위 번호를 조합해 보는 오락용 샘플러입니다.',
    description: '기존 Lotto Dreamer 도구를 안내하는 소개 페이지입니다. 어떤 기능을 제공하는지, 무엇을 보장하지 않는지, 왜 엔터테인먼트 도구로 분류하는지 설명합니다.',
    ctaLabel: 'Lotto Dreamer 열기',
    outputTitle: '이 도구에 대해',
    useCases: ['개인 오락용 번호 조합', '무작위 샘플 보기', '브라우저 기반 난수 체험'],
    heroPoints: ['서버 전송 없이 브라우저 내 계산', '당첨 예측 기능 없음', '오락 목적 사용 권장'],
    form: `
      <div class="tool-form">
        <div class="callout callout--warning">
          <strong>중요 안내</strong><br />
          이 도구는 당첨 확률을 높이거나 결과를 예측하는 서비스가 아닙니다. 단순히 무작위 숫자 조합을 생성해 보는 엔터테인먼트 도구입니다.
        </div>
        <a class="button" href="/lotto-generator/dist/index.html">Lotto Dreamer 열기</a>
      </div>
    `,
    sections: [
      {
        title: '왜 별도 설명 페이지를 두었나요?',
        paragraphs: [
          '이 사이트는 실용적인 브라우저 도구를 중심으로 운영되지만, 로또 번호 샘플러처럼 오락적 성격이 강한 도구도 일부 포함합니다. 다만 이런 페이지는 기능보다 맥락 설명이 더 중요합니다. 무엇을 할 수 있는지보다 무엇을 보장하지 않는지를 먼저 분명히 해야 사용자가 오해하지 않기 때문입니다.',
          '그래서 기존 Lotto Dreamer는 단순 진입 링크만 두지 않고, 이 소개 페이지를 통해 범위와 한계를 먼저 설명하도록 구성했습니다. 사이트 전체가 특정 사행성 주제에 치우쳐 보이지 않도록, 다른 실용 도구와 분리된 카테고리로 안내합니다.',
        ],
      },
      {
        title: '이 도구가 실제로 하는 일',
        paragraphs: [
          'Lotto Dreamer는 브라우저 안에서 난수를 생성하고, 중복 없는 숫자 조합을 보기 좋게 보여주는 인터랙티브 도구입니다. 사용 기록을 가입 계정에 저장하지 않으며, 번호 생성 자체를 위해 별도 서버 요청을 보내지 않습니다.',
          '즉, 이 도구는 무작위 샘플을 시각적으로 보여주는 인터페이스에 가깝습니다. 통계 분석, 과거 당첨 번호 학습, 예측 모델링 같은 기능은 제공하지 않으며, 그러한 기능을 제공하는 것처럼 암시하지도 않습니다.',
        ],
      },
      {
        title: '무엇을 기대하면 안 되나요?',
        paragraphs: [
          '무작위 조합 생성기는 편의 도구일 뿐 전략 도구가 아닙니다. 특정 숫자 패턴을 추천하거나, 사용자 성향에 맞는 조합을 제안하거나, 실제 구매 결과를 개선해 준다고 주장하지 않습니다. 결과적으로 이 페이지는 “당첨 가능성을 높이는 서비스”가 아니라 “무작위 숫자를 생성해 보는 체험형 도구”로 이해하는 편이 맞습니다.',
          '오락용 기능을 사용할 때는 언제나 책임 있는 소비 판단이 우선되어야 합니다. 사이트 운영자는 이 도구의 결과로 발생하는 경제적 판단이나 구매 행위를 권장하지 않으며, 실질적인 금전 의사결정을 돕기 위한 서비스를 제공하지도 않습니다.',
        ],
      },
    ],
    faq: [
      {
        q: '과거 당첨 번호를 학습해서 추천하나요?',
        a: '아니요. 과거 데이터 기반 예측 기능은 제공하지 않습니다.',
      },
      {
        q: '이 도구가 당첨 확률을 높여 주나요?',
        a: '아니요. 무작위 숫자 조합을 생성하는 오락용 도구일 뿐, 당첨 가능성 향상을 보장하지 않습니다.',
      },
      {
        q: '입력한 정보가 저장되나요?',
        a: '번호 생성 자체는 브라우저 내에서 처리되며, 로그인이나 개인 계정 저장 기능을 요구하지 않습니다.',
      },
    ],
    relatedGuides: ['article-6.html'],
    schemaCategory: 'EntertainmentApplication',
  },
];

const GUIDES = [
  {
    fileName: 'article-1.html',
    title: '브라우저 기반 도구가 개인정보 측면에서 유리한 이유',
    category: 'Privacy',
    description: '작은 유틸리티를 고를 때 왜 “서버로 보내는가, 브라우저에서 처리하는가”를 먼저 봐야 하는지 정리한 가이드입니다.',
    summary: '브라우저 안에서 계산하는 도구는 단순히 빠르기만 한 것이 아니라, 입력 데이터가 어디로 이동하는지 설명하기 쉬워 신뢰 형성에도 유리합니다.',
    readTime: '6분',
    sections: [
      {
        title: '입력 데이터가 이동하는 순간 리스크가 생깁니다',
        paragraphs: [
          '우리가 가볍게 쓰는 계산기나 정리 도구는 대부분 “텍스트를 넣고 결과를 본다”는 구조를 가집니다. 그런데 같은 기능이라도 어떤 서비스는 입력값을 서버로 보내고, 어떤 서비스는 브라우저 안에서 바로 계산합니다. 사용자 입장에서는 둘 다 비슷해 보이지만, 데이터가 이동하는지 여부는 리스크를 크게 바꿉니다.',
          '서버 전송이 일어나는 순간에는 최소한 저장 여부, 처리 목적, 제3자 위탁, 접근 권한 같은 질문이 따라옵니다. 반대로 브라우저 내부 계산 도구는 이런 질문의 범위가 훨씬 좁아집니다. 물론 브라우저 도구도 완전무결하지는 않지만, 적어도 입력값이 외부로 나가지 않는다는 사실을 설명하기는 훨씬 쉽습니다.',
        ],
      },
      {
        title: '작은 업무일수록 브라우저 도구가 더 잘 맞을 때가 있습니다',
        paragraphs: [
          '랜덤 추첨, 날짜 차이 계산, 간단한 퍼센트 계산처럼 반복은 잦지만 시스템 도입까지는 필요 없는 일들이 있습니다. 이런 업무는 속도와 접근성이 중요하고, 팀원이 여러 곳에서 같은 화면을 열어도 결과가 쉽게 이해되어야 합니다.',
          '브라우저 기반 유틸리티는 바로 이런 틈새에 잘 맞습니다. 설치가 필요 없고, 접근 권한을 복잡하게 설정할 필요도 없으며, 입력 데이터가 민감하지 않은 범위라면 작업을 신속하게 끝낼 수 있습니다. 실무에서는 이 “작지만 자주 쓰는 작업”의 마찰을 줄이는 것만으로도 체감 효율이 큽니다.',
        ],
      },
      {
        title: '그렇다고 모든 문제를 브라우저 도구로 해결할 수는 없습니다',
        paragraphs: [
          '브라우저 안에서 계산된다는 사실이 모든 신뢰 문제를 해결해 주는 것은 아닙니다. 법적 근거가 필요한 계산, 감사 추적이 필요한 공식 절차, 팀 전체 기록을 남겨야 하는 작업은 결국 별도 시스템이 필요합니다. 브라우저 도구는 빠른 처리와 개인 혹은 소규모 팀의 운영 편의에 강하고, 조직 차원의 기록 관리에는 한계가 있습니다.',
          '중요한 것은 도구의 한계를 명확히 공개하는 태도입니다. 어디까지 자동화되는지, 어떤 데이터는 저장되지 않는지, 어떤 절차는 사용자가 추가로 관리해야 하는지 분명히 써 두면 사용자는 훨씬 안심하고 도구를 선택할 수 있습니다.',
        ],
      },
      {
        title: '작은 유틸리티 사이트가 신뢰를 얻는 방식',
        paragraphs: [
          '결국 신뢰는 기능만으로 생기지 않습니다. 누가 운영하는지, 문의할 방법이 있는지, 개인정보와 광고 정책이 어떻게 정리되어 있는지, 업데이트 기준이 무엇인지 같은 정보가 함께 공개되어야 합니다. 브라우저 기반 계산은 신뢰의 시작점이지, 전부가 아닙니다.',
          '그래서 Product Builder Hub는 도구 소개 페이지와 별도로 운영 원칙, 편집 기준, 개인정보 처리 내용을 공개합니다. 사용자가 기능을 쓰는 순간뿐 아니라, 사이트 자체를 평가하는 순간에도 충분한 설명을 제공하는 것이 장기적으로 더 중요하다고 보기 때문입니다.',
        ],
      },
    ],
    relatedTools: ['random-picker', 'date-difference'],
  },
  {
    fileName: 'article-2.html',
    title: '랜덤 추첨을 공정하게 보이게 만드는 운영 체크리스트',
    category: 'Operations',
    description: '도구의 무작위성보다 운영 절차의 투명성이 더 중요한 이유를 정리한 랜덤 추첨 운영 가이드입니다.',
    summary: '랜덤 추첨은 계산 방식보다 참여자가 “납득할 수 있었는가”가 더 중요합니다. 공정해 보이게 만드는 기본 절차를 체크리스트 형식으로 정리했습니다.',
    readTime: '5분',
    sections: [
      {
        title: '무작위성은 기술 문제이기도 하지만 설명 문제이기도 합니다',
        paragraphs: [
          '랜덤 추첨에서 사람들은 종종 도구의 품질만 이야기합니다. 하지만 실제 운영에서는 결과보다 과정 설명이 더 크게 작용합니다. 참여자들은 보통 “정말 랜덤인가?”보다 “목록이 제대로 들어갔는가?”와 “운영자가 조건을 중간에 바꾸지 않았는가?”를 더 민감하게 봅니다.',
          '그래서 랜덤 도구를 쓰는 순간에도 운영자는 몇 가지 기본 조건을 먼저 공개해야 합니다. 추첨 대상의 범위, 중복 허용 여부, 추첨 개수, 제외 대상이 있다면 그 기준까지 미리 말해 두면 결과를 둘러싼 불필요한 감정 소모를 크게 줄일 수 있습니다.',
        ],
      },
      {
        title: '체크리스트 1: 입력 목록을 함께 확인하세요',
        paragraphs: [
          '목록이 잘못 들어가면 어떤 알고리즘을 써도 공정하지 않습니다. 이름이 누락되거나, 같은 사람이 두 번 들어가거나, 구분값이 모호하면 결과에 대한 신뢰가 무너집니다. 그래서 추첨 직전에 목록을 한 번 함께 확인하는 절차만으로도 운영 안정성이 크게 높아집니다.',
          '온라인 행사라면 화면 공유가 유용하고, 오프라인 모임이라면 목록을 짧게 읽어 주는 것만으로도 충분할 수 있습니다. 중요한 것은 “도구가 알아서 했다”가 아니라 “운영자가 기본 검증을 했다”는 사실을 보여주는 것입니다.',
        ],
      },
      {
        title: '체크리스트 2: 재실행 기준을 미리 정해 두세요',
        paragraphs: [
          '추첨 결과가 나오고 나서 “다시 한 번만 돌려 보자”라는 말이 나오면 가장 큰 갈등이 생깁니다. 그래서 재실행이 가능한 상황과 불가능한 상황을 미리 정해 두는 편이 안전합니다. 예를 들어 당첨자가 자격 요건을 충족하지 못하는 경우에만 재추첨한다는 식의 기준입니다.',
          '이 기준이 없으면 결과가 운영자의 취향에 따라 바뀐다는 인상을 줄 수 있습니다. 랜덤 도구는 공정성을 보조하지만, 공정성의 최종 책임은 결국 운영자에게 있다는 점을 잊지 않는 것이 중요합니다.',
        ],
      },
      {
        title: '체크리스트 3: 기록이 필요한 이벤트인지 먼저 구분하세요',
        paragraphs: [
          '소규모 회의나 아이스브레이킹 활동에서는 화면만 보여 주고 끝내도 충분합니다. 하지만 경품 지급, 교육 인증, 사내 선발처럼 이후 확인이 필요한 이벤트라면 결과 캡처, 참여자 명단 보관, 담당자 기록 같은 최소한의 흔적을 남겨야 합니다.',
          '브라우저 기반 랜덤 추첨기는 속도와 접근성이 장점이지만, 기록 관리까지 자동으로 대신해 주지는 않습니다. 따라서 이벤트의 무게에 따라 도구 선택과 운영 절차를 함께 조정하는 것이 바람직합니다.',
        ],
      },
    ],
    relatedTools: ['random-picker'],
  },
  {
    fileName: 'article-3.html',
    title: '퍼센트 변화율을 보고서에 쓸 때 자주 생기는 실수 6가지',
    category: 'Analysis',
    description: '증가율, 감소율, 절대값 차이를 섞어 쓰면서 생기는 대표적인 실수를 정리한 실무 가이드입니다.',
    summary: '퍼센트는 보고서에서 자주 쓰이지만 가장 자주 오해되는 숫자이기도 합니다. 수치를 더 분명하게 전달하기 위한 기본 원칙을 정리했습니다.',
    readTime: '7분',
    sections: [
      {
        title: '실수 1: 절대값 차이와 변화율을 같은 것으로 취급하기',
        paragraphs: [
          '방문자 수가 100명에서 120명으로 늘었을 때 차이는 20명이고 변화율은 20%입니다. 이 둘은 함께 봐야 의미가 있습니다. 그런데 현장에서는 “20 늘었다”와 “20% 늘었다”가 비슷한 뉘앙스로 쓰이면서 판단 기준이 흐려집니다.',
          '그래서 보고서 문장은 가능하면 기준값과 결과값을 같이 적는 편이 좋습니다. 숫자를 보는 사람은 계산 과정이 아니라 결과만 보게 되는 경우가 많기 때문에, 분모를 문장 속에 넣어 두는 습관이 큰 차이를 만듭니다.',
        ],
      },
      {
        title: '실수 2: 퍼센트와 퍼센트포인트를 구분하지 않기',
        paragraphs: [
          '전환율이 2%에서 3%로 올랐다면 1%p 상승이면서 동시에 50% 증가입니다. 둘 다 맞는 표현이지만 맥락이 다릅니다. 그런데 이 구분을 놓치면 같은 자료를 두고 어떤 사람은 작은 변화로, 다른 사람은 큰 변화로 이해할 수 있습니다.',
          '비율 자체를 다루는 문서라면 퍼센트포인트와 변화율을 따로 써 주는 것이 가장 안전합니다. 숫자를 더 많이 적는 것이 아니라, 오해 가능성을 줄이는 방향으로 표현을 정리하는 셈입니다.',
        ],
      },
      {
        title: '실수 3: 기준이 바뀌었는데 비교를 계속하는 것',
        paragraphs: [
          '가격 비교나 실적 비교에서 가장 자주 생기는 문제는 기준이 중간에 바뀌는 것입니다. VAT 포함 금액과 제외 금액이 섞이거나, 월간 데이터와 주간 데이터를 같은 축에서 비교하면 퍼센트는 아무리 정확히 계산해도 해석이 틀어집니다.',
          '그래서 계산보다 앞서 단위를 맞추는 작업이 필요합니다. 퍼센트 계산기는 결국 마지막 단계의 산식일 뿐이고, 그보다 앞선 기준 통일이 더 중요합니다.',
        ],
      },
      {
        title: '실수 4: 숫자가 작을수록 변화율이 과장되어 보인다는 점을 잊기',
        paragraphs: [
          '2건에서 4건이 되면 100% 증가입니다. 변화율만 보면 엄청난 성장처럼 느껴지지만, 실제 수치는 2건 차이에 불과합니다. 반대로 대규모 모수에서는 3% 차이만으로도 큰 영향을 줄 수 있습니다.',
          '이 때문에 변화율이 클수록 절대값 차이를 반드시 함께 보여주는 편이 좋습니다. 사람은 큰 퍼센트에 먼저 반응하고, 실제 규모는 나중에 이해하는 경향이 있기 때문입니다.',
        ],
      },
      {
        title: '실수 5: 반올림 규칙을 문서마다 다르게 쓰기',
        paragraphs: [
          '보고서 일부는 소수점 첫째 자리까지 쓰고, 다른 부분은 정수로 반올림하면 비교가 어렵습니다. 특히 여러 사람이 동시에 작성하는 문서에서는 같은 데이터도 표현 방식이 달라 보여 신뢰도가 떨어질 수 있습니다.',
          '팀 차원의 반올림 기준을 정하고 계산 도구에서도 같은 단위를 유지하는 것이 좋습니다. 작은 규칙처럼 보여도 반복 문서에서는 큰 가독성 차이를 만듭니다.',
        ],
      },
      {
        title: '실수 6: 변화율만으로 결론을 내리기',
        paragraphs: [
          '퍼센트는 상황을 압축해 보여 주지만, 결론 자체가 되지는 않습니다. 변화 이유가 프로모션 때문인지, 기준 시점의 계절성 때문인지, 일회성 이벤트 때문인지까지 함께 봐야 의미가 생깁니다.',
          '좋은 보고서는 퍼센트 계산으로 끝나지 않고 해석 기준을 덧붙입니다. 그래서 퍼센트 도구는 보고서의 시작점이지, 마지막 문장을 대신해 주는 장치는 아닙니다.',
        ],
      },
    ],
    relatedTools: ['percentage-calculator'],
  },
  {
    fileName: 'article-4.html',
    title: '일정 계산에서 포함 기준과 제외 기준을 구분해야 하는 이유',
    category: 'Planning',
    description: '같은 날짜 범위도 계산 기준에 따라 결과가 달라지는 이유와 실무 커뮤니케이션 팁을 정리한 글입니다.',
    summary: '날짜 차이는 단순해 보여도 기준 설명이 없으면 가장 쉽게 오해가 생기는 숫자입니다. 일정 관리에서 자주 생기는 착오를 정리했습니다.',
    readTime: '5분',
    sections: [
      {
        title: '일정 숫자가 엇갈리는 가장 흔한 출발점',
        paragraphs: [
          '“3일 일정”이라는 말은 일상에서는 별 문제 없어 보입니다. 하지만 계약 일정, 제작 일정, 마감 일정처럼 실제 업무와 연결되면 바로 혼란이 생깁니다. 시작일과 종료일을 둘 다 포함하는지, 순수 차이만 계산하는지에 따라 결과가 달라지기 때문입니다.',
          '예를 들어 월요일부터 수요일까지의 작업을 3일로 보는 팀도 있고 2일 차이로 보는 팀도 있습니다. 둘 중 하나가 틀렸다기보다, 기준을 먼저 합의하지 않았기 때문에 생기는 문제입니다.',
        ],
      },
      {
        title: '평일 기준 계산은 또 다른 층위의 문제입니다',
        paragraphs: [
          '실제 업무는 주말에 멈추는 경우가 많기 때문에, 달력 일수만 보면 일정이 과도하게 길어 보이거나 짧아 보일 수 있습니다. 그래서 프로젝트 일정에서는 평일 기준 일수를 별도로 보는 경우가 많습니다.',
          '다만 평일 기준 계산도 공휴일, 대체휴무, 회사별 휴무 정책이 섞이면 다시 달라집니다. 일정 계산기는 기본 구조를 빠르게 보여주지만, 최종 일정은 항상 팀의 실제 근무 리듬을 반영해 다듬어야 합니다.',
        ],
      },
      {
        title: '좋은 일정 커뮤니케이션은 계산 결과를 문장으로 다시 적습니다',
        paragraphs: [
          '수치만 던지는 일정 공유는 대부분 오해를 남깁니다. “총 12일”이라고 적는 대신 “3월 4일부터 3월 15일까지, 주말 제외 평일 10일”처럼 계산 기준을 함께 적어 두면 상대방이 같은 그림을 떠올리기 쉬워집니다.',
          '일정을 둘러싼 갈등은 대개 큰 전략 문제가 아니라 작은 표현 차이에서 시작됩니다. 그래서 계산 도구를 쓴 뒤에는 그 결과를 설명 가능한 문장으로 한 번 더 바꾸는 과정이 중요합니다.',
        ],
      },
      {
        title: '작은 계산 차이가 왜 일정 전체를 흔들까요?',
        paragraphs: [
          '기획, 디자인, 개발, 검수처럼 단계가 이어지는 작업에서는 하루 차이도 전체 일정에 연쇄적으로 영향을 줍니다. 그래서 일정 계산은 행정적인 숫자가 아니라, 팀의 기대치를 맞추는 기초 작업이라고 볼 수 있습니다.',
          '포함 기준과 제외 기준을 구분하는 습관은 대단한 관리 기술이 아니라 기본적인 소통 태도에 가깝습니다. 숫자를 빨리 내는 것보다 같은 숫자를 함께 이해하는 것이 더 중요하기 때문입니다.',
        ],
      },
    ],
    relatedTools: ['date-difference'],
  },
  {
    fileName: 'article-5.html',
    title: '회의 비용을 계산해 보면 보이는 팀 운영 습관',
    category: 'Team Ops',
    description: '회의 비용을 금액으로 환산했을 때 팀이 무엇을 다시 보게 되는지 정리한 운영 개선 글입니다.',
    summary: '회의 비용 계산은 회의를 없애자는 주장보다, 시간이 어디에 쓰이고 있는지 더 선명하게 보게 만드는 도구에 가깝습니다.',
    readTime: '6분',
    sections: [
      {
        title: '회의는 무료처럼 느껴지지만 실제로는 가장 비싼 협업 방식일 수 있습니다',
        paragraphs: [
          '회의는 대개 달력 초대장 한 장으로 시작되기 때문에 비용 감각이 잘 드러나지 않습니다. 하지만 여러 직무가 동시에 모이는 순간, 회의는 그 시간 동안 각자의 업무를 멈추게 만드는 구조가 됩니다. 특히 의사결정자가 많고 참석 범위가 넓을수록 비용은 눈에 띄게 커집니다.',
          '그럼에도 팀이 회의를 반복하는 이유는 즉시성을 얻기 쉽기 때문입니다. 한 번에 같은 정보를 보고, 질문하고, 결론을 내릴 수 있다는 장점은 분명합니다. 그래서 중요한 것은 회의 자체를 악으로 보는 태도가 아니라, 그 대가를 인식하는 태도입니다.',
        ],
      },
      {
        title: '비용을 계산하면 “누가 꼭 들어와야 하는가”가 선명해집니다',
        paragraphs: [
          '회의 초대장을 만들 때는 배려 차원에서 많은 사람을 넣는 경우가 많습니다. 하지만 정보 공유만 필요한 사람과 의사결정이 필요한 사람을 구분하지 않으면 회의는 점점 비싸지고 길어집니다. 비용 계산은 이 구분을 다시 묻게 만드는 장치입니다.',
          '특정 회의가 매주 반복된다면 더 그렇습니다. 한 번의 10분은 작아 보여도 월간 비용으로 보면 결코 작지 않습니다. 그래서 회의 비용 계산은 사람을 통제하기 위한 도구보다, 참석 기준과 안건 구조를 정리하기 위한 질문지에 가깝습니다.',
        ],
      },
      {
        title: '회의를 줄이지 않아도 생산성을 높일 수 있습니다',
        paragraphs: [
          '회의 비용을 본 뒤 가장 흔한 반응은 “회의를 없애자”이지만, 현실적인 대안은 구조 개선인 경우가 많습니다. 예를 들어 읽기 자료를 미리 배포하면 설명 시간을 줄일 수 있고, 상태 공유와 의사결정 회의를 분리하면 참석 범위를 더 선명하게 잡을 수 있습니다.',
          '또한 회의 시간이 길어지는 이유가 준비 부족인지, 의사결정 기준 부재인지, 참여자 과다인지에 따라 해법이 달라집니다. 비용 계산은 문제를 찾아내는 신호이고, 실제 개선은 회의 설계에서 일어납니다.',
        ],
      },
      {
        title: '수치보다 더 중요한 것은 팀 문화입니다',
        paragraphs: [
          '어떤 팀은 비용을 보고도 회의를 유지해야 할 이유가 분명할 수 있습니다. 중요한 고객 미팅이나 리스크 대응 회의는 단순 인건비보다 훨씬 큰 가치를 만들기도 합니다. 그래서 회의 비용 계산을 곧바로 절감 목표와 연결시키는 것은 위험할 수 있습니다.',
          '대신 “이 회의는 이 정도 비용을 쓸 가치가 있는가?”라는 질문을 자연스럽게 던질 수 있다면 이미 효과가 있습니다. 숫자는 결정을 대신하지 않지만, 더 나은 대화를 가능하게 합니다.',
        ],
      },
    ],
    relatedTools: ['meeting-cost'],
  },
  {
    fileName: 'article-6.html',
    title: '로또 번호 생성기는 무엇을 할 수 있고 무엇을 보장하지 않는가',
    category: 'Entertainment',
    description: '무작위 번호 생성기라는 도구의 역할과 한계를 분명히 정리한 엔터테인먼트 도구 안내 글입니다.',
    summary: '로또 번호 생성기는 무작위 조합을 보여주는 도구이지, 당첨을 예측하거나 확률 우위를 제공하는 서비스가 아닙니다.',
    readTime: '5분',
    sections: [
      {
        title: '번호 생성기의 본질은 “무작위 샘플”입니다',
        paragraphs: [
          '로또 번호 생성기를 둘러싼 오해는 대개 기능보다 기대에서 시작됩니다. 어떤 사용자는 단순히 번호를 빠르게 뽑고 싶어 하고, 어떤 사용자는 과거 데이터나 패턴 분석을 기대하기도 합니다. 하지만 무작위 번호 생성기의 본질은 특정 규칙 없이 조합을 만드는 샘플러에 가깝습니다.',
          '즉, 이 도구는 결과를 예측하는 것이 아니라 선택 과정을 단순화합니다. 사람이 임의로 숫자를 고를 때 생기는 편향을 줄이고, 여러 조합을 빠르게 만들어 보는 정도가 핵심 기능입니다.',
        ],
      },
      {
        title: '무엇을 기대하면 안 되는가',
        paragraphs: [
          '무작위 번호 생성기가 당첨 확률을 높여 준다고 기대해서는 안 됩니다. 과거 당첨 번호를 넣어 분석하지 않는 이상 물론 그런 주장을 하기도 어렵지만, 설령 데이터를 참고한다 해도 독립 시행이라는 특성상 실제 우위를 보장할 수는 없습니다.',
          '그래서 책임 있는 도구 운영은 무엇을 하지 않는지도 함께 밝혀야 합니다. 예측, 보장, 우위, 비법 같은 표현은 기능 범위를 오해하게 만들기 쉽습니다. 엔터테인먼트 도구일수록 이 경계선을 더 분명히 그어야 합니다.',
        ],
      },
      {
        title: '브라우저 기반 생성기가 갖는 장점과 한계',
        paragraphs: [
          '브라우저에서 바로 실행되는 생성기는 빠르고 간편합니다. 서버에 결과를 남길 필요가 없고, 입력 절차도 복잡하지 않습니다. 그래서 사용자가 단순 체험이나 오락용으로 번호를 살펴보기에는 적합한 형태입니다.',
          '다만 이 장점이 곧 신뢰의 전부는 아닙니다. 사용자는 여전히 도구가 어떤 의도를 갖고 있는지, 어떤 범위까지 책임지는지 알고 싶어 합니다. 그래서 설명 페이지와 면책 안내, 개인정보 정책을 함께 두는 것이 중요합니다.',
        ],
      },
      {
        title: '운영자가 지켜야 할 가장 중요한 태도',
        paragraphs: [
          '오락용 기능은 과장된 약속보다 절제된 설명이 더 중요합니다. 사용자가 원하지 않는 방향으로 오해하지 않도록 범위를 좁게 설명하고, 책임 있는 판단을 권장하는 것이 바람직합니다. 기능보다 문맥을 먼저 제공하는 이유도 여기에 있습니다.',
          'Product Builder Hub는 로또 번호 생성기를 사이트 전체의 중심 가치로 두지 않고, 여러 브라우저 기반 도구 중 하나의 엔터테인먼트 기능으로 분류합니다. 이는 기능을 감추기 위한 선택이 아니라, 사이트의 실제 정체성을 더 정확하게 드러내기 위한 선택입니다.',
        ],
      },
    ],
    relatedTools: ['lotto-randomizer'],
  },
];

function absoluteUrl(relativePath) {
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return `${SITE.baseUrl}${cleanPath}`;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFile(relativePath, content) {
  const filePath = path.join(ROOT, relativePath);
  ensureDir(filePath);
  fs.writeFileSync(filePath, `${content.trim()}\n`, 'utf8');
}

function cleanGeneratedFiles() {
  const blogDir = path.join(ROOT, 'blog');
  if (fs.existsSync(blogDir)) {
    fs.readdirSync(blogDir)
      .filter((file) => /^article-\d+\.html$/.test(file))
      .forEach((file) => fs.unlinkSync(path.join(blogDir, file)));
  }

  const toolsDir = path.join(ROOT, 'tools');
  if (fs.existsSync(toolsDir)) {
    fs.readdirSync(toolsDir)
      .filter((file) => file.endsWith('.html'))
      .forEach((file) => fs.unlinkSync(path.join(toolsDir, file)));
  }
}

function renderHead({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  keywords = '',
  schema = [],
  extraMeta = '',
}) {
  const schemaBlocks = (Array.isArray(schema) ? schema : [schema])
    .filter(Boolean)
    .map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`)
    .join('\n');

  const metaKeywords = keywords ? `<meta name="keywords" content="${keywords}">` : '';
  return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="${SITE.googleSiteVerification}">
    <meta name="google-adsense-account" content="${SITE.adsenseAccount}">
    <meta name="robots" content="index, follow">
    ${metaKeywords}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" href="/favicon.svg">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${absoluteUrl(canonicalPath)}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:url" content="${absoluteUrl(canonicalPath)}">
    <meta property="og:image" content="${absoluteUrl('/favicon.svg')}">
    <meta name="twitter:card" content="summary_large_image">
    ${extraMeta}
    <link rel="stylesheet" href="/assets/site.css">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsenseAccount}" crossorigin="anonymous"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${SITE.gaId}');
    </script>
    <script type="text/javascript">
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, 'clarity', 'script', '${SITE.clarityId}');
    </script>
    ${schemaBlocks}
  `;
}

function renderHeader(currentPath) {
  const navLinks = NAV_ITEMS.map((item) => {
    const current = item.href === currentPath ? ' aria-current="page"' : '';
    return `<a href="${item.href}"${current}>${item.label}</a>`;
  }).join('');

  return `
    <header class="site-header">
      <div class="site-header__inner">
        <a class="brand" href="/" aria-label="${SITE.name} 홈">
          <span class="brand__mark">PB</span>
          <span class="brand__text">
            <span class="brand__title">${SITE.name}</span>
            <span class="brand__subtitle">Browser-first utility studio</span>
          </span>
        </a>
        <nav class="nav" aria-label="Main navigation">
          ${navLinks}
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  const links = FOOTER_LINKS.map((item) => {
    const external = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${item.href}"${external}>${item.label}</a>`;
  }).join('');

  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="footer-meta">
          <a class="brand" href="/" aria-label="${SITE.name} 홈">
            <span class="brand__mark">PB</span>
            <span class="brand__text">
              <span class="brand__title">${SITE.name}</span>
              <span class="brand__subtitle">Lightweight tools, clearer decisions</span>
            </span>
          </a>
          <p>${SITE.brandSummary} 도구와 가이드는 사용자가 기능을 이해하고 신뢰할 수 있도록 운영 원칙, 개인정보 정책, 업데이트 기준을 함께 공개합니다.</p>
          <p class="footer-note">© <span data-year></span> Product Builder Hub. Some pages may display advertising after AdSense approval to support maintenance and documentation.</p>
        </div>
        <div>
          <div class="footer-links">${links}</div>
        </div>
      </div>
    </footer>
  `;
}

function renderLayout({ title, description, canonicalPath, currentPath, body, keywords = '', schema = [], ogType = 'website', extraMeta = '' }) {
  return `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        ${renderHead({ title, description, canonicalPath, ogType, keywords, schema, extraMeta })}
      </head>
      <body>
        ${renderHeader(currentPath)}
        <main class="site-main">
          ${body}
        </main>
        ${renderFooter()}
        <script src="/assets/site.js"></script>
      </body>
    </html>
  `;
}

function renderPageIntro({ eyebrow, title, summary, meta = [] }) {
  const metaHtml = meta.length ? `<div class="article-meta">${meta.map((item) => `<span>${item}</span>`).join('')}</div>` : '';
  return `
    <section class="page-intro">
      <span class="page-intro__eyebrow">${eyebrow}</span>
      <h1>${title}</h1>
      <p class="lede">${summary}</p>
      ${metaHtml}
    </section>
  `;
}

function renderSections(sections) {
  return sections
    .map((section) => `
      <section>
        <h2>${section.title}</h2>
        ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
        ${section.list ? `<ul>${section.list.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}
      </section>
    `)
    .join('');
}

function renderGuideLinks(fileNames) {
  return fileNames
    .map((fileName) => GUIDES.find((guide) => guide.fileName === fileName))
    .filter(Boolean)
    .map((guide) => `<li><a href="/blog/${guide.fileName}">${guide.title}</a></li>`)
    .join('');
}

function renderToolLinks(slugs) {
  return slugs
    .map((slug) => TOOLS.find((tool) => tool.slug === slug))
    .filter(Boolean)
    .map((tool) => `<li><a href="/tools/${tool.slug}.html">${tool.title}</a></li>`)
    .join('');
}

function renderToolPage(tool) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    applicationCategory: tool.schemaCategory,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    url: absoluteUrl(`/tools/${tool.slug}.html`),
    description: tool.description,
  };

  const body = `
    ${renderPageIntro({
      eyebrow: `${tool.category} Tool`,
      title: tool.title,
      summary: tool.description,
      meta: [`최종 업데이트 ${SITE.lastUpdated}`, '브라우저에서 즉시 사용', '회원가입 없음'],
    })}
    <section class="tool-shell">
      <div class="tool-layout">
        <div class="tool-main">
          <header class="tool-header">
            <span class="badge">${tool.category}</span>
            <h1>${tool.title}</h1>
            <p class="lede">${tool.summary}</p>
            <ul class="key-points">
              ${tool.heroPoints.map((point) => `<li>${point}</li>`).join('')}
            </ul>
          </header>
          <div class="tool-panel">
            <h2>바로 사용해 보기</h2>
            <p class="helper-text">${tool.useCases.join(' · ')}</p>
            ${tool.form}
          </div>
          <div class="result-card" id="${tool.slug}-output-wrapper">
            <h2>${tool.outputTitle}</h2>
            <div id="${tool.outputId || `${tool.slug}-output`}">
              <p>입력값을 넣고 <strong>${tool.ctaLabel}</strong> 버튼을 눌러 보세요.</p>
            </div>
          </div>
          <div class="tool-body">
            ${renderSections(tool.sections)}
            <section>
              <h2>자주 묻는 질문</h2>
              <div class="faq-list">
                ${tool.faq.map((item) => `
                  <details>
                    <summary>${item.q}</summary>
                    <p>${item.a}</p>
                  </details>
                `).join('')}
              </div>
            </section>
          </div>
        </div>
        <aside class="aside-stack">
          <div class="aside-card">
            <h2>이 도구가 맞는 상황</h2>
            <ul>${tool.useCases.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div class="aside-card">
            <h2>관련 가이드</h2>
            <ul class="link-list">${renderGuideLinks(tool.relatedGuides)}</ul>
          </div>
          <div class="aside-card">
            <h2>운영 원칙</h2>
            <ul>
              <li>입력값은 가능한 한 브라우저 안에서 처리합니다.</li>
              <li>기능 범위와 한계를 설명 페이지에서 함께 공개합니다.</li>
              <li>공식 기록이 필요한 절차는 별도 시스템을 권장합니다.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `;

  return renderLayout({
    title: `${tool.title} | ${SITE.name}`,
    description: tool.description,
    canonicalPath: `/tools/${tool.slug}.html`,
    currentPath: '/tools/index.html',
    body,
    keywords: `${tool.title}, ${tool.category}, Product Builder Hub`,
    schema,
  });
}

function renderGuidePage(guide) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: guide.title,
    description: guide.description,
    datePublished: `${SITE.lastUpdated}T00:00:00+09:00`,
    dateModified: `${SITE.lastUpdated}T00:00:00+09:00`,
    author: {
      '@type': 'Organization',
      name: SITE.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/favicon.svg'),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${guide.fileName}`),
  };

  const body = `
    <section class="article-shell">
      <div class="article-layout">
        <article class="article-main">
          <header class="article-header">
            <span class="badge">${guide.category}</span>
            <h1>${guide.title}</h1>
            <p class="lede">${guide.summary}</p>
            <div class="article-meta">
              <span>발행일 ${SITE.lastUpdated}</span>
              <span>읽는 시간 ${guide.readTime}</span>
              <span>작성 ${SITE.name}</span>
            </div>
          </header>
          <div class="rich-text">
            ${renderSections(guide.sections)}
          </div>
        </article>
        <aside class="aside-stack">
          <div class="aside-card">
            <h2>핵심 요약</h2>
            <p>${guide.description}</p>
          </div>
          <div class="aside-card">
            <h2>관련 도구</h2>
            <ul class="link-list">${renderToolLinks(guide.relatedTools)}</ul>
          </div>
          <div class="aside-card">
            <h2>문서 운영 원칙</h2>
            <ul>
              <li>실제 사용 맥락이 있는 주제만 다룹니다.</li>
              <li>기능 설명과 한계를 함께 적습니다.</li>
              <li>짧은 홍보성 문구보다 해석 기준을 우선합니다.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `;

  return renderLayout({
    title: `${guide.title} | ${SITE.name} Guides`,
    description: guide.description,
    canonicalPath: `/blog/${guide.fileName}`,
    currentPath: '/blog/index.html',
    body,
    keywords: `${guide.title}, ${guide.category}, Product Builder Hub`,
    schema,
    ogType: 'article',
  });
}

function renderHomePage() {
  const featuredGuides = GUIDES.slice(0, 3)
    .map((guide) => `
      <article class="guide-card">
        <div class="guide-card__top">
          <span class="badge">${guide.category}</span>
        </div>
        <h3>${guide.title}</h3>
        <p>${guide.description}</p>
        <a class="card-link" href="/blog/${guide.fileName}">가이드 읽기</a>
      </article>
    `)
    .join('');

  const featuredTools = TOOLS.map((tool) => `
    <article class="tool-card">
      <div class="tool-card__top">
        <span class="badge">${tool.category}</span>
      </div>
      <h3>${tool.title}</h3>
      <p>${tool.summary}</p>
      <div class="mini-list">${tool.heroPoints.slice(0, 2).map((point) => `<span>${point}</span>`).join('')}</div>
      <a class="card-link" href="/tools/${tool.slug}.html">도구 열기</a>
    </article>
  `).join('');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.baseUrl,
      sameAs: [SITE.repoUrl],
      description: SITE.brandSummary,
      logo: absoluteUrl('/favicon.svg'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Product Builder Hub는 어떤 사이트인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '브라우저에서 바로 쓰는 경량 도구와, 그 도구를 실제로 이해하는 데 필요한 실무형 가이드를 함께 제공하는 사이트입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '회원가입이 필요한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '대부분의 도구는 회원가입 없이 바로 사용할 수 있으며, 입력값은 가능한 한 브라우저 안에서 처리합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '광고가 붙더라도 도구 품질이 떨어지지 않나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '광고 승인 이후에도 과도한 광고 배치보다 도구 품질과 가독성을 우선하는 운영 원칙을 유지할 계획입니다.',
          },
        },
      ],
    },
  ];

  const body = `
    <section class="hero">
      <div>
        <span class="hero__eyebrow">Utility-first publishing</span>
        <h1>광고보다 먼저, 실제로 쓸 만한 브라우저 도구를 만듭니다.</h1>
        <p>Product Builder Hub는 설치 없이 바로 쓰는 경량 도구와, 그 도구를 왜 쓰는지 설명해 주는 가이드를 함께 운영합니다. 계산 결과만 보여주는 페이지가 아니라 사용 맥락, 한계, 개인정보 처리 방식까지 한 화면에서 이해할 수 있도록 설계했습니다.</p>
        <div class="button-row">
          <a class="button" href="/tools/index.html">도구 둘러보기</a>
          <a class="button-secondary" href="/blog/index.html">가이드 읽기</a>
        </div>
      </div>
      <div class="hero__stats">
        <div class="metric-card">
          <strong>5개</strong>
          <span>브라우저 기반 도구 카테고리</span>
        </div>
        <div class="metric-card">
          <strong>6개</strong>
          <span>실무형 가이드와 해설 문서</span>
        </div>
        <div class="metric-card">
          <strong>0회</strong>
          <span>도구 사용을 위한 회원가입 요구</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section__header">
        <div>
          <span class="section__eyebrow">Featured tools</span>
          <h2 class="section__title">빠르게 쓰고 바로 이해할 수 있는 도구</h2>
        </div>
      </div>
      <div class="grid grid--3">
        ${featuredTools}
      </div>
    </section>

    <section class="section">
      <div class="section__header">
        <div>
          <span class="section__eyebrow">Trust signals</span>
          <h2 class="section__title">도구만 두지 않고 운영 기준도 함께 공개합니다</h2>
        </div>
      </div>
      <div class="grid grid--3">
        <article class="feature-card">
          <h3>운영 정보 공개</h3>
          <p>소개, 연락처, 편집 기준, 개인정보 처리방침, 이용약관을 별도 페이지로 공개합니다. 작은 사이트일수록 운영 정보가 먼저 보여야 한다고 생각합니다.</p>
        </article>
        <article class="feature-card">
          <h3>기능의 한계 설명</h3>
          <p>도구가 무엇을 할 수 있는지뿐 아니라 무엇을 보장하지 않는지도 함께 적습니다. 특히 엔터테인먼트 기능은 오해를 줄이기 위해 범위를 더 좁게 설명합니다.</p>
        </article>
        <article class="feature-card">
          <h3>브라우저 우선 처리</h3>
          <p>가능한 한 입력값을 브라우저 안에서 처리해 작은 업무를 빠르게 끝내도록 돕습니다. 기록이 필요한 절차는 별도 시스템을 권장합니다.</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section__header">
        <div>
          <span class="section__eyebrow">Guides</span>
          <h2 class="section__title">도구를 더 잘 쓰게 만드는 짧고 실용적인 문서</h2>
          <p class="section__summary">단순한 SEO용 글이 아니라, 실제로 자주 헷갈리는 해석 기준과 운영 팁에 집중합니다.</p>
        </div>
        <a class="button-ghost" href="/blog/index.html">전체 가이드 보기</a>
      </div>
      <div class="grid grid--3">
        ${featuredGuides}
      </div>
    </section>

    <section class="section">
      <div class="section__header">
        <div>
          <span class="section__eyebrow">FAQ</span>
          <h2 class="section__title">처음 방문한 분들이 가장 많이 묻는 질문</h2>
        </div>
      </div>
      <div class="faq-list">
        <details>
          <summary>이 사이트는 어떤 주제에 집중하나요?</summary>
          <p>브라우저에서 바로 실행되는 경량 도구와, 그 도구를 실제 업무나 일상에서 어떻게 쓰는지 설명하는 가이드에 집중합니다.</p>
        </details>
        <details>
          <summary>왜 로또 도구가 한 카테고리로 포함되어 있나요?</summary>
          <p>무작위 샘플을 보여 주는 엔터테인먼트 도구로 분류하고 있습니다. 사이트 전체의 중심 주제가 아니라, 범위와 한계를 별도 설명 페이지에서 먼저 안내합니다.</p>
        </details>
        <details>
          <summary>광고 승인 이후에도 페이지 품질이 유지되나요?</summary>
          <p>광고 배치보다 도구 가독성과 설명 문서를 우선하는 방향으로 운영합니다. 광고 때문에 기능 버튼이나 본문을 가리지 않도록 설계할 계획입니다.</p>
        </details>
      </div>
    </section>
  `;

  return renderLayout({
    title: `${SITE.name} | Browser-first tools and practical guides`,
    description: '설치 없이 바로 쓰는 브라우저 도구와, 그 도구를 실제로 이해하는 데 필요한 실무형 가이드를 함께 제공하는 Product Builder Hub입니다.',
    canonicalPath: '/',
    currentPath: '/',
    body,
    keywords: '브라우저 도구, 랜덤 추첨기, 퍼센트 계산기, 일정 계산기, 회의 비용 계산기, Product Builder Hub',
    schema,
  });
}

function renderToolsIndex() {
  const toolCards = TOOLS.map((tool) => `
    <article class="tool-card">
      <div class="tool-card__top">
        <span class="badge">${tool.category}</span>
      </div>
      <h3>${tool.title}</h3>
      <p>${tool.description}</p>
      <div class="mini-list">${tool.useCases.map((item) => `<span>${item}</span>`).join('')}</div>
      <a class="card-link" href="/tools/${tool.slug}.html">도구 보기</a>
    </article>
  `).join('');

  const body = `
    ${renderPageIntro({
      eyebrow: 'Tools index',
      title: '도구 모음',
      summary: '계산식만 제공하는 페이지가 아니라, 사용 맥락과 한계를 함께 설명하는 브라우저 도구를 모았습니다.',
      meta: ['회원가입 없음', '브라우저 우선 처리', `최종 업데이트 ${SITE.lastUpdated}`],
    })}
    <section class="section">
      <div class="grid grid--3">${toolCards}</div>
    </section>
  `;

  return renderLayout({
    title: `도구 모음 | ${SITE.name}`,
    description: '랜덤 추첨기, 퍼센트 변화 계산기, 날짜 차이 계산기, 회의 비용 계산기 등 브라우저 기반 도구를 모아 둔 페이지입니다.',
    canonicalPath: '/tools/index.html',
    currentPath: '/tools/index.html',
    body,
    keywords: '브라우저 도구, 랜덤 추첨기, 계산기, Product Builder Hub',
  });
}

function renderGuidesIndex() {
  const guideCards = GUIDES.map((guide) => `
    <article class="guide-card">
      <div class="guide-card__top">
        <span class="badge">${guide.category}</span>
      </div>
      <h3>${guide.title}</h3>
      <p>${guide.description}</p>
      <div class="article-meta">
        <span>${guide.readTime}</span>
        <span>${SITE.lastUpdated}</span>
      </div>
      <a class="card-link" href="/blog/${guide.fileName}">가이드 읽기</a>
    </article>
  `).join('');

  const body = `
    ${renderPageIntro({
      eyebrow: 'Guides',
      title: '가이드 & 노트',
      summary: '도구를 왜 써야 하는지, 숫자를 어떻게 해석해야 하는지, 운영 시 무엇을 주의해야 하는지에 초점을 맞춘 문서를 모았습니다.',
      meta: ['짧고 실용적인 문서', '도구와 문서의 1:1 연결', `최종 업데이트 ${SITE.lastUpdated}`],
    })}
    <section class="section">
      <div class="grid grid--3">${guideCards}</div>
    </section>
  `;

  return renderLayout({
    title: `Guides | ${SITE.name}`,
    description: '브라우저 도구를 실제 업무와 일상에 더 잘 쓰기 위한 실무형 가이드와 노트를 모은 페이지입니다.',
    canonicalPath: '/blog/index.html',
    currentPath: '/blog/index.html',
    body,
    keywords: '실무 가이드, 랜덤 추첨 운영, 퍼센트 계산, 일정 관리, Product Builder Hub',
  });
}

function renderAboutPage() {
  const body = `
    ${renderPageIntro({
      eyebrow: 'About',
      title: 'Product Builder Hub 소개',
      summary: 'Product Builder Hub는 브라우저 안에서 빠르게 끝낼 수 있는 작은 도구와, 그 도구를 신뢰할 수 있게 만드는 설명 문서를 함께 운영합니다.',
      meta: [`최종 업데이트 ${SITE.lastUpdated}`, 'Build in public', 'Browser-first'],
    })}
    <section class="legal-shell">
      <div class="legal-layout">
        <div class="legal-main">
          <div class="legal-body">
            <h2>우리가 만드는 것</h2>
            <p>이 사이트는 거대한 생산성 플랫폼을 대체하려는 목적이 아니라, 자주 반복되지만 시스템 도입까지는 필요 없는 작업을 빠르게 끝내게 돕는 데 목적이 있습니다. 랜덤 추첨, 퍼센트 변화 계산, 날짜 차이 계산, 회의 비용 추정처럼 작은 단위의 계산과 판단을 브라우저에서 간단히 처리할 수 있도록 설계합니다.</p>
            <p>동시에 단순 계산 결과만 제공하지 않고, 그 도구를 언제 쓰면 좋은지, 어디까지 믿어도 되는지, 어떤 경우에는 별도 시스템이 필요한지까지 함께 설명합니다. 사이트의 정체성을 “도구 모음”이 아니라 “도구와 설명을 함께 제공하는 퍼블리싱 허브”로 보는 이유입니다.</p>

            <h2>운영 방식</h2>
            <p>각 도구와 문서는 다음 원칙을 따릅니다.</p>
            <ul>
              <li>기능보다 사용 맥락을 먼저 설명합니다.</li>
              <li>한계와 면책 범위를 별도 페이지가 아닌 실제 사용 흐름 안에 배치합니다.</li>
              <li>운영 정보, 연락처, 정책 문서를 누구나 찾기 쉽게 공개합니다.</li>
              <li>가능한 경우 입력값을 브라우저 안에서 처리해 데이터 이동을 줄입니다.</li>
            </ul>

            <h2>왜 공개 저장소를 연결했나요?</h2>
            <p>작은 사이트일수록 누가 운영하는지 보이기 어렵습니다. 그래서 가능한 범위 안에서 공개 저장소와 변경 이력을 연결해 두고, 사이트 구조와 정적 페이지가 어떻게 관리되는지 확인할 수 있게 했습니다. 이는 기능을 과시하기 위한 것이 아니라, 운영 주체와 유지 방식이 완전히 익명으로 보이지 않게 하려는 선택입니다.</p>

            <div class="callout callout--info">
              <strong>공개 저장소</strong><br />
              <a href="${SITE.repoUrl}" target="_blank" rel="noopener noreferrer">${SITE.repoUrl}</a>
            </div>
          </div>
        </div>
        <aside class="aside-stack">
          <div class="aside-card">
            <h2>사이트 구성</h2>
            <ul>
              <li>브라우저 기반 도구</li>
              <li>실무형 짧은 가이드</li>
              <li>운영 정보와 정책 페이지</li>
            </ul>
          </div>
          <div class="aside-card">
            <h2>관련 페이지</h2>
            <ul class="link-list">
              <li><a href="/tools/index.html">도구 모음</a></li>
              <li><a href="/blog/index.html">가이드 모음</a></li>
              <li><a href="/editorial-policy.html">편집 기준</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `;

  return renderLayout({
    title: `About | ${SITE.name}`,
    description: 'Product Builder Hub의 운영 목적, 사이트 구조, 공개 저장소, 브라우저 우선 원칙을 소개하는 페이지입니다.',
    canonicalPath: '/about.html',
    currentPath: '/about.html',
    body,
    keywords: 'Product Builder Hub 소개, 운영 원칙, 공개 저장소',
  });
}

function renderContactPage() {
  const body = `
    ${renderPageIntro({
      eyebrow: 'Contact',
      title: '문의 및 제안',
      summary: '버그 제보, 기능 제안, 사이트 운영 관련 문의를 받을 수 있는 창구입니다. 복잡한 문의보다 어떤 상황에서 무엇이 필요했는지 구체적으로 적어 주시면 도움이 됩니다.',
      meta: ['Formspree를 통한 접수', '응답 목적 외 보관 최소화', `최종 업데이트 ${SITE.lastUpdated}`],
    })}
    <section class="contact-shell">
      <div class="contact-layout">
        <div class="contact-main">
          <div class="contact-card">
            <h2>문의 양식</h2>
            <form class="tool-form" id="contactForm" action="https://formspree.io/f/mojnowrk" method="POST">
              <div class="field-grid">
                <div class="field-group">
                  <label for="contact-name">이름 또는 팀명</label>
                  <input id="contact-name" name="name" type="text" required>
                </div>
                <div class="field-group">
                  <label for="contact-email">회신 받을 이메일</label>
                  <input id="contact-email" name="email" type="email" required>
                </div>
              </div>
              <div class="field-group">
                <label for="contact-topic">문의 유형</label>
                <select id="contact-topic" name="topic" required>
                  <option value="bug">버그 제보</option>
                  <option value="feature">기능 제안</option>
                  <option value="partnership">제휴 문의</option>
                  <option value="policy">정책 문의</option>
                  <option value="other">기타</option>
                </select>
              </div>
              <div class="field-group">
                <label for="contact-message">문의 내용</label>
                <textarea id="contact-message" name="message" required placeholder="어떤 페이지에서 어떤 문제가 있었는지, 또는 어떤 기능이 필요했는지 자세히 적어 주세요."></textarea>
              </div>
              <p class="helper-text">문의 내용은 회신과 운영 개선 목적에 한해 처리되며, 세부 내용은 <a href="/privacy.html">개인정보처리방침</a>에서 확인할 수 있습니다.</p>
              <button class="button" type="submit">문의 보내기</button>
            </form>
          </div>
        </div>
        <aside class="aside-stack">
          <div class="aside-card">
            <h2>이런 내용을 보내 주세요</h2>
            <ul>
              <li>문제가 발생한 정확한 페이지 주소</li>
              <li>사용한 브라우저와 기기 정보</li>
              <li>재현 가능한 순서나 입력 예시</li>
            </ul>
          </div>
          <div class="aside-card">
            <h2>참고 링크</h2>
            <ul class="link-list">
              <li><a href="${SITE.repoUrl}" target="_blank" rel="noopener noreferrer">공개 저장소 보기</a></li>
              <li><a href="/privacy.html">개인정보처리방침</a></li>
              <li><a href="/editorial-policy.html">편집 기준</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `;

  return renderLayout({
    title: `Contact | ${SITE.name}`,
    description: '버그 제보, 기능 제안, 제휴 문의를 위한 Product Builder Hub의 연락 페이지입니다.',
    canonicalPath: '/contact.html',
    currentPath: '/contact.html',
    body,
    keywords: '문의, 기능 제안, 버그 제보, Product Builder Hub',
  });
}

function renderEditorialPolicyPage() {
  const body = `
    ${renderPageIntro({
      eyebrow: 'Editorial policy',
      title: '편집 기준과 운영 원칙',
      summary: '도구와 문서가 어떤 기준으로 작성되고 업데이트되는지, 어떤 표현을 피하려고 하는지 공개하는 페이지입니다.',
      meta: [`최종 업데이트 ${SITE.lastUpdated}`, '운영 기준 공개', '광고보다 설명 우선'],
    })}
    <section class="legal-shell">
      <div class="legal-layout">
        <div class="legal-main">
          <div class="legal-body">
            <h2>1. 무엇을 우선하나요?</h2>
            <p>Product Builder Hub는 페이지 수보다 설명 품질을 우선합니다. 도구는 빠르게 사용할 수 있어야 하지만, 동시에 사용자가 그 기능의 범위와 한계를 이해할 수 있어야 합니다. 그래서 각 페이지에는 가능하면 사용 맥락, 주의점, 관련 문서를 함께 배치합니다.</p>

            <h2>2. 어떤 문구를 피하나요?</h2>
            <p>증명하기 어려운 과장 표현, 결과를 보장하는 표현, 기능 범위를 오해하게 만드는 문구를 피합니다. 특히 엔터테인먼트 성격이 있는 기능은 실제 효과나 경제적 결과를 암시하는 문장을 사용하지 않도록 주의합니다.</p>

            <h2>3. 업데이트 기준</h2>
            <ul>
              <li>도구 동작 방식이 바뀌면 관련 설명 문서도 함께 업데이트합니다.</li>
              <li>운영 정보, 정책 문서, 문의 경로는 숨기지 않고 고정 내비게이션 또는 푸터에 배치합니다.</li>
              <li>짧은 분량의 문서라도 실사용 맥락이 없다면 공개하지 않습니다.</li>
            </ul>

            <h2>4. 광고와 문서 품질</h2>
            <p>광고 승인 여부와 관계없이 본문 가독성과 기능 사용성이 우선되어야 한다고 봅니다. 광고 때문에 버튼과 본문, 네비게이션이 혼동되는 배치는 지양합니다. 광고는 유지 비용을 보조하는 수단일 뿐, 사이트의 주된 목적이 되어서는 안 됩니다.</p>

            <h2>5. 정정과 개선</h2>
            <p>명확하지 않은 설명이나 오해를 부를 수 있는 문구를 발견하면 가능한 한 빠르게 수정합니다. 공개 저장소와 문의 페이지를 연결해 두는 이유도 바로 이런 피드백 경로를 열어 두기 위해서입니다.</p>
          </div>
        </div>
        <aside class="aside-stack">
          <div class="aside-card">
            <h2>핵심 원칙</h2>
            <ul>
              <li>광고보다 사용자 가치 우선</li>
              <li>기능 범위와 한계 동시 공개</li>
              <li>운영 정보 접근성 확보</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `;

  return renderLayout({
    title: `Editorial Policy | ${SITE.name}`,
    description: 'Product Builder Hub가 도구와 문서를 어떤 기준으로 편집하고 업데이트하는지 설명하는 페이지입니다.',
    canonicalPath: '/editorial-policy.html',
    currentPath: '/about.html',
    body,
    keywords: '편집 기준, 운영 원칙, Product Builder Hub',
  });
}

function renderPrivacyPage() {
  const body = `
    ${renderPageIntro({
      eyebrow: 'Privacy',
      title: '개인정보처리방침',
      summary: '도구 입력값, 분석 도구, 광고 쿠키, 문의 양식 데이터를 어떤 범위로 처리하는지 설명합니다.',
      meta: [`최종 업데이트 ${SITE.lastUpdated}`, '브라우저 우선 처리', '광고 및 분석 안내'],
    })}
    <section class="legal-shell">
      <div class="legal-layout">
        <div class="legal-main">
          <div class="legal-body">
            <h2>1. 기본 원칙</h2>
            <p>Product Builder Hub는 별도 회원 시스템을 운영하지 않으며, 대부분의 도구 입력값을 브라우저 안에서 처리하는 방향을 우선합니다. 즉, 사용자가 계산을 위해 입력한 일반 데이터는 기능 수행을 위해 자동으로 서버에 업로드되지 않도록 설계합니다.</p>

            <h2>2. 문의 양식 데이터</h2>
            <p>문의 페이지의 양식은 Formspree를 통해 접수됩니다. 사용자가 자발적으로 제출한 이름(또는 팀명), 이메일 주소, 문의 내용은 회신과 운영 개선을 위한 목적에 한해 처리됩니다. 이 정보는 문의 대응이 끝난 뒤 장기 보관을 최소화합니다.</p>

            <h2>3. 분석 도구와 로그</h2>
            <p>사이트 개선을 위해 Google Analytics와 Microsoft Clarity를 사용할 수 있습니다. 이들 서비스는 페이지 조회, 체류 패턴, 기본적인 브라우저 환경 정보처럼 개인을 직접 식별하지 않는 범위의 웹 사용 데이터를 처리할 수 있습니다.</p>

            <h2>4. 광고와 쿠키</h2>
            <p>본 사이트는 Google AdSense 승인 이후 광고를 게재할 수 있습니다. 광고가 활성화되면 Google 및 파트너사는 관련성 있는 광고 제공과 성과 측정을 위해 쿠키를 사용할 수 있습니다. 맞춤형 광고 관련 설정은 Google의 광고 설정 페이지에서 관리할 수 있습니다.</p>

            <h2>5. 브라우저 저장소</h2>
            <p>일부 도구는 편의를 위해 브라우저 내 저장소(Local Storage)를 사용할 수 있습니다. 이는 사용자의 기기 내에만 저장되며 사이트 운영자가 직접 수집하는 서버 데이터베이스와는 성격이 다릅니다. 사용자는 브라우저 설정을 통해 언제든 이 데이터를 삭제할 수 있습니다.</p>

            <h2>6. 문의와 권리 행사</h2>
            <p>개인정보 처리에 관한 문의는 <a href="/contact.html">문의 페이지</a>를 통해 접수할 수 있습니다. 당사는 실제 서비스 범위 안에서 확인 가능한 요청에 성실히 응답하도록 노력합니다.</p>
          </div>
        </div>
        <aside class="aside-stack">
          <div class="aside-card">
            <h2>요약</h2>
            <ul>
              <li>대부분의 도구 입력값은 브라우저 안에서 처리</li>
              <li>문의 양식은 Formspree를 통해 접수</li>
              <li>Analytics, Clarity, AdSense 사용 가능성 고지</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `;

  return renderLayout({
    title: `Privacy Policy | ${SITE.name}`,
    description: 'Product Builder Hub의 도구 입력값, 문의 양식, 분석 도구, 광고 쿠키 처리 방침을 설명하는 페이지입니다.',
    canonicalPath: '/privacy.html',
    currentPath: '/about.html',
    body,
    keywords: '개인정보처리방침, 쿠키 정책, AdSense, Product Builder Hub',
  });
}

function renderTermsPage() {
  const body = `
    ${renderPageIntro({
      eyebrow: 'Terms',
      title: '이용약관',
      summary: '사이트와 도구를 이용할 때의 기본적인 책임 범위, 지식재산권, 면책 조건을 설명합니다.',
      meta: [`최종 업데이트 ${SITE.lastUpdated}`, '무료 도구 사용 조건', '면책 조항 포함'],
    })}
    <section class="legal-shell">
      <div class="legal-layout">
        <div class="legal-main">
          <div class="legal-body">
            <h2>1. 서비스의 성격</h2>
            <p>Product Builder Hub는 무료로 접근 가능한 브라우저 기반 도구와 관련 설명 문서를 제공합니다. 사이트의 각 도구는 일반적인 정보 확인과 운영 편의를 위한 용도로 제공되며, 특정 결과나 경제적 이익을 보장하지 않습니다.</p>

            <h2>2. 사용자 책임</h2>
            <p>사용자는 본 사이트의 정보를 자신의 상황에 맞게 판단하여 활용해야 합니다. 사이트의 계산 결과나 안내 문서를 근거로 법률, 재무, 세무, 공식 추첨, 계약 체결 등 중요한 결정을 내릴 경우에는 적절한 전문 검토를 병행해야 합니다.</p>

            <h2>3. 엔터테인먼트 기능 관련 고지</h2>
            <p>로또 번호 샘플러와 같은 엔터테인먼트 기능은 오락 목적의 무작위 조합 생성 도구입니다. 이는 실제 결과를 예측하거나 확률 우위를 제공하기 위한 서비스가 아니며, 관련 경제적 판단에 대한 책임을 지지 않습니다.</p>

            <h2>4. 지식재산권</h2>
            <p>사이트의 디자인, 문서, 구성, 코드 중 별도로 오픈소스 라이선스가 명시되지 않은 부분은 Product Builder Hub에 귀속됩니다. 단, 공개 저장소에 게시된 코드와 라이선스는 해당 저장소의 고지에 따릅니다.</p>

            <h2>5. 외부 서비스</h2>
            <p>문의 양식, 분석 도구, 광고 제공과 같은 일부 기능은 제3자 서비스를 통해 동작할 수 있습니다. 사용자는 해당 서비스 제공자의 정책이 별도로 적용될 수 있음을 이해해야 합니다.</p>

            <h2>6. 서비스 변경</h2>
            <p>사이트 운영자는 기능 추가, 수정, 제거, 문서 정리, 광고 배치 조정 등을 사전 공지 없이 변경할 수 있습니다. 다만 사용자 혼동을 줄이기 위해 주요 구조 변경은 가능한 범위 안에서 문서와 내비게이션에 반영합니다.</p>
          </div>
        </div>
        <aside class="aside-stack">
          <div class="aside-card">
            <h2>한눈에 보기</h2>
            <ul>
              <li>무료 브라우저 도구 제공</li>
              <li>중요 의사결정은 사용자 책임</li>
              <li>엔터테인먼트 기능은 보장 서비스 아님</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `;

  return renderLayout({
    title: `Terms of Service | ${SITE.name}`,
    description: 'Product Builder Hub의 무료 브라우저 도구와 문서를 이용할 때 적용되는 기본 약관과 책임 범위를 설명합니다.',
    canonicalPath: '/terms.html',
    currentPath: '/about.html',
    body,
    keywords: '이용약관, 무료 웹 도구, 면책 조항, Product Builder Hub',
  });
}

function generateSitemap() {
  const urls = [
    '/',
    '/about.html',
    '/contact.html',
    '/privacy.html',
    '/terms.html',
    '/editorial-policy.html',
    '/blog/index.html',
    '/tools/index.html',
    '/lotto-generator/dist/index.html',
    ...GUIDES.map((guide) => `/blog/${guide.fileName}`),
    ...TOOLS.map((tool) => `/tools/${tool.slug}.html`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${absoluteUrl(url)}</loc>
    <lastmod>${SITE.lastUpdated}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  writeFile('sitemap.xml', xml);
}

function generateRobots() {
  writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}`);
}

function generateAdsTxt() {
  writeFile('ads.txt', 'google.com, pub-6100551786781834, DIRECT, f08c47fec0942fa0');
}

function generatePages() {
  writeFile('index.html', renderHomePage());
  writeFile('about.html', renderAboutPage());
  writeFile('contact.html', renderContactPage());
  writeFile('privacy.html', renderPrivacyPage());
  writeFile('terms.html', renderTermsPage());
  writeFile('editorial-policy.html', renderEditorialPolicyPage());
  writeFile('tools/index.html', renderToolsIndex());
  writeFile('blog/index.html', renderGuidesIndex());

  TOOLS.forEach((tool) => {
    writeFile(`tools/${tool.slug}.html`, renderToolPage(tool));
  });

  GUIDES.forEach((guide) => {
    writeFile(`blog/${guide.fileName}`, renderGuidePage(guide));
  });
}

cleanGeneratedFiles();
generatePages();
generateRobots();
generateSitemap();
generateAdsTxt();

console.log('Site pages regenerated successfully.');
