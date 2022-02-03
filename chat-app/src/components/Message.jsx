import React, { useState,useEffect } from 'react';
import './css/chat.css'
import socket from './Socket';

function Message({ userData, setUserActive }) {
  const { name } = userData[0];
  const [state, setState ] = useState({name, message: ''});
  const [chat, setChat ] = useState([]);

  useEffect(() => {
    socket.on('get_message', ({name, message})=>{
      setChat([...chat, {name, message}])
    })
  }, [chat]);

  function closeSesion() {
    setUserActive([]);
  }

  function setMessage(e) {    
    e.preventDefault();
    let { name, message } = state;
    socket.emit('message', {name, message});
    setState({name, message:''})
  }

  function onInput(e) {
    setState({...state, [e.target.name]:e.target.value})
  }

  function renderChat() {
    return (chat.map((msg, index )=> {
      return (<div className= {msg.name !== state.name ? 'article' : 'article mine'} key={index}>
        <strong>{msg.name !== state.name ? msg.name+':' : 'Me:'}</strong>
        <>{msg.message}</>
      </div>)
      })
    )
  }

  return (
    <section className ="chat">     
      <div className='title'>
        <div><strong>Chat</strong></div>
        <div 
          onClick={() => closeSesion()} 
          className="logout">
          Logout
        </div>
      </div>
      <div className="messages">
        {renderChat()}
      </div>
      <form 
        className="form-message"
        onSubmit= {(e) => setMessage(e)}>
        <input 
          type='text'
          name="message"
          value= {state.message}
          onChange={(e) => onInput(e)}
          placeholder='write message!...'/>
        <input type='submit' value="Send"/>
      </form>
    </section>
  )
}

export default Message;