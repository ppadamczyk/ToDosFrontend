import React, {Component} from 'react';
const APIURL='/api/todos';

class Todolist extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos:[]
        };
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
    render(){
        return(
            <h1>Todo list!</h1>
            );
    }
}

export default Todolist;