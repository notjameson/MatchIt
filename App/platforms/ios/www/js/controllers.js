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

.controller('UploadCtrl', function($scope, $stateParams, Chats, $cordovaCamera, $cordovaFile, $http) {

  // Camera
  // where we store the images
  $scope.images = [];
 
  $scope.addImage = function() {
      console.log("add image");
      // 2
  var options = {
    destinationType : Camera.DestinationType.FILE_URI,
    sourceType : Camera.PictureSourceType.PHOTOLIBRARY, // Camera.PictureSourceType.PHOTOLIBRARY
    allowEdit : false,
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions,
  };
  
  // 3
  $cordovaCamera.getPicture(options).then(function(imageData) {

    



    // Authenticate
      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });

      // Firebase
      // make file object to upload
      var dat = "metadata";
      var blobToAdd = new Blob([dat], {type: 'image/jpeg'});
      
      var fileToAdd = new File([blobToAdd], imageData);
      console.log(fileToAdd);
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef.child(fileToAdd).put(fileToAdd);
      uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // See below for more detail

      }, function(error) {
        // Handle unsuccessful uploads

        console.error(error);
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
      });





    // 4
    onImageSuccess(imageData);
 
    function onImageSuccess(fileURI) {
      console.log(fileURI);
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

    // Make the file
    var imageBase64 = $scope.address;
    var toBlob = new Blob([imageBase64], {type: 'image/jpeg'});

    // Authenticate
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });

    // Firebase
    var storageRef = firebase.storage().ref();
    var imageRef = storageRef.child('31Epqfc.jpg');
    var uploadTask = storageRef.child('31Epqfc.jpg').put(toBlob);
    uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // See below for more detail
    }, function(error) {
      // Handle unsuccessful uploads
      console.log(error);
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL);
    });


  // POST request that links to PHP
    $http.post('http://www.jamesonzaballos.com/upload.php', $scope.address)
       .then(function(res){
        console.log(res.data);
        Chats.add(res.data.cl_themes[0].id, "Hi", res.data.info.url, res.data.info.colors, res.data.kuler_themes[1].colors);
    }, function(msg){
      console.log(msg.data);
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
