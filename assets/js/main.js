/* Cookie functions taken from w3schools example: http://www.w3schools.com/js/js_cookies.asp
 */
var ip_address;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var ip = cname + "=";
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

    $("button").click(function(){
        $(this).vibrate(20);
        var value = $(this).attr('id');
        var url = 'http://' + ip_address + ':8060/keypress/' + value;
        $.post(url);
        return false;
    });

    $("a.clear_cookies").click(function(){
        document.cookie = "ip=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        alert("The ip address cookie has been cleared. You will be prompted again for your IP address.");
        location.reload();
    });


    var wrongurl = "http://192.168.1.242:8060";
    $.ajax({
        type: "POST",
        url: wrongurl,
        timeout: 300, // adjust the limit. currently its 15 seconds
        error: function(data){
            console.log(data);
        }
    });
    $.post(wrongurl, function(data){
       var parse = $.parseXML(data);
        console.log(parse);
    });


});