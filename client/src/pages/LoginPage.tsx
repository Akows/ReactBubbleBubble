import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../redux/auth/authSlice';
import { test } from '../redux/auth/authActions';

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

const GoogleLogoutButton = styled.button`
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

const clientID = import.meta.env.VITE_CLIENT_ID;

const LoginPage: React.FC = () => {

  const dispatch = useDispatch();

  const onLoginSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    dispatch(loginSuccess({ token: credential }));
  };

  const onLoginFailure = () => {
    console.log('로그인 실패..');
  };

  const handleLogout = () => {
    // Google 로그아웃 실행
    // googleLogout();

    // Redux 스토어의 로그인 상태 업데이트
    // dispatch(logoutSuccess());

    dispatch(test());

  };

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <LoginPageContainer>
        <Title>리액트글방울</Title>
        <Subtitle>React.js에 대한 모든 것</Subtitle>
        <GoogleLogin
          onSuccess={onLoginSuccess}
          onError={onLoginFailure}
          auto_select={false}
        />

        <GoogleLogoutButton onClick={handleLogout}>
          로그아웃
        </GoogleLogoutButton>

        <TermsText>
          해당 작업은 '리액트글방울' 서비스의 개인정보 취급방침 및 이용 약관에 동의하는 것을 포함합니다.
        </TermsText>
      </LoginPageContainer>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
