/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Board = require('./board.model');

exports.register = function(socket) {
  Board.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Board.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('board:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('board:remove', doc);
}