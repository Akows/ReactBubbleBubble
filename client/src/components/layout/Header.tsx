import React, { useState } from 'react'
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #242424;
  color: white;

  border: 2px solid wheat;
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

  // 사용자 로그인 여부를 판별하는 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지 이동 로직 (미구현)
  const moveFunc = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>      
      <HeaderContainer>
        <Logo>리액트글방울</Logo>
        {isLoggedIn ? (
          <MyPageButton onClick={moveFunc}>마이 페이지</MyPageButton>
        ) : (
          <StartButton onClick={moveFunc}>Google 계정으로 시작하기</StartButton>
        )}
      </HeaderContainer>
    </>
  )
}
