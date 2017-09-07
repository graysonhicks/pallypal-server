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
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Server running on port %d");
