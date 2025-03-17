import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Todo } from "@/schema/todo";
import { useQueryClient } from "@tanstack/react-query";

interface TodoInputProps {
  onCreate: (newTodo: Todo) => void;
}

export default function TodoInput({ onCreate }: TodoInputProps) {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const handleCreate = () => {
    if (!title.trim()) return;

    onCreate({
      title: title.trim(),
      completed: false,
    });

    setTitle("");
    // Invalidate and refetch todos query
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  return (
    <div className="flex justify-center items-center gap-5 mb-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="max-w-md"
      />
      <Button onClick={handleCreate} className="cursor-pointer">
        Add Todo
      </Button>
    </div>
  );
}
