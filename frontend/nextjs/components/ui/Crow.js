import { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Crow = ({ wingSpan, gutter, children, ...styles }) => {
  const classes = classNames('crow', {
    auto: wingSpan && !Array.isArray(wingSpan),
    [`gutter-${gutter}`]: gutter,
    ...styles,
  });

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

Crow.propTypes = {
  wingSpan: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  gutter: PropTypes.number,
  children: PropTypes.any, // eslint-disable-line
  up: PropTypes.bool,
  right: PropTypes.bool,
  down: PropTypes.bool,
  left: PropTypes.bool,
  vertical: PropTypes.bool,
  horizontal: PropTypes.bool,
  debug: PropTypes.bool,
};

Crow.defaultProps = {
  wingSpan: undefined,
  gutter: undefined,
  children: null,
  up: false,
  right: false,
  down: false,
  left: false,
  vertical: false,
  horizontal: false,
  debug: false,
};

export default Crow;
