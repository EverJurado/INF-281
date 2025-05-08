const jwt = require("jsonwebtoken");

const generateToken = (payload, expiresIn = "1d") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token no proporcionado." });
  
    const token = authHeader.split(" ")[1];
    try {
      const payload = verifyToken(token);
      req.usuario = payload;
      next();
    } catch (err) {
      res.status(403).json({ error: "Token inválido." });
    }
  };
  
module.exports = { generateToken, verifyToken, verificarToken };