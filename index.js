const express = require("express");
const app = express();

app.use(express.static(__dirname + '/client'))

// Start MongoDB Atlas *******
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extend: true}));

const mongoose = require("mongoose");

const mongooseUri = "mongodb+srv://MovieCRUDUser:<password>@cluster0.xig7ow5.mongodb.net/movieDatabase"
mongoose.connect(mongooseUri, {useNewUrlParser: true}, {useUnifiedTopology: true})
const movieSchema = {
	title: String,
	comments: String 

}
const Movie = mongoose.model("movie", movieSchema);

// Create route called from create.html
app.post("/create", function(req, res){
	let newNote = new Movie({
		title: req.body.title,
		comments: req.body.comments
	})

	newNote.save();
	res.redirect("/");
})

const renderNotes = (notesArray) => {
	let text = "MoviesmCollection:\n\n";
	notesArray.forEach ((note)=>{
		text += "Title: " + note.title + "\n";
		text += "Comments: " + note.title + "\n";
		text += "ID: " + note.title + "\n\n";
	})
	text += "Total Count: " + notesArray.length;
	return text
}

app.get("/read", function(request, response) {
	Movie.find({}).then(notes => {
		response.type('text/plain');
		response.send(renderNotes(notes));
	})
})

const port = process.env.PORT || 3000
app.get('/test', function(request, response) {
	response.type('text/plain')
	response.send('Node.js and Express running on port='+port)
})

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})
