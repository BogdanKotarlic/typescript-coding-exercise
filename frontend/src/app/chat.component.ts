import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { MessageComponent } from './message.component';
import { CreateMessageComponent } from './create-message.component';

@Component({
  selector: 'app-chat',
  template: `
    <div class="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
      <div class="mb-4">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">
          Chat Room
        </h1>
        <app-create-message
          (messageSent)="onMessageSent()"
        ></app-create-message>
      </div>
      <div class="space-y-4">
        <div
          *ngFor="let message of messages$ | async; let i = index"
          class="bg-white p-4 rounded-lg shadow-md"
        >
          <app-message [message]="message"></app-message>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MessageComponent, CreateMessageComponent],
  providers: [MessageService],
})
export class ChatComponent implements OnInit {
  messages$ = this.messageService.messages$;

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.messageService.all();
    this.messages$.subscribe((messages) => {
      console.log('Messages updated in ChatComponent:', messages);
      this.cdr.detectChanges();
    });
  }

  onMessageSent() {
    this.messageService.all();
  }
}
