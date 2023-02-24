import React, { useState,useEffect } from 'react';
import './css/chat.css'
import socket from './Socket';
import User from './Users'

function Message({ userData, setUserActive }) {
  const { name } = userData[0];
  let secondUser = User.filter(user => user.name != name);
  const [state, setState ] = useState({name, message: ''});
  const [chat, setChat ] = useState([]);
  const [partners, setPartners ] = useState([]);
  useEffect(() => {
    socket.emit("inside", {status: 1, name})
  }, [])

  useEffect(() => {
    socket.on('update', (data) => {
      setPartners(data.filter(x=> x.id !== socket.id))
    })
  }, [socket])

  console.log(partners);
  useEffect(() => {
    socket.on('get_message', ({name, message, date})=>{
      setChat([...chat, {name, message, date}])
    })
  }, [chat]);

  function closeSesion() {
    setUserActive([]);
    window.location = ""
  }

  function setMessage(e) {    
    e.preventDefault();
    if(state.message != "") {
      let datatime = new Date().toLocaleTimeString().split(":")
      let timer = datatime[0] + ':' + datatime[1];
      let { name, message } = state;
      socket.emit('message', {name, message, date: timer});
      setState({name, message:''});
      e.currentTarget.message.focus();
    } else {
      e.currentTarget.message.focus();
    }
  }

  function onInput(e) {
    setState({...state, [e.target.name]:e.target.value})
  }

  function renderChat() {
    return (chat.map((msg, index )=> {
      return (<div className= {msg.name !== state.name ? 'article other' : 'article mine'} key={index}>
        <div className='message-content'>{msg.message}</div>
        <span className='timer'>{msg.date}</span>
      </div>)
      })
    )
  }

  return (
    <section className ="chat"> 
      <div className='connected'>
        <div className='connected-title'>En línea</div>
        {
          partners.length > 0 ? partners.map((user, i) => {
            return <div className="active-user" key={i}><span className='green-dot'></span> {user.name}</div>
          }) : <div>Solo tú</div>  
        }
      </div>    
      <div className='title'>
        <div>{secondUser[0].name}</div>
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
          className='new-message'
          value= {state.message}
          onChange={(e) => onInput(e)}
          placeholder='Write your message!...'/>
        <input type='submit' value="Send"/>
      </form>
    </section>
  )
}

export default Message;