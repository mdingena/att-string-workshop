import { Circuit, createOperator } from 'att-circuits';
import { Prefab } from 'att-string-transcoder';

const lever1 = new Prefab('MRK_Small_Lever').setPosition({ x: 3, y: 0, z: 3 });
const lever2 = new Prefab('MRK_Small_Lever').setPosition({ x: -3, y: 0, z: 3 });
const door = new Prefab('MRK_gate_02').setPosition({ x: -3, y: 0, z: -3 });

const xorOperator = createOperator('Xor');

const circuit = new Circuit();

circuit.createWire('boolean').connect(lever1, xorOperator);
circuit.createWire('boolean').connect(lever2, xorOperator);
circuit.createWire('boolean').connect(xorOperator, door);

circuit.setOrigin(door);

const prefab = circuit.toPrefab();

export default prefab;
