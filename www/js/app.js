// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db=null;
var app=angular.module('starter', ['ionic','ngCordova']);

//angular.module('starter', ['ionic'])

app.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    db=window.openDatabase("sqlite", "1.0", "sqlitedemo",2000);
    $cordovaSQLite.execute(db, "CREATE TABLE forumDB(id integer primary key, comment text)");



  });
})
app.controller('infoCtrl', function($scope, $cordovaSQLite, $interval){



  $scope.addInfo=function(){
    var query="INSERT INTO forumDB(comment) VALUES (?)";
    $cordovaSQLite.execute(db,query,[$scope.comment]);
    $scope.load();
  }
  $scope.load=function(){
    $scope.alldata=[];
    $cordovaSQLite.execute(db,"SELECT id, comment FROM forumDB ORDER BY id DESC").then(function(result){
      if(result.rows.length){
        for (var i=0; i < result.rows.length; i++){
          $scope.alldata.push(result.rows.item(i));
        }
      } else {
        console.log("No data found");
      }
    }, function(error){
      console.log("error" + err);
    });
  }

  // Run once. Load the data from the database.
  $interval(callAtStart, 500, 1);

  function callAtStart() {
    $scope.load();
  }



})
