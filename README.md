# '리액트글방울'

## 💪🏻프로젝트 개괄

 - React.js 개발자를 위한 중앙집중형 정보 플랫폼

## ✔️ 프로젝트 상세 설명

- `velog` [🔗velog 포스트 시리즈](https://velog.io/@skyoffly/series/ReactMeltingPot-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)

## ✔️ 프로젝트 시연

- `AWS` [🔗프로젝트 배포](http://reactbubblebubble-production.s3-website.ap-northeast-2.amazonaws.com/)

### 🛫 시작 가이드

- 실행 방법 (2가지 중 택 1)
  > 1. 배포 링크를 통한 프로젝트 직접 실행
  > 2. ZIP 파일 다운로드 및 압축 풀기 후 코드 에디터로 실행

```
$ npm i
$ npm run start
```

## 🛠️ 사용기술
![Typescript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React.js](https://img.shields.io/badge/-React.js-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
![React-Redux](https://img.shields.io/badge/-React--Redux-764ABC?style=flat-square&logo=react-redux&logoColor=white)
![Redux-Toolkit](https://img.shields.io/badge/-Redux--Toolkit-764ABC?style=flat-square&logo=redux-toolkit&logoColor=white)
![Styled Components](https://img.shields.io/badge/-Styled_Components-DB7093?style=flat-square&logo=styled-components&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![AWS S3](https://img.shields.io/badge/-AWS_S3-569A31?style=flat-square&logo=amazon-s3&logoColor=white)
![AWS EC2](https://img.shields.io/badge/-AWS_EC2-232F3E?style=flat-square&logo=amazon-ec2&logoColor=white)
![AWS RDS](https://img.shields.io/badge/-AWS_RDS-527FFF?style=flat-square&logo=amazon-rds&logoColor=white)

## 구현 기능

### - 사용자 인증 관련 기능:
- 로그인: Google OAuth를 통해 사용자 인증을 수행합니다. 성공적인 인증 후 사용자 정보(이메일, 이름, 프로필 사진)를 세션에 저장합니다.
- 로그아웃: 사용자 세션을 종료하고 클라이언트 측에서 쿠키를 삭제하여 로그아웃을 처리합니다.
- 로그인 유효성 검사: 제공된 토큰으로 사용자의 세션 유효성을 검증합니다.

### - RSS 피드 처리 기능:
- RSS 피드 가져오기 및 저장: 지정된 RSS 피드 URL에서 데이터를 파싱하여 데이터베이스에 저장합니다. 이 기능은 cron 작업을 통해 주기적으로 실행됩니다.

### - 콘텐츠 관리 기능:
- 콘텐츠 조회: 검색어, 정렬 방식(최신순, 오래된순 등), 페이지 정보에 따라 데이터베이스에서 콘텐츠를 검색하고 결과를 반환합니다. 페이지네이션 기능이 포함되어 있어 사용자가 지정한 페이지의 콘텐츠만 불러옵니다.

### - 데이터베이스 및 서버 설정:
- MySQL 데이터베이스 연결: 환경 변수를 사용하여 데이터베이스 설정 정보를 가져오고 연결 풀을 생성합니다.
- 세션 관리: 세션 정보를 MySQL 데이터베이스에 저장하고 세션 쿠키 설정을 관리합니다.
- CORS 설정: Cross-Origin Resource Sharing을 설정하여 프론트엔드 애플리케이션과의 통신을 허용합니다.
