import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Chatkit from '@pusher/chatkit'
import {tokenUrl, instanceLocator} from './config'

import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

class App extends Component {
  constructor(){
    // super calls Component constructor which sets stuff up to use State
    super()
    // we use state in ancestor component because state is private
    this.state = {
       roomId:null,
       messages:[],
       joinableRooms:[],
       joinedRooms:[]
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }


  // chatManager properly setup - connect to Chatkit Api
  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
      // instanceLocator:instanceLocator -> since same name bottom another way
      instanceLocator,
      userId: 'perborgen',
      tokenProvider: new Chatkit.TokenProvider({
        url:  tokenUrl
      })
    })

    // promise that notifies when message has been sent to a room
    // dynamically calls these methods
    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.getRooms()
    }).catch(err=> console.log("err on connecting", err))
  }

  getRooms(){
    // promises that get resolve have access to renewable rooms
    this.currentUser.getJoinableRooms()
    .then(joinableRooms=>{
      this.setState({
        //we have to initalize these into constructor state
        //these rooms are just rooms that currentUser HAS NOT join yet
        joinableRooms,
        // these rooms are rooms that currentUser Joined
        joinedRooms: this.currentUser.rooms
      })
    }).catch(err=> console.log("err on joinableRooms", err))
  }

  subscribeToRoom(roomId){
    // clears the messages from previous click room
    this.setState ({messages:[]})

    this.currentUser.subscribeToRoom({
      roomId:roomId,
      // messageLimit:10 lates 10 message only
      hooks: {
        onNewMessage: message=>{
          this.setState({
            // when theres a new message it'll be added to end of state array
            // ... =>   about constructor brackets and fit into this array
            // changing the state by having a copy of the original array
            messages: [...this.state.messages, message ]
          })
        }
      }
    })
    // promise from subscribing from room
    .then(room =>{
      //this sets the state of subscribe room id
      this.setState({
        roomId: room.id,
      })

      //Retrive updated rooms from joinable to joined
      this.getRooms()
    }).catch(err=> console.log("err subscribing to room", err))

  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId,
    })
  }

  createRoom(name){
    this.currentUser.createRoom({
        name
    })
    // once you create a room you can subscribe to room by its id
    .then(room => this.subscribeToRoom(room.id))
    .catch(err=> console.log("err creating a room ", err))

  }


  // everytime data from state changes for specific component it re -renders
  // when we pass data to component it converts to props since its not private
  render() {

    return (
      <div className="app">
        <RoomList
          /*sends the state room id to highlight the click room*/
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage}/>
        <NewRoomForm createRoom={this.createRoom}/>
      </div>
    );
  }
}

export default App;
