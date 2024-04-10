const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// 프론트엔드 <-> 백엔드 연결 테스트 함수
exports.test = async (req, res) => {
    try {
        res.status(200).json({ message: "연결 성공" });
    } catch (error) {
        res.status(401).json({ message: "연결 실패" });
    }
};




// 로그인 함수 및 유효성 검사 함수
// Google OAuth 특성상 로그인 기능이 곧 유효성 검사 기능도 수행
exports.login = async (req, res) => {
    try {
        const { idToken } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        
        res.status(200).json({ message: "로그인 성공", user: payload });
    } catch (error) {
        res.status(401).json({ message: "인증 실패", error: error.toString() });
    }
};

// 로그아웃 함수
exports.logout = (req, res) => {
    res.status(200).json({ message: "로그아웃 처리됨" });
};
