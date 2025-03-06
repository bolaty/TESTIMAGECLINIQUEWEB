import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';

@Directive({
  selector: '[appDatetimepicker]',
})
export class DatetimepickerDirective implements OnInit {
  @Input('appDatetimepicker') options: Record<string, any> = {};

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    flatpickr(this.el.nativeElement, {
      ...this.options,
      locale: French, // definir la langue en français
    });
  }
}
