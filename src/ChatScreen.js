import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'

class ChatScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: []
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
            return currentUser.subscribeToRoomMultipart({
                roomId: "YOUR ROOM ID",
                messageLimit: 100,
                hooks: {
                    onMessage: message =>{
                        this.setState({
                            messages: [...this.messages, message],
                        })
                    },
                },
            })
         })
         .then(currentRoom => {
             this.setState({ currentRoom })
         })
        .catch(error => console.error('error', error))
    }
    render(){
        // return (
        //     <div>
        //         <h1>Chat</h1>
        //     </div>
        // )
        const styles = {
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
            <div style={styles.container}>
                <div style = {styles.chatContainer}>
                    <aside style = { styles.whosonlineListContainer}>
                        <h2>Who's online PLACEHOLDER</h2>
                    </aside>
                    <section style={styles.chatListContainer}>
                        <h2>Chat PLACEHOLDER</h2>
                        <MessageList
                            messages = {this.props.messages}
                            style = {styles.chatList}
                            />
                    </section>
                </div>
            </div>
        )
    }
}

export default ChatScreen