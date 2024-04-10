import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { verifyLogin } from './redux/auth/authActions';

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: baseline;
`;

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 상태 유효성 검사
    dispatch(verifyLogin());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
        <MainContent>
          <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/user" element={<UserPage />}/>
          </Routes>
        </MainContent>
      <Footer />
    </BrowserRouter>
  );

}

export default App
