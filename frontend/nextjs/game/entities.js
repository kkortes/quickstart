import randomNumber from '../common/randomNumber';
import mainHandWeapons from '../content/mainHand';
import { getGlobal } from 'reactn';

const entityOnLocation = (x, y) => {
  const {
    worldTier,
    account: { picks },
  } = getGlobal();

  if (picks.includes(`${x}${y}${worldTier}`)) return {};

  const entity =
    randomNumber(0, 99, `${x}_${y}_item`) === 0
      ? {
          ...mainHandWeapons[
            randomNumber(0, mainHandWeapons.length - 1, `${x}_${y}_weapon`)
          ],
          tier: worldTier,
        }
      : {};

  return entity;
};

const getEntity = ({ id, ref }) => {
  const { worldTier } = getGlobal();

  return {
    ...mainHandWeapons.find((entity) => entity.ref === ref),
    id,
    tier: worldTier,
  };
};

export { entityOnLocation, getEntity };
