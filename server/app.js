const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/userRoutes');
// const postsRouter = require('./routes/postRoutes');

const app = express();

// JSON 요청 본문을 처리하기 위한 미들웨어
app.use(express.json()); 

// cors 미들웨어를 설정하여 크로스 오리진 요청을 허용
app.use(cors());

app.use('/users', usersRouter);
// app.use('/posts', postsRouter);

// 서버가 실행될 포트를 지정
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
