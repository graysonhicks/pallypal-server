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
var text = "";
var mainColorComment = "";

app.get("/", function(req, res) {
	res.send("Go to <a href='https://graysonhicks.github.io/pallypal'>Pallypal</a> to build your palette.");
});

app.get("/build", function(req, res) {
	// listens for request on /build route
	var colors = req.query.colors.reverse();
	var type = req.query.type;
	var css;
	text = "/* Made with PallyPal! https://graysonhicks.github.io/pallypal/ */ \n\n";
	mainColorComment = "/* Main color selected in palette generator */\n";

	css = buildStyleSheet(colors, type);

	fs.writeFile(appRoot + "/tmp/colors." + type, css, function(err) {
		res.download(appRoot + "/tmp/colors." + type, "colors." + type);
	});
});

function formatVariable(color) {
	return color
		.split(" ")
		.join("-")
		.toLowerCase();
}

function buildStyleSheet(colors, type) {
	for (var i = 0; i < colors.length; i++) {
		var formattedVar = formatVariable(colors[i].name);
		var formattedFullVarLine = "";

		switch (type) {
			case "css":
				formattedFullVarLine += "." + formattedVar + " { color: #" + colors[i].code + " }";
				break;
			case "scss":
				formattedFullVarLine += "$" + formattedVar + ": " + "#" + colors[i].code + ";";
				break;
			case "sass":
				formattedFullVarLine += "$" + formattedVar + ": " + "#" + colors[i].code;
				break;
			default:

		}
		
		if(colors[i].is_current){
			text += mainColorComment;
			text += formattedFullVarLine + "\n\n";
		} else {
			text += formattedFullVarLine + "\n";
		}
	}
	return text;
}



var port = process.env.PORT || 3000;
app.listen(port);
