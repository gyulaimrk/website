import { Component, computed, input } from '@angular/core';

export type CodeValue = string | readonly string[] | boolean;
export interface CodeEntry {
  key: string;
  value: CodeValue;
}

/** Kotlin-kódablak: kulcs-érték párokból felépített `Developer(...)` példány, színezett tokenekkel. */
@Component({
  selector: 'app-code-window',
  templateUrl: './code-window.html',
  styleUrl: './code-window.scss',
})
export class CodeWindow {
  readonly fileName = input('Developer.kt');
  readonly entries = input.required<readonly CodeEntry[]>();

  protected readonly lines = computed(() =>
    this.entries().map((entry) => ({
      key: entry.key,
      kind: Array.isArray(entry.value)
        ? 'list'
        : typeof entry.value === 'boolean'
          ? 'bool'
          : 'text',
      value: entry.value,
    })),
  );

  protected asList(value: CodeValue): readonly string[] {
    return Array.isArray(value) ? value : [];
  }
}
