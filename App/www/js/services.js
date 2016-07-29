angular.module('starter.services', [])

.factory('Chats', function() {

  var chats = [{
    id: 0,
    type: 'Short-sleeved shirt',
    brand: 'Gap',
    itemImage: 'img/Shirt1.jpg',
    color: '#FFFFFF',
    colors: ["#ffff00", "#555555"]
  }, {
    id: 1,
    type: 'Chinos',
    brand: 'Gap',
    itemImage: 'img/Pants1.jpg',
    size: 'S',
    color: '#000000',
    colors: ["#123321", "#122221"]
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
    add: function(type, brand, address, colorArray) {
      // Here we make sure the array will pass values suitable for hex coding
      for (var i = 0; i < colorArray.length; i++) {
        if (colorArray[i].charAt(0) != "#") {
          colorArray[i] = "#" + colorArray[i];
        }
      }
      chats.push({"id": chats.length + 1, "type": type, "brand": brand, "itemImage": 
        address, "color": "ffff00", "colors": colorArray});
        console.log(Array.isArray(colorArray));
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
