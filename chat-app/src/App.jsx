import { useState, useEffect } from 'react';
import Message from './components/Message';
import socket from './components/Socket';
import data from './components/Users';
import Login from './components/Login';
import './App.css'


function App() {
  socket.emit('connection', 'Hello!!');
  const [users, setUsers] = useState([...data]);
  const [userActive, setUserActive] = useState([]);
  console.log(userActive)
  return (
    <div className="App">
      {
        userActive.length > 0 ? <Message userData={userActive} setUserActive = {setUserActive} />: 
          <Login data = {users} setUserActive = {setUserActive} />
      }
    </div>
  )
}

export default App
