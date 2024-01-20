require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')


//routes
const authRoutes = require('./routes/authRoutes');



// middlewares
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const asyncHandlerMiddleware = require('./middleware/asyncHandler');

app.use(express.json())
app.use(cors());

app.use('/api/v1/auth', authRoutes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use(asyncHandlerMiddleware);

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
