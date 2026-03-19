import React, { useState } from "react";
import { TodoItem, Todo } from "./components/TodoItem";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { CheckCircle2, Circle, ListTodo } from "lucide-react";

type FilterType = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <ListTodo className="w-8 h-8" />
              <h1 className="text-3xl">My To-Do List</h1>
            </div>
            <p className="mt-2 text-blue-100">Stay organized and get things done</p>
          </div>

          {/* Add Todo Form */}
          <div className="p-6 border-b border-gray-200">
            <form onSubmit={addTodo} className="flex gap-2">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Task
              </Button>
            </form>
          </div>

          {/* Stats and Filter */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Circle className="w-4 h-4 text-blue-600" />
                  <strong>{activeCount}</strong> Active
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <strong>{completedCount}</strong> Completed
                </span>
              </div>
              {completedCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Clear Completed
                </Button>
              )}
            </div>

            <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Todo List */}
          <div className="min-h-[300px]">
            {filteredTodos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <ListTodo className="w-16 h-16 mb-4" />
                <p className="text-lg">
                  {filter === "completed" && todos.length > 0
                    ? "No completed tasks yet"
                    : filter === "active" && todos.length > 0
                    ? "No active tasks"
                    : "No tasks yet. Add one above!"}
                </p>
              </div>
            ) : (
              <div>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteTodo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Click on a task to mark it as complete</p>
        </div>
      </div>
    </div>
  );
}

export default App;
