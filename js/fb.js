// initialize and setup facebook js sdk
window.fbAsyncInit = function () {
    FB.init({
        appId: '1280051495474685',
        xfbml: true,
        version: 'v2.8'
    });

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {

            FB.api('/me', function (response) {
                localStorage.setItem('nameFB', response.name);
                document.getElementById('status').innerHTML = "Welcome " + '<span style="color:#FF6D00">' + response.name +'</span>' + " to Cửu Long Giáng Thế Team!";
            });


            document.getElementById('login').style.visibility = "hidden";


            // Create a url-button element
            var anchor = document.createElement("a");
            var anchorValue = document.createTextNode("Go to home now");
            anchor.appendChild(anchorValue);
            document.getElementById('url-button').appendChild(anchor);
            anchor.classList.add('btn');
            anchor.classList.add('to-home-button');
            document.querySelector('.to-home-button').setAttribute('href', 'home-page.html');


        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'We are not logged in';
        } else {
            document.getElementById('status').innerHTML = 'You are not logged into Facebook';
        }
    });


};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// login with facebook with extra permissions
function login() {
    FB.login(function (response) {
        if (response.status === 'connected') {
            FB.api('/me', function (response) {
                localStorage.setItem('nameFB', response.name);
                document.getElementById('status').innerHTML = "Welcome " + '<span style="color:#FF6D00">' + response.name +'</span>' + " to Cửu Long Giáng Thế Team!";
            });

            document.getElementById('login').style.visibility = "hidden";

            // Create a url-button element
            var anchor = document.createElement("a");
            var anchorValue = document.createTextNode("Go to home now");
            anchor.appendChild(anchorValue);
            document.getElementById('url-button').appendChild(anchor);
            anchor.classList.add('btn');
            anchor.classList.add('to-home-button');
            document.querySelector('.to-home-button').setAttribute('href', 'home-page.html');


        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'We are not logged in'
        } else {
            document.getElementById('status').innerHTML = 'You are not logged into Facebook';
        }
    }, {scope: 'email'});
}




// getting basic user info
function getInfo() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function (response) {
        document.getElementById('status').innerHTML = response.name;
    });
}

function getProfilePicture() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,picture.width(30).height(30)'}, function(response) {
        document.getElementById('fb-pic').innerHTML = "<img src='" + response.picture.data.url + "'>";
    });
}

function fbLogoutUser() {
    FB.getLoginStatus(function (response) {
        if (response && response.status === 'connected') {
            FB.logout(function (response) {
                document.location.reload();
            });
        }
    });
}