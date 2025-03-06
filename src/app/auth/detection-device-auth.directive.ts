import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDetectionDeviceAuth]',
})
export class DetectionDeviceAuthDirective implements OnInit {
  @Input() visible_sur: 'mobile' | 'tablette' | 'desktop' = 'desktop'; // par défaut sur desktop

  constructor(private l_element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const screenWidth = window.innerWidth;
    let deviceType = this.getDeviceType(screenWidth);

    if (deviceType !== this.visible_sur) {
      // cacher l'élément si le type de device ne correspond pas
      this.renderer.setStyle(this.l_element.nativeElement, 'display', 'none');
    }
  }

  private getDeviceType(
    screenWidth: number
  ): 'mobile' | 'tablette' | 'desktop' {
    console.log('taile du device', screenWidth);
    if (screenWidth < 768) {
      return 'mobile';
    } else if (screenWidth >= 768 && screenWidth <= 1024) {
      return 'tablette';
    } else {
      return 'desktop';
    }
  }
}
