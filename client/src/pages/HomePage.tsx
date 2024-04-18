import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import bookmarkIconEmpty from '../assets/bookmark_black_24dp.svg';
import bookmarkIconFilled from '../assets/bookmark_border_black_24dp.svg';
import ErrorComponent from '../components/utils/ErrorComponent';
import LoadingIndicator from '../components/utils/LoadingIndicator';
import { fetchContents } from '../redux/contents/contentsSlice';

const Container = styled.div`
  background-color: #242424;
  color: white;
  min-height: 100vh;
  margin-top: 50px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  margin: 50px auto;
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
  font-family: 'Noto Sans KR', sans-serif;

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
    width: 100%;

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
    }

    .meta-and-bookmark {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
    }

    .bookmark-btn {
      font-size: 0.4rem;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
`;

const BookmarkIcon = styled.img`
  width: 24px; // 아이콘 크기
  height: 24px;
`;

const HomePage: React.FC = () => {
  const { contents, isLoading, error } = useSelector(state => state.contents);
  const dispatch = useDispatch();

  // 로컬 스토리지에서 북마크 상태 로드
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
  });

  useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);

  console.log(contents);

  const toggleBookmark = (id) => {
    const newBookmarks = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const renderContentCards = () => {
    return contents?.map(content => (
      <ContentCard key={content.contentId}>
        <div className="thumbnail" style={{ backgroundImage: `url(${content.thumbnailUrl})` }}></div>
        <div className="content-info">
          <div className="title">{content.title}</div>
          <div className="summary">{content.summary}</div>
          <div className="meta-and-bookmark">
            <div className="meta">{content.url} | {new Date(content.publishedDate).toLocaleDateString()}</div>
            <button className="bookmark-btn" onClick={() => toggleBookmark(content.contentId)}>
              <BookmarkIcon src={bookmarks.includes(content.contentId) ? bookmarkIconFilled : bookmarkIconEmpty} alt="Bookmark" />
            </button>
          </div>
        </div>
      </ContentCard>
    ));
  };

  return (
    <Container>
      <Head>전 세계에 있는 React.js 글을 한 번에 모아보기!</Head>
      <SearchBarContainer>
        <Input type="text" placeholder="검색어를 입력해주세요" />
        <Button>Search</Button>
      </SearchBarContainer>
      <InfiniteScroll
        dataLength={contents.length}
        next={() => dispatch(fetchContents())}
        hasMore={true}
        loader={<LoadingIndicator />}
      >
        {renderContentCards()}
      </InfiniteScroll>
      {isLoading && <LoadingIndicator />}
      {error && <ErrorComponent showError={error} errorName="오류 발생!" errorMessage="데이터를 불러오는 데 실패했습니다." />}
    </Container>
  );
};

export default HomePage;