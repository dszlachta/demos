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
        proxyFn: null,

        init: function() {

            /* Set color for each letter */

            var colors = [ 'blue', 'blue', 'green', 'red' ];

            'ggle'.split('').forEach(function(char, index) {

                Keys.bind(App.keyCode(char), function() { 

                    App.setFormat(colors[index]);

                });

            });

            Keys.bind(App.keyCode('o'), App.insertO);

            this.proxyFn = this.insertFirstO;

            this.editingNode = document.querySelector('div[contenteditable]');
            this.run();

        },

        keyCode: function(char) {

            return char.toUpperCase().charCodeAt(0);

        },

        setFormat: function(color) {

            document.execCommand('foreColor', false, color);

        },

        insertO: function() {

            App.proxyFn = App.proxyFn();

        },

        insertFirstO: function() {
            App.setFormat('red');
            return this.insertSecondO;
        },

        insertSecondO: function() {
            App.setFormat('yellow');
            return this.insertFirstO;
        },

        run: function() {

            this.editingNode.onkeydown = function(event) {

                /* Simple, huh? */
                Keys.perform(event.keyCode).call(this, null);

            };

            /* Clear formatting */

            Keys.defaultAction = function() {

                document.execCommand('foreColor', false, 'black');

            };

            this.editingNode.focus();

        }

    };

    App.init();

})();
