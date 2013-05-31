(function(){

    'use strict';

    var Keys = window.Keys = {

        bindings: [],

        bind: function(code, fn) {

            this.bindings[code] = fn;

        },

        defaultAction: function() {},
        
        perform: function(code) {

            return this.bindings[code] || this.defaultAction;

        }

    };

    var App = window.App = {

        editingNode: null,

        init: function() {

            var styles = [ 'blue', 'red', 'yellow', 'blue', 'green', 'red' ];

            'google'.split('').forEach(function(char, index) {

                var keyCode = char.toUpperCase().charCodeAt(0);

                Keys.bind(keyCode, function() { 

                    App.setFormat(styles[index]);

                });

            });

            this.editingNode = document.querySelector('div[contenteditable]');
            this.run();

        },

        setFormat: function(color) {

            document.execCommand('foreColor', false, color);

        },

        run: function() {

            Keys.defaultAction = function() {
                document.execCommand('foreColor', false, 'black');
            };

            this.editingNode.onfocus = function() {

                this.innerHTML = '';
                this.onfocus = function(){};

            };

            this.editingNode.onkeydown = function(event) {
                return (Keys.perform(event.keyCode).call(this, null));
            };

            this.editingNode.onkeyup = function() {
            //    document.execCommand('foreColor', false, 'black');
            };

        }

    };

    App.init();

})();
