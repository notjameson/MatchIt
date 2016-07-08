angular.module('starter.services', [])

.factory('Chats', function() {

  var chats = [{
    id: 0,
    type: 'Short-sleeved shirt',
    brand: 'Gap',
    itemImage: 'img/Shirt1.jpg',
    color: '#123456'
  }, {
    id: 1,
    type: 'Chinos',
    brand: 'Gap',
    itemImage: 'img/Pants1.jpg',
    size: 'S',
    color: '#123456'
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
    add: function(type, brand) {
      chats.push({"id": chats.length + 1, "type": type, "brand": brand, "itemImage": 'img/Shirt2.jpg'});
    },
    getColor: function(index) {
      return chats[i].color;
    }
  };
});
