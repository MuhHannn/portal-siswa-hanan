const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const uuid = require("uuid");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://ppqita:santri@ppqitadb.4jtlspc.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Endpoint untuk mendaftar siswa
app.post("/register", async (req, res) => {
  try {
    const { nama, NIS, password } = req.body;
    const user = new User({ nama, NIS, password });
    await user.save();
    res.status(201).json({ message: "Pendaftaran berhasil" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint untuk login siswa
app.post("/login", async (req, res) => {
  const { NIS, password } = req.body;
  const user = await User.findOne({ NIS, password, status: "aktif" });

  if (user) {
    // Generate token and save it to the user
    user.token = uuid.v4();
    await user.save();
    res.json({ token: user.token });
  } else {
    res.status(401).json({ message: "Login gagal" });
  }
});

// Endpoint untuk cek token
app.post("/checkToken", async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });

  if (user) {
    res.json({
      id: user.id,
      nama: user.nama,
      NIS: user.NIS,
      status: user.status,
      role: user.role,
    });
  } else {
    res.status(401).json({ message: "Token tidak valid" });
  }
});

// Endpoint untuk logout
app.post("/logout", async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });

  if (user) {
    user.token = "";
    await user.save();
    res.json({ message: "Logout berhasil" });
  } else {
    res.status(401).json({ message: "Token tidak valid" });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
