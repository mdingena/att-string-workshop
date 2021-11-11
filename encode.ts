import { createPrefab, Prefab } from 'att-string-transcoder';

/* Create a damaged mythril longsword blade. */
const blade = createPrefab(Prefab.Large_Longsword_Blade)
  .setMaterial('Mythril')
  .setIntegrity(0.2);

/* Create a damaged palladium guard and attach the blade. */
const guard = createPrefab(Prefab.Guard)
  .setMaterial('CarsiAlloy')
  .setIntegrity(0.2)
  .useSlot('Slot_SwordType', blade);

/* Create a valyan pommel. */
const pommel = createPrefab(Prefab.Pommel_Large_Square)
  .setMaterial('EvinonSteelAlloy');

/* Create a handle and attach the guard and pommel. */
const handle = createPrefab(Prefab.Handle_Short)
  .setMaterial('Redwood')
  .useSlot('Slot_Large_SwordType_Craft_1', guard)
  .useSlot('Slot_PommelType_2', pommel)

/* Print the handle's string (which includes all of the slotted prefabs). */
handle.print();

/**
 * To get the string, Node needs to run this file.
 * The string will be printed in the same terminal that calls this script.
 * 
 * In your VS Code terminal, type: npm run encode
 * 
 * The string will appear for you to copy paste into the ATT console.
 */
