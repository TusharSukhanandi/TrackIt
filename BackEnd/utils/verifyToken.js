import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {

    const {token} = req.cookies.jwt;

    if(!token){
        return res.status(401).json({ error : "unauthorized access - No token provided" });
    }

    const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);

    if(!verifyToken){
        return res.status(401).json({ error : "unauthorized access - Invalid token" });
    }

    req.userId = verifyToken.userId;

}

export default verifyToken;