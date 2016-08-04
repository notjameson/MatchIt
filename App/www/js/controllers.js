// Controllaaaaa...controlla

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats, $http) {
  $scope.chats = Chats.all();


  $scope.goTo = function(path) {
      $location.path(path);
  }

  /*$scope.addNext = function(type) {

    var myEl = angular.element( document.querySelector( '#next' ) );
    myEl.addClass('animate fadeInDown');
    myEl.removeAttr('display: none');
  } */


})

.controller('UploadCtrl', function($scope, $stateParams, Chats) {

})
.controller('ChatsCtrl', function($scope, Chats, $http, $ionicPopup, $location) {
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.request = function(url) {
    
  };

  // Add function, adds a new article of clothing
  $scope.add = function(type, brand, address) {
    $scope.address = "http://i.imgur.com/31Epqfc.jpg";
  // POST request that links to PHP
    $http.post('http://jamesonzaballos.com/upload.php', $scope.address)
       .then(function(res){
        console.log(res.data);
        Chats.add(res.data.cl_themes[0].id, "Hi", res.data.info.url, res.data.info.colors, res.data.kuler_themes[1].colors);
    });
  };

  // Popup for adding Image
  $scope.showPopup = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         templateUrl: 'templates/form.html',
         title: 'Title',
         subTitle: 'Subtitle',
         scope: $scope,
      
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Save</b>',
               type: 'button-positive',
                  onTap: function(e) {
            
                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                     } else {
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });    
   };
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.colors = Chats.allColors($stateParams.chatId);
  $scope.kulerColors = Chats.kulerColors($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
