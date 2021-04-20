import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import io from "socket.io-client";
import { Container, Col, Row } from "react-bootstrap";

const socket = io();

const Chat = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [chatMessage, setChatMessage] = useState({
    name: "",
    msg: "",
    zone: "",
    isPrivate: false,
  });
  const [msgList, setMsgList] = useState([]);
  const [currentZone, setCurrentZone] = useState("General Lobby");

  useEffect(() => {
    socket.emit("userJoin", userData.user.name);
  }, []);

  const { userData, setUserData } = useContext(UserContext);

  socket.on("newMessage", (newMessage) => {
    setMsgList([
      ...msgList,
      {
        name: newMessage.name,
        msg: newMessage.msg,
        isPrivate: newMessage.isPrivate,
      },
    ]);
  });

  socket.on("userList", (userList) => {
    setChatUsers(userList);
    setChatMessage({ name: userData.user.name, msg: chatMessage.msg });
  });

  const handleChange = (e) => {
    setChatMessage({ ...chatMessage, [e.target.name]: e.target.value });
  };

  const newMessageSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      name: chatMessage.name,
      msg: chatMessage.msg,
      zone: currentZone,
      isPrivate: privateChat(currentZone, chatUsers),
    };

    socket.emit("newMessage", newMessage);

    setChatMessage({
      name: userData.user.name,
      msg: "",
    });
  };

  const joinZone = (e) => {
    let oldZone = currentZone;
    let newZone = e.target.textContent;
    setCurrentZone(newZone);
    socket.emit("zoneJoined", { oldZone, newZone });
    setMsgList([]);
  };

  const privateChat = (zoneName, userList) => {
    let isPrivate = false;
    userList.forEach((userName) => {
      debugger;
      if (userName === zoneName) {
        isPrivate = true;
      }
    });
    return isPrivate;
  };
  return (
    <Container>
      <Row>
        <Col xs={5} style={{ border: "1px solid black" }}>
          <br />
          <h6 onClick={joinZone} style={{ cursort: "pointer" }}>
            General Lobby
          </h6>
          <h1>Chat Zones:</h1>
          <ul style={{ listStyleType: "none" }}>
            <li onClick={joinZone} style={{ cursor: "pointer" }}>
              Tech
            </li>
            <li onClick={joinZone} style={{ cursor: "pointer" }}>
              Sports
            </li>
            <li onClick={joinZone} style={{ cursor: "pointer" }}>
              Food
            </li>
          </ul>
          <h1>Users Online:</h1>
          <ul style={{ listStyleType: "none" }}>
            {chatUsers.map((user) => {
              return (
                <li onClick={joinZone} key={user}>
                  {user}
                </li>
              );
            })}
          </ul>
        </Col>
        <Col style={{ border: "1px solid black" }}>
          <p>Chat Messages ({currentZone})</p>
          <form onSubmit={newMessageSubmit}>
            <input
              type="text"
              name="msg"
              value={chatMessage.msg}
              onChange={handleChange}
              required
              style={{ width: "80%" }}
            />
            <input type="submit" value="Message!" />
          </form>
          <div id="chatMessages" style={{ border: "1px solid black" }}>
            Messages
            <ul syle={{ listStyle: "none" }}>
              {msgList.map((msgList, idx) => {
                return (
                  <li key={idx}>
                    <b>{msgList.name}: </b>
                    <i>
                      <span
                        style={{
                          color: msgList.isPrivate ? "red" : "black",
                        }}
                      >
                        {msgList.msg}
                      </span>
                    </i>
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
