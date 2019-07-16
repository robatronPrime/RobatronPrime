angular.module('app', []).controller('GAuthCtrl', ($scope) => {

  $scope.message = 'hello';

  const onSignIn = (googleUser) => {
    const user = googleUser.getBasicProfile();
    console.log(user.getEmail());

  };
  
  $scope.signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( () => console.log('User signed out.'));
  }
  
  window.onSignIn = onSignIn;

});


