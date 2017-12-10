import socket from './ws-client';
import { ChatForm, ChatList, promptForUsername } from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let username = '';
username = promptForUsername();

class ChatApp {
    constructor() {
        this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        this.chatList = new ChatList(LIST_SELECTOR, 'wonderwoman');

        socket.init('ws://localhost:3001');
        socket.registerOpenHandler(() => {
            this.chatForm.init((data) => {
                let message = new ChatMessage({message: data});
                socket.sendMessage(message.serialize());
            });
        });
        socket.registerMessageHandler((data) => {
            let message = new ChatMessage(data);
            this.chatList.drawMessage(message.serialize());
        });
        socket.registerCloseHandler(() => {

        });
    }
}

class ChatMessage {
    constructor({
        message,
        username,
        timestamp = (new Date()).getTime()
    }) {
        this.message = message;
        this.username = username;
        this.timestamp = timestamp;
    }
    serialize() {
        return {
            username: this.username,
            message: this.message,
            timestamp: this.timestamp
        };
    }
}

export default ChatApp;
