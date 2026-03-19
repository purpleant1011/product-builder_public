# Product Builder Hub

브라우저에서 바로 쓰는 경량 도구와, 그 도구를 실제로 이해하는 데 필요한 짧은 가이드를 함께 운영하는 정적 사이트입니다.

## 현재 구조

- `generate_blog.js`
  사이트의 정적 페이지를 생성합니다.
  홈, 도구 페이지, 가이드 페이지, 정책 페이지, `robots.txt`, `sitemap.xml`, `ads.txt`를 함께 갱신합니다.
- `assets/site.css`
  메인 사이트 공통 스타일입니다.
- `assets/site.js`
  정적 도구 페이지용 브라우저 로직입니다.
- `tools/`
  생성된 도구 페이지 출력물입니다.
- `blog/`
  생성된 가이드 페이지 출력물입니다.
- `lotto-generator/`
  별도 Vite + React 기반의 인터랙티브 도구입니다.

## 작업 방법

메인 사이트 정적 페이지 재생성:

```bash
node generate_blog.js
```

로또 도구 개발 서버:

```bash
cd lotto-generator
npm install
npm run dev
```

로또 도구 프로덕션 빌드:

```bash
cd lotto-generator
npm run build
```

린트:

```bash
cd lotto-generator
npm run lint
```

## 운영 원칙

- 도구만 제공하지 않고 사용 맥락과 한계를 함께 설명합니다.
- 정책 페이지와 문의 경로를 숨기지 않습니다.
- 가능한 입력값은 브라우저 안에서 처리합니다.
- 엔터테인먼트 기능은 실용 도구와 구분해 안내합니다.
