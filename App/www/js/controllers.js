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
        console.log(res);
        console.log(res.data.cl_themes[0].id);
        console.log(res.data.info.url);

        Chats.add(res.data.cl_themes[0].id, "Hi", res.data.cl_themes[0].badgeUrl);
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
.controller('ChatsCtrl', function($scope, Chats, $http, $ionicPopup) {

  $scope.showPopup = function() {
  $scope.data = {};

  // Placeholder popup for adding article of clothing
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });
};
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
