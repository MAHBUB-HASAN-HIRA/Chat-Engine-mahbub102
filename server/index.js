require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

const port = 5000;

app.post("/chat", async (req, res) => {
	const data = {
		username: req.body.username,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		secret: req.body.secret,
		avatar: req.body.avatar,
	};
	const config = {
		method: "post",
		url: "https://api.chatengine.io/users/",
		headers: {
			"PRIVATE-KEY": `${process.env.PRIVATE_KEY}`,
		},
		data: data,
	};
	try {
		await axios(config).then(function (response) {
			console.log(JSON.stringify(response.data));
		});
	} catch (error) {
		console.log(error.response);

		// Check if it's HTTP 400  error
		if (error.response.status === 400) {
			console.log(`HTTP 400 error occured`);
		}
		// You can get response data (mostly the reason would be in it)
		if (error.response.data) {
			console.log(error.response.data);
		}
	}
	res.send(true);
});

app.get("/", (req, res) => {
	res.send("Hello World! This is React Chat Engine Project");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
