import React from 'react';
import styled from 'styled-components';
import googleLogo from '../assets/google_icon.svg';

const LoginPageContainer = styled.div`
  background-color: #242424;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 300px;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
`;

const GoogleLoginButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    margin-right: 1rem;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

const TermsText = styled.p`
  color: #aaa;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 2rem;
`;

const LoginPage: React.FC = () => {
  return (
    <LoginPageContainer>
      <Title>리액트글방울</Title>
      <Subtitle>React.js에 대한 모든 것</Subtitle>
      <GoogleLoginButton>
        <img src={googleLogo} alt="Google Logo" />
        Google 계정으로 서비스 시작하기
      </GoogleLoginButton>
      <TermsText>
        해당 작업은 '리액트글방울' 서비스의 개인정보 취급방침 및 이용 약관에 동의하는 것을 포함합니다.
      </TermsText>
    </LoginPageContainer>
  );
};

export default LoginPage;
