const sqlite3 = require("sqlite3").verbose();
const util = require("util");
const {promisify} = util.promisify;

const dBName = "db.sqlite3";

function getPeople() {
    const db = new sqlite3.Database(dBName)
    console.log("Connecting to database ", dbName);

    const query = `Select first_name from Person
    `;

    const callback = (err, rows) => {
        if (err) {
            throw err;
        }

        console.log("Got ", rows.length, " rows");
        console.log(rows);

        for (let r of rows) {
            console.log(`First name: ${r.first_name}`);
        }

        db.close();
        return rows;
    };

    db.all(query, callback);
    return rows;
}

function getCompanyEduc() {
    const db = new sqlite3.Database(dBName)
    console.log("Connecting to database ", dbName);

    const query = `Select CO.Company_Name, Ed.Institution
    FROM Work_Experience as We, Education as Ed, Person as Pe, Company as CO
    WHERE We.U_ID = Pe.U_ID and Ed.U_ID = Pe.U_ID and We.C_ID = CO.C_ID;
    `;

    const callback = (err, rows) => {
        if (err) {
            throw err;
        }

        console.log("Got ", rows.length, " rows");
        console.log(rows);

        for (let r of rows) {
            console.log(`Company: ${r.CO.CompanyName} has ${r.Ed.Institution}`);
        }

        db.close();
        return rows;
    };

    db.all(query, callback);
    return rows;
}

function async runScripts() {
    const rows = await getCompanyEduc();

    console.log("Found these companies and educations:", rows);
}

runScripts();