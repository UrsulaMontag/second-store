import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  constructor(private breakpontObserver: BreakpointObserver) {}

  public isMobile(): Observable<boolean> {
    return this.breakpontObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches));
  }
}
