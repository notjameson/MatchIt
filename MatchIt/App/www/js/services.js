angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Short-sleeved shirt',
    lastText: 'Gap',
    face: 'img/Shirt1.jpg'
  }, {
    id: 1,
    name: 'Chinos',
    lastText: 'Gap',
    face: 'img/Pants1.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    add: function(name, lastText) {
      chats.push({"id": chats.length + 1, "name": name, "lastText": lastText, "face": 'img/Shirt2.jpg'});
    }
  };
});
