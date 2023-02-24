const { connect } = require('http2');
const { disconnect, emit } = require('process');

const express = require('express')();
const http = require('http').createServer(express);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    credentials: true
  }
});

let connected = []

io.on('connection', socket => {
  
  socket.on('message', ({name, message, date}) => {
    console.log(date)
    io.emit('get_message', {name, message, date});
  })

  socket.on("inside", ({status, name}) => {
    connected.push({id:socket.id, name})
    io.emit("update", connected)

  })

  socket.on("disconnect", () => {
    connected = connected.filter(x => x.id !== socket.id)
    console.log(connected);
    io.emit("update", connected)
  })

})

http.listen(4000, () => {
  console.log(`Server running on port ${4000}`);
});