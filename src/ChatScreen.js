import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'


class ChatScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            usersWhoAreTyping: [],
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
    }

    sendTypingEvent(){
        this.state.currentUser
            .isTypingIn({ roomId: this.state.currentRoom.id })
            .catch(error => console.log('error', error))
    }

    sendMessage(text){
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id,
        })
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
                    onUserStartedTyping: user => {
                        this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                        })
                    },
                    onUserStoppedTyping: user =>{
                        this.setState({
                            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                username => username !== user.name
                            ),
                        })
                    },
                    onPresenceChange: () => this.forceUpdate(),
                },
            })
         })
         .then(currentRoom => {
             this.setState({ currentRoom })
         })
        .catch(error => console.error('error', error))
    }
    render(){
        console.log('ChatScreen')
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
            whosOnlineListContainer: {
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
                <header style={styles.header}>
                    <h2>Messenger</h2>
                </header>
                <div style = {styles.chatContainer}>
                    <aside style = { styles.whosOnlineListContainer}>
                        {/* <h2>Who's online PLACEHOLDER</h2> */}
                    {/* <h2>Chat PLACEHOLDER</h2> */}
                    <WhosOnlineList
                        currentUser={this.state.currentUser}
                        users={this.state.currentRoom.users}
                        />
                    </aside>
                    <section style = {styles.chatListContainer}>
                    <MessageList
                        messages = {this.state.messages}
                        style = {styles.chatList}
                        />
                        <TypingIndicator usersWhoAreTyping = { this.state.usersWhoAreTyping}/>
                        <SendMessageForm 
                        onSubmit = {this.sendMessage} 
                        onChange = { this.sendTypingEvent}
                        />
                    </section>
                </div>
            </div>
        )
    }
}

export default ChatScreen