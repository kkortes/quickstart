<script>
  import { setContext, onMount } from "svelte";
  import {
    key,
    width,
    height,
    pixelRatio,
    canvas as canvasStore,
    context as contextStore,
    props,
    time
  } from "../game/game.js";

  let frame,
    canvas,
    context,
    listeners = [],
    killLoopOnError = true;

  const createLoop = fn => {
    let elapsed = 0;
    let lastTime = performance.now();
    (function loop() {
      frame = requestAnimationFrame(loop);
      const beginTime = performance.now();
      const dt = (beginTime - lastTime) / 1000;
      lastTime = beginTime;
      elapsed += dt;
      fn(elapsed, dt);
    })();
    return () => {
      cancelAnimationFrame(frame);
    };
  };

  const render = dt => {
    context.save();
    context.scale($pixelRatio, $pixelRatio);
    listeners.forEach(entity => {
      try {
        if (entity.mounted && entity.ready && entity.render) {
          entity.render($props, dt);
        }
      } catch (err) {
        console.error(err);
        if (killLoopOnError) {
          cancelAnimationFrame(frame);
          console.warn("Animation loop stopped due to an error");
        }
      }
    });
    context.restore();
  };

  onMount(() => {
    context = canvas.getContext("2d", {});
    $canvasStore = canvas;
    $contextStore = context;

    listeners.forEach(async entity => {
      if (entity.setup) {
        let p = entity.setup($props);
        if (p && p.then) await p;
      }
      entity.ready = true;
    });

    return createLoop((elapsed, dt) => {
      $time = elapsed;
      render(dt);
    });
  });

  setContext(key, {
    add(fn) {
      this.remove(fn);
      listeners.push(fn);
    },
    remove(fn) {
      const idx = listeners.indexOf(fn);
      if (idx >= 0) listeners.splice(idx, 1);
    }
  });

  const handleResize = () => {
    $width = window.innerWidth;
    $height = window.innerHeight;
    $pixelRatio = window.devicePixelRatio;
  };
</script>

<canvas
  bind:this={canvas}
  width={$width + $pixelRatio}
  height={$height + $pixelRatio} />
<svelte:window on:resize|passive={handleResize} />
<slot />
