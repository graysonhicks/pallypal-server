var express = require("express");
var request = require("request");
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
app.get("/build", function(req, res) {
	// listens for request on /build route
	var css;
    var fileName;
	switch (req.type) {
		case "css":
        function() {
		    css = buildCSS(req.colors);
            fileName = "/colors.css";
		}
			break;
		case "scss":
        function() {
		    css = buildSCSS(req.colors);
            fileName = "/colors.scss";
		}
			break;
		case "sass":
        function() {
		    css = buildSASS(req.colors);
            fileName = "/colors.sass";
		}
			break;
		default:
        function(){
            css = buildCSS(req.colors);
            fileName = "/colors.css";
        }
	}


    var stream = fs.createWriteStream(fileName);
    stream.once('open', function(fd) {
      stream.end(css);
    });

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
console.log("Server running on port %d");
