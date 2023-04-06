import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'appFileAsImage',
  standalone: true,
})
export class FileToObjectUrlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);
  transform(value: File) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(value));
  }
}
