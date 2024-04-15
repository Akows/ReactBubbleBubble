require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const usersRouter = require('./routes/userRoutes');
const rssRouter = require('./routes/rssRoutes');

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

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

// MySQL에 세션 저장하기 위한 세션 스토어 생성
const sessionStore = new MySQLStore(options);

// 세션 설정
app.use(session({
  key: 'session_cookie_name',
  secret: process.env.SECRETKEY,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1주일
  }
}));

// 서버 라우터
app.use('/users', usersRouter);

// RSS 라우터
app.use('/rss', rssRouter);

module.exports = app;
