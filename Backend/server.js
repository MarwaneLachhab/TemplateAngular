const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;
// Use cors middleware to enable CORS
app.use(cors());

// Configure your SQL Server connection
const config = {
  user: 'sparo',
  password: 'rachidia.02',
  server: 'DESKTOP-E9K35QG\\SQLEXPRESS',
  database: 'templateSite',
  options: {
    encrypt: false, // Use true if connecting to Azure SQL Database
  },
};

// Create a pool of connections
const pool = new sql.ConnectionPool(config);

// Define an API endpoint to get all data
app.get('/api/data', async (req, res) => {
  try {
    // Connect to the database
    await pool.connect();

    // Execute SQL queries
    const resultNavbar = await pool.request().query('SELECT * FROM navbar');
    const resultCards = await pool.request().query('SELECT * FROM cards');
    const resultSlider = await pool.request().query('SELECT * FROM slider');
    const resultFooter = await pool.request().query('SELECT * FROM footer');
    const resultUniqueTable = await pool.request().query('SELECT * FROM unique_table');

    // Send the data as JSON
    res.json({
      navbar: resultNavbar.recordset,
      cards: resultCards.recordset,
      slider: resultSlider.recordset,
      footer: resultFooter.recordset,
      unique_table: resultUniqueTable.recordset,
    });
  } catch (err) {
    console.error('Error retrieving data:', err.message);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the database connection
    pool.close();
  }
});

app.get('/api/parentlinks', async (req, res) => {
  try {
    await pool.connect();
    const resultParentLinks = await pool.request().query('SELECT * FROM ParentLinks');
    res.json(resultParentLinks.recordset);
  } catch (err) {
    console.error('Error retrieving parent links:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get Semi Links
app.get('/api/semilinks', async (req, res) => {
  try {
    await pool.connect();
    const resultSemiLinks = await pool.request().query('SELECT * FROM SemiLinks');
    res.json(resultSemiLinks.recordset);
  } catch (err) {
    console.error('Error retrieving semi links:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
