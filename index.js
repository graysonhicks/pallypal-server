var express = require("express");
var request = require("request");
var fs = require("fs");
var app = express();
var cors = require("cors");

app.use(cors()); //allows overriding cross origin policy (use npm install if needed)

//  req structure ?
// {
//     type: "css",
//     colors: [
//         {
//             name: "Semantic Name",
//             code: here will be hex or hsl or rbg depending on what they chose,
//         },
//         {
//             name: "Semantic Name 2",
//             code: here will be hex or hsl or rbg depending on what they chose,
//         }
//     ]
// }

app.get("/", function(req, res) {
	res.send("Go to <a href='https://graysonhicks.github.io/pallypal'>Pallypal</a> to build your palette.");
});

app.get("/build", function(req, res) {
	// listens for request on /build route
	req.type = "css";
	var css;
	switch (req.type) {
		case "css":
			css = buildCSS(req.colors);
			break;
		case "scss":
			css = buildSCSS(req.colors);
			break;
		case "sass":
			css = buildSASS(req.colors);
			break;
		default:
			css = buildCSS(req.colors);
	}

	res.setHeader("Content-disposition", "attachment; filename=colors." + req.type);
	res.setHeader("Content-type", "text/css");
	res.charset = "UTF-8";
	res.write(css);
	res.end();
});

function buildCSS(req) {
	return "I am a CSS file!";
}

function buildSCSS(req) {
	return "I am an SCSS file!";
}

function buildSASS(req) {
	return "I am a SASS file!";
}

var port = process.env.PORT || 3000;
app.listen(port);
