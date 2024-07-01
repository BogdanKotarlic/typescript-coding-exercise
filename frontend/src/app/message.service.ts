import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  async all() {
    const res = await fetch('http://localhost:3000/messages');
    const data = await res.json();
    const messages = data.messages.map(
      (message: any) => new Message(message.message, 'received')
    );
    this.messagesSubject.next(messages);
  }

  async add(message: Message) {
    const res = await fetch('http://localhost:3000/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer valid-token',
      },
      body: JSON.stringify({ message: message.text, user: 'User1' }),
    });

    const data = await res.json();
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([
      ...currentMessages,
      new Message(data.message, data.status),
    ]);
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
