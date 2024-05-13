import { app } from "./app";
import connectDB from "./utils/db"; // Import the connectDB function
require("dotenv").config();

connectDB()
    .then(() => { // Fix the syntax error here
        app.listen(process.env.PORT, () => {
            console.log(`Server is connected with port ${process.env.PORT}`);
        });
    })
    .catch((e) => { // Handle any errors in the connection process
        console.error(e);
    });
