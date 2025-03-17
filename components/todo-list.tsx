import React from "react";
import { Todo } from "@/schema/todo";
import TodoItem from "./todo-item";
import { Card } from "./ui/card";

interface TodoListProps {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto p-4">
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </Card>
  );
}
