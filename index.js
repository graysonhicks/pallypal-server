var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");

// parse application/json
app.use(bodyParser.json());
app.use(cors()); //allows overriding cross origin policy (use npm install if needed)

//  req structure ?
// {
//     type: "css",
// colors: [
//     {
//         name: "Semantic Name",
//         code: here will be hex or hsl or rbg depending on what they chose,
//     },
//     {
//         name: "Semantic Name 2",
//         code: here will be hex or hsl or rbg depending on what they chose,
//     }
// ]
// }

app.get("/", function(req, res) {
	res.send("Go to <a href='https://graysonhicks.github.io/pallypal'>Pallypal</a> to build your palette.");
});

app.post("/build", function(req, res) {
	// listens for request on /build route
	console.log(req.body, "REQ");
	var body = JSON.parse(req.body);
	console.log(body);
	var colors = body.colors;
	var type = body.type;
	var css;
	switch (type) {
		case "css":
			css = buildCSS(colorsJSON);
			break;
		case "scss":
			css = buildSCSS(colorsJSON);
			break;
		case "sass":
			css = buildSASS(colorsJSON);
			break;
		default:
			css = buildCSS(colorsJSON);
	}

	res.setHeader("Content-disposition", "attachment; filename=colors." + req.query.type);
	res.setHeader("Content-type", "text/css");
	res.charset = "UTF-8";
	res.write(css);
	res.end();
});

function buildCSS(colors) {
	console.log(colors);
	var text = "";
	for (var i = 0; i < colors.length; i++) {
		text += colors[i].name + ": " + colors[i].code;
	}
	return text;
}

function buildSCSS(colors) {
	return "I am an SCSS file!";
}

function buildSASS(colors) {
	return "I am a SASS file!";
}

var port = process.env.PORT || 3000;
app.listen(port);
