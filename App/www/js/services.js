angular.module('starter.services', [])

.factory('Chats', function() {

  var chats = [{
    id: 0,
    type: 'Short-sleeved shirt',
    brand: 'Gap',
    itemImage: 'img/Shirt1.jpg',
    color: '#FFFFFF',
    colors: ["#ffff00", "#555555"],
    kulerArray: []
  }, {
    id: 1,
    type: 'Chinos',
    brand: 'Gap',
    itemImage: 'img/Pants1.jpg',
    size: 'S',
    color: '#000000',
    colors: ["#123321", "#122221"],
    kulerArray: []
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
    add: function(type, brand, address, colorArray, kulerArray) {
      // Here we make sure the array will pass values suitable for hex coding
      for (var i = 0; i < colorArray.length; i++) {
        if (colorArray[i].charAt(0) != "#") {
          colorArray[i] = "#" + colorArray[i];
        }
      }

      for (var i = 0; i < kulerArray.length; i++) {
        if (kulerArray[i].charAt(0) != "#") {
          kulerArray[i] = "#" + kulerArray[i];
        }
      }
      chats.push({"id": chats.length + 1, "type": type, "brand": brand, "itemImage": 
        address, "color": "ffff00", "colors": colorArray, "kulerArray": kulerArray});
    },
    allColors: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i].colors;
        }
      }
    }
  };
});
