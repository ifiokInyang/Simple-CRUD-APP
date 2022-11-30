"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodo = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("../model/todoModel"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        //destructure the request body
        //check if todo exists
        const todo = yield todoModel_1.default.findOne({ name: name });
        console.log(todo);
        //If yes, todo exists already,
        if (!todo) {
            let insertTodo = new todoModel_1.default({
                name,
                description,
                todoStatus: "undone"
            });
            yield insertTodo.save((error) => {
                if (error)
                    res.status(500).json("Could not save on database");
                console.log("Data saved successfully in the database");
            });
            //if no create
            return res.status(201).json({
                message: "Todo created successfully",
                name: insertTodo.name,
                status: insertTodo.todoStatus
            });
        }
        return res.status(400).json({
            Error: "Todo already exists"
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: 'Internal server error /create'
        });
    }
});
exports.createTodo = createTodo;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoModel_1.default.find({});
        res.status(201).json(todos);
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server error /get-all-todos"
        });
    }
});
exports.getTodo = getTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findTodo = yield todoModel_1.default.findByIdAndDelete({ _id: id });
        return res.status(201).json({
            message: "Todo successfully deleted",
            databaseData: yield (0, exports.getTodo)(req, res)
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal server error /deleteTodo"
        });
    }
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findTodo = yield todoModel_1.default.findByIdAndUpdate({ _id: id }, { description: "Hello todo" });
        return res.status(201).json({
            message: "Todo successfully updated",
            databaseData: yield (0, exports.getTodo)(req, res)
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal server error /updateTodo"
        });
    }
});
exports.updateTodo = updateTodo;
