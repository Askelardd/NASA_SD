// Import necessary modules
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const dbConfig = {
    host: 'bl-db',
    port: 5432,
    user: 'sd',
    database: 'sd',
    password: 'sd',
};

// HelloWorld module
const HelloWorld = {
    say: function () {
        console.log("Hello, World!!");
    }
};

// JSONObserver module
const JSONObserver = {
    list: function () {
        console.log("Listing all available JSON files!");
        try {
            const files = fs.readdirSync("/data");
            files.filter(file => file.endsWith(".json")).forEach(this.processFile);
        } catch (error) {
            console.log(`Error accessing /data: ${error}`);
        }
    },

    processFile: function (fileName) {
        console.log(`Processing file: ${fileName}`);
        const filePath = path.join("/data", fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        JSONObserver.parse(content);
    },

    parse: function (content) {
        console.log(`JSON Content of the file: \n${content}`);
        try {
            const meteorites = JSON.parse(content).map(meteorite => ({
                name: meteorite.name,
                nametype: meteorite.nametype,
                recclass: meteorite.recclass,
                mass: parseFloat(meteorite.mass) || null, // Conversão para número flutuante
                fall: meteorite.fall,
                year: meteorite.year ? new Date(meteorite.year) : null, // Conversão para Data
                reclat: parseFloat(meteorite.reclat) || null, // Conversão para número flutuante
                reclong: parseFloat(meteorite.reclong) || null, // Conversão para número flutuante
                geolocation: meteorite.geolocation
            }));
            
            console.log(meteorites);
            this.insertToDatabase(meteorites);

        } catch (err) {
            console.error(`Error parsing JSON: ${err}`);
            return;
        }
    },

    insertGeolocation: async function (client, geolocation) {
        const query = `
            INSERT INTO "Geolocation" (type, coordinates) 
            VALUES ($1, $2) 
            RETURNING geo_id
        `;
        const values = [geolocation.type, JSON.stringify(geolocation.coordinates)];

        try {
            const res = await client.query(query, values);
            return res.rows[0].geo_id;
        } catch (err) {
            console.error(`Error inserting geolocation data: ${err}`);
            return null;
        }
    },

    insertToDatabase: async function (meteorites) {
        const client = new Client(dbConfig);

        try {
            await client.connect();
            console.log('Connected to the database.');

            // Deletar todos os dados das tabelas
            const deleteQuery = `
                DELETE FROM "Nasa";
                DELETE FROM "Geolocation";
            `;

            try {
                await client.query(deleteQuery);
                console.log('Deleted all data from "Nasa" and "Geolocation" tables.');
            } catch (err) {
                console.error(`Error deleting data: ${err}`);
            }

            for (const meteorite of meteorites) {
                const geo_id = await this.insertGeolocation(client, meteorite.geolocation);

                const query = `
                    INSERT INTO "Nasa" 
                    (name, nametype, recclass, mass, fall, year, reclat, reclong, geo_id) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                `;
                const values = [
                    meteorite.name, meteorite.nametype, meteorite.recclass, meteorite.mass, 
                    meteorite.fall, meteorite.year, meteorite.reclat, meteorite.reclong, geo_id
                ];

                try {
                    await client.query(query, values);
                    console.log(`Inserted: ${JSON.stringify(meteorite)}`);
                } catch (err) {
                    console.error(`Error inserting data: ${err}`);
                }
            }

        } catch (err) {
            console.error(`Database connection error: ${err}`);
        } finally {
            await client.end();
            console.log('Disconnected from the database.');
        }
    }
};

// Application Module
const ImporterApplication = {
    start: function () {
        HelloWorld.say();
        JSONObserver.list();

        console.log("Application started");
    }
};

// Start the application
ImporterApplication.start();
