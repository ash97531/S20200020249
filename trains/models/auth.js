const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },
    ownerName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },
    rollno: {
      unique: true,
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    accesscode: {
      type: String,
      require: true,
      trim: true,
    },
    clientSecret: {
      type: String,
      trim: true,
      default: 'user',
    },
    clientId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
//For get fullName from when we get data from database
// userSchema.virtual("fullName").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });
// userSchema.method({
//   async authenticate(password) {
//      return bcrypt.compare(password, this.hash_password);
//   },
// });
module.exports = mongoose.model('UserData', userSchema);
