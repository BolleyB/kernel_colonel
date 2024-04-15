<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  corn: {type: Number, ref: 'Corn.cornVal', default: 0},
  score: { type: Number, ref: 'Corn.totalCornVal', default: 0 },
  popcornMachineLevel: { type: Number, default: 0 } //I believe each new upgrade model will get its own level state

}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the user document
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  corn: {type: Number, ref: 'Corn.cornVal', default: 0},
  score: { type: Number, ref: 'Corn.totalCornVal', default: 0 }, // Using this as CURRENT $
  totalScore: { type: Number, ref: 'Corn.totalCornVal', default: 0 }, // Using this as TOTAL
  popcornMachineLevel: { type: Number, default: 0 } //I believe each new upgrade model will get its own level state

}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the user document
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

>>>>>>> 5197e5ba8c538bf8d9dc370f928a8aa8b810a506
module.exports = mongoose.model('User', userSchema);