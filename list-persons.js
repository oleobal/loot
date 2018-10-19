/**
 * A basic list of character types for faceless NPCs. Nothing much.
 */

var persons = {
items : [
	{
		name:"Infantryman",
		hp:undefined,
		abilities:{
			"STR": 1,
			"DEX": 2,
			"INT": -1,
			"WIS": 0,
			"CHA": 0,
			"CONS":1,
			"WILL":2,
			"LUCK":0,
			"MANA":-1,
		},
		skills:{
			"Swords":2,
			"Axes":2,
			"Maces":2,
			"Great Swords":2,
			"Polearms":2,
			"Shields":1,
			"Initiative":2,
			"Hunting":1
		},
		inventory:[
			{name:"Melee Weapon", val:60},
			{name:"Melee Weapon", val:20},
			{name:"Gold", val:5},
		],
		armorVal:60
	},

],
}


for (var i in persons.items)
	persons.items[i].type="Person"
