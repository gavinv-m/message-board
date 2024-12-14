import pkg from 'pg';
import client from './client.js';
import messages from '../messages.js';

const { Client } = pkg;

const tableCreationQuery = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100),
  text VARCHAR(140),
  added VARCHAR(100)
);
`;

const seedDataQuery = `
  INSERT INTO messages (username, text, added)
  VALUES ($1, $2, $3), ($4, $5, $6);
`;

const createDatabase = async function () {
  const inProduction = process.env.NODE_ENV === 'production';
  let currentClient = client;

  try {
    await currentClient.connect();
    if (inProduction === false) {
      // Create databse if in development
      try {
        await currentClient.query('CREATE DATABASE messages');
        console.log('Database created successfully');
      } catch (error) {
        if (error.code === '42P04') {
          console.log('Database already exists');
        } else {
          throw error;
        }
      }
    }

    // Disconnect from default db and connect to messages
    await currentClient.end();

    // Connect to new database
    currentClient = new Client({
      connectionString: inProduction
        ? process.env.DATABASE_URL
        : process.env.LOCAL_DB_URL + '/messages',
      ssl: inProduction ? { rejectUnauthorized: false } : false,
    });
    await currentClient.connect();

    console.log('Creating table...');
    await currentClient.query(tableCreationQuery);

    console.log('Seeding data...');
    await currentClient.query(seedDataQuery, [
      messages[0].username,
      messages[0].text,
      messages[0].added,
      messages[1].username,
      messages[1].text,
      messages[1].added,
    ]);

    console.log('Database setup completed successfully');
  } catch (err) {
    console.error('Error during DB creation or population', err);
  } finally {
    await currentClient.end();
    console.log('done');
  }
};

createDatabase();
