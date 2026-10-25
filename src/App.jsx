
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [task, setTask] = useState('')
  
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('my-todo-tasks')
  return savedTasks ? JSON.parse(savedTasks) : []
})

useEffect(() => {
  localStorage.setItem('my-todo-tasks', JSON.stringify(tasks))
}, [tasks])


  function addTask() {
    if (task.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    }

    setTasks([...tasks, newTask])
    setTask('')
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  const remainingTasks = tasks.filter(
    (item) => !item.completed
  ).length

  return (
    <div className="todo-container">
      <h1>My Little To-Do List 🎀</h1>
      <p>Small steps, big dreams! 🌸</p>

      <p className="task-count">
        {remainingTasks} tasks left to do ✨
      </p>

      <div className="todo-input">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') addTask()
          }}
        />

        <button onClick={addTask}>Add Task +</button>
      </div>

      <ul className="task-list">
        {tasks.map((item) => (
          <li
            key={item.id}
            className={item.completed ? 'completed' : ''}
          >
            <label className="task-label">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item.id)}
              />

              <span>{item.text}</span>
            </label>

            <button
              className="delete-button"
              onClick={() => deleteTask(item.id)}
              aria-label={`Delete ${item.text}`}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="empty-message">
          Your list is waiting for a little magic! 🦋
        </p>
      )}
    </div>
  )
}

export default App
