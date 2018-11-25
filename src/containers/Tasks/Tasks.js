import React from 'react'
import App from './components/app';
import styles from './Tasks.module.css'

function Tasks(props) {
  return (
    <div className={styles.tasks}>
      <App />
    </div>
  )
}

export default Tasks

