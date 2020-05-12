import Icon from '../components/ui/Icon';
import Crow from '../components/ui/Crow';

const colors = {
  fire: '#e94949',
  water: '#5a79b0',
  void: '#aa41b6',
  nature: '#41b646',
  lightning: '#e0ed4a',
  frost: '#49d1e9',
  earth: '#c2733e',
};

export default ({ image, name, text, cost, index }) =>
  console.log(text) || (
    <div className='card'>
      <div className='inner'>
        <div
          className='background-image'
          style={{ backgroundImage: `url(${image})` }}
        />

        <div className='text-box'>
          <div className='image' style={{ backgroundImage: `url(${image})` }} />
          <div className='text'>{text}</div>
        </div>

        <div className='name'>{name}</div>
        <div className='type'>
          <Crow vertical gutter={4}>
            <Icon name='dungeon' size={30} color='#fff' />
            {cost.map((c, i) => (
              <div className='icon-cost' style={{ backgroundColor: colors[c] }}>
                <Icon
                  key={`cost_${i}`}
                  name={`element-${c}`}
                  color='#fff'
                  size={20}
                />
              </div>
            ))}
          </Crow>
        </div>
      </div>
      <div className='stats'>3 / 2 / 0</div>
      {/* <div className='attack'>
      3
      <Icon name='damage' size={30} color='silver' />
    </div>
    <div className='health'>
      2
      <Icon name='health' size={30} color='red' />
    </div>
    <div className='armor'>
      0
      <Icon name='armor' size={30} color='gray' />
    </div> */}
      <style jsx>{`
      .stats {
        position absolute;
        bottom: 6px;
        left: 0;
        right: 0;
        text-align: center;
        color: #fff;
        text-shadow: 0.5px 0.5px 0.5px rgba(0,0,0,0.9);
      }
      .attack,
      .health,
      .armor {
        position: absolute;
        bottom: -20px;
      }
      .attack {
        left: -10px;
      }
      .health {
        left: 0;
        right: 0;
        text-align: center;
      }
      .armor {
        right: -10px;
      }
      .name {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 8px 8px 6px 8px;
        color: #fff;
        text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.9);
        font-size: 18px;
        line-height: 18px;
        // background: linear-gradient(black, transparent);
        font-family: 'Volkhov';
        // text-transform: uppercase;
      }
      .icon-cost {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0.5px 0.5px 0.5px rgba(0,0,0,.9);
      }
      .type {
        position: absolute;
        top: 6px;
        right: 6px;
      }
      .text {
        position: relative;
      }
      .text-box {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px;
        color: #fff;
        font-size: 14px;
        line-height: 18px;
        font-family: 'Volkhov';
        text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.9);
      }
      .image {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background-position: center;
        background-size: cover;
        // mix-blend-mode: darken;
        filter: blur(10px);
      }
      .background-image {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-position: center;
        background-size: cover;
      }
      .card {
        position: relative;
        width: 200px;
        height: 300px;
        float: left;
        margin: 20px;
      }
      .inner {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        overflow: hidden;
      }
    `}</style>
    </div>
  );
