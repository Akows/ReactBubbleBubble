import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingIndicatorProps {
  isLoading: boolean; // isLoading 속성의 타입 정의
}

// 로딩 애니메이션 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 로딩 스피너 컴포넌트 스타일링
const LoadingSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #555;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;

// 로딩 오버레이 컴포넌트 스타일링
const LoadingOverlay = styled.div<{ isLoading: boolean }>`
  display: ${({ isLoading }) => isLoading ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

// 로딩 컴포넌트
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  return (
    <LoadingOverlay isLoading={isLoading}>
      <LoadingSpinner />
    </LoadingOverlay>
  );
};

export default LoadingIndicator;
