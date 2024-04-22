import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../redux/auth/authActions';
import { RootState } from '../redux/store';

const UserProfileContainer = styled.div`
  background-color: #242424;
  color: white;
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: baseline;
  margin-top: 200px;
  padding: 2rem;
`;

const EmailInfo = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const EmailLabel = styled.p`
  font-size: 0.9rem;
  color: #aaa;
`;

const EmailAddress = styled.h1`
  font-size: 1.8rem;
  margin: 0;
`;

const Divider = styled.hr`
  width: 80%;
  border-top: 1px solid #555;
  margin: 2rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const UserPage: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem('user'));
  const email = userInfo.email;

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('로그아웃 실패:', error);
      });
  };

  return (
    <UserProfileContainer>
      <EmailInfo>
        <EmailLabel>현재 로그인한 사용자 이메일 주소:</EmailLabel>
        <EmailAddress>{email}</EmailAddress>
      </EmailInfo>
      <Divider />
      <ButtonGroup>
        <Button onClick={handleLogout}>로그아웃</Button>
      </ButtonGroup>
    </UserProfileContainer>
  );
};

export default UserPage;
