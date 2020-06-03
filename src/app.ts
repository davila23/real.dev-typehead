import express from "express"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from './routes/user';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use('/typeahead', userRoutes);

console.log('Server Running on port : ' + process.env.PORT) ;
app.listen(process.env.PORT );
