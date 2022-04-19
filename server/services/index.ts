import { Pool } from 'pg';
import * as csv from 'csv-parser';
import * as fs from 'fs';

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'titanic',
    password: process.env.DB_PASSWORD || 'sa123!',
    port: process.env.DB_PORT || 5432,
  });
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
})

export const feedData = async () => {
    const client = await pool.connect()
    try {
        await dropPassengersTable(client);
        await createPassengersTable(client);

        const results = [];
        fs.createReadStream('assets/train.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            for (let i = 0; i < Math.ceil(results.length / 100); i++) {
                await insertPassenger(results.slice(i * 100, (i+1) * 100), client);
            }
        });
    } catch (error) {
        console.error(error.stack);
        throw error;
    } finally {
        client.release();
    }
}

export const getPassengers = async () => {
    const client = await pool.connect()
    try {
        const query = 'SELECT * from passengers';
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error.stack);
        throw error;
    } finally {
        client.release();
    }
}

const dropPassengersTable = async (client) => {
    await client.query('DROP TABLE IF EXISTS "passengers"');
};

const createPassengersTable = async (client) => {
    const query = `
    CREATE TABLE "passengers" (
	    "id" INT NOT NULL PRIMARY KEY,
        "survived" INT,
	    "pclass" INT,
	    "name" VARCHAR(100) NOT NULL,
        "sex" VARCHAR(10) NOT NULL,
        "age" INT
    );`;

    await client.query(query);
}

const insertPassenger = async (passengers, client) => {
    let query = 'INSERT INTO passengers (id, survived, pclass, name, sex, age) VALUES ';
    for (let i = 0; i < passengers.length; i++) {
        const { PassengerId, Survived, Pclass, Name, Sex, Age } = passengers[i];
        if (i > 0) {
            query += ', ';
        }
        query += `(${PassengerId}, ${Survived}, ${Pclass}, '${Name.replace("'", '\"').replace('"', '\"')}', '${Sex}', ${Age || null})`;
    }

    query += ';';

    await client.query(query);
}