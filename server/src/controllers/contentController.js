const db = require('../config/database');

exports.fetchAllContents = async (req, res) => {
  try {
    const { searchTerm: search, sortOrder = 'DESC', sortField = 'publishedDate' } = req.query;
    let queryParams = [];
    let query = 'SELECT * FROM RBBContents';

    // 검색 기능 구현
    if (search) {
      query += ` WHERE title LIKE ?`;
      queryParams.push(`%${search}%`);
    }

    // 정렬 기능 구현
    // 정렬 필드 확인 및 정렬 순서 확인
    const validSortFields = ['title', 'publishedDate', 'contentId'];
    const validSortOrder = ['ASC', 'DESC'];
    if (validSortFields.includes(sortField) && validSortOrder.includes(sortOrder.toUpperCase())) {
      query += ` ORDER BY ${sortField} ${sortOrder}`;
    } else {
      query += ' ORDER BY publishedDate DESC'; // 기본 정렬
    }

    const [contents] = await db.query(query, queryParams);

    res.status(200).json(contents);
  } catch (error) {
    console.error('Failed to fetch contents:', error);
    res.status(500).send('Error fetching contents.');
  }
};
