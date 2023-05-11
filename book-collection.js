const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();

// All the middlewares
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// a get route that serves a html file.
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

//Initially the array is empty.
let books = [];

// a get route that returns json array of books
app.get("/books", function (req, res) {
	let bookCollection = res.json(books);
	res.send(bookCollection);
});

// a post route to add books in the empty array
app.post("/books", function (req, res) {
	let bookDetailsJsonData = req.body;
	// Check if title and author properties exist
	if (!bookDetailsJsonData.title || !bookDetailsJsonData.author) {
		return res.status(400).json({ error: "Title and author are required" });
	}
	//randomly generating id's
	bookDetailsJsonData.id = Math.floor(Math.random() * 455545663267) + 1;
	books.push(bookDetailsJsonData);
	res.json(books);
});
//Delete route
//express route parameter
//I call it dynamic route parameter (/)
app.delete("/books/:id", function (req, res) {
	let idDeleteReq = parseInt(req.params.id);
	let booksArrLength = books.length;

	let filteredArray = books.filter((obj) => {
		return obj.id !== idDeleteReq;
	});

	if (filteredArray.length === booksArrLength - 1) {
		//updating the array
		books = filteredArray;
		res.json({
			message: `Book with id ${req.params.id} successfully deleted.`,
		});
	} else {
		res.status(404);
		res.json({ message: `Book with id ${req.params.id} not found!` });
	}
});

app.listen(3000, function () {
	console.log("server connected on port: 3000");
});
