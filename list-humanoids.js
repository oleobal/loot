/**
 * A basic list of character types for faceless NPCs. Nothing much.
 */

var humanoids = {
items : [
	{
		name:"Commoner",
		hp:undefined,
		abilities:{
			"STR":  0,
			"DEX": -1,
			"INT": -1,
			"WIS":  0,
			"CHA": -1,
			"CONS":-1,
			"WILL":-1,
			"LUCK":-2,
			"MANA":-1,
		},
		skills:{
			"Daggers":1,
			"Polearms":1,
			"Bows":2,
			"Hunting":2
		},
		inventory:[
			{name:"Melee Weapon", val:2, constraints : {catmust:["Civilian"]}},
			{name:"Gold", val:1},
		],
		armorVal:0
	},
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
			{name:"Melee Weapon", val:60, constraints : {catcant:["Shields"]}},
			{name:"Melee Weapon", val:20, constraints: {catcant:["2-handed"]}},
			{name:"Gold", val:5},
		],
		armorVal:60
	},

],
}


for (var i in humanoids.items)
{
	humanoids.items[i].type="Humanoid"
	if (!humanoids.items[i].alignment)
		humanoids.items[i].alignment="Neutral"
}