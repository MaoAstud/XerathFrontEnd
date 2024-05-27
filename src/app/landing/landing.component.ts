import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  @Output() btnLogin = new EventEmitter();
  @Output() btnPage = new EventEmitter();

  llamarLogin(){
    this.btnLogin.emit();
  }

  llamarPage(){
    this.btnPage.emit();
  }

  @ViewChild('carousel') carousel!: ElementRef;
  currentIndex: number = 0;
  intervalId: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel(): void {
    const carouselImages = this.carousel.nativeElement.querySelectorAll('.carousel-image');
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % carouselImages.length;
      this.updateCarousel(carouselImages);
    }, 5000); // Cambia la imagen cada 5 segundos

    this.updateCarousel(carouselImages); // Inicializa el carrusel
  }

  updateCarousel(carouselImages: NodeListOf<Element>): void {
    carouselImages.forEach((img, index) => {
      if (index === this.currentIndex) {
        this.renderer.addClass(img, 'active');
      } else {
        this.renderer.removeClass(img, 'active');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
