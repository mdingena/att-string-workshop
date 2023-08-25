import { Liquid } from 'att-liquids';

const liquid = new Liquid('Potion_Medium');

liquid
  .setColor('#2a455800')
  .setVisualAppearance('VisionStewCooked')
  .addEffect('Feed', 2)
  .addEffect('Heal', 10)
  .addEffect('Nourish')
  .addEffect('SpeedIndirectEffect', 5)
  .addVisualChunk('Salt')
  .addVisualChunk('BabuCooked')
  .addVisualChunk('TomatoCooked')
  .setServings(42);

export default liquid;
