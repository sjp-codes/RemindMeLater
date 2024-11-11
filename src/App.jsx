import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { name: 'Make a To-do List app', description: 'Create a todo list app using React', schedule: '2024-10-30T10:00', completed: true },
          { name: 'Study for webtech', description: 'Study Unit 3 and Unit 4', schedule: '2024-10-31T09:00', completed: false },
          { name: 'Create your first task', description: 'Create your first task on this todo list app made on React', schedule: '2024-10-30T12:00', completed: false }
        ];
  });

  const [taskEntry, setTaskEntry] = useState({ name: '', description: '', schedule: '' });
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedTask) {
      setTasks(tasks.map(task => (task === editedTask ? { ...editedTask, ...taskEntry } : task)));
      setEditedTask(null);
    } else {
      const newTask = { ...taskEntry, completed: false };
      setTasks([...tasks, newTask]);
    }
    setTaskEntry({ name: '', description: '', schedule: '' });
  };

  const handleToggle = (task) => {
    setTasks(tasks.map(t => 
      t === task ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleDeletion = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  };

  const handleEdit = (task) => {
    setTaskEntry({ name: task.name, description: task.description, schedule: task.schedule });
    setEditedTask(task);
  };

  return (
        <div className="app-container">
          <h1 className="header">TO DO LIST</h1>
          <form onSubmit={handleSubmit} className="task-form">
            <input
              type="text"
              placeholder="Task Name"
              value={taskEntry.name}
              onChange={(e) => setTaskEntry({ ...taskEntry, name: e.target.value })}
              required
              className="input-field"
            />
            <input
              type="text"
              placeholder="Description"
              value={taskEntry.description}
              onChange={(e) => setTaskEntry({ ...taskEntry, description: e.target.value })}
              required
              className="input-field"
            />
            <input
              type="datetime-local"
              value={taskEntry.schedule}
              onChange={(e) => setTaskEntry({ ...taskEntry, schedule: e.target.value })}
              required
              className="input-field"
            />
            <button type="submit" className="submit-button">{editedTask ? 'Update Task' : 'Add Task'}</button>
          </form>
          <div className="task-list">
            {tasks.map((task, index) => (
              <div key={index} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)} 
                  className="checkbox"
                />
                <div className={`task-details ${task.completed ? 'completed' : ''}`}>
                  <strong className="task-name">{task.name}</strong> 
                  <p className="task-description">{task.description}</p> 
                  <div>Schedule: {new Date(task.schedule).toLocaleString()}</div>
                  <div>Status: {task.completed ? 'Completed' : 'Scheduled'}</div>
                </div>
                <button onClick={() => handleEdit(task)} className="edit-button">Edit</button>
                <button onClick={() => handleDeletion(task)} className="delete-button">Delete</button>
              </div>
            ))}
          </div>
          <div className="completed-count">
            Total Completed Tasks: {tasks.filter(task => task.completed).length}
          </div>
        </div>
      );
    }

export default App;
