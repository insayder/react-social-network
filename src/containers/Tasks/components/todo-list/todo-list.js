import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from '../../../../store/actions/task'

import TodoListItem from '../todo-list-item/todo-list-item';

import './todo-list.css';

class TodoList extends Component{

  
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
  
  render(){
    const {items} = this.props;
    const elements = items.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <li key={id} className="list-group-item">
          <TodoListItem
            { ...itemProps }
            onToggleImportant={ () => this.onToggleImportant(id) }
            onToggleDone={ () => this.onToggleDone(id) }
            onDelete={ () => this.onDelete(id) } />
        </li>
      );
    });
  
    return (<ul className="todo-list list-group">{ elements }</ul>);
  }
}


const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators({ ...actions }, dispatch)})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

