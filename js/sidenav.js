function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "150px";
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
    $('.sidenav-left').css("width", "15%");
    $('.sidenav-left').show();
    $('.sidenav-right').show();
    $('.sidenav-hide-icon').show();
    $('#sidenav-open').css("display", "none");
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "50px";
    document.getElementById("main").style.marginLeft = "0px";
    document.body.style.backgroundColor = "white";
    $('.sidenav-left').css("width", "100%");
    $('.sidenav-left').show();
    $('.sidenav-right').hide()
    $('.sidenav-hide-icon').hide();
    $('#sidenav-open').css("display", "block");
}