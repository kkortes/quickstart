import { writable } from 'svelte/store';

const key = Symbol();

const fromCenter = writable({
  x: 0,
  y: 0,
  horizontal: 0,
  vertical: 0,
});

export { key, fromCenter };
