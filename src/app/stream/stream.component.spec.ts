import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StreamComponent } from './stream.component';
import { MockWebSocketService } from '../core/webSocket.service.mock';

describe('StreamComponent', () => {
  let component: StreamComponent;
  let fixture: ComponentFixture<StreamComponent>;
  let mockWebSocketService: MockWebSocketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'test-channel' }) } },
        { provide: MockWebSocketService, useClass: MockWebSocketService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamComponent);
    component = fixture.componentInstance;
    mockWebSocketService = TestBed.inject(MockWebSocketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should connect to WebSocket and receive messages', () => {
    spyOn(mockWebSocketService, 'connect').and.callThrough();
    component.ngAfterViewInit();

    const wsMock = mockWebSocketService.connect('ws://localhost:9780', 'test-channel') as any;

    expect(mockWebSocketService.connect).toHaveBeenCalledWith('ws://localhost:9780', 'test-channel');

    const mockMessage = new Blob([new Uint8Array([1, 2, 3, 4]).buffer]);
    wsMock.simulateOpen();
    wsMock.simulateMessage(mockMessage);


    expect(component.sourceBuffer).toBeDefined();
  });
});
