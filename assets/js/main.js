let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        ip_address: '',
        keymap : {
            8: "Backspace",
            13: "Select",
            27: "Back",
            32: "Space",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down"
        }
    },
    computed: {
        ipAddress: function() {
            let cookie = getCookie("ip");
            let ip = cookie.split("=");
            if (cookie) {
                ip_address = ip[1];
            } else {
                ip = prompt("Enter the IP Address of your Roku:", "");
                if (ip !== "" && ip !== null) {
                    setCookie("ip", ip, 365);
                    ip_address = ip;
                }
            }
        }
    },
    methods: {

        setCookie: function(cname, cvalue, exdays) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        getCookie: function() {
            let ca = document.cookie.split(';');
            for(let i=0; i<ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        },
        clearCookie: function() {
            document.cookie = "ip=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            alert("The ip address cookie has been cleared. You will be prompted again for your IP address.");
            location.reload();
        },
        checkCookie: function() {
            let cookie = this.getCookie("ip");
            let ip = cookie.split("=");
            if (cookie) {
                this.ip_address = ip[1];
            } else {
                ip = prompt("Enter the IP Address of your Roku:", "");
                if (ip !== "" && ip != null) {
                    this.setCookie("ip", ip, 365);
                    this.ip_address = ip;
                }
            }
        },
        toggleKeyboard: function() {
            let input = document.getElementById('textinput');
            if (input.style.display === 'none') {
                input.style.display = 'block';
                input.focus();
            } else {
                input.style.display = 'none';
            }
        },
        sendCommand: function (e) {
            if(e.target.tagName === "I") {
                e.target.parentNode.click();
            } else if (e.target.tagName === "BUTTON") {
                let key = e.target.getAttribute('id');
                axios.post('http://' + this.ip_address + ':8060/keypress/' + key)
                    .then(function (response) {
                    console.log(response);
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            }
            return false;
        },
        handleKeyPress: function(event) {
            let key;

            if(this.keymap.hasOwnProperty(event.which)){
                key = this.keymap[event.which];
            } else {
                key = 'Lit_' +  encodeURIComponent(String.fromCharCode(event.which));
            }
            console.log(key);
            let url = 'http://' + this.ip_address + ':8060/keypress/' + key;
            axios.post(url).then(function() {}).catch(function(error) { });
        }

    },
    mounted: function () {
        this.checkCookie();
        window.addEventListener('keyup', function(event) {
            app.handleKeyPress(event);
        });
    }
});