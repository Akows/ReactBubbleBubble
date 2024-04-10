const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

exports.test = async (req, res) => {
    try {
        res.status(200).json({ message: "연결 성공" });
    } catch (error) {
        res.status(401).json({ message: "연결 실패" });
    }
};

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

exports.logout = (req, res) => {
    res.status(200).json({ message: "로그아웃 처리됨" });
};
