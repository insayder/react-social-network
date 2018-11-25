import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header d-flex">
      <h1>Задачи</h1>
      <h2> Не выполнено: {toDo},<br />
      Выполнено: {done}</h2>
    </div>
  );
};

export default AppHeader;
