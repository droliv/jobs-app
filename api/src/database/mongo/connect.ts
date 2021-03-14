import { MongoClient } from 'mongodb';

const MONGO_DB_URL = 'mongodb://localhost:27017/appjobs';

const connection = () => {
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('appjobs'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
   });
};

export { connection };
