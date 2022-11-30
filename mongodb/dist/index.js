"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.DATABASE_URL, () => {
    console.log("Database connected successfully");
});
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/', todoRoute_1.default);
const port = 2300;
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});
