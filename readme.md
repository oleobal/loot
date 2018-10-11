## Loot generator

This repository is running [online here](tools.richeli.eu/loot).

A loot generator for pen & paper RPGs. The main target is a homebrew system, and right now I am focusing on weapons almost exclusively.

Weapons are defined by a large number of attributes, to which a modifier can be applied to modify them. The most interesting is damage, which is traditionally notated with dice, such as `2d4` : how to apply a modifier on dice ? My answer is to store two attributes per weapon, a max damage and a 'damage spread'. Damage spread is the target standard deviation the system will approach with different dice combinations. Here is a sample output :

| Max damage | Spread | Result |
|------------|--------|--------|
|     12     |   1    |   6d2  |
|     12     |   2    |   3d4  |
|     12     |   2.25 |   2d6  |
|     12     |   2.5  |1d4+1d8 |
|     12     |   3    |1d2+1d10|
|     12     |   3.5  |  1d12  |


A guiding principle throughout is that a single weapon name only maps to a single stat block.
