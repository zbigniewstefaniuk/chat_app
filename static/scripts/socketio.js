document.addEventListener("DOMContentLoaded", () => {
  var socket = io();

  let room = 'Lobby';
  joinRoom('Lobby');

  //Displays messages
  // This 'p' is a paragraph for every new msg and 'br' is line break 
  socket.on("message", data => {
    const p = document.createElement("p");
    const details_username = document.createElement('snap');
    const details_timestamp = document.createElement('snap');
    const br = document.createElement("br");


    // Checking If the is username in messages its not system msg
    if (data.username) { 
      details_username.innerHTML = data.username;
      details_timestamp.innerHTML = data.time_stamp
      p.innerHTML = details_username.outerHTML + br.outerHTML + data.msg + br.outerHTML
       + details_timestamp.outerHTML;
      document.querySelector("#display-message-section").append(p);
    } else {
      printSysMsg(data.msg);
      
    }

    details_username.innerHTML = data.username;
    details_timestamp.innerHTML = data.time_stamp
    p.innerHTML = details_username.outerHTML + br.outerHTML + data.msg + br.outerHTML
     + details_timestamp.outerHTML;
    document.querySelector("#display-message-section").append(p);
  });

  // Send msg
  document.querySelector("#send_message").onclick = () => {
    socket.send({'msg':document.querySelector("#user_message").value,
    'username': username, 'room': room });
    // CLear input area
    document.querySelector('#user_message').value = '';
  };

  //Rooms
  document.querySelectorAll('.select-room').forEach(p =>{
    let newRoom = p.innerHTML;
    if (newRoom == room) {
      msg = `You're already in ${room} room`
      printSysMsg(msg);
    } else{
      leaveRoom(room);
      joinRoom(newRoom);
      room = newRoom;
    }
  });
  // Leave room
  function leaveRoom(room) {
    socket.emit('leave', {'username': username, 'room': room});
  }
  // Join room
  function joinRoom(room) {
    socket.emit('join', {'username': username, 'room': room});
    // Clear messages 
    document.querySelector('#display-message-section').innerHTML = ''
    // Autofocus on writing msh box
    document.querySelector('#user_message').focus();
  }
  // Printing system messages
  function printSysMsg(room) {
    const p =document.createElement('p');
    p.innerHTML = msg;
    document.querySelector('#display-message-section').append(p);

  }
});
