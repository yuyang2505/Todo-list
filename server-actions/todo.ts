// Create the server actions for the todo

import { createSuperClient } from "../supabase/client"
import { Todo } from "../schema/todo"

const supabase = createSuperClient()

export async function getTodos() {
   try {
    const { data, error } = await supabase.from("todos").select("*");
    if (error) throw error;
    return data;
   } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;    
   }
}

export async function createTodo(todo: Todo) {
    try {
        const { data, error } = await supabase.from("todos").insert(todo);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
    }
}

export async function deleteTodo(id: number) {
    try {
        const { data, error } = await supabase.from("todos").delete().eq("id", id);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
}

export async function toggleCompleted(todo: Todo) {
    try {
        const { data, error } = await supabase.from("todos").update({ completed: !todo.completed }).eq("id", todo.id);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error toggling todo:", error);
        throw error;
    }
}
  


