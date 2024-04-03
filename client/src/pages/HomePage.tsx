import styled from 'styled-components';

const HomePageContainer = styled.div`
  background-color: #000;
  color: white;
  min-height: 100vh;
  padding: 2rem;
`;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContentItem = styled.div`
  background-color: #1a1a1a;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  h2 {
    color: #fff;
    margin-bottom: 0.5rem;
  }

  p {
    color: #aaa;
    font-size: 0.9rem;
  }

  a {
    color: #4e9af1;
    text-decoration: none;
  }
`;

const BookmarkList = styled.div`
  // 여기에 북마크 리스트 스타일 정의
`;

const SearchBarContainer = styled.div`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const FilterOptionsContainer = styled.div`
  // 여기에 필터 옵션 스타일 정의
`;

const HomePage = () => {

  return (
    <HomePageContainer>
      <SearchBarContainer>
        <Input type="text" placeholder="Search for React.js articles..." />
        <Button>Search</Button>
      </SearchBarContainer>

      <ContentList>
        {/* 여기에 ContentItem 컴포넌트들이 위치 */}
      </ContentList>

      {/* 필터 옵션 및 북마크 리스트도 여기에 포함 */}
    </HomePageContainer>
  );
};

export default HomePage;
