const UserData = require('../models/auth');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

function generateRandomAlphaNumeric(length) {
  const alphanumericChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    result += alphanumericChars[randomIndex];
  }

  return result;
}

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { ownerEmail, accessCode, ownerName, rollno, companyName } = req.body;
    const clientId = generateRandomAlphaNumeric(15);
    const clientSecret = generateRandomAlphaNumeric(10);
    if (ownerEmail && accessCode && ownerName && rollno) {
      const userData = new UserData({
        ownerEmail,
        companyName,
        accessCode,
        ownerName,
        rollno,
        clientId,
        clientSecret,
      });
      await UserData.create(userData);
      return res.status(201).json({
        companyName,
        clientId,
        clientSecret,
      });
    } else {
      return res.status(400).send('Something Missing');
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { ownerEmail, ownerName, rollno, companyName } = req.body;
    if (ownerEmail && ownerName && rollno && companyName) {
      const user = await UserData.findOne({ rollno });
      const token = signToken(user._id);
      if (user) {
        return res.status(200).json({
          companyName: user.companyName,
          clientId: user.clientId,
          clientSecret: user.clientSecret,
          token,
        });
      } else {
        return res.status(400).send('Invalid Credentials');
      }
    } else {
      return res.status(400).send('Something Missing');
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { register, login };
