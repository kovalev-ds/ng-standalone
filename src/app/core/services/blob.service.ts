import { Injectable } from '@angular/core';
import { Observable, fromEvent, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlobService {
  public toBase64(blob: Blob | File): Observable<string> {
    return new Observable((subscriber) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      fromEvent(reader, 'load')
        .pipe(take(1))
        .subscribe(() => {
          subscriber.next(reader.result as string);
          subscriber.complete();
        });
    });
  }

  public async toFile(base46: string, name: string) {
    return fetch(base46)
      .then((res) => res.blob())
      .then((blob) => new File([blob], name, { type: blob.type }));
  }
}
