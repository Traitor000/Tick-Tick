/**
 * The main component of the Tick Tick application.
 * Renders the task list, add task form, and animated background.
 * Handles the state management */

import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList/TaskList';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import { DragDropContext } from 'react-beautiful-dnd';
import Quote from './components/Quote';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  /**
   * Adds a new task to the task list.
   * @param {object} task - The task object to be add */
  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setShowAddTaskForm(false);
  };

  /**
   * Removes a task from the task list.
   * @param {string} taskId - The ID of the task to be removed */
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  /**
   * Clears all tasks from the task list.
   */
  const clearAllTasks = () => {
    setTasks([]);
    localStorage.setItem('tasks', JSON.stringify([]));
  };

  /**
   * Toggles the visibility of the add task form.
   */
  const toggleAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
  };

  /**
   * Handles the drag and drop functionality for tasks.
   * @param {object} result - The result object from react-beautiful-dnd.
   */
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, reorderedTask);

    if (source.droppableId !== destination.droppableId) {
      reorderedTask.status = destination.droppableId;
    }

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="app-container">
      <div className="app">
        <h1>Tick-Tick</h1>
        <Quote />
        {showAddTaskForm ? (
          <AddTaskForm addTask={addTask} />
        ) : (
          <button onClick={toggleAddTaskForm}>Add Task ➕</button>
        )}
        <button onClick={clearAllTasks}>Clear All 🗑️</button>
        <div className="message">Tip :- <em>You can Drag and Drog ToDo Items</em></div>
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskList tasks={tasks} removeTask={removeTask} updateTask={updateTask} />
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;