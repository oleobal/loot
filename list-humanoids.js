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
		name:"Roused Rabble",
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
			"Hunting":2,
		},
		inventory:[
			{name:"EITHER",
			options: [
				{name:"Melee Weapon", val:5, constraints : {catcant:["Shields"]}},
				{name:"Melee Weapon", val:10, constraints : {catcant:["Shields"]}},
				[
					{name:"Melee Weapon", val:10, constraints : {catmust:"1-handed", catcant:["Shields"]}},
					{name:"Melee Weapon", val:10, constraints : {catmust:["Shields"]}},
				],
				{name:"Ranged Weapon", val:5, constraints : {}}
			]
			},
			{name:"Gold", val:1},
		],
		armorVal:10
	},
	
	{
		name:"Goblin",
		hp:undefined,
		abilities:{
			"STR": -1,
			"DEX":  0,
			"INT": -2,
			"WIS": -2,
			"CHA": -2,
			"CONS":-2,
			"WILL":-2,
			"LUCK":-2,
			"MANA":-2,
		},
		skills:{
			"Daggers":2,
			"Swords":2,
			"Maces":2,
			"Shields":1,
			"Hunting":3
		},
		inventory:[
			{name:"EITHER",
			options:
			[
				{name:"Melee Weapon", val:10, constraints : {catcant:["Shields"]}},
				[
					{name:"Melee Weapon", val:5, constraints : {catcant:["Shields", "2-handed"]}},
					{name:"Melee Weapon", val:5, constraints : {catmust:["Shields"]}},
				]
			]
			},
			{name:"Gold", val:3},
		],
		armorVal:0
	},
	
	
	{
		name:"Orc Warrior",
		hp:undefined,
		abilities:{
			"STR": 2,
			"DEX": 1,
			"INT":-1,
			"WIS":-1,
			"CHA":-2,
			"CONS":2,
			"WILL":1,
			"LUCK":-1,
			"MANA":-1,
		},
		skills:{
			"Sabres":2,
			"Axes":2,
			"Maces":2,
			"Great Swords":2,
			"Great Axes":2,
			"Bows":1,
			"Hunting":3
		},
		inventory:[
			{name:"EITHER",
			options:[
				{name:"Melee Weapon", val:40, constraints: {}},
				[
					// it would be nice to say "use of this puts this
					// restriction on armor" but oh well
					{name:"Ranged Weapon", val:20, constraints: {catmust:["Bows"]}},
					{name:"Melee Weapon", val:20, constraints: {catcant:["2-handed", "Shields"]}}
				]
			]
			},
			
			{name:"Gold", val:5},
		],
		inventoryWeaponsNeedSkills : true,
		armorVal:30,
		alignment:"Neutral/evil"
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
			{name:"EITHER",
			options:
			[
				{name:"Melee Weapon", val:60, constraints: {catmust:["2-handed"]}},
				[
					{name:"Melee Weapon", val:50, constraints: {catcant:["Shields","2-handed"]}},
					{name:"Melee Weapon", val:20, constraints: {catmust:["Shields", "Daggers"]}}
				],
			]
			},
			{name:"Gold", val:5},
		],
		// intersect each weapon's catmust with the skills
		// (so only weapons the NPC is skilled in can appear in their inventory)
		// WARNING : consider the implications if you use categories that are
		// not skills such as "1-handed" (hidden category)
		inventoryWeaponsNeedSkills : true,
		armorVal:60
	},
	
	{
		name:"Archer",
		hp:undefined,
		abilities:{
			"STR": 2,
			"DEX": 3,
			"INT": 0,
			"WIS":-1,
			"CHA": 0,
			"CONS":0,
			"WILL":1,
			"LUCK":2,
			"MANA":-1,
		},
		skills:{
			"Daggers":2,
			"Swords":2,
			"Sabres":2,
			"Bows":4,
			"Hunting":2
		},
		inventory:[
			{name:"Ranged Weapon", val:60, constraints: {catmust:["Bows"]}},
			{name:"Melee Weapon", val:20, constraints: {catcant:["2-handed"]}},
			{name:"Gold", val:5},
		],
		inventoryWeaponsNeedSkills : true,
		armorVal:18
	},
	
	
	
	{
		name:"Man at Arms",
		hp:undefined,
		abilities:{
			"STR": 2,
			"DEX": 4,
			"INT": 1,
			"WIS": 2,
			"CHA": 0,
			"CONS":2,
			"WILL":2,
			"LUCK":0,
			"MANA":0,
		},
		skills:{
			"Swords":4,
			"Axes":4,
			"Maces":4,
			"Great Swords":4,
			"Polearms":4,
			"Shields":3,
			"Initiative":3,
			"Hunting":1
		},
		inventory:[
			{name:"EITHER",
			options:
			[
				{name:"Melee Weapon", val:100, constraints: {}},
				[
					{name:"Melee Weapon", val:60, constraints: {catcant:["Shields","2-handed"]}},
					{name:"Melee Weapon", val:40, constraints: {catmust:["Shields"]}}
				],
			]
			},
			{name:"Gold", val:10},
		],
		inventoryWeaponsNeedSkills : true,
		armorVal:200
	},

],
}


for (var i in humanoids.items)
{
	humanoids.items[i].type="Humanoid"
	if (!humanoids.items[i].alignment)
		humanoids.items[i].alignment="Neutral"
}