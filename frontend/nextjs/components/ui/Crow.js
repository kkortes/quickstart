import { Children } from 'react';

const Crow = ({ wingSpan, gutter, children, ...styles }) => {
  const classes = `crow ${wingSpan && !Array.isArray(wingSpan) ? 'auto' : ''} ${
    gutter ? `gutter-${gutter}` : ''
  } ${Object.keys(styles).reduce((a, key) => `${a} ${key}`, '')}`;

  const { vertical, horizontal } = styles;
  return (
    <div className={classes}>
      {Children.map(children, (child, index) => (
        <div
          {...(wingSpan && Array.isArray(wingSpan)
            ? { style: { flex: wingSpan[index] } }
            : {})}
        >
          {typeof child === 'string' ? <>{child}</> : child}
        </div>
      ))}
      <style jsx>
        {`
          .crow {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
          }
          .crow > * {
            display: flex;
          }
          .auto > * {
            flex: 1;
          }
          .horizontal {
            flex-direction: row;
            flex-wrap: wrap;
            height: 100%;
          }
          .horizontal > div {
            height: 100%;
          }
          .vertical {
            flex-direction: column;
            display: inline-flex;
            width: 100%;
          }
          .vertical > div {
            width: 100%;
          }
        `}
      </style>
      <style jsx>
        {`
          .debug > div:nth-child(1) { background: gainsboro; }
          .debug > div:nth-child(2) { background: silver; }
          .debug > div:nth-child(3) { background: gray; }
          .debug > div:nth-child(4) { background: dimgray; }
          .debug > div:nth-child(5) { background: black; }
          .gutter-${gutter} {
            ${horizontal ? `margin: 0 -${gutter}px;` : ''}
            ${vertical ? `margin: -${gutter}px 0;` : ''}
            ${!vertical && !horizontal ? `margin: -${gutter}px;` : ''}
          }
          .gutter-${gutter} > * {
            ${horizontal ? `padding: 0 ${gutter}px;` : ''}
            ${vertical ? `padding: ${gutter}px 0;` : ''}
            ${!vertical && !horizontal ? `padding: ${gutter}px;` : ''}
          }
          .crow > * {
            ${horizontal ? 'height: 100%;' : ''}
            ${vertical ? 'width: 100%;' : ''}
          }
          .up {
            ${!vertical ? 'align-items: flex-start;' : ''}
            ${vertical ? 'justify-content: flex-start;' : ''}
          }
          .down {
            ${!vertical ? 'align-items: flex-end;' : ''}
            ${vertical ? 'justify-content: flex-end;' : ''}
          }
          .right {
            ${!vertical ? 'justify-content: flex-end;' : ''}
            ${vertical ? 'align-items: flex-end;' : ''}
          }
          .left {
            ${!vertical ? 'justify-content: flex-start;' : ''}
            ${vertical ? 'align-items: flex-start;' : ''}
          }
        `}
      </style>
    </div>
  );
};

export default Crow;
