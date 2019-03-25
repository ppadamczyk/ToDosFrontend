import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './apiCalls';


class Todolist extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos:[]
        };
        this.createTodo = this.createTodo.bind(this);
    }
    
    componentWillMount(){
        this.loadToDos();
    }
    
    async loadToDos(){
        let todos = await apiCalls.getToDos();
        this.setState({todos});
    }
    
    async createTodo(val){
        let todo = await apiCalls.createTodo(val);
        this.setState({todos: [...this.state.todos, todo]});
            }
    
    
    async deleteTodo(id){
        await apiCalls.deleteTodo(id);
        const afterDelete = this.state.todos.filter(todo => todo._id !== id);
        this.setState({todos:afterDelete});
        }
    
    async updateTodo(todo){
        await apiCalls.updateTodo(todo);
        const afterUpdate = this.state.todos.map(t => 
        (t._id === todo._id)
        ? {...t, completed: !t.completed} : t
        );
        this.setState({todos:afterUpdate});
        }
    
    render(){
    const todos = this.state.todos.map((t) => (
      <TodoItem
        key={t._id}
        {...t}
        onDelete={this.deleteTodo.bind(this, t._id)}
        onToggle={this.updateTodo.bind(this, t)}
      />
      ));
        return(
            <div>
                <TodoForm 
                    handleClick={this.createTodo}
                />
                <h1>Todo list!</h1>
                <ul>
                    {todos}
                </ul>
            </div>
            );
    }
}

export default Todolist;