import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import * as actions from '../../../../store/actions/task'

import './app.css';


class App extends Component {

  maxId = 0;

  state = {
    items: [],
    filter: 'all',
    search: ''
  };

  onItemAdded = (label) => {
    const item = this.createItem(label)
    this.props.actions.createTask(item)
  };

  toggleProperty = (id, propName) => {
    this.props.actions.toggleTask(id, propName)
  };

  onToggleDone = (id) => {
    this.toggleProperty(id, 'done');
  };

  onToggleImportant = (id) => {
    this.toggleProperty(id, 'important')
  };

  onDelete = (id) => {
    this.props.actions.deleteTask(id)
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onSearchChange = (search) => {
    this.setState({ search });
  };

  createItem(label) {
    return {
      id: ++this.maxId,
      label,
      important: false,
      done: false
    };
  }

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => (!item.done));
    } else if (filter === 'done') {
      return items.filter((item) => item.done);
    }
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  render() {
    const {items} = this.props.task
    const { filter, search } = this.state;
    const doneCount = items.filter((item) => item.done).length;
    const toDoCount = items.length - doneCount;
    const  visibleItems = this.searchItems(this.filterItems(items, filter), search)

    console.log(this.props)

    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount}/>
        
        <div className="search-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}/>

          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange} />
        </div>
      
        <ItemAddForm
          onItemAdded={this.onItemAdded} />

          <TodoList
          items={ visibleItems }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onDelete={this.onDelete} />
      </div>
    );
  };
}


const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators({ ...actions }, dispatch)})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
