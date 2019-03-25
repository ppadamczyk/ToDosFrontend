import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
const APIURL='/api/todos';

class Todolist extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos:[]
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentWillMount(){
        this.loadToDos();
    }
    loadToDos(){
        fetch(APIURL)
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500){
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: 'Please try again later'};
                    throw err;
                }
            }
            return resp.json();
        })
        .then(todos => this.setState({todos}));
    }
    
    handleClick(val){
        fetch(APIURL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({name:val})
            
        })
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500){
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: 'Please try again later'};
                    throw err;
                }
            }
            return resp.json();
        })
        .then(newTodo => {
            this.setState({todos: [...this.state.todos, newTodo]});
            });
    }
    
    render(){
        const todos = this.state.todos.map((t) => (
      <TodoItem
        key={t._id}
        {...t}
      />
      ));
        return(
            <div>
                <TodoForm 
                    handleClick={this.handleClick}
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