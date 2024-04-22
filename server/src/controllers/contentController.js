const db = require('../config/database');

exports.fetchAllContents = async (req, res) => {
  try {
    const { searchTerm: search, sortOrder = 'DESC', sortField = 'publishedDate', page = 1 } = req.query;
    const limit = 10; // 한 페이지당 컨텐츠 수
    const offset = (page - 1) * limit; // 현재 페이지의 첫 번째 컨텐츠 인덱스
    let queryParams = [];
    let query = 'SELECT * FROM RBBContents';
    let countQuery = 'SELECT COUNT(*) as total FROM RBBContents'; // 전체 개수를 구하는 쿼리

    // 검색 조건 적용
    if (search) {
      query += ` WHERE title LIKE ?`;
      countQuery += ` WHERE title LIKE ?`;
      queryParams.push(`%${search}%`);
    }

    // 정렬 조건 적용
    const validSortFields = ['title', 'publishedDate', 'contentId'];
    const validSortOrder = ['ASC', 'DESC'];
    if (validSortFields.includes(sortField) && validSortOrder.includes(sortOrder.toUpperCase())) {
      query += ` ORDER BY ${sortField} ${sortOrder}`;
    } else {
      query += ' ORDER BY publishedDate DESC'; // 기본 정렬
    }

    // 페이지네이션 적용
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    // DB에서 데이터와 전체 개수 가져오기
    const [contents] = await db.query(query, queryParams);
    const [[{ total }]] = await db.query(countQuery, queryParams.slice(0, -2)); // 전체 개수 쿼리 (limit, offset 제외)

    res.status(200).json({ contents, total });
  } catch (error) {
    console.error('Failed to fetch contents:', error);
    res.status(500).send('Error fetching contents.');
  }
};