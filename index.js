var express = require("express");
var request = require("request");
var fs = require("fs");
var app = express();
var cors = require("cors");

var appRoot = process.cwd();

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

app.get("/build", function(req, res) {
	// listens for request on /build route
	var colors = req.query.colors;
	var type = req.query.type;
	var css;
	switch (type) {
		case "css":
			css = buildCSS(colors);
			break;
		case "scss":
			css = buildSCSS(colors);
			break;
		case "sass":
			css = buildSASS(colors);
			break;
		default:
			css = buildCSS(colors);
	}
	console.log(css);
	fs.writeFile(appRoot + "/tmp/colors." + type, css, function(err) {
		res.download(appRoot + "/tmp/colors." + type, "colors." + type);
	});
});


var text = "/* Made with PallyPal! https://graysonhicks.github.io/pallypal/ */ \n\n";

var formatVariable(color){
	return colors[i].name
		.split(" ")
		.join("-")
		.toLowerCase();
}

function buildCSS(colors) {
	for (var i = 0; i < colors.length; i++) {
		var formattedVar = formatVariable(colors[i].name);
		text += "." + formattedVar + " { color: #" + colors[i].code + " }\n";
	}
	return text;
}

function buildSCSS(colors) {
	for (var i = 0; i < colors.length; i++) {
		var formattedVar = formatVariable(colors[i].name);
		text += "$" + formattedVar + ": " + "#" + colors[i].code + ";\n";
	}
	return text;
}

function buildSASS(colors) {
	for (var i = 0; i < colors.length; i++) {
		var formattedVar = formatVariable(colors[i].name);
		text += "$" + formattedVar + ": " + "#" + colors[i].code + "\n";
	}
	return text;
}

var port = process.env.PORT || 3000;
app.listen(port);
