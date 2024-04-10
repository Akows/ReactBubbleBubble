import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../redux/auth/authActions';
import { RootState } from '../../redux/store';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #242424;
  color: white;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  margin: 0;
`;

const StartButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4e9af1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #6fb3f1;
  }
`;

const MyPageButton = styled(StartButton)`
  // MyPageButton은 StartButtor과 동일한 스타일을 갖지만, 개발 과정에서 스타일이 변경될 가능성이 있어 다른 styled 코드로 분리
`;

export const Header: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('로그아웃 실패:', error);
      });
  };

  // 페이지 이동 로직 (미구현)
  const moveFunc = () => {
    
  };

  return (
    <>      
      <HeaderContainer>
        <Logo onClick={() => navigate('/')}>리액트글방울</Logo>
        {isLoggedIn ? (
          <>
            <MyPageButton onClick={() => navigate('/mypage')}>마이 페이지</MyPageButton>
            <StartButton onClick={handleLogout}>로그아웃</StartButton>
          </>
        ) : (
          <StartButton onClick={moveFunc}>Google 계정으로 시작하기</StartButton>
        )}
      </HeaderContainer>
    </>
  )
}
