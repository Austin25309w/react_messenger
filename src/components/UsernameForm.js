import React, { Component } from 'react'

class UsernameForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        console.log('here')
        this.props.onSubmit(this.state.username)
    }
    onChange(e){
        this.setState({ username: e.target.value})
    }

    render(){
        return(
            <div>
                <div>
                    <h2>What is your username</h2>
                    <form onSubmit = {this.handleSubmit}>
                        <input
                            type = "text"
                            placeholder = "Your full name"
                            onChange = {this.onChange}
                            />
                        <input type = "submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default UsernameForm


// https://github.com/pusher/build-a-slack-clone-with-react-and-pusher-chatkit