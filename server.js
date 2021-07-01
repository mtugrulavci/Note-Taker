// Dependencies
// =============================================================
const fs = require('fs');// added because we will write 

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const path = require('path');// it will be used for sendFiles
const { notes } = require('./db/db.json');

//set a static folder - i could not be able to use css file without this 
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
});

// Create an `/notes` route that returns `add.html`
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','notes.html'));
  });
  app.get('/api/notes', (req, res) => {
    return res.json(notes);
  });

  
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });