const mongoose = require("mongoose");
const uuid = require("uuid");

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuid.v4, unique: true },
  nama: { type: String, required: true, minlength: 3, maxlength: 20 },
  NIS: {
    type: Number,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 5,
  },
  password: { type: String, required: true, minlength: 6, maxlength: 14 },
  token: { type: String, default: "" },
  status: { type: String, default: "aktif" },
  role: { type: String, default: "siswa" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
