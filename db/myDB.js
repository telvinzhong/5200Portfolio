const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

const dbName = "./db/db.sqlite3";

function MyDB() {
  const myDb = {};

  async function insertEduc(educ) {
    const db = new sqlite3.Database(dbName);

    const query = `INSERT INTO EDUCATION(U_ID, Institution)
  VALUES ($U_ID, $INSTITUTION)
`;

    // const promise = promisify(db.run.bind(db));

    return new Promise((resolve, reject) => {
      db.run(query, educ, function (err) {
        if (err) {
          return reject(err);
        }
        console.log("promise", this);
        resolve(this.lastID);
      });
    }).finally(() => db.close());

  }

  async function getEducation(educName) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `SELECT * FROM EDUCATION
    ORDER BY U_ID`;
    const params = {
      $educName: educName + "%",
    };

    const promise = promisify(db.all.bind(db));

    return promise(query).finally(() => db.close());
  }

  async function getNumberOfEduc() {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `SELECT count() as count FROM Education;`;

    const promise = promisify(db.get.bind(db));
    // console.log(promise(query));
    // Works in back end but not sure how to show count in front end.
    return promise(query).finally(() => db.close());
  }

  myDb.insertEduc = insertEduc;
  myDb.getEducation = getEducation;
  myDb.getNumberOfEduc = getNumberOfEduc;

  return myDb;
}

module.exports = MyDB();
