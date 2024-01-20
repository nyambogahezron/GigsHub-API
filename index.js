require("dotenv").config();
const express = require("express");

const app = express();

// start sever
const port = process.env.PORT || 5000;

const startApp = async () => {
	try {
		app.listen(port, () => console.log(`app listing to port ${port}`));
	} catch (error) {
		console.log(error);
	}
};

startApp();
