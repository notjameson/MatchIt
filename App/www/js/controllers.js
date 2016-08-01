// Controllaaaaa...controlla

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats, $http) {
  $scope.chats = Chats.all();

  // Add function, adds a new article of clothing
  $scope.add = function(type, brand, address) {
  // GET request that links to PHP
  // TODO: Get this running with Ionic Serve
    $http.get('http://localhost/upload.php')
       .then(function(res){
        // If successful, for right now logs it to console, but WILL 
        // add the object later
        //console.log(res.data);  
        //console.log(res.data.info.colors);
        
        Chats.add(res.data.cl_themes[0].id, "Hi", res.data.info.url, res.data.info.colors);
    });
  }

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
.controller('ChatsCtrl', function($scope, Chats, $http, $ionicPopup) {
  
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
  // TODO: Get this running with Ionic Serve
    $http.post('http://localhost/upload.php', $scope.address)
       .then(function(res){
        
        console.log(res.data);
        Chats.add(res.data.cl_themes[0].id, "Hi", res.data.info.url, res.data.info.colors);
    });
  };

  // Popup for adding Image
  $scope.showPopup = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         templateUrl: '../www/templates/form.html',
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

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   };
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.colors = Chats.allColors($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
