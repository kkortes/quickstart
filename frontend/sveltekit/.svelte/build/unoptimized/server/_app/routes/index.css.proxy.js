// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ":root{font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif}main.svelte-i4crzb{text-align:center;padding:1em;margin:0 auto}h1.svelte-i4crzb{color:#ff3e00;text-transform:uppercase;font-size:4rem;font-weight:100;line-height:1.1;margin:4rem auto;max-width:14rem}p.svelte-i4crzb{max-width:14rem;margin:2rem auto;line-height:1.35}@media(min-width: 480px){h1.svelte-i4crzb{max-width:none}p.svelte-i4crzb{max-width:none}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}