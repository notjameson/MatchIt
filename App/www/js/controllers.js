// Controllaaaaa...controlla

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats, $http) {
  $scope.chats = Chats.all();

  // Add function, adds a new article of clothing
  $scope.add = function(type, brand, address) {
  // GET request that links to PHP
    $http.get('http://localhost/upload.php')
       .then(function(res){
        // If successful, for right now logs it to console, but WILL 
        // add the object later
        //console.log(res.data);  
        console.log(res);
        console.log(res.data.cl_themes[0].id);
        console.log(res.data.info.url);
        
        Chats.add(res.data.cl_themes[0].id, "Hi", res.data.info.url);
    });
  }

  $scope.goTo = function(path) {
      $location.path(path);
  }

  $scope.addNext = function(type) {

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
