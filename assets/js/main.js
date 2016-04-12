/* Cookie functions taken from w3schools example: http://www.w3schools.com/js/js_cookies.asp
 */
var ip_address;

var keyCodes = {
    3 : "break",
    8 : "backspace / delete",
    9 : "tab",
    12 : 'clear',
    13 : "enter",
    16 : "shift",
    17 : "ctrl ",
    18 : "alt",
    19 : "pause/break",
    20 : "caps lock",
    27 : "escape",
    32 : "spacebar",
    33 : "page up",
    34 : "page down",
    35 : "end",
    36 : "home ",
    37 : "left",
    38 : "up ",
    39 : "right",
    40 : "down",
    41 : "select",
    42 : "print",
    43 : "execute",
    44 : "Print Screen",
    45 : "insert ",
    46 : "delete",
    48 : "Lit_0",
    49 : "Lit_1",
    50 : "Lit_2",
    51 : "Lit_3",
    52 : "Lit_4",
    53 : "Lit_5",
    54 : "Lit_6",
    55 : "Lit_7",
    56 : "Lit_8",
    57 : "Lit_9",
    59 : "Lit_=",
    60 : "<",
    61 : "equals (firefox)",
    63 : "ß",
    65 : "Lit_a",
    66 : "Lit_b",
    67 : "Lit_c",
    68 : "Lit_d",
    69 : "Lit_e",
    70 : "Lit_f",
    71 : "Lit_g",
    72 : "Lit_h",
    73 : "Lit_i",
    74 : "Lit_j",
    75 : "Lit_k",
    76 : "Lit_l",
    77 : "Lit_m",
    78 : "Lit_n",
    79 : "Lit_o",
    80 : "Lit_p",
    81 : "Lit_q",
    82 : "Lit_r",
    83 : "Lit_s",
    84 : "Lit_t",
    85 : "Lit_u",
    86 : "Lit_v",
    87 : "Lit_w",
    88 : "Lit_x",
    89 : "Lit_y",
    90 : "Lit_z",
    91 : "Windows Key / Left ⌘ / Chromebook Search key",
    92 : "right window key ",
    93 : "Windows Menu / Right ⌘",
    106 : "multiply ",
    107 : "add",
    108 : "numpad period (firefox)",
    109 : "subtract ",
    110 : "decimal point",
    111 : "divide ",
    144 : "num lock ",
    145 : "scroll lock",
    160 : "^",
    163 : "#",
    167 : "page forward (Chromebook)",
    173 : "minus (firefox), mute/unmute",
    174 : "decrease volume level",
    175 : "increase volume level",
    176 : "next",
    177 : "previous",
    178 : "stop",
    179 : "play/pause",
    180 : "e-mail",
    181 : "mute/unmute (firefox)",
    182 : "decrease volume level (firefox)",
    183 : "increase volume level (firefox)",
    186 : "semi-colon / ñ",
    187 : "equal sign ",
    188 : "comma",
    189 : "dash ",
    190 : "period ",
    191 : "forward slash / ç",
    192 : "grave accent ",
    193 : "?, / or °",
    194 : "numpad period (chrome)",
    219 : "open bracket ",
    220 : "back slash ",
    221 : "close bracket ",
    222 : "single quote ",
    223 : "`",
    224 : "left or right ⌘ key (firefox)",
    225 : "altgr",
    226 : "< /git >",
    230 : "GNOME Compose Key",
    255 : "toggle touchpad"
};

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
    $("button").vibrate(20);
    while(!ip_address){
        checkCookie();
    }

    $("button").click(function(){
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
    $("body").on('keydown', function(e){
        var url = 'http://' + ip_address + ':8060/keypress/' + keyCodes[e.keyCode];
        $.post(url);
    });


});