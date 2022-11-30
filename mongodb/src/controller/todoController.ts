import { Request, Response, NextFunction } from "express";
import Todo from "../model/todoModel";


export const createTodo = async(req:Request, res:Response)=>{
    try{
        const {name, description} = req.body
//destructure the request body
//check if todo exists
        const todo = await Todo.findOne({name:name})
        console.log(todo)
        //If yes, todo exists already,
        if(!todo){
        let insertTodo = new Todo({
            name,
            description,
            todoStatus:"undone"
        })
        await insertTodo.save((error)=>{
            if(error) res.status(500).json("Could not save on database")
            console.log("Data saved successfully in the database")
        })
//if no create
        return res.status(201).json({
            message: "Todo created successfully",
            name: insertTodo.name,
            status:insertTodo.todoStatus
        
        })
    }
    return res.status(400).json({
        Error: "Todo already exists"
    })
   
    }catch (error){
        return res.status(500).json({
            Error: 'Internal server error /create'
        })
    }
}
export const getTodo = async (req:Request, res:Response) =>{
    try{
        const todos = await Todo.find({})
        res.status(201).json(todos)
    } catch(error){
        res.status(500).json({
            Error: "Internal server error /get-all-todos"
        })
    }
    
}
export const deleteTodo = async (req:Request, res:Response) =>{
   try{
        const {id} = req.params
    
        const findTodo = await Todo.findByIdAndDelete({_id:id})
        return res.status(201).json({
            message: "Todo successfully deleted",
            databaseData: await getTodo(req,res)
        })
    } catch(error){
        return res.status(500).json({
            Error: "Internal server error /deleteTodo"
        })
    }

}
export const updateTodo = async (req:Request, res:Response) =>{
    try{
        const {id} = req.params
    
        const findTodo = await Todo.findByIdAndUpdate({_id:id},{description:"Hello todo"})
    
        return res.status(201).json({
            message: "Todo successfully updated",
            databaseData: await getTodo(req,res)
        })
        
    } catch(error){
        return res.status(500).json({
            Error: "Internal server error /updateTodo"
        })
    }

}
