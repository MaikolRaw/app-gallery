const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
  // Aquí puedes agregar más campos si deseas
});

module.exports = mongoose.model('User', userSchema);
