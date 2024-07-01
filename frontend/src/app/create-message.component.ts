import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { MessageService, Message } from './message.service';
import { MessageComponent } from './message.component';

@Component({
  selector: 'app-create-message',
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>
        <div>Write Message</div>
        <textarea required [(ngModel)]="message.text" name="text"></textarea>
      </label>
      <button type="submit" [disabled]="message.status === 'pending'">
        Send
      </button>
    </form>
    <app-message *ngIf="!message.empty()" [message]="message"></app-message>
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
  message = new Message('', 'draft');

  constructor(private messageService: MessageService) {}

  async onSubmit() {
    this.message.status = 'pending';
    await this.messageService.add(this.message);
    this.message = new Message('', 'draft');
  }
}
