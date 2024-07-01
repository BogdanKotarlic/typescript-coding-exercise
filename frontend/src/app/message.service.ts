import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  async all() {
    try {
      const res = await fetch('http://localhost:3000/messages');
      if (!res.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await res.json();
      const messages = data.messages.map(
        (message: any) => new Message(message.message, 'received')
      );
      this.messagesSubject.next(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  async add(message: Message) {
    try {
      const res = await fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer valid-token',
        },
        body: JSON.stringify({ message: message.text, user: 'User1' }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      await this.all();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}

export class Message {
  text: string;
  status: string;

  constructor(message: string, status: string) {
    this.text = message;
    this.status = status;
  }

  empty() {
    return this.text === '';
  }
}
