import { Circuit, createOperator } from 'att-circuits';
import { Prefab } from 'att-string-transcoder';

/**
 * Create puzzle prefabs. When you're creating real puzzles, you probably want to spawn these in
 * your server using Prefabulator. Once you've positioned and oriented all your puzzle prefabs how
 * you like them, you `select tostring` them and create them in your Workshop using
 *
 *   const lever = Prefab.fromSaveString<'MRK_Small_Lever'>(yourLeverSaveStringHere);
 *
 * The following example uses `new Prefab` syntax and sets a fake position for illustration
 * purposes.
 */
const lever1 = new Prefab('MRK_Small_Lever').setPosition({ x: 3, y: 0, z: 3 });
const lever2 = new Prefab('MRK_Small_Lever').setPosition({ x: -3, y: 0, z: 3 });
const door = new Prefab('MRK_gate_02').setPosition({ x: -3, y: 0, z: -3 });

/* Create a 'Logic_Operator' prefab configured with an "exlusive OR" logic operation. */
const xorOperator = createOperator('Xor');

/* Create a new Circuit instance. Consider this your puzzle's "parent" object. */
const circuit = new Circuit();

/**
 * Connect your lever prefabs to the XOR logic operator prefab. This particular configuration lets
 * you operate the door with EITHER lever. If the logic operator was an "AND" operator, then you
 * would have to throw BOTH lever before the door will open.
 *
 * @see https://en.wikipedia.org/wiki/Boolean_algebra#Boolean_operations
 */
circuit.createWire('boolean').connect(lever1, xorOperator);
circuit.createWire('boolean').connect(lever2, xorOperator);

/**
 * Connect the XOR logic operator prefab to your door prefab. Whenever the logic operator sends a
 * `true` signal, the door will open. When it sends a `false` signal, the door will close.
 */
circuit.createWire('boolean').connect(xorOperator, door);

/**
 * Set the world coordinates for the 'Logic_Context' prefab of your circuit. This is the parent
 * prefab for all other prefabs you've added to the circuit. When spawning the circuit using
 *
 *   spawn string-raw <SaveString>
 *
 * the given origin's world position will be used to spawn the parent prefab and all its children.
 *
 * If you are using save strings to create your puzzle prefabs (as explained in the first step),
 * then it is strongly advised you call `setOrigin` using one of those prefabs (it doesn't matter
 * which one). This will ensure that when you replace the loose prefabs with this "wired up" circuit,
 * that all prefabs will spawn in the exact same location.
 *
 * You can also spawn the circuit using
 *
 *   spawn string <Username> <SaveString>
 *
 * but this will spawn the origin prefab in front of you and position all children relative to that
 * prefab.
 *
 * You MUST set an origin, otherwise you risk spawning your circuit at 0,0,0 (at the map's centre,
 * below the terrain).
 */
circuit.setOrigin(door);

/**
 * Convert the circuit to a regular ATT String Transcoder Prefab. This will give you access to all
 * the usual methods available on Prefab instances, including `toSaveString()`.
 *
 * Conversion is one-way. Once converted, you can no longer modify this Circuit instance.
 */
const prefab = circuit.toPrefab();

export default prefab;
