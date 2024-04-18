const db = require('../config/database');

exports.fetchAllContents = async (req, res) => {
  try {
    const { search, sort, order } = req.query;
    let query = 'SELECT * FROM RBBContents';

    // 검색 기능 구현
    if (search) {
      query += ` WHERE title LIKE '%${search}%'`;
    }

    // 정렬 기능 구현
    if (sort && order) {
      query += ` ORDER BY ${sort} ${order}`;
    }

    const [contents] = await db.query(query);

    res.status(200).json(contents);
  } catch (error) {
    console.error('Failed to fetch contents:', error);
    res.status(500).send('Error fetching contents.');
  }
};
