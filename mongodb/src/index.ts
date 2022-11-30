import express from 'express'
import logger from 'morgan'
import indexRouter from './routes/todoRoute'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// const { config, up } = require('../dist/migrate-mongo');

// const myConfig = {
//     mongodb: {
//         url: "mongodb://localhost:27017/todo",
//         options: { useNewUrlParser: true }
//     },
//     migrationsDir: "migrations",
//     changelogCollectionName: "changelog",
//     migrationFileExtension: ".js"
// };

// config.set(myConfig);

// // then, use the API as you normally would, eg:
// await up();

const app = express()
mongoose.connect(process.env.DATABASE_URL!, ()=>{
    console.log("Database connected successfully")
})

app.use(express.json())
app.use(logger('dev'))
app.use('/', indexRouter)



const port = 2300

app.listen(port, ()=>{
    console.log(`server is listening on http://localhost:${port}`)
})