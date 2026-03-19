function setFooterYear() {
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function shuffle(array) {
  const items = [...array];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function formatNumber(value) {
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 2 }).format(value);
}

function parseListItems(text) {
  return [...new Set(
    text
      .split(/[\n,;]+/)
      .map((item) => item.trim())
      .filter(Boolean)
  )];
}

function initRandomPicker() {
  const form = document.getElementById('random-picker-form');
  const output = document.getElementById('random-picker-output');
  if (!form || !output) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const items = parseListItems(form.elements.items.value);
    const count = Number(form.elements.count.value);

    if (!items.length) {
      output.innerHTML = '<p>먼저 항목을 2개 이상 입력해 주세요.</p>';
      return;
    }

    const safeCount = Math.min(Math.max(count, 1), items.length);
    const picks = shuffle(items).slice(0, safeCount);
    const list = picks
      .map((item, index) => `<li><strong>선택 ${index + 1}</strong><span>${item}</span></li>`)
      .join('');

    output.innerHTML = `
      <div class="stat-line"><span>입력 항목</span><strong>${items.length}개</strong></div>
      <div class="stat-line"><span>선택 개수</span><strong>${safeCount}개</strong></div>
      <ul class="result-list">${list}</ul>
      <p class="helper-text">브라우저에서만 계산되며 입력 목록은 서버로 전송되지 않습니다.</p>
    `;
  });
}

function initPercentageCalculator() {
  const form = document.getElementById('percentage-form');
  const output = document.getElementById('percentage-output');
  if (!form || !output) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const before = Number(form.elements.before.value);
    const after = Number(form.elements.after.value);

    if (!Number.isFinite(before) || !Number.isFinite(after) || before === 0) {
      output.innerHTML = '<p>기준값은 0이 될 수 없으며, 두 값을 모두 입력해야 합니다.</p>';
      return;
    }

    const diff = after - before;
    const changeRate = (diff / before) * 100;
    const direction = diff > 0 ? '증가' : diff < 0 ? '감소' : '변화 없음';
    const multiplier = after / before;

    output.innerHTML = `
      <div class="stat-line"><span>변화 방향</span><strong>${direction}</strong></div>
      <div class="stat-line"><span>차이</span><strong>${formatNumber(diff)}</strong></div>
      <div class="stat-line"><span>변화율</span><strong>${formatNumber(changeRate)}%</strong></div>
      <div class="stat-line"><span>배수</span><strong>${formatNumber(multiplier)}배</strong></div>
      <p class="helper-text">보고서에는 변화율과 절대값 차이를 함께 적으면 오해를 줄일 수 있습니다.</p>
    `;
  });
}

function countBusinessDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;

  const direction = start <= end ? 1 : -1;
  let current = new Date(start);
  let businessDays = 0;

  while ((direction === 1 && current <= end) || (direction === -1 && current >= end)) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) businessDays += direction;
    current.setDate(current.getDate() + direction);
  }

  return businessDays;
}

function initDateDifference() {
  const form = document.getElementById('date-difference-form');
  const output = document.getElementById('date-difference-output');
  if (!form || !output) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const startValue = form.elements.start.value;
    const endValue = form.elements.end.value;

    if (!startValue || !endValue) {
      output.innerHTML = '<p>시작일과 종료일을 모두 선택해 주세요.</p>';
      return;
    }

    const start = new Date(startValue);
    const end = new Date(endValue);
    const msPerDay = 1000 * 60 * 60 * 24;
    const rawDays = Math.round((end - start) / msPerDay);
    const inclusiveDays = rawDays >= 0 ? rawDays + 1 : rawDays - 1;
    const businessDays = countBusinessDays(startValue, endValue);

    output.innerHTML = `
      <div class="stat-line"><span>달력 기준 차이</span><strong>${formatNumber(rawDays)}일</strong></div>
      <div class="stat-line"><span>포함 기준 일수</span><strong>${formatNumber(inclusiveDays)}일</strong></div>
      <div class="stat-line"><span>평일 기준 일수</span><strong>${formatNumber(businessDays)}일</strong></div>
      <p class="helper-text">평일 계산은 토요일과 일요일만 제외합니다. 공휴일은 별도로 반영하지 않습니다.</p>
    `;
  });
}

function initMeetingCost() {
  const form = document.getElementById('meeting-cost-form');
  const output = document.getElementById('meeting-cost-output');
  if (!form || !output) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const people = Number(form.elements.people.value);
    const hourlyRate = Number(form.elements.hourlyRate.value);
    const minutes = Number(form.elements.minutes.value);
    const monthlyCount = Number(form.elements.monthlyCount.value);

    if (![people, hourlyRate, minutes, monthlyCount].every((value) => Number.isFinite(value) && value > 0)) {
      output.innerHTML = '<p>참여 인원, 시간, 인건비, 월간 횟수를 모두 올바르게 입력해 주세요.</p>';
      return;
    }

    const singleMeetingCost = people * hourlyRate * (minutes / 60);
    const monthlyCost = singleMeetingCost * monthlyCount;
    const savedByCuttingTenMinutes = people * hourlyRate * (10 / 60) * monthlyCount;

    output.innerHTML = `
      <div class="stat-line"><span>1회 회의 비용</span><strong>${formatNumber(singleMeetingCost)}원</strong></div>
      <div class="stat-line"><span>월간 총비용</span><strong>${formatNumber(monthlyCost)}원</strong></div>
      <div class="stat-line"><span>10분 단축 시 절감</span><strong>${formatNumber(savedByCuttingTenMinutes)}원/월</strong></div>
      <p class="helper-text">회의 비용을 시각화하면 참석 인원과 회의 길이를 조정할 때 근거가 더 명확해집니다.</p>
    `;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initRandomPicker();
  initPercentageCalculator();
  initDateDifference();
  initMeetingCost();
});
