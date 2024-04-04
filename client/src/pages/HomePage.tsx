import styled from 'styled-components';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';

const Container = styled.div`
  background-color: #242424;
  color: white;
  min-height: 100vh;
  padding: 2rem;
`;

const Head = styled.header`
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const SearchBarContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: start;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 0.5rem;
  }
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

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    justify-content: start;
    gap: 1rem;
  }
`;

const ContentCard = styled.div`
  background-color: #333;
  border-radius: 0.5rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4e4e4e;
  }

  @media (min-width: 768px) {
    justify-content: space-between;
  }

  .thumbnail {
    flex: 0 0 auto;
    width: 100px; // 가정된 크기, 실제 이미지에 따라 조정해야 함
    height: 100px; // 가정된 크기, 실제 이미지에 따라 조정해야 함
    background-color: #ddd; // 임시 색상, 실제 이미지가 들어갈 예정
    border-radius: 0.5rem;
    margin-right: 1rem;
  }

  .content-info {
    flex: 1;

    .title {
      font-size: 1.2rem;
      color: white;
      margin-bottom: 0.5rem;
    }

    .summary {
      color: #aaa;
      font-size: 0.9rem;
    }

    .meta {
      font-size: 0.8rem;
      color: #999;
      margin-top: 0.5rem;
    }
  }
`;

const HomePage = () => {
  return (
    <>
      <Header/>

      <Container>
        <Head>전 세계에 있는 React.js 글을 한 번에 모아보기!</Head>
        <SearchBarContainer>
          <Input type="text" placeholder="검색어를 입력해주세요" />
          <Button>Search</Button>
        </SearchBarContainer>
        <ButtonsRow>
          <Button>전체보기</Button>
          <Button>북마크보기</Button>
        </ButtonsRow>

        {/* map 함수로 컨텐츠들을 렌더링하는 부분.. */}
        <ContentCard>
          <div className="thumbnail"></div>
          <div className="content-info">
            <div className="title">글 제목</div>
            <div className="summary">이곳에는 글 내용의 일부를 미리보기로 보여줍니다..</div>
            <div className="meta">https://좋은글보려고왔습니다.com | 2024-01-01</div>
          </div>
        </ContentCard>

      </Container>
    
      <Footer/>
    </>
  );
};

export default HomePage;
