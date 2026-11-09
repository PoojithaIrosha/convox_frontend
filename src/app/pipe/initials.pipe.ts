import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
  transform(name: string | null | undefined, max = 2): string {
    if (!name?.trim()) return '?';
    return name
      .trim()
      .split(/\s+/)
      .slice(0, max)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}
