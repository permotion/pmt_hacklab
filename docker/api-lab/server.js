const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const JWT_SECRET = "dev-secret-123";

const users = [
  { id: 1, email: "user@lab.local", role: "user", password: "Password123", balance: 100 },
  { id: 2, email: "admin@lab.local", role: "admin", password: "admin123", balance: 9999 },
];

app.get("/health", (req, res) => res.json({ status: "ok", service: "api-lab" }));

app.get("/api/users", (req, res) => res.json(users));

app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "not found" });
  res.json(user); // IDOR intencional
});

app.get("/api/admin", (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === "admin") return res.json({ flag: "admin-access-ok", secret: "ADMIN_API_KEY=lab-123" });
  } catch {}
  res.status(403).json({ error: "forbidden" });
});

app.get("/api/debug", (req, res) => {
  res.json({
    env: "development",
    jwtSecret: JWT_SECRET,
    dbPassword: "mysql-root-password",
    note: "debug endpoint exposed intentionally"
  });
});

app.listen(3000, () => console.log("api-lab running on 3000"));