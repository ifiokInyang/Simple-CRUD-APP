import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controller/todoController";


const router = express.Router()

router.get('/get-all-todos', getTodo)
router.post('/create', createTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)


export default router