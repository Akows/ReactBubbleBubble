const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// 로그인 함수 및 유효성 검사 함수
exports.login = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        
        // 쿠키에 토큰 설정
        res.cookie('token', payload, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        res.status(200).json({ message: "로그인 성공", user: payload });
    } catch (error) {
        res.status(401).json({ message: "인증 실패", error: error.toString() });
    }
};

// 로그아웃 함수
exports.logout = (req, res) => {
    // 쿠키에서 토큰 제거
    res.clearCookie('token');
    res.status(200).json({ message: "로그아웃 처리됨" });
};

// 로그인 유효성 검사 함수
exports.verifyLogin = async (req, res) => {
    try {
        console.log(req.cookies.token);

        // 쿠키에서 토큰 추출
        const token = req.cookies.token;

        // Google OAuth 라이브러리를 사용하여 토큰 검증
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Google 클라이언트 ID를 여기에 명시
        });

        const payload = ticket.getPayload();
        // 페이로드에서 사용자 정보 추출 및 추가 검증 로직(예: 사용자 ID 확인)

        // 토큰이 유효하다고 응답
        res.status(200).json({ isValid: true, user: payload });
    } catch (error) {
        // 토큰 검증 실패 시
        res.status(401).json({ isValid: false, error: "유효하지 않은 토큰입니다" });
    }
};