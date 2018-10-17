## Loot generator

This repository is running [online here](http://fple.richeli.eu/loot).

A loot generator for pen & paper RPGs. The main target is a homebrew system, FPLE, as of yet unreleased.

The `list-*` files define objects containing list of items, along with possible modifiers. These objects can then be passed to processing facilities ; as of now, there are only two : books.js and weapons.js (which manages melee, ranged and armor). A guiding principle throughout is that a single item name only maps to a single stat block. This way, a player can write down the name of an item, and its stats can be checked later on the item lists.

Three files are meant to be user-facing :
 - `index.html` is the loot generator proper
 - `allweapons.html` is the complete list of all weapons/armors it is possible to generate
 - `allbooks.html` is the complete list of all books


### Weapons

`list-melee-weapons.js`, `list-ranged-weapons.js`, and `list-armors.js` each contain base items and modifiers. `weapons.js` contains the generator.

Items are defined by a large number of attributes, to each of which a modifier can be applied. The most interesting is weapon damage, which is traditionally notated with dice, such as `2d4` : how to apply a modifier on dice ? My answer is to store two attributes per weapon, a max damage and a 'damage spread'. Damage spread is the target standard deviation the system will approach with different dice combinations. Here is a sample output :

| Max damage | Spread | Result |SD of result|
|------------|--------|--------|------------|
|     12     |   1    |   6d2  | 1.225      |
|     12     |   2    |   3d4  | 1.936      |
|     12     |   2.25 |   2d6  | 2.415      |
|     12     |   2.5  |1d4+1d8 | 2.55       |
|     12     |   3    |1d2+1d10| 2.915      |
|     12     |   3.5  |  1d12  | 3.452      |


### Books

`list-books.js` and `list-books-magic.js` are lists to be handled by `books.js`.

Books have no need for the complex damage scaling, but they do instead have *subjects*, in addition to modifiers. A book will always be given a subject (if it needs one), and then possibly a modifier. This is done through string substitution in the titles and descriptions.