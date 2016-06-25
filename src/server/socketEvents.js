exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.join('groupchat');
    socket.on('chat mounted', function(user) {
      socket.emit('receive socket', socket.id)
    })
    socket.on('leave chat', function() {
      socket.leave('groupchat')
    })
    socket.on('join chat', function() {
      socket.join('groupchat')
    })
    socket.on('new message', function(msg) {
      socket.broadcast.to('groupchat').emit('new bc message', msg);
    });
    socket.on('typing', function (data) {
      socket.broadcast.to('groupchat').emit('typing bc', data.user);
    });
    socket.on('stop typing', function (data) {
      socket.broadcast.to('groupchat').emit('stop typing bc', data.user);
    });
  });
}
