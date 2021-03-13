import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState('');
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat room');
    if (roomName) {
      /// do some clever db stuff..
      db.collection('rooms').add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className='sidebarChat' onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
