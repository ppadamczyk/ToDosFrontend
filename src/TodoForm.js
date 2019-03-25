import React, {Component} from 'react';

class TodoForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: ''
        };
        this.updateValue = this.updateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    updateValue(e){
        this.setState({inputValue:e.target.value});
    }
    handleSubmit(){
        this.props.handleClick(this.state.inputValue);
    }
    
    render(){
        
        return(
            <div>
                <input
                    type='text'
                    value={this.state.inputValue}
                    onChange = {this.updateValue}
                />
                <button
                    onClick = {this.handleSubmit}
                    >Save
                </button>
            </div>
            )
    }
}

export default TodoForm;