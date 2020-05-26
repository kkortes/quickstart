import CONTEXTS from '../constants/CONTEXTS';
import { writable } from 'svelte/store';

const fromCenter = writable(CONTEXTS.fromCenter);

export { fromCenter };
