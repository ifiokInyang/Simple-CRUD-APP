import mongoose, {Schema} from 'mongoose'

interface todoInstance{
    _id:string,
    name:string,
    description:string,
    todoStatus:string
}

const todoSchema = new Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    todoStatus: {type:String}
},
{
    timestamps:true
})

const Todo =  mongoose.model<todoInstance>("Todo", todoSchema)

export default Todo