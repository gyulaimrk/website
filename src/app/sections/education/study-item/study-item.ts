import { Component, computed, input } from '@angular/core';
import { Study } from '../../../data/models';

/** Egy tanulmány vagy tanúsítvány a listában: cím (linkként, ha van címe), kiállító, dátum, leírás. */
@Component({
  selector: 'li[appStudyItem]',
  templateUrl: './study-item.html',
  styleUrl: './study-item.scss',
})
export class StudyItem {
  readonly study = input.required<Study>();

  /** A kiállító és a dátum egy sorban; ami hiányzik, azt kihagyja. */
  protected readonly meta = computed(() =>
    [this.study().where, this.study().period].filter(Boolean).join(', '),
  );
}
