const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../config/auth");
const UserModel = require("../models/userModel");
const { sendConfirmationEmail, sendPasswordResetEmail } = require("../services/emailService");

const register = async (req, res) => {
    const { nombre, apellidopaterno, apellidomaterno, email, password, telefono, pais, ciudad, genero } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.createUser({
            nombre,
            apellidopaterno,
            apellidomaterno,
            email,
            password: hashedPassword,
            telefono,
            pais,
            ciudad,
            genero,
            foto: null,
            id_rol: 3, // Usuario normal por defecto
            puntaje_total: 0,
            verificado: false,
            reset_token: null
        });

        const token = generateToken({ id: newUser.id_usuario });
        await sendConfirmationEmail(email, token);

        res.status(201).json({ message: "Usuario registrado con éxito.", usuario: newUser });
    } catch (error) {
        console.error("Error en el registro:", error.message);
        res.status(500).json({ error: "Error en el servidor." });
    }
};




const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        console.log("--1");
        const user = await UserModel.findUserByEmail(correo);
        if (!user) return res.status(400).json({ error: "Correo o contraseña incorrectos." });
        const isValid = await bcrypt.compare(password, user.contrasena);
        if (!isValid) return res.status(400).json({ error: "Correo o contraseña incorrectos." });
        if (!user.verificado) return res.status(400).json({ error: "Cuenta no verificada." });

        const token = generateToken({ id: user.id });
        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(500).json({ error: "Error en el servidor." });
    }
};

const confirmAccount = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = verifyToken(token);
        await UserModel.updateUserVerification(decoded.id);
        res.json({ message: "Cuenta confirmada correctamente." });
    } catch (error) {
        res.status(400).json({ error: "Token inválido o expirado." });
    }
};

const recoverPassword = async (req, res) => {
    const { correo } = req.body;
    try {
        const user = await UserModel.findUserByEmail(correo);
        if (!user) return res.status(404).json({ error: "Correo no registrado." });

        const token = generateToken({ id: user.id }, "1h");
        await UserModel.updateUserResetToken(user.id, token);
        await sendPasswordResetEmail(correo, token);

        res.json({ message: "Correo de recuperación enviado." });
    } catch (error) {
        console.error("Error en recoverPassword:", error);  // Asegúrate de imprimir el error completo
        res.status(500).json({ error: "Error en el servidor." });
    }
};


const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
        const decoded = verifyToken(token);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await UserModel.updateUserPassword(decoded.id, hashedPassword);

        res.json({ message: "Contraseña actualizada correctamente." });
    } catch (error) {
        res.status(400).json({ error: "Token inválido o expirado." });
    }
};

module.exports = {
    register,
    login,
    confirmAccount,
    recoverPassword,
    resetPassword
};
