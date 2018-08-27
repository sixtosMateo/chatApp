import React from 'react'

class Message extends React.Component{
  //again we are using prop to get data from MessageList since its parent component
  render(){
    return(
      <div className ="message">
        <div className="message-username">{this.props.username}:</div>
        <div className="message-text">{this.props.text}</div>
      </div>
    )
  }
}

//============== function version of the class==========================
// function Message(props){
//   //again we are using prop to get data from MessageList since its parent component
//
//     return(
//       <div className ="message">
//         <div className="message-username">{props.username}</div>
//         <div className="message-text">{props.text}</div>
//       </div>
//     )
//
// }


//this is still required whether it is a function or class
export default Message
