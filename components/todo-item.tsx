import React from "react";
import { Todo } from "@/schema/todo";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo)}
          className="cursor-pointer"
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.title}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(todo.id!)}
        className="cursor-pointer hover:bg-red-100 hover:text-red-600"
      >
        Delete
      </Button>
    </li>
  );
}
