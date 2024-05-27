import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  historyItems: any[] = [
    { name: 'Live 1', description: 'Description for Live 1', image: 'live_image1.jpg', watchedAt: '2024-05-19 10:00' },
    { name: 'Live 2', description: 'Description for Live 2', image: 'live_image2.jpg', watchedAt: '2024-05-18 15:00' },
    // Añade más ítems de historial según sea necesario
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    // Lógica para cargar el historial, si es necesario
  }
}
