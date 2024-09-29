import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {

    const {TrackItJwt : token } = req.cookies;

    if(!token){
        return res.status(401).json({ error : "unauthorized access - No token provided" });
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if(!verifyToken){
        return res.status(401).json({ error : "unauthorized access - Invalid token" });
    }
    req.userId = verifyToken.userId;
next()
}

export default verifyToken;