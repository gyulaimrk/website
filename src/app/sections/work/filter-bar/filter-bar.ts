import { Component, input, model } from '@angular/core';

/** Egyetlen választható szűrő; ugyanarra kattintva a szűrés megszűnik. */
@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
})
export class FilterBar {
  readonly options = input.required<readonly string[]>();
  readonly selected = model<string | null>(null);

  protected toggle(option: string) {
    this.selected.update((current) => (current === option ? null : option));
  }
}
