import { Component, computed, input, linkedSignal } from '@angular/core';
import { CodeFile } from '../../data/models';
import { highlight } from './highlight';

/** Kódablak fülekkel: több fájl között lehet váltani, a kód színezve jelenik meg. */
@Component({
  selector: 'app-code-window',
  templateUrl: './code-window.html',
  styleUrl: './code-window.scss',
})
export class CodeWindow {
  readonly files = input.required<readonly CodeFile[]>();
  /** A kiválasztott fül; új fájllista esetén az elsőre áll vissza. */
  protected readonly active = linkedSignal<readonly CodeFile[], number>({
    source: this.files,
    computation: () => 0,
  });
  protected readonly current = computed(() => this.files()[this.active()]);
  protected readonly lines = computed(() =>
    highlight(this.current().code, this.current().language),
  );

  protected select(index: number) {
    this.active.set(index);
  }

  /** Nyilakkal lehet fülek között lépni (Home/End a szélekre). */
  protected onKeydown(event: KeyboardEvent) {
    const last = this.files().length - 1;
    const moves: Record<string, number> = {
      ArrowRight: Math.min(this.active() + 1, last),
      ArrowLeft: Math.max(this.active() - 1, 0),
      Home: 0,
      End: last,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    this.select(moves[event.key]);
    (event.currentTarget as HTMLElement)
      .querySelectorAll<HTMLElement>('[role="tab"]')
      [this.active()]?.focus();
  }
}
