import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'srsssmsc_smartlab',
});

export const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    db.connect((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(db);
    });
  });
};
