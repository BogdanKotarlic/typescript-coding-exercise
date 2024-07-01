import { Component, Input } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  template: `
    <div class="message" [ngClass]="message.status">
      <span>{{ message.text }}</span>
      <span class="status">{{ message.status }}</span>
    </div>
  `,
  styles: [
    `
      .message {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #ccc;
      }
      .status {
        font-size: 0.8em;
        color: gray;
      }
      .sent {
        color: green;
      }
      .received {
        color: blue;
      }
    `,
  ],
  standalone: true,
  imports: [NgClass, CommonModule],
})
export class MessageComponent {
  @Input() message: any;
}
