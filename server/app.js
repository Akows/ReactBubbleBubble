require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const usersRouter = require('./src/routes/userRoutes');

const app = express();

// JSON 요청 본문을 처리하기 위한 미들웨어
app.use(express.json()); 

// CORS 미들웨어 설정
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// cors 미들웨어를 설정하여 크로스 오리진 요청을 허용
app.use(cors(corsOptions));

// 세션 설정
app.use(session({
  secret: process.env.SECRETKEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1주일
  }
}));

// 서버 라우터
app.use('/users', usersRouter);

// 서버포트 설정
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 정상적으로 실행되었습니다`);
});
