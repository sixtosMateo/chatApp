import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'


class MessageList extends React.Component{
  //prevent form auto scroll to the bottom
  componentWillUpdate(){
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight +100   >= node.scrollHeight
  }


  // lifecycle method gets called directly after component has been updated
  componentDidUpdate(){
    if(this.shouldScrollToBottom){
      const node = ReactDOM.findDOMNode(this)
      // scrollTop  how far we scroll down
      // scrollHeight how long the scrollable element is
      // this statement will scroll window all the way to the bottom
      node.scrollTop = node.scrollHeight
    }
  }

  // prop allows this components to view data from root component
  // we are sending data prop to Message component to render as its component
  render(){

    return (
        <div className="message-list">
          {this.props.messages.map((message, index)=> {
              return (
                <Message key={index} username={message.senderId} text={message.text }/>
              )
            })
          }
        </div>
    )
  }
}

export default MessageList
