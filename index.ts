import { fromEvent, interval, asyncScheduler } from 'rxjs';
import { map, startWith, tap, observeOn } from 'rxjs/operators';

console.clear();

const rangeEl: HTMLInputElement = document.querySelector('#range');
const rangeValueEl: HTMLInputElement = document.querySelector('.range-value');
const doubledValueEl: HTMLInputElement = document.querySelector(
  '.doubled-value'
);

const intervals = interval(10);

intervals
  .pipe(
    observeOn(asyncScheduler),
    tap(val => {
      const range$ = fromEvent(rangeEl, 'change').pipe(
        map(e => e.target.value),
        startWith(rangeEl.value),
        tap(val => (rangeValueEl.innerText = val))
      );
      const double$ = range$.pipe(
        map(val => val * 2),
        tap(val => (doubledValueEl.innerText = val))
      );
      double$.subscribe();
    })
  )
  .subscribe(val => {
    if (val < 100) {
      rangeEl.value = val + 1;
    }
  });
