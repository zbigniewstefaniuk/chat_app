document.addEventListener("DOMContentLoaded", () => {
  // Websocket connect
  var socket = io();

  // default room
  let room = "Lobby";
  joinRoom("Lobby");

  //Displays messages
  // This 'p' is a paragraph for every new msg and 'br' is line break
  socket.on("message", (data) => {
    // Display current message
    if (data.msg) {
      const p = document.createElement("p");
      const datails_user = document.createElement("snap");
      const details_timestamp = document.createElement("snap");
      const br = document.createElement("br");
      // Display user's own message
      if (data.username == username) {
        p.setAttribute("class", "my-msg");

        // Username
        //datails_user.setAttribute("class", "my-username");
        //datails_user.innerText = data.username;

        // Timestamp
        details_timestamp.setAttribute("class", "timestamp");
        details_timestamp.innerText = data.time_stamp;
        /*
        // HTML to append dont show username
        p.innerHTML +=
          datails_user.outerHTML +
          br.outerHTML +
          data.msg +
          br.outerHTML +
          details_timestamp.outerHTML;
        */
        p.innerHTML += data.msg + br.outerHTML + details_timestamp.outerHTML;

        //Append
        document.querySelector("#display-message-section").append(p);
      }
      // Display other users' messages
      else if (typeof data.username !== "undefined") {
        p.setAttribute("class", "others-msg");

        // Username
        datails_user.setAttribute("class", "other-username");
        datails_user.innerText = data.username;

        // Timestamp
        details_timestamp.setAttribute("class", "timestamp");
        details_timestamp.innerText = data.time_stamp;

        // HTML to append
        p.innerHTML +=
          datails_user.outerHTML +
          br.outerHTML +
          data.msg +
          br.outerHTML +
          details_timestamp.outerHTML;

        //Append
        document.querySelector("#display-message-section").append(p);
      }
      // Display system message
      else {
        printSysMsg(data.msg);
      }
    }
    scrollDownChatWindow();
  });

  // Send msg
  document.querySelector("#send_message").onclick = () => {
    socket.send({
      msg: document.querySelector("#user_message").value,
      username: username,
      room: room,
    });
    // CLear input area
    document.querySelector("#user_message").value = "";
    scrollDownChatWindow();
  };

  //Rooms
  document.querySelectorAll(".select-room").forEach((p) => {
    p.onclick = () => {
      let newRoom = p.innerHTML;
      if (newRoom == room) {
        msg = `You're already in ${room} room`;
        printSysMsg(msg);
      } else {
        leaveRoom(room);
        joinRoom(newRoom);
        room = newRoom;
      }
    };
  });
  // Leave room
  function leaveRoom(room) {
    socket.emit("leave", { username: username, room: room });
  }
  // Join room
  function joinRoom(room) {
    socket.emit("join", { username: username, room: room });
    // Clear messages
    document.querySelector("#display-message-section").innerHTML = "";
    // Autofocus on writing msh box
    document.querySelector("#user_message").focus();
  }
  // Scroll chat window down
  function scrollDownChatWindow() {
    const chatWindow = document.querySelector("#display-message-section");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  // Printing system messages
  function printSysMsg(msg) {
    const p = document.createElement("p");
    p.setAttribute("class", "system-msg");
    p.innerHTML = msg;
    document.querySelector("#display-message-section").append(p);
    scrollDownChatWindow();

    // Autofocus on text box
    document.querySelector("#user_message").focus();
  }
});
