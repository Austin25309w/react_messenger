import React, { Component } from 'react'

class UsernameForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
        }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    }

}

export default UsernameForm


// https://github.com/pusher/build-a-slack-clone-with-react-and-pusher-chatkit