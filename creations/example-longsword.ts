import { Prefab } from 'att-string-transcoder';

/* Create a mythril longsword blade. */
const blade = new Prefab('Large_Longsword_Blade').setMaterial('Mythril');

/* Create a palladium guard and attach the blade. */
const guard = new Prefab('Guard')
  .setMaterial('CarsiAlloy')
  .addChildPrefab('Slot_SwordType_39370', blade);

/* Create a valyan pommel. */
const pommel = new Prefab('Pommel_Large_Square').setMaterial('EvinonSteelAlloy');

/* Create a handle and attach the guard and pommel. */
const handle = new Prefab('Handle_Short')
  .setMaterial('Redwood')
  .addChildPrefab('Slot_Multi_6138', guard)
  .addChildPrefab('Slot_Large_SwordType_Craft_54356', pommel);

/**
 * To get this save string, type: npm run encode creations/example-longsword.ts
 * The string will appear for you to copy paste into the ATT console.
 */
export default handle;

/**
 * It's possible export multiple creations from a file. This lets you easily make variants
 * of a creation.
 */
const handleWithDamagedBlade = handle.clone();

handleWithDamagedBlade
  .getChildPrefab('Guard')
  ?.setIntegrity(0.2)
  .getChildPrefab('Large_Longsword_Blade')
  ?.setIntegrity(0.2);

/**
 * To get this save string, type: npm run encode creations/example-longsword.ts damagedSword
 */
export const damagedSword = handleWithDamagedBlade; // Named export syntax.

const shortSword = handle.clone();

shortSword
  .clone()
  .getChildPrefab('Guard')
  ?.removeChildPrefab('Large_Longsword_Blade')
  .addChildPrefab('Slot_SwordType_39370', new Prefab('Short_Sword_Blade').setMaterial('Mythril'));

/**
 * To get this save string, type: npm run encode creations/example-longsword.ts shortSword
 */
export { shortSword }; // Alternative named export syntax.

/**
 * To get this save string, type: npm run encode creations/example-longsword.ts justTheBlade
 */
export const justTheBlade = handle
  .clone()
  .getChildPrefab('Guard')
  ?.getChildPrefab('Large_Longsword_Blade');
