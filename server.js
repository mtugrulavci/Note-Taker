// Dependencies
// =============================================================
const fs = require('fs');// added because we will write 

const express = require('express');
const uuid = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');// it will be used for sendFiles
const { Console } = require('console');
//set a static folder - i could not be able to use css file without this 
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create an `/notes` route that returns `add.html`
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','notes.html'));
  });

  // Gets all notes
app.get('/api/notes', (req, res) => {
  let notes= JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes);
  });

  //Create a note
  app.post('/api/notes', (req, res)=>{
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    }
   // let {notes}  = require('./db/db.json');
   let notes= JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    notes.push(newNote); // pushes the new entry to the notes array
    //writes the new entry to the jason file
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
      res.json(notes);
  });

//DELETE
  app.delete(`/api/notes/:id`, (req,res)=>{
    let notes= JSON.parse(fs.readFileSync("./db/db.json","utf8"));
    notes = notes.filter(notes=> notes.id.toString()!== req.params.id.toString());
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null,2));
      res.json(notes);
 });

 app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
}); 


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });