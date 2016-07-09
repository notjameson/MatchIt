// Controllaaaaa...controlla

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.add = function(type, brand, address) {
    Chats.add(type, brand, address);
  }

  $scope.goTo = function(path) {
      $location.path(path);
  }

  $scope.addNext = function(type) {
    //var input = $.trim($("#clothName").val());

    //if (type.length > 0) {
    //jQuery('#text').fadeIn();
    //}

    var myEl = angular.element( document.querySelector( '#next' ) );
    myEl.addClass('animate fadeInDown');
    myEl.removeAttr('display: none');
  }


})

.controller('UploadCtrl', function($scope, $stateParams, Chats) {

})
.controller('ChatsCtrl', function($scope, Chats, $http) {
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.request = function(url) {
    
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
