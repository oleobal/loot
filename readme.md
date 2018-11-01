## RPG tools

This repository is running [online here](http://fple.richeli.eu/loot).

A set of companion tools for pen & paper RPGs. The main target is a homebrew system, FPLE.

As of now, it aims to include :
 - A *loot generator* for complete equipment/items lists, treasure chest, stores..
 - A *creature generator* for NPCs and monsters
 - An *encounter manager* for combat

These tools are mainly intended for game masters, to allow them to focus on what matters and create richer worlds more easily. They are made under the belief that quality companion facilities are critical for players of FPLE to enjoy their time as much as possible.

All the tools are client-side JavaScript. This provides ease of use (everyone has a browser) and flexibility (online or offline), at the cost of having to develop in JavaScript.

## Loot generator

The loot generator is used to both build complete lists of all possible items and generate inventories for treasure chests or stores.

The `items/list-*` files define objects containing list of items, along with possible modifiers. These objects can then be passed to processing facilities in `prog/items.js` (which manages melee, ranged and armor). A guiding principle throughout is that a single item name only maps to a single stat block. This way, a player can write down the name of an item, and its stats can be checked later on the item lists.

Four files are meant to be user-facing :
 - `index.html` is the loot generator proper
 - `allweapons.html` is the complete list of all weapons/armors it is possible to generate
 - `allbooks.html` is the complete list of all books
 - `allpotions.html` is the complete list of all potions


### Weapons & Armor

`list-melee-weapons.js`, `list-ranged-weapons.js`, and `list-armors.js` each contain base items and modifiers.

Items are defined by a large number of attributes, to each of which a modifier can be applied. The most interesting is weapon damage, which is traditionally notated with dice, such as `2d4` : how to apply a modifier on dice ? My answer is to store two attributes per weapon, a max damage and a 'damage spread'. Damage spread is the target standard deviation the system will approach with different dice combinations. Here is a sample output :

| Max damage | Spread | Result |SD of result|
|------------|--------|--------|------------|
|     12     |   1    |   6d2  | 1.225      |
|     12     |   2    |   3d4  | 1.936      |
|     12     |   2.25 |   2d6  | 2.415      |
|     12     |   2.5  |1d4+1d8 | 2.55       |
|     12     |   3    |1d2+1d10| 2.915      |
|     12     |   3.5  |  1d12  | 3.452      |

Armor uses PROT, which works like damage in practice.

### Other items

`list-books.js` and `list-books-magic.js`.

Books have no need for the complex damage scaling, but they do instead have *subjects*, in addition to modifiers. A book will always be given a subject (if it needs one), and then possibly a modifier. This is done through string substitution in the titles and descriptions.

Books that are not mere fluff (skill books) are also given a scalable number of *uses*, which represent their quality as instruction books.

This concept is generalized to all items.

## Creature generator

The creature generator will be split it two, humanoids and monsters, with humanoids leveraging the equipment lists from the loot generator.

User-facedness is a bit different than with items, in that there is no need to display every possible combination. Instead, general rules for the creature should be given : base stats and possible equipment and modifiers. I expect the main use of the generator proper will be in the encounter manager.

Generating encounters (from a difficulty metric and an environment) is a possibility, but an uncertain one. Difficulty is hard to evaluate, with many game masters constantly reevaluating it (ie fudging rolls) ; in addition, encounters must make sense in the present situation. In practice, I believe presenting DMs with a list of creatures (possibly ordered by difficulty rating) would be sufficient.

## Encounter manager

A simple application for managing turn order (initiative), health points, stats.. In an encounter. The user-facing page is `encounter.html`.

On the left is a list of participants to the encounter, sorted by initiative (the field to the right of the name ; left of the name are current HP). It is assumed initiative will be hand-rolled.
Clicking the arrow button opens a detailed view for each participant.
