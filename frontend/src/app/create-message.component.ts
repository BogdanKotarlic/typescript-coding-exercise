import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { MessageService, Message } from './message.service';
import { MessageComponent } from './message.component';

@Component({
  selector: 'app-create-message',
  template: `
    <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <form (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label
            for="messageText"
            class="block text-sm font-medium text-gray-700"
            >Write Message</label
          >
          <textarea
            id="messageText"
            required
            [(ngModel)]="message.text"
            name="text"
            rows="4"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            [disabled]="message.status === 'pending'"
            class="w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            Send
          </button>
        </div>
      </form>
      <div *ngIf="!message.empty()" class="mt-4">
        <app-message [message]="message"></app-message>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    MessageComponent,
  ],
  providers: [MessageService],
})
export class CreateMessageComponent {
  @Output() messageSent = new EventEmitter<void>();

  message = new Message('', 'draft');

  constructor(private messageService: MessageService) {}

  async onSubmit() {
    this.message.status = 'pending';
    try {
      await this.messageService.add(this.message);
      this.message = new Message('', 'draft');
      this.messageSent.emit();
    } catch (error) {
      console.error('Error sending message:', error);
      this.message.status = 'failed';
    }
  }
}
