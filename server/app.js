const express = require('express');
const app = express();
const usersRouter = require('./routes/userRoutes');
const postsRouter = require('./routes/postRoutes');

// JSON 요청 본문을 처리하기 위한 미들웨어
app.use(express.json()); 

// cors 미들웨어를 설정하여 크로스 오리진 요청을 허용
const cors = require('cors');
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// 서버가 실행될 포트를 지정
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
