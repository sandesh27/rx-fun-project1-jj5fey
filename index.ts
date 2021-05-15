import { fromEvent, combineLatest } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

console.clear();

const rangeEl: HTMLInputElement = document.querySelector('input[name=range]');
const rangeValueEl: HTMLInputElement = document.querySelector('.range-value');
const doubledValueEl: HTMLInputElement = document.querySelector(
  '.doubled-value'
);

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
