import { readable } from 'svelte/store';
import socketClient from '../common/socketClient.js';

const key = Symbol();

const socket = readable(socketClient);

export { key, socket };
