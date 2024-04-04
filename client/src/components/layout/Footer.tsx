import React from 'react'
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
`;

const CopyrightText = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const AboutButton = styled.button`
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

export const Footer: React.FC = () => {
  return (
    <>
      <FooterContainer>
        <CopyrightText>이 프로젝트는 저작권이 없는 오픈소스 프로젝트입니다.</CopyrightText>
        <AboutButton>제작자 소개</AboutButton>
      </FooterContainer>
    </>
  )
}
