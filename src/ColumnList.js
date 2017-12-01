import React from 'react';

import './ColumnList.css';
import If from './If'; 

const ColumnList = ({ title, items = [], addTask, updateTask }) => {

    const currentTasks = items.filter(item => (item.status === title))

    return (
        <div className="column-list">
            <h3>{title}</h3>
            <If test={title === "To do"} >
                <form onSubmit={addTask}>
                    <input type="text" placeholder="Create new Task" />
                    <button type="submit">
                        Create
                    </button>
                </form>
            </If>
            <ul className="list-items">
                {currentTasks.map(item => (
                    <li key={item.id}>
                        <input type="checkbox"
                            onChange={(e) => updateTask(e.target, item)}
                            checked={item.status === "Done"}
                        />
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColumnList;