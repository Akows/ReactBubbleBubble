const app = require("./src/app");
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 정상적으로 실행되었습니다`);
});