import "dotenv/config.js";
import config from "./config/config.js"
import express from "express"
import cors from "cors"
import compress from "compression"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import middleware from "./helpers/middleware"

//for access models to db
import models,{sequelize} from "./models/init-models";
import routes from './routes/IndexRoute'

const port = process.env.PORT || 3002

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(helmet())
app.use(compress())
app.use(cors())

app.use(async (req,res,next) =>{
    req.context = {models};
    next();
});

const swaggerUi= require('swagger-ui-express')
const swaggerApi = require('./apidocs.json')
app.use(config.URL_API+"/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerApi))

app.use(config.URL_API+"/member",routes.MemberRoute)
app.use(config.URL_API+"/book",routes.BookRoute)
app.use(config.URL_API+"/peminjaman", routes.BorrowRoute)
app.use(config.URL_API+"/pengembalian",routes.ReturnRoute)
app.use(middleware.handleError);
app.use(middleware.notFound);


const dropDatabaseSync = false;

sequelize.sync({force : dropDatabaseSync}).then(async ()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }

    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    });

})

export default app;
