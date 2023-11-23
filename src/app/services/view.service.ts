import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  public sideNavVisibility$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private constructor(private breakpontObserver: BreakpointObserver) {}

  public isMobile$(): Observable<boolean> {
    return this.breakpontObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches));
  }

  public toggleSideNavVisibility(): void {
    this.sideNavVisibility$.next(!this.sideNavVisibility$.value);
  }
}
