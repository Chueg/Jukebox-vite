const db = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

db.once('open', async () => {
  await User.deleteMany({});

  const userbase = await User.insertMany(userData);

  console.log('Userbase seeded!');
  process.exit(0);
});