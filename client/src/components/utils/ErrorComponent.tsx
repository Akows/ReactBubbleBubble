import React, { useState } from 'react';
import styled from 'styled-components';

// 타입 정의
interface ErrorComponentProps {
  errorName: string;
  errorMessage: string;
  showError: boolean;
}

const ErrorOverlay = styled.div<{ showError: boolean }>` 
  display: ${({ showError }) => showError ? 'flex' : 'none'};
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

const ErrorMessageContainer = styled.div`
  background-color: #333;
  padding: 2rem;
  border-radius: 0.5rem;
  color: white;
`;

const ErrorTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ErrorDescription = styled.p`
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #777;
  }
`;

const ErrorComponent : React.FC<ErrorComponentProps> = ({ errorName, errorMessage }) => {
  const [showError, setShowError] = useState(true);

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <ErrorOverlay showError={showError}>
      <ErrorMessageContainer>
        <ErrorTitle>{errorName}</ErrorTitle>
        <ErrorDescription>{errorMessage}</ErrorDescription>
        <CloseButton onClick={handleClose}>확인</CloseButton>
      </ErrorMessageContainer>
    </ErrorOverlay>
  );
};

export default ErrorComponent ;
