import { Component, computed, input } from '@angular/core';
import { Study } from '../../../data/models';

/** One study or certificate in the list: title (as a link, if it has an address), issuer, date, description. */
@Component({
  selector: 'li[appStudyItem]',
  templateUrl: './study-item.html',
  styleUrl: './study-item.scss',
})
export class StudyItem {
  readonly study = input.required<Study>();

  /** The issuer and the date on one line; whatever is missing is left out. */
  protected readonly meta = computed(() =>
    [this.study().where, this.study().period].filter(Boolean).join(', '),
  );
}
