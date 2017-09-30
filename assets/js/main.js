let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        ip_address: '',
        keymap : {
            8: "Backspace",
            13: "Select",
            27: "Back",
            32: "Lit_+",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down"
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
        toggleKeyboard: function(event) {
            event.stopPropagation();
            let input = document.getElementById('textinput');
            if (input.classList.contains('visible')) {
                this.slideUp(input);
                input.classList.remove('visible');
            } else {
                this.slideDown(input);
                input.classList.add('visible');
                input.focus();

            }

        },
        sendCommand: function (e) {

            let tagName = e.target.tagName;
            if(tagName === "I" || tagName === 'SPAN') {
                e.target.parentNode.click();
            } else if (tagName === "DIV") {
                let key = e.target.getAttribute('id');
                if(key) {
                    axios.post('http://' + this.ip_address + ':8060/keypress/' + key)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            //console.log(error);
                        });
                }
                let targetId = e.target.getAttribute('id');
                if (targetId === 'play') {
                    this.togglePlayButton();
                }

            }

            return false;
        },
        handleKeyPress: function(event) {
            let key;

            if(this.keymap.hasOwnProperty(event.which)){
                key = this.keymap[event.which];
            } else {
                key = 'Lit_' +  encodeURIComponent(String.fromCharCode(event.which).toLowerCase());
            }
            let url = 'http://' + this.ip_address + ':8060/keypress/' + key;
            axios.post(url).then(function() {}).catch(function(error) { });
            return false;
        },

        togglePlayButton: function() {
            let el = document.getElementById('playbutton');
            if (el.classList.contains('fa-play')) {
                el.classList.remove('fa-play');
                el.classList.add('fa-pause');
            } else {
                el.classList.add('fa-play');
                el.classList.remove('fa-pause');
            }
        },
        slideDown: function(el) {

            el.style.maxHeight = '48px';
            // We're using a timer to set opacity = 0 because setting max-height = 0 doesn't (completely) hide the element.
            el.style.opacity   = '1';

        },
        slideUp: function(el) {

            el.style.maxHeight = '0';
            this.once( 1, function () {
                el.style.opacity = '0';

            });
        },
        once: function(seconds, callback) {
            let counter = 0;
            let time = window.setInterval( function () {
                counter++;
                if ( counter >= seconds ) {
                    callback();
                    window.clearInterval( time );
                }
            }, 400 );
        }

    },
    mounted: function () {
        this.checkCookie();
        window.addEventListener('keyup', function(event) {
            app.handleKeyPress(event);
        });
    }
});