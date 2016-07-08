// Controllaaaaa...controlla

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.add = function(name, lastText) {
    Chats.add(name, lastText, file);
  }

  $scope.upload = function(path) {

  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  // Adds new item
  // TODO:  NEED TO CHANGE VARIABLE NAMING
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
