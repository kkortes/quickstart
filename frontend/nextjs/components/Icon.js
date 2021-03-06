const Icon = ({ name, size, color }) => (
  <span className={`icon-${name} icon ${name}`}>
    <style jsx>
      {`
        .icon {
          color: ${color};
          font-size: ${size}px;
          line-height: ${size}px;
          display: inline-block;
          text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.35);
        }
      `}
    </style>
  </span>
);

export default Icon;
