import Card from './Card';
import { times } from 'lodash';

const cards = [
  {
    name: 'Armorillo',
    text: '',
    cost: ['earth', 'earth', 'nature'],
  },
  {
    name: 'Breff',
    text: '',
    cost: ['frost', 'frost'],
  },
  {
    name: 'Cerberus',
    text: (
      <>
        When this creature enters the battlefield:
        <br />
        Deal 2 damage to any target.
      </>
    ),
    cost: ['fire', 'fire'],
  },
  {
    name: 'Snapjaw',
    text: '',
    cost: ['water', 'water'],
  },
  {
    name: 'Cackler',
    text: '',
    cost: ['void', 'void'],
  },
  {
    name: 'Demon',
    text: '',
    cost: ['fire', 'void'],
  },
  {
    name: 'Bear',
    text: '',
    cost: ['nature'],
  },
  {
    name: 'Dragon',
    text: (
      <>
        Tap this creature:
        <br />
        Deal 2 damage to any target.
      </>
    ),
    cost: ['fire', 'fire'],
  },
  {
    name: 'Ember fiend',
    text: '',
    cost: ['fire', 'fire'],
  },
  {
    name: 'Ettlök',
    text: '',
    cost: ['void', 'void'],
  },
  {
    name: 'Blök',
    text: '',
    cost: ['void', 'fire'],
  },
  {
    name: 'Wyn',
    text: '',
    cost: ['fire', 'fire'],
  },
  {
    name: 'Fire Elemental',
    text: '',
    cost: ['fire', 'fire', 'fire'],
  },
  {
    name: 'Ragnar God of Fire',
    text: '',
    cost: ['earth', 'fire'],
  },
  {
    name: 'Nature Dragon',
    text: '',
    cost: ['nature', 'nature'],
  },
  {
    name: 'Frost Dragon',
    text: '',
    cost: ['frost', 'frost'],
  },
  {
    name: 'Kyl God of Frost',
    text: '',
    cost: ['frost', 'frost'],
  },
  {
    name: 'Hexapus',
    text: '',
    cost: ['water', 'water'],
  },
  {
    name: 'Boar',
    text: '',
    cost: ['nature', 'fire', 'frost', 'void', 'earth', 'lightning', 'water'],
  },
];

const fakeCards = times(19, (index) => ({
  image: `./static/creatures/${index}.jpg`,
  index,
  ...cards[index],
}));

export default () => (
  <div className='card-page'>
    {fakeCards.map((card) => (
      <Card {...card} />
    ))}
    <style jsx>{`
      .card-page {
      }
    `}</style>
  </div>
);
