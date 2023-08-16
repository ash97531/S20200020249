const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    trainName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },
    trainNumber: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },
    departureTime: {
      unique: true,
      type: Date,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    seatsAvailable: [
      {
        sleeper: {
          type: Number,
          trim: true,
        },
        AC: {
          type: Number,
          trim: true,
        },
      },
    ],
    price: [
      {
        sleeper: {
          type: Number,
          trim: true,
        },
        AC: {
          type: Number,
          trim: true,
        },
      },
    ],
    delayedBy: {
      type: Number,
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
module.exports = mongoose.model('TrainData', userSchema);
