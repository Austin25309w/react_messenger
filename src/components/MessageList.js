import React, { Component } from 'react'

class MessagesList extends Component {
    render(){
        const styles = {
            container: {
                overflowY: 'scroll',
                flex: 1,
            },
            ul: {
                listStyle: 'none',
            },
            li: {
                marginTop: 13,
                marginBottom: 13,
            },
            senderUsername: {
                fontWeight: 'bold',
            },
            message: { fontSize: 15},
            return (
                <div 
                    style={{
                    ...this.props.style,
                    ...styles.container,
                    }}
                >
                <ul style = {styles.ul}>
                
                </ul>
            )
        }
    }
}