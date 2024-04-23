import React, { useState } from 'react';
import './TaskItem.css';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

/**
 * Renders an individual task item.
 * Allows editing and removing of the task.
 * @param {object} props - The component props.
 * @param {object} props.task - The task object to be rendered.
 * @param {function} props.removeTask - The function to remove the task.
 * @param {function} props.updateTask - The function to update the task.
 */
const TaskItem = ({ task, removeTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Removes the task when the remove button is clicked.
   */
  const handleRemove = () => {
    removeTask(task.id);
  };

    /**
   * Enables editing mode for the task when the edit button is clicked.
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Updates the task with the edited values.
   * @param {object} updatedTask - The updated task object.
   */
  const handleUpdate = (updatedTask) => {
    updateTask(updatedTask);
    setIsEditing(false);
  };

  /**
   * Cancels the editing mode.
   */
  const handleCancel = () => {
    setIsEditing(false);
  };

  /**
   * Generates an excerpt of the task description with a specified word limit.
   * @param {string} description - The full description of the task.
   * @param {number} wordLimit - The maximum number of words in the excerpt.
   * @returns {string} The excerpt of the task description.
   */
  const getExcerpt = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  /**
   * Formats the due date of the task.
   * @param {string} dateString - The date string to be formatted.
   * @returns {string} The formatted date string.
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <EditTaskForm task={task} onUpdate={handleUpdate} onCancel={handleCancel} />
      ) : (
        <>
          <div className="task-details">
            <h3>{task.title}</h3>
            <p>{getExcerpt(task.description, 10)}</p>
            <p>Due: {formatDate(task.dueDate)}</p>
          </div>
          <div className="task-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleRemove}>Remove</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;