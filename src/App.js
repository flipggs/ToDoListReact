import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 

import ColumnList from './ColumnList';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      items: []
    }
  }

  componentWillMount(){
    const items = window.localStorage.getItem('toDoListItems') || '[]';
    this.setState({items: JSON.parse(items)});
  }

  updateLocalStorage (items){
    window.localStorage.setItem('toDoListItems', JSON.stringify(items))
  }

  addTask = (e) => {
    e.preventDefault();

    const { target } = e;
    const input = target.querySelector("input") || {};
    const { value = "" } = input;

    this.setState(function (prev) {
      const { items } = prev;

      items.push({
        id: items.length + 1,
        title: value,
        status: "To do"
      })

      this.updateLocalStorage(items);

      return { items };
    })
  }

  updateTask = (target, task) => {
    this.setState(prev => {
      const { items = [] } = prev;

      const s = items.filter(item => item.id !== task.id);

      task.status = target.checked ? "Done" : "To do";

      s.push(task)

      this.updateLocalStorage(s);

      return { items: s };
    })
  }

  render() {

    const { items } = this.state;
    const columns = [
      { items, title: "To do" },
      { items, title: "Done" }
    ];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="app-lists">

          {columns.map(column => (
            <ColumnList
              key={column.title}
              title={column.title}
              items={column.items}
              addTask={this.addTask}
              updateTask={this.updateTask} />
          ))}

        </div>
      </div>
    );
  }
}

export default App