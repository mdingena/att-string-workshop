import { Liquid } from 'att-liquids';

/**
 * Create a "liquid" prefab. This is an extension of ATT String Transcoder's Prefab class and has
 * several additional methods that make it easier to create custom potions and other liquids.
 *
 * @see https://github.com/mdingena/att-liquids
 */
const liquid = new Liquid('Potion_Medium');

/* Change the liquid's color. */
liquid.setColor('#2a455800');

/* Set the liquid's visual appearance. This also changes what the splash behaviour looks like. */
liquid.setVisualAppearance('VisionStewCooked');

/* Add effects that (de)buff the consumer. You can optionally pass a strength multiplier. */
liquid
  .addEffect('Feed', 2)
  .addEffect('Heal', 10)
  .addEffect('Nourish')
  .addEffect('SpeedIndirectEffect', 5);

/* Add food chunks to the liquid that can be seen when poured into a bowl, for example. */
liquid.addVisualChunk('Salt').addVisualChunk('BabuCooked').addVisualChunk('TomatoCooked');

/* Set the number of servings stored inside the container. */
liquid.setServings(42);

export default liquid;
