import { Avatar, IconButton } from '@material-ui/core';
import {
  AttachFile,
  InsertEmoticon,
  MicOutlined,
  MoreVert,
  SearchOutlined,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Chat.css';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  console.log(messages);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
    });
    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${Math.floor(
            Math.random() * 5000
          )}.svg`}
        />
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>
            Last seen at{' '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && 'chat__receiver'
            }`}
          >
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <civ className='chat__footer'>
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='type a message'
          />
          <button type='submit' onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicOutlined />
      </civ>
    </div>
  );
}

export default Chat;
