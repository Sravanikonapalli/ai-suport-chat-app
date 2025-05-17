import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class ChatStore {
  messages = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async sendMessage(userId, message) {
    this.loading = true;
    this.messages.push({ sender: 'user', content: message });

    const res = await axios.post('http://localhost:5000/api/chat', { userId, message });
    this.messages.push({ sender: 'bot', content: res.data.reply });
    this.loading = false;
  }

  async loadHistory(userId) {
    const res = await axios.get(`http://localhost:5000/api/history/${userId}`);
    this.messages = res.data;
  }
}

export const chatStore = new ChatStore();
