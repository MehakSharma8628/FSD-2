const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecretkey";

// Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Mock credentials
    if (username === "admin" && password === "1234") {

        const token = jwt.sign(
            { username: username },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } else {
        res.status(401).json({
            message: "Invalid username or password"
        });
    }
});

// Protected Route
app.get("/profile", (req, res) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token required"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        res.json({
            message: "Access granted",
            user: decoded
        });

    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});