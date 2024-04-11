const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// 로그인 함수
exports.login = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();

        // payload에서 필요한 사용자 정보만 추출하여 세션에 저장
        // 사용자 식별을 위해 이메일 주소와 이름을, 프로필 표시를 위해 프로필 사진을 가져옴
        const user = {
            email: payload['email'],
            name: payload['name'],
            picture: payload['picture']
        };

        req.session.user = user;
        
        res.status(200).json({ message: "로그인 성공", user: user });
    } catch (error) {
        res.status(401).json({ message: "인증 실패", error: error.toString() });
    }
};

// 로그아웃 함수
exports.logout = (req, res) => {
    req.session.destroy(); // 세션 삭제
    res.status(200).json({ message: "로그아웃 성공" });
};

// 로그인 유효성 검사 함수
exports.verifyLogin = async (req, res) => {

    console.log(req.session);

    if (req.session.user) {
        res.status(200).json({ isValid: true, user: req.session.user });
    } else {
        res.status(401).json({ isValid: false, error: "유효하지 않은 세션입니다" });
    }
};