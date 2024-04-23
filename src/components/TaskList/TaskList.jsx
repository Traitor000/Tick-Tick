import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

/**
 * Renders the task list with sections for pending, in progress, and completed tasks.
 * Uses react-beautiful-dnd for drag and drop functionality.
 * @param {object} props - The component props.
 * @param {Array} props.tasks - The array of tasks to be rendered.
 * @param {function} props.removeTask - The function to remove a task.
 * @param {function} props.updateTask - The function to update a task.
 */
const TaskList = ({ tasks, removeTask, updateTask }) => {
  const pendingTasks = tasks.filter((task) => task.status === 'pending');
  const inProgressTasks = tasks.filter((task) => task.status === 'inProgress');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  return (
    <div className="task-list">
      <Droppable droppableId="pending">
        {(provided) => (
          <div className="pending-tasks" ref={provided.innerRef} {...provided.droppableProps}>
            <h2>⏳ Pending</h2>
            {pendingTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      removeTask={removeTask}
                      updateTask={updateTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="inProgress">
        {(provided) => (
          <div className="in-progress-tasks" ref={provided.innerRef} {...provided.droppableProps}>
            <h2>🕒 In Progress</h2>
            {inProgressTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      removeTask={removeTask}
                      updateTask={updateTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="completed">
        {(provided) => (
          <div className="completed-tasks" ref={provided.innerRef} {...provided.droppableProps}>
            <h2>✅ Completed</h2>
            {completedTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      removeTask={removeTask}
                      updateTask={updateTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;