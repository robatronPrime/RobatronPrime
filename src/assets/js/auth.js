app.controller('GoogleCtrl', () => {

  const onSignIn = (googleUser) => {

    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

  }

  window.onSignIn = onSignIn;

});