import { Component, OnInit } from '@angular/core';
import { NgForOf, CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { MessageComponent } from './message.component';

@Component({
  selector: 'app-chat',
  template: `
    <div *ngFor="let message of messages$ | async; let i = index">
      <app-message [message]="message"></app-message>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, NgForOf, MessageComponent],
  providers: [MessageService],
})
export class ChatComponent implements OnInit {
  messages$ = this.messageService.messages$;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.all();
  }
}
