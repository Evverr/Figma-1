import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggleComplete, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b border-gray-200 hover:bg-gray-50 transition-colors group">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggleComplete(todo.id)}
        id={`todo-${todo.id}`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 cursor-pointer select-none ${
          todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
        }`}
      >
        {todo.text}
      </label>
      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 className="w-4 h-4 text-red-500" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}
