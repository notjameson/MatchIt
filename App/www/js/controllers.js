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

.controller('UploadCtrl', function($scope, $stateParams, Chats, $cordovaCamera, $cordovaFile) {
  $scope.images = [];
 
  $scope.addImage = function() {
      console.log("add image");
      // 2
  var options = {
    destinationType : Camera.DestinationType.FILE_URI,
    sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
    allowEdit : false,
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions,
  };
  
  // 3
  $cordovaCamera.getPicture(options).then(function(imageData) {
 
    // 4
    onImageSuccess(imageData);
 
    function onImageSuccess(fileURI) {
      createFileEntry(fileURI);
    }
 
    function createFileEntry(fileURI) {
      window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
    }
 
    // 5
    function copyFile(fileEntry) {
      var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
      var newName = makeid() + name;
 
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
        fileEntry.copyTo(
          fileSystem2,
          newName,
          onCopySuccess,
          fail
        );
      },
      fail);
    }
    
    // 6
    function onCopySuccess(entry) {
      $scope.$apply(function () {
        $scope.images.push(entry.nativeURL);
      });
    }
 
    function fail(error) {
      console.log("fail: " + error.code);
    }
 
    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
      for (var i=0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
 
  }, function(err) {
    console.log(err);
  });
  }
 
  $scope.urlForImage = function(imageName) {
      console.log("get correct path for image");
      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
  var trueOrigin = cordova.file.dataDirectory + name;
  return trueOrigin;
  }
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
