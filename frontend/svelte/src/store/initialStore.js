import { EQUIPMENT, STATS } from '../constants/INITIALS.js';
import socket from '../common/socket.js';

export default {
  socket,
  token: '',
  enitityInfo: undefined,
  worldTier: 1,
  fromCenter: {
    vertical: 0,
    horizontal: 0,
    x: 0,
    y: 0,
  },
  drops: [],
  account: {
    username: '',
    equipment: EQUIPMENT,
    stats: STATS,
    picks: [],
    position: {
      x: 0,
      y: 0,
    },
  },
  notifications: [],
  points: 1,
};
