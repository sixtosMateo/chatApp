import React from 'react'

class RoomList extends React.Component{
  //we are using an anonymous function to wrap funtion
  render(){
    /*sorts function asc by rooms id*/
    const orderedRooms = [...this.props.rooms].sort((a,b)=> a.id - b.id)
    return(
      <div className="rooms-list">
        <ul>
          <h3>Your rooms:</h3>
          {orderedRooms.map(room=>{

            /*this looks for list of rooms compared with state id*/
            const active =  this.props.roomId === room.id ? "active": "";

            return (
              /*concats the room with boolean active for css style*/
              <li key={room.id} className={"room " + active}>

                  <a
                  /*user clicks room triggers app's subscribeToRoom base on the room id that was click inverse work flow*/
                    onClick={() => this.props.subscribeToRoom(room.id)}
                    href="#">
                    #{room.name}
                  </a>

               </li>)
             })
          }
        </ ul>
      </div>
    )
  }
}

export default RoomList
