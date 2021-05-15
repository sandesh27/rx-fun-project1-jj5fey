import { fromEvent, interval, animationFrameScheduler } from 'rxjs';
import { map, startWith, tap, observeOn } from 'rxjs/operators';

console.clear();

const rangeEl: HTMLInputElement = document.querySelector('#range');
const rangeValueEl: HTMLInputElement = document.querySelector('.range-value');
const doubledValueEl: HTMLInputElement = document.querySelector(
  '.doubled-value'
);

const intervals = interval(10);

const range$ = fromEvent(rangeEl, 'input').pipe(
  map(e => e.target.value),
  startWith(rangeEl.value),
  tap(val => (rangeValueEl.innerText = val))
);

const double$ = range$.pipe(
  map(val => val * 2),
  tap(val => (doubledValueEl.innerText = val))
);

const doubleSubcription = double$.subscribe();

intervals
  .pipe(
    observeOn(animationFrameScheduler) // ...but we will observe on animationFrame
  ) // scheduler to ensure smooth animation.
  .subscribe(val => {
    rangeEl.value = val + 1;
  });
