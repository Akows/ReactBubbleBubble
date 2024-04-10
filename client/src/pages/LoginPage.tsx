import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/auth/authActions';

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

const TermsText = styled.p`
  color: #aaa;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 2rem;
`;

const clientID = import.meta.env.VITE_CLIENT_ID;

const LoginPage: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    dispatch(login({ token: credential }))
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        window.location.reload();
      });
  };

  const onLoginFailure = () => {
    alert('로그인 작업이 실패하였습니다');
    window.location.reload();
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

        <TermsText>
          해당 작업은 '리액트글방울' 서비스의 개인정보 취급방침 및 이용 약관에 동의하는 것을 포함합니다.
        </TermsText>
      </LoginPageContainer>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
