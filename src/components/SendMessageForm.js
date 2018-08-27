import React from 'react'

class SendMessageForm extends React.Component{

  constructor(){
    super()
    this.state ={
      message:' '
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //need to add e.target.value to state
  handleChange(e){
    this.setState({
      message: e.target.value
    })

  }

  handleSubmit(e){
    e.preventDefault()
    // this fucntion comes from App.SendMessage because we are sending prop to
    // sendForm componenet which has access to app.sendMessage which has an argument
    // and we are sending this component state message -inverse data flow
    this.props.sendMessage(this.state.message)

    //cleare the input value from state
    this.setState({message:''})
    /*sends of message*/

  }

  // console.log(this.state.message)
  //we are controlling the value of input field programmatically so it can only be
  //whatever we have in the state at any given time
  render(){

    return(
      <form onSubmit={this.handleSubmit}
      className="send-message-form">
      <input
          onChange={this.handleChange }
          value={this.state.message}
          placeholder="Type Message and Hit Enter"
          type="text"/>

      </form>

    )
  }

}


export default SendMessageForm
