"use client";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleCompleted,
} from "@/server-actions/todo";
import TodoInput from "./todo-input";
import TodoList from "./todo-list";
import { Todo } from "@/schema/todo";

export default function TodoMain() {
  const queryClient = useQueryClient();

  // Query for todos
  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Create todo mutation
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete todo mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Toggle todo mutation
  const toggleMutation = useMutation({
    mutationFn: toggleCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCreate = async (newTodo: Todo) => {
    try {
      await createMutation.mutateAsync(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await toggleMutation.mutateAsync(todo);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <TodoInput onCreate={handleCreate} />
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}
