import { useEffect, useState } from 'react'

function App() {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    const value = task.trim()
    if (!value) return

    const newTodo = {
      id: Date.now(),
      text: value,
      completed: false
    }

    setTodos([newTodo, ...todos])
    setTask('')
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos =
    filter === 'active'
      ? todos.filter((todo) => !todo.completed)
      : filter === 'completed'
      ? todos.filter((todo) => todo.completed)
      : todos

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      width: '100%',
      maxWidth: '520px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#0f172a',
      margin: '0 0 8px'
    },
    subtitle: {
      fontSize: '15px',
      color: '#64748b',
      margin: '0 0 20px'
    },
    inputRow: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px'
    },
    input: {
      flex: 1,
      padding: '14px 16px',
      borderRadius: '12px',
      border: '1px solid #cbd5e1',
      fontSize: '16px',
      outline: 'none'
    },
    addButton: {
      border: 'none',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      padding: '14px 18px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      marginBottom: '18px',
      flexWrap: 'wrap'
    },
    statBox: {
      flex: 1,
      minWidth: '120px',
      backgroundColor: '#f8fafc',
      padding: '12px',
      borderRadius: '12px',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '13px',
      color: '#64748b'
    },
    filterRow: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    },
    filterButton: (active) => ({
      border: 'none',
      padding: '10px 14px',
      borderRadius: '999px',
      backgroundColor: active ? '#0f172a' : '#e2e8f0',
      color: active ? '#ffffff' : '#0f172a',
      fontWeight: '600',
      cursor: 'pointer'
    }),
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '20px'
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '14px',
      border: '1px solid #e2e8f0',
      borderRadius: '14px',
      backgroundColor: '#ffffff'
    },
    todoLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer'
    },
    todoText: (completed) => ({
      fontSize: '16px',
      color: completed ? '#94a3b8' : '#0f172a',
      textDecoration: completed ? 'line-through' : 'none',
      wordBreak: 'break-word'
    }),
    deleteButton: {
      border: 'none',
      backgroundColor: '#ef4444',
      color: '#ffffff',
      padding: '10px 12px',
      borderRadius: '10px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    empty: {
      textAlign: 'center',
      color: '#64748b',
      padding: '18px 0'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap'
    },
    footerText: {
      fontSize: '14px',
      color: '#475569'
    },
    clearButton: {
      border: 'none',
      backgroundColor: '#f1f5f9',
      color: '#0f172a',
      padding: '10px 14px',
      borderRadius: '10px',
      fontWeight: '600',
      cursor: 'pointer'
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Todo App</h1>
        <p style={styles.subtitle}>Your tasks stay saved even after refresh.</p>

        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            style={styles.input}
          />
          <button onClick={addTodo} style={styles.addButton}>
            Add
          </button>
        </div>

        <div style={styles.stats}>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{todos.length}</div>
            <div style={styles.statLabel}>Total</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{activeCount}</div>
            <div style={styles.statLabel}>Active</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{completedCount}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
        </div>

        <div style={styles.filterRow}>
          <button onClick={() => setFilter('all')} style={styles.filterButton(filter === 'all')}>
            All
          </button>
          <button onClick={() => setFilter('active')} style={styles.filterButton(filter === 'active')}>
            Active
          </button>
          <button onClick={() => setFilter('completed')} style={styles.filterButton(filter === 'completed')}>
            Completed
          </button>
        </div>

        <div style={styles.list}>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div key={todo.id} style={styles.todoItem}>
                <div style={styles.todoLeft}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    style={styles.checkbox}
                  />
                  <span style={styles.todoText(todo.completed)}>{todo.text}</span>
                </div>
                <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div style={styles.empty}>No tasks found.</div>
          )}
        </div>

        <div style={styles.footer}>
          <span style={styles.footerText}>{activeCount} task(s) left</span>
          <button onClick={clearCompleted} style={styles.clearButton}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  )
}

export default App