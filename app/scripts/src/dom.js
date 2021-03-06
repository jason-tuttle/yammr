import $ from 'jquery';
import md5 from 'crypto-js/md5';
import moment from 'moment';
const gravatarBaseUrl = 'http://www.gravatar.com/avatar';

function createGravatar(username) {
    let userHash = md5(username);
    return `${gravatarBaseUrl}/${userHash.toString()}`;
}

export function promptForUsername() {
    let username = prompt('Enter a username:');
    return username.toLowerCase();
}

export class ChatForm {
    constructor(formSel, inputSel) {
        this.$form = $(formSel);
        this.$input = $(inputSel);
    }
    init(submitCb) {
        this.$form.submit((event) => {
            event.preventDefault();
            let val = this.$input.val();
            submitCb(val);
            this.$input.val('');
        });

        this.$form.find('button').on('click', () => this.$form.submit());
    }
}

export class ChatList {
    constructor(listSel, username) {
        this.$list = $(listSel);
        this.username = username;
    }

    drawMessage(data) {
        let username = data.user,
            timestamp = data.timestamp,
            message = data.message;
        console.log(username, timestamp, message);
        let $messageRow = $('<li>', {
            'class': 'message-row'
        });
        if (this.username === username) {
            $messageRow.addClass('me');
        }

        let $message = $('<p>');
        $message.append($('<span>', {
            'class': 'message-username',
            text: username
        }));

        $message.append($('<span>', {
            'class': 'timestamp',
            'data-time': timestamp,
            text: moment(timestamp).fromNow()
        }));

        $message.append($('<span>', {
            'class': 'message-message',
            text: message
        }));

        let $img = $('<img>', {
            src: createGravatar(username),
            title: username
        });

        $messageRow.append($img);
        $messageRow.append($message);
        this.$list.append($messageRow);
        $messageRow.get(0).scrollIntoView();
    }

    init() {
        this.timer = setInterval(() => {
            $('[data-time]').each((index, element) => {
                let $element = $(element);
                let timestamp = new Date().setTime($element.attr('data-time'));
                let ago = moment(timestamp).fromNow()
                $element.html(ago);
            })
        }, 1000);
    }
}
