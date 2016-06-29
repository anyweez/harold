/* jslint browser: true */
'use strict'

window.addEventListener('load', function () {
    var endpoint = '/messages';

    function updateMessages() {
        var request = new XMLHttpRequest();
        request.open('GET', endpoint);
        request.onload = function () {
            var data = JSON.parse(request.responseText);
            var messages = document.getElementById('messages');

            while (messages.firstChild) {
                messages.removeChild(messages.firstChild);
            }

            for (var i = 0; i < data.length; i++) {
                var element = document.createElement('li');
                element.textContent = '[From ' + data[i].user + '] ' + data[i].message;
                messages.appendChild(element);
            }
        };
        request.send();
    }

    function sendMessage() {
        var request = new XMLHttpRequest();
        request.open('POST', endpoint);
        request.send(JSON.stringify({
            name: document.getElementById('username').value,
            message: document.getElementById('message').value,
        }));
    }

    updateMessages();
    document.getElementById('update').addEventListener('click', updateMessages);
    document.getElementById('send').addEventListener('click', sendMessage);
});