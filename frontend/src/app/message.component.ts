import { Component, Input } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  template: `
    <div
      class="flex justify-between items-center p-4 border-b border-gray-300"
      [ngClass]="{
        'bg-green-100': message.status === 'sent',
        'bg-blue-100': message.status === 'received'
      }"
    >
      <div class="text-gray-700">
        {{ message.text }}
      </div>
      <div
        class="text-sm font-semibold"
        [ngClass]="{
          'text-green-600': message.status === 'sent',
          'text-blue-600': message.status === 'received'
        }"
      >
        {{ message.status }}
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgClass, CommonModule],
})
export class MessageComponent {
  @Input() message: any;
}
