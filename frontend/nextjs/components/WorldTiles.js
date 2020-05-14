export default ({ tiles, TILE_SIZE }) => (
  <>
    {tiles.map(({ x, y, index }) => (
      <div key={`tile_${x}_${y}`} className='tile'>
        {x}, {y}
      </div>
    ))}
    <style jsx>
      {`
        .tile {
          width: ${TILE_SIZE}px;
          height: ${TILE_SIZE}px;
        }
      `}
    </style>
    <style jsx>{`
      .tile {
        background: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        color: #fff;
        background-image: url(./static/1.png);
      }
    `}</style>
  </>
);
