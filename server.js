// Dependencies
// =============================================================
const fs = require('fs');// added because we will write 

const express = require('express');
const uuid = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

const path = require('path');// it will be used for sendFiles
const { notes } = require('./db/db.json');
const { runInNewContext } = require('vm');

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

  // Gets all notes
app.get('/api/notes', (req, res) => {
    return res.json(notes);
  });

  //Create a note
app.post('/api/notes', (req, res)=>{
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4(),
    }
    notes.push(newNote);
  });
  //delete
  app.delete('api/notes:id', (req,res)=>{
  notes.splice()
  })


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });