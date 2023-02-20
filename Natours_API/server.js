/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB =process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
.connect(DB,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() =>console.log('DB connection sucessfully!'))

 // eslint-disable-next-line no-console
//console.log(process.env);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
