/*
 * Googlefier: changes letters color while typing to match those from the Google's logo.
 *
 * Demonstrates the lookup table technique to avoid conditionals and switch
 * statement.
 *
 * github.com/dszlachta
 * @d_szlachta
 */

(function(){

    'use strict';

    var Keys = window.Keys = {

        /* our lookup table */
        bindings: [],

        bind: function(code, fn) {

            this.bindings[code] = fn;

        },

        defaultAction: function() {},
        
        perform: function(code) {

            /* return function binded to key code. If there's no function
             * binded, return default function 
             */
            return this.bindings[code] || this.defaultAction;

        }

    };

    var App = window.App = {

        editingNode: null,

        init: function() {

            /* Set color for each letter */

            var colors = [ 'blue', 'red', 'yellow', 'blue', 'green', 'red' ];

            'google'.split('').forEach(function(char, index) {

                var keyCode = char.toUpperCase().charCodeAt(0);

                Keys.bind(keyCode, function() { 

                    App.setFormat(colors[index]);

                });

            });

            this.editingNode = document.querySelector('div[contenteditable]');
            this.run();

        },

        setFormat: function(color) {

            document.execCommand('foreColor', false, color);

        },

        run: function() {

            /* Delete the hint text from div when focused */

            this.editingNode.onfocus = function() {

                this.innerHTML = '';
                this.onfocus = function(){};

            };

            this.editingNode.onkeydown = function(event) {

                /* Simple, huh? */
                Keys.perform(event.keyCode).call(this, null);

            };

            /* Clear formatting */

            Keys.defaultAction = function() {

                document.execCommand('foreColor', false, 'black');

            };

        }

    };

    App.init();

})();
