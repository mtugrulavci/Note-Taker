// Dependencies
// =============================================================
const fs = require('fs');// added because we will write 
const express = require('express');
const path = require('path');
const { notes } = require('./Develop/db/db');


const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*app.get('/api/notes', (req, res) => {
    res.send('Hello!');
  }); */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

// Create an `/notes` route that returns `add.html`
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
  });

  
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
  });