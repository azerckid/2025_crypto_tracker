# Crypto Tracker

암호화폐 시장을 실시간으로 추적하고 모니터링할 수 있는 React 기반 웹 애플리케이션입니다.

## 주요 기능

- **실시간 암호화폐 가격 추적**: 상위 암호화폐들의 현재 가격, 24시간 변동률, 고가/저가 정보 제공
- **상세 코인 정보**: 각 암호화폐의 상세 정보, 가격 차트, 시장 데이터 제공
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 등 다양한 디바이스에서 최적화된 경험 제공
- **다크/라이트 모드**: 사용자 선호도에 맞는 테마 선택 가능
- **페이지네이션**: 대량의 데이터를 효율적으로 탐색할 수 있는 페이지네이션 기능

## 기술 스택

- **프론트엔드**: React, TypeScript, Styled Components
- **상태 관리**: React Query (TanStack Query)
- **라우팅**: React Router v6
- **API**: CoinGecko API
- **차트**: Chart.js, React Chart.js

## 프로젝트 구조

```
src/
├── api/              # API 관련 함수 및 타입 정의
├── components/       # 재사용 가능한 컴포넌트
│   ├── buttons/      # 버튼 컴포넌트
│   ├── cards/        # 카드 형태의 UI 컴포넌트
│   ├── charts/       # 차트 관련 컴포넌트
│   ├── coins/        # 코인 관련 컴포넌트
│   ├── error/        # 에러 상태 표시 컴포넌트
│   ├── layout/       # 페이지 레이아웃 관련 컴포넌트
│   ├── loading/      # 로딩 상태 표시 컴포넌트
│   └── tabs/         # 탭 관련 컴포넌트
├── contexts/         # React Context 관련 파일
├── pages/            # 페이지 컴포넌트
├── routes/           # 라우팅 관련 설정
└── styles/           # 전역 스타일 및 테마 설정
```

## 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 빌드
```bash
npm run build
```

## 사용 방법

1. **홈 페이지**: 앱의 개요와 주요 기능을 소개합니다.
2. **코인 목록**: 상위 암호화폐들의 목록을 확인할 수 있습니다.
3. **코인 상세 페이지**: 특정 암호화폐의 상세 정보를 확인할 수 있습니다.
   - 가격 정보: 현재 가격, 24시간 변동률, 고가/저가 등
   - 가격 차트: 시간별 가격 변동을 시각화
   - 코인 설명: 암호화폐에 대한 기본 정보

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 감사

- [CoinGecko API](https://www.coingecko.com/en/api) - 암호화폐 데이터 제공
- [React](https://reactjs.org/) - UI 라이브러리
- [Styled Components](https://styled-components.com/) - CSS-in-JS 스타일링
- [Chart.js](https://www.chartjs.org/) - 차트 시각화
