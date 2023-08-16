const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routes/auth');
const connectDB = require('./db/connect');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

app.use('/trains', authRoutes);

app.listen(port, async () => {
  await connectDB(
    'mongodb+srv://ashwani97531:13572469@cluster0.d5csp3i.mongodb.net/?retryWrites=true&w=majority'
  );
  console.log(`Example app listening at http://localhost:${port}`);
});
