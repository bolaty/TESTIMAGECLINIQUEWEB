import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appImageSrc]',
})
export class ImageSrcDirective implements OnChanges {
  @Input() appImageSrc: string = '';

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appImageSrc'] && this.appImageSrc) {
      this.updateImageSource(this.appImageSrc);
      this.cdr.detectChanges(); // Forcer la détection des changements
    }
  }

  private updateImageSource(src: string) {
    const imgElement = this.el.nativeElement as HTMLImageElement;
    imgElement.src = src; // met a jour lattribut "src" de limage
  }
}
