const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors({ origin: "*" }));

const upload = multer({ dest: "uploads/" });

app.get("/health", (req, res) => res.json({ status: "ok", service: "files-lab" }));

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "uploaded",
    originalName: req.file.originalname,
    storedAs: req.file.filename,
    url: `/uploads/${req.file.filename}`
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => console.log("files-lab running on 3000"));