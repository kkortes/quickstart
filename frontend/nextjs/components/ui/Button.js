import PropTypes from 'prop-types';

const borderColor = '#1eadfa';
const primaryBorderColor = '#1eadfa';
const primaryTextColor = '#fff';

const Button = ({
  onClick,
  text,
  children,
  ghost,
  primary,
  disabled,
  ...props
}) => (
  <button
    className={`${ghost ? 'ghost' : ''} ${primary ? 'primary' : ''}`}
    onClick={onClick}
    type='submit'
    {...props}
    disabled={disabled}
  >
    {children}
    {text}
    <style jsx>
      {`
          button {
            display: inline-flex;
            flex: 1;
            border: 1px solid ${borderColor};
            outline: 0;
            height: 30px;
            justify-content: center;
            align-items: center;
            border-radius: 2px;
            font-size: 1.6rem;
            color: ${borderColor};
            transition: color 0.05s ease, background-color 0.15s ease;
            padding-left: 8px;
            padding-right: 8px;
            background: none;
          }
          button > :global(.icon) {
            ${text ? 'margin-right: 8px;' : ''}
            color: ${borderColor};
          }
          button:hover {
            background-color: ${borderColor};
            color: #fff;
          }
          button:hover > :global(.icon) {
            color: #fff;
          }
          button:active:not(:disabled) {
            transform: translate(1px, 1px);
          }
          button.ghost {
            border-color: transparent;
          }
          button.ghost:hover {
            background-color: transparent;
            color: ${borderColor};
          }
          button.ghost:hover > :global(.icon) {
            color: ${borderColor};
          }
          button.primary {
            border-color: ${primaryBorderColor};
            background-color: ${primaryBorderColor};
            color: ${primaryTextColor};
          }
          button.primary > :global(.icon) {
            color: ${primaryTextColor};
          }
          button.primary:hover:not(:disabled) {
          }
          button:disabled {
            background: #fafafa;
            border-color: #eee;
            color: #d3d3d3 !important;
            text-decoration: none !important;
            pointer-events: none;
          }
          button:disabled.ghost {
            background: none;
            border-color: transparent;
          }
          button:disabled > :global(.icon) {
            color: #d3d3d3 !important;
          }
          button:disabled:hover {
            cursor: not-allowed;
          }
        `}
    </style>
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  ghost: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  text: '',
  ghost: false,
  disabled: false,
};

export default Button;
