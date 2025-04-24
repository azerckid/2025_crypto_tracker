# Crypto Tracker

암호화폐 시장을 실시간으로 추적하고 분석할 수 있는 웹 애플리케이션입니다.

## 기술 스택

- React 18
- TypeScript
- Vite
- React Router DOM
- Styled Components
- ESLint

## 주요 기능

- 실시간 암호화폐 가격 추적
- 다크/라이트 모드 지원
- 반응형 디자인
- 실시간 시장 데이터 업데이트

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치

```bash
# 저장소 클론
git clone [repository-url]

# 프로젝트 디렉토리로 이동
cd crypto-tracker

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── assets/        # 이미지, 폰트 등 정적 파일
├── components/    # 재사용 가능한 컴포넌트
├── contexts/      # React Context
├── styles/        # 전역 스타일 및 테마
└── types/         # TypeScript 타입 정의
```

## 테마 시스템

프로젝트는 다크/라이트 모드를 지원하는 테마 시스템을 구현했습니다:

- 라이트 모드: 밝은 배경과 어두운 텍스트
- 다크 모드: 어두운 배경과 밝은 텍스트

테마는 로컬 스토리지에 저장되어 사용자의 선호도를 유지합니다.

## 라이선스

MIT License
