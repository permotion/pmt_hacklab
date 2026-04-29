const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const JWT_SECRET = "dev-secret-123";

const users = [
  { id: 1, email: "user@lab.local", role: "user", password: "Password123" },
  { id: 2, email: "admin@lab.local", role: "admin", password: "admin123" },
];

app.get("/health", (req, res) => res.json({ status: "ok", service: "auth-lab" }));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.get("/debug", (req, res) => {
  res.json({
    jwtSecret: JWT_SECRET,
    testUsers: users
  });
});

app.listen(3000, () => console.log("auth-lab running on 3000"));