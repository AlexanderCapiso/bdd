const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Conexión a MySQL (Railway)
const db = mysql.createConnection({
    host: "TU_HOST",
    user: "TU_USER",
    password: "TU_PASSWORD",
    database: "TU_DATABASE",
    port: TU_PORT
});

db.connect(err => {
    if (err) throw err;
    console.log("📦 Conectado a MySQL");
});

// 🔹 Ruta de login
app.post("/login", (req, res) => {
    const { usuario, password } = req.body;
    db.query(
        "SELECT * FROM usuarios WHERE usuario = ? AND password = ?",
        [usuario, password],
        (err, results) => {
            if (err) return res.status(500).json({ message: "Error en servidor" });
            if (results.length > 0) res.json({ success: true, message: "✅ Login correcto" });
            else res.json({ success: false, message: "❌ Usuario o contraseña incorrectos" });
        }
    );
});

app.listen(3000, () => console.log("🚀 Backend en puerto 3000"));
