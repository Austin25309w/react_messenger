import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'

class ChatScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUser: {}
        }
    }

    componentDidMount () {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:354e2f0c-87a6-4d23-ac8c-9ff937347ca8',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        })

    chatManager
        .connect()
        .then(currentUser => {
            this.setState({ currentUser })
         })
        .catch(error => console.error('error', error))
    }
    render(){
        // return (
        //     <div>
        //         <h1>Chat</h1>
        //     </div>
        // )
        const style = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            },
            chatContainer: {
                display: 'flex',
                flex: 1,
            },
            whosonlineListContainer: {
                width: '300px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2c303b',
                color: 'white',
            },
            chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column',
            },
        }

        return (
            <div style={StyleSheet.container}>
                <div style = {style.chatContainer}>
                    <aside style = { style.whosonlineListContainer}>
                        <h2>Who's online PLACEHOLDER</h2>
                    </aside>
                    <section style={style.chatListContainer}>
                        <h2>Chat PLACEHOLDER</h2>
                    </section>
                </div>
            </div>
        )
    }
}

export default ChatScreen