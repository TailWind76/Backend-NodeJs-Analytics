// Dependencies
const http = require('http');
const socketIO = require('socket.io');

// Create a HTTP server
const server = http.createServer();
const io = socketIO(server);

// Event listener for a new client connection
io.on('connection', (socket) => {
  console.log('New client connected!');

  // Simulate real-time analytics data and send it to the client every second
  const analyticsInterval = setInterval(() => {
    const data = {
      users: Math.floor(Math.random() * 1000),
      pageViews: Math.floor(Math.random() * 5000),
      conversions: Math.floor(Math.random() * 100),
    };
    socket.emit('analyticsData', data);
  }, 1000);

  // Event listener for a client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected!');
    clearInterval(analyticsInterval);
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`WebSocket analytics server is listening on port ${port}`);
});
