import io from 'socket.io-client';

let socket = io.connect('http://localhost:4000');

export default socket;