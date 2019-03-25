import React, {Component} from 'react';

class Todolist extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos:[]
        }
    }
    render(){
        return(
            <h1>Todo list!</h1>
            )
    }
}

export default Todolist;