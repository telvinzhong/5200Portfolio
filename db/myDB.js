const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

const dbName = "./db/db.sqlite3";

function MyDB() {
  const myDb = {};

//   async function insertCar(car) {
//     const db = new sqlite3.Database(dbName);

//     const query = `INSERT INTO Cars(name)
//   VALUES ($name)
// `;

//     // const promise = promisify(db.run.bind(db));

//     return new Promise((resolve, reject) => {
//       db.run(query, car, function (err) {
//         if (err) {
//           return reject(err);
//         }
//         console.log("promise", this);
//         resolve(this.lastID);
//       });
//     }).finally(() => db.close());

//     // return promise(query, car)
//     //   .then(function (res) {
//     //     console.log("Inserted", res, this, db.lastInsertRowId);
//     //     return db.lastInsertRowId;
//     //   })
//     //   .finally(() => db.close());
//   }

  async function getEducation(educName) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `SELECT * FROM EDUCATION`;
    const params = {
      $educName: educName + "%",
    };

    const promise = promisify(db.all.bind(db));

    return promise(query).finally(() => db.close());
  }

//   async function getNumberOfCars() {
//     console.log("Connecting to the database on ", dbName);
//     const db = new sqlite3.Database(dbName);

//     const query = `SELECT count() as count FROM CarMaker;
// `;

//     const promise = promisify(db.get.bind(db));

//     return promise(query).finally(() => db.close());
//   }

//   myDb.insertCar = insertCar;
  myDb.getEducation = getEducation;
//   myDb.getNumberOfCars = getNumberOfCars;

  return myDb;
}

module.exports = MyDB();
