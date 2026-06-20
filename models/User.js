/**
 * User Model
 *
 * bcrypt (bcryptjs)
 * bcrypt is a password-hashing algorithm designed to be slow on purpose.
 * This slowness makes it extremely difficult for attackers to crack passwords
 * using brute force, even if they steal the database. It adds a "salt"
 * (random data) to each password before hashing, so identical passwords
 * produce different hashes.
 *
 * Password Hashing
 * Hashing is a one-way transformation — you can turn a password into a hash,
 * but you cannot turn a hash back into a password. When a user logs in, we
 * hash the password they provide and compare it to the stored hash.
 * We NEVER store plain text passwords.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

/**
 * Pre-save Middleware
 *
 * This runs automatically before saving a user document to the database.
 * It hashes the password so we never store the plain text version.
 * The salt round (10) determines how much processing time is needed —
 * higher is more secure but slower.
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * comparePassword Method
 *
 * Compares a plain text password with the stored hash.
 * bcrypt.compare handles the salt automatically.
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
