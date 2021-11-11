![ATT String Workshop](./screenshot.png)

# ATT String Workshop

Template project for working with _A Township Tale_'s save string system. Allows easy creation of string weapons.

## 🚧 Prerequisites

This document assumes you're running this project in a Windows environment.

- `node` + `npm` ([download](https://nodejs.org/en/download/))
- VS Code ([download](https://code.visualstudio.com/))

## ⚡️ Quick Start

1. [Download this project](https://github.com/mdingena/att-string-workshop/archive/refs/heads/main.zip) (`.zip` file).
1. Unzip the file.
1. Open the unzipped directory with VS Code.
1. Hit <kbd>Ctrl</kbd> + <kbd>`</kbd> to open the terminal.
1. Install **ATT String Workshop** by typing `npm install` on the command line.
1. Open the `encode.ts` file in the project and create your weapon or contraption.
1. ⚠️ Don't forget to save the file when you're done making changes! You can hit <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.
1. In the terminal, type `npm run encode` on the command line.
1. Your string will appear in the terminal for you to copy and paste!

## Understanding `createPrefab`

Starting with the very basics, you can create a string for a handle using this code:

```js
createPrefab(Prefab.Handle_Short).print()
```

Running this code will print the string you can use to spawn a weapon handle.
You'll include this string in a spawn command that looks like this:

```css
spawn string EthynWyrmbane [string]
```

But so far, this is just a really complicated way of spawning a handle. The point of strings is that you can spawn intricate contraptions that regular spawn commands can't.

Let's change this handle's material:

```js
createPrefab(Prefab.Handle_Short).setMaterial('Redwood').print()
```

That's getting kinda long, so we can write it across multiple lines to keep things readible:

```js
  createPrefab(Prefab.Handle_Short)
    .setMaterial('Redwood')
    .print()
```

It also helps to assign each created prefab to a named variable, so you can make sense of it as your weapon or contraption grows bigger.

```js
  const handle = createPrefab(Prefab.Handle_Short)
    .setMaterial('Redwood')
    .print()
```

Now let's add a guard to this handle (the green lines show what's new since last example):

```diff
+ const guard = createPrefab(Prefab.Guard)
+
  const handle = createPrefab(Prefab.Handle_Short)
    .setMaterial('Redwood')
+   .useSlot('Slot_Large_SwordType_Craft_1', guard)
    .print()
```

So, what's happening here? We're telling the program to use one of the handle's slots, and we insert another prefab into that. The program needs to know _which_ slot to use, since prefabs like this handle have more than one slot you can use.

The inserted prefab works the same way as the handle prefab we've been making so far. Let's change the guard's material as well:

```diff
  const guard = createPrefab(Prefab.Guard)
+   .setMaterial('CarsiAlloy')
 
  const handle = createPrefab(Prefab.Handle_Short)
    .setMaterial('Redwood')
    .useSlot('Slot_Large_SwordType_Craft_1', guard)
    .print()
```

And like the handle, we can insert prefabs into this guard's slots:

```diff
+ const blade = createPrefab(Prefab.Metal_Hebios_Wakizashi_Blade)
+   .setMaterial(PhysicalMaterialPartHash.Mythril)
+
  const guard = createPrefab(Prefab.Guard)
    .setMaterial('CarsiAlloy')
+   .useSlot('Slot_SwordType', blade)
 
  const handle = createPrefab(Prefab.Handle_Short)
    .setMaterial('Redwood')
    .useSlot('Slot_Large_SwordType_Craft_1', guard)
    .print()
```

<details><summary>There are also some other interesting (but advanced) things we can do with prefabs.</summary>

- `.setIntegrity(number)` — Pass a number between `0` (destroyed) and `1` (pristine). For example `.setIntegrity(0.2)` makes the prefab badly damaged (20% integrity).
- `.setKinematic()` — Makes the prefab [kinematic](https://docs.unity3d.com/ScriptReference/Rigidbody-isKinematic.html). By default, all prefabs created with `createPrefab` are not kinematic, but some prefabs require to be kinematic to work properly. You can optionally pass a boolean, for example `.setKinematic(false)`.
- `.setServerSleeping()` — Makes the prefab [sleep](https://docs.unity3d.com/Manual/RigidbodiesOverview.html). By default, all prefabs created with `createPrefab` are not server sleeping. A sleeping prefab does not have its physics simulated until it receives a collision or force, such as touching it. You can optionally pass a boolean, for example `.setServerSleeping(false)`.
- `.setOnFire()` — Sets the prefab on fire. Not all prefabs are able to be set on fire. You can optionally pass a boolean, for example `.setOnFire(false)`.
- `.setVelocity(x, y, z)` — Pass a direction (vector) to the prefab, causing the physics engine to apply a force to it when spawning. Units are in metres per second. Only works reliably on the parent prefab. Does not work on kinematic prefabs.
- `.setPosition(x, y, z)` — Pass coordinates to set the prefab's position. For the parent prefab, these are world coordinates. For child prefabs these are local coordinates relative to the parent. Units are in metres. Note that if prefabs are not kinematic, these coordinates are only used for spawning, after which physics will be simulated. To "weld" a child prefab to a parent, you must make the child kinematic.
- `.setRotation(x, y, z, w)` — Pass a quaternion to set the prefab's rotation. Quats are hard, ok...? Don't @ me.

</details>

In the end, the game server decides what is possible. For example, some prefabs (such as the iron handles) simply don't have a material, and calling `.setMaterial()` on them doesn't alter these prefabs. But it's fun to experiment and try to figure out all the crazy things you _can_ do.

Let's complete our sword by adding a pommel:

```diff
  const blade = createPrefab(Prefab.Metal_Hebios_Wakizashi_Blade)
    .setMaterial(PhysicalMaterialPartHash.Mythril)
 
  const guard = createPrefab(Prefab.Guard)
    .setMaterial('CarsiAlloy')
    .useSlot('Slot_SwordType', blade)

+ const pommel = createPrefab(Prefab.Pommel_Diamond)
+   .setMaterial('EvinonSteelAlloy')
 
  const handle = createPrefab(Prefab.Handle_Short)
    .setMaterial('Redwood')
    .useSlot('Slot_Large_SwordType_Craft_1', guard)
+   .useSlot('Slot_PommelType_2', pommel)
    .print()
```
