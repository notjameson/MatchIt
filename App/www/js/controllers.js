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
    sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
    allowEdit : false,
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions,
    quality: 10, // This is to allow the fastest delivery possible, and JPEG doesn't lose colors on quality loss
  };

  // Authenticate for Backend, for now we use anonymous sign in
      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  
  // 3
  $cordovaCamera.getPicture(options).then(function(imageData) {

    // prepare filename to be uploaded as array buffer
    var fileName = imageData.replace(/^.*[\\\/]/, '');
    // make sure everything works (for testing purposes only)
    console.log(fileName);
    // Get the correct path
    var path = cordova.file.tempDirectory;


    // THIS IS WHERE THE MAGIC HAPPENS
    $cordovaFile.readAsArrayBuffer(path, fileName)
            .then(function (success) {
              // success - get blob data
              var imageBlob = new Blob([success], { type: "image/jpeg" });

              // Create a root reference to the firebase storage
              var storageRef = firebase.storage().ref();

              // pass in the _filename, and save the _imageBlob
              var uploadTask = storageRef.child('images/' + fileName).put(imageBlob);

              // Register three observers:
              // 1. 'state_changed' observer, called any time the state changes
              // 2. Error observer, called on failure
              // 3. Completion observer, called on successful completion
              uploadTask.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // See below for more detail
              }, function (error) {
                // Handle unsuccessful uploads, alert with error message
                alert(error.message)
              }, function () {
                // Handle successful uploads on complete
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);
                // when done, pass back information on the saved image
                
                $http.post('http://www.jamesonzaballos.com/upload.php', downloadURL)
                   .then(function(res){
                    console.log(res.data);
                    Chats.add(res.data.cl_themes[0].id, "Hi", res.data.info.url, res.data.info.colors, res.data.kuler_themes[1].colors);
                }, function(msg){
                  console.log(msg.data);
                });
              });
            }, function (error) {
              // error
              // We will handle this differently
              console.log(error)
            });

    




    // P SURE EVERYTHING FROM THIS POINT ON IS REDUNDANT BUT WE SHALL SEE
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
      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;

      return trueOrigin;
  }
})
.controller('ChatsCtrl', function($scope, Chats, $http, $ionicPopup, $location, $stateParams, $cordovaCamera, $http, $cordovaFile) {
  
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
         title: 'Add',
         scope: $scope,
      
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Add</b>',
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

   // Camera
  // where we store the images
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
    quality: 10, // This is to allow the fastest delivery possible, and JPEG doesn't lose colors on quality loss
  };

  // Authenticate for Backend, for now we use anonymous sign in
      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  
  // 3
  $cordovaCamera.getPicture(options).then(function(imageData) {

    // prepare filename to be uploaded as array buffer
    var fileName = imageData.replace(/^.*[\\\/]/, '');
    // make sure everything works (for testing purposes only)
    console.log(fileName);
    // Get the correct path
    var path = cordova.file.tempDirectory;


    // THIS IS WHERE THE MAGIC HAPPENS
    $cordovaFile.readAsArrayBuffer(path, fileName)
            .then(function (success) {
              // success - get blob data
              var imageBlob = new Blob([success], { type: "image/jpeg" });

              // Create a root reference to the firebase storage
              var storageRef = firebase.storage().ref();

              // pass in the _filename, and save the _imageBlob
              var uploadTask = storageRef.child('images/' + fileName).put(imageBlob);

              // Register three observers:
              // 1. 'state_changed' observer, called any time the state changes
              // 2. Error observer, called on failure
              // 3. Completion observer, called on successful completion
              uploadTask.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // See below for more detail
              }, function (error) {
                // Handle unsuccessful uploads, alert with error message
                alert(error.message)
              }, function () {
                // Handle successful uploads on complete
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);
                // when done, pass back information on the saved image
                

                $scope.data = {}
    
                // Custom popup
                var myPopup = $ionicPopup.show({
                   templateUrl: 'templates/form.html',
                   title: 'Add',
                   scope: $scope,
                
                   buttons: [
                      { text: 'Cancel' }, {
                         text: '<b>Add</b>',
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

                $http.post('http://www.jamesonzaballos.com/upload.php', downloadURL)
                   .then(function(res){
                    console.log(res.data);
                    Chats.add(res.data.cl_themes[0].id, "Hi", res.data.info.url, res.data.info.colors, res.data.kuler_themes[1].colors);
                }, function(msg){
                  console.log(msg.data);
                });

              });
            }, function (error) {
              // error
              // We will handle this differently
              console.log(error)
            });

    




    // P SURE EVERYTHING FROM THIS POINT ON IS REDUNDANT BUT WE SHALL SEE
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
      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;

      return trueOrigin;
  }
  
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
