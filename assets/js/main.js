/* Cookie functions taken from w3schools example: http://www.w3schools.com/js/js_cookies.asp
 */
var ip_address;

var keymap = {
    8: "Backspace",
  13: "Select",
    27: "Back",
    32: "Space",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down"

};


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie() {

    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var cookie = getCookie("ip");
    var ip = cookie.split("=");
    if (cookie) {
       ip_address = ip[1];
    } else {
        ip = prompt("Enter the IP Address of your Roku:", "");
        if (ip != "" && ip != null) {
            setCookie("ip", ip, 365);
            ip_address = ip;
        }
    }
}
$(document).ready(function(){


    while(!ip_address){
        checkCookie();
    }

    $("#showkeyboard").click(function(){
       $("#textinput").slideDown().focus();
        return false;

    });
    $("#textinput").blur(function(){
       $(this).slideUp().empty();
    });



    $(document).keydown(function(e){
        var key;

        if(keymap.hasOwnProperty(e.which)){
            key = keymap[e.which];
        } else {
            key = 'Lit_' +  encodeURIComponent(String.fromCharCode(e.which));
        }
        console.log(key);
        var url = 'http://' + ip_address + ':8060/keypress/' + key;
        $.post(url);
    });

    $("a.clear_cookies").click(function(){
        document.cookie = "ip=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        alert("The ip address cookie has been cleared. You will be prompted again for your IP address.");
        location.reload();
    });
    $("button").vibrate(20).click(function(){
        var value = $(this).attr('id');
        var url = 'http://' + ip_address + ':8060/keypress/' + value;
        $.post(url);
        return false;
    });



});