import { getContext, onMount } from 'svelte';
import { writable, derived } from 'svelte/store';

const width = writable(window.innerWidth);
const height = writable(window.innerHeight);
const pixelRatio = writable(window.devicePixelRatio);
const context = writable();
const canvas = writable();
const time = writable(0);

const key = Symbol();

const renderable = (render) => {
  const api = getContext(key);
  const element = {
    ready: false,
    mounted: false,
  };
  if (typeof render === 'function') element.render = render;
  else if (render) {
    if (render.render) element.render = render.render;
    if (render.setup) element.setup = render.setup;
  }
  api.add(element);
  onMount(() => {
    element.mounted = true;
    return () => {
      api.remove(element);
      element.mounted = false;
    };
  });
};

const deriveObject = (obj) => {
  const keys = Object.keys(obj);
  const list = keys.map((key) => {
    return obj[key];
  });
  return derived(list, (array) => {
    return array.reduce((dict, value, i) => {
      dict[keys[i]] = value;
      return dict;
    }, {});
  });
};

const props = deriveObject({
  context,
  canvas,
  width,
  height,
  pixelRatio,
  time,
});

export {
  key,
  width,
  height,
  pixelRatio,
  context,
  canvas,
  time,
  props,
  renderable,
};
