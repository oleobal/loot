/*
format :
{
	"Name of category": {
		"names":{
			"singular name in minuscules":[rarity (natural), minimum value (natural), maximum value (natural)]
			},
		"atk": typical attack (relative),
		"par": typical parry (relative),
		"dmg": typical maximum damage (natural) ; calculations will use dmg/2 as mean,
		"val": typical value,
		"hands": number of hands needed,
		"weight":typical weight in kilograms (positive real multiple of 0.5),
		"dmgspread": variance (scale),
		"materials":{"material name":[rarity (natural), minimum value (natural), maximum value (natural)]}
	},
}

"typical" values describe the kind of weapon an adventurer "ought" to get, that's neither too cheap nor too expensive for its class.

rarity (for names and materials) is an arbitrary unit, that describe the size of the pie for that name/material
minimum and maximum values is the range (inclusive) at which this name/material can appear

dmg and dmgspread are plugged in a gaussian function :

e^(-(x-(dmg/2)^2/(2*dmgspread^2))/(sqrt(2*pi)*dmgspread)

which is then (through magic) turned into dice rolls
*/

var weapons=[
	{
		"name":"dagger",
		"cat":["Daggers"],
		"atk": 2,
		"par": -3,
		"dmg": 4,
		"val": 20,
		"hands":1,
		"weight":0.5,
		"dmgspread":1,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[50, 10, 1000]
	},
	
	{
		"name":"sword",
		"cat":["Swords"],
		"atk": 2,
		"par": 3,
		"dmg": 6,
		"val": 40,
		"hands":1,
		"weight":1,
		"dmgspread":10,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[50, 20, 1000],
	},
	/*
	  		"names":{
			"sword":
			"longsword":[30, 30, 1000],
			"short sword":[30,5,70],
			"backsword":[20,5,40]
			"bastard sword":[20,50,1000]
			},
	*/
	
	/*
			"names":{
			"sabre":[100, 10, 1000],
			"messer":[30,5,30],
			"falchion":[20,10,70],
			"scimitar":[10,30,1000],
			},
	*/
	{
		"name":"sabre",
		"cat":["Sabres"],
		"atk": 3,
		"par": 2,
		"dmg": 6,
		"val": 40,
		"hands":1,
		"weight":1,
		"dmgspread":10,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[30, 10, 1000]
	},
	
	{
		"name":"axe",
		"cat":["Axes"],
		"atk": 4,
		"par": -1,
		"dmg": 8,
		"val": 30,
		"hands":1,
		"weight":1,
		"dmgspread":5,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[60, 10, 1000]
	},
	
	{
		"name":"mace",
		"cat":["Maces"],
		"atk": 4,
		"par": -2,
		"dmg": 8,
		"val": 30,
		"hands":1,
		"weight":1,
		"dmgspread":1,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[30, 10, 1000]
	},
]

var badMods=[
	{
		"name":"",
		"atk":0,
		"par":0,
		"dmg":1,
		"val":1,
		"desc":"",
		"materials":null,
		"cats":null,
		"commonness":[100, 0, 1000]
	},

	{
		"name":"rusty",
		"atk":-1,
		"par":-1,
		"dmg":0.8, // fraction
		"val":0.7, // fraction
		"desc":"",
		"materials":["steel", "iron"], // which materials this can be applied to
		"cats":null,
		"commonness":[20, 0, 1000]
	},
	
	{
		"name":"bent",
		"atk":-1,
		"par":-1,
		"dmg":1,
		"val":0.7,
		"desc":"",
		"materials":["steel", "iron"],
		"cats":null,
		"commonness":[15, 0, 1000]
	},
	
	{
		"name":"crude",
		"atk":0,
		"par":0,
		"dmg":0.8,
		"val":0.9,
		"desc":"",
		"materials":["steel", "iron"],
		"cats":["Swords", "Axes", "Sabres", "Daggers"],
		"commonness":[25, 0, 1000]
	},
]

var goodMods=[
	{
		"name":"",
		"atk":0,
		"par":0,
		"dmg":1,
		"val":1,
		"desc":"",
		"materials":null,
		"cats":null,
		"commonness":[100, 0, 1000]
	},
	
	{
		"name":"fine",
		"atk":1,
		"par":1,
		"dmg":1,
		"val":2,
		"desc":"",
		"materials":["steel"],
		"cats":null,
		"commonness":[10, 20, 1000]
	},
	
	{
		"name":"masterwork",
		"atk":2,
		"par":1,
		"dmg":1.3,
		"val":4,
		"desc":"",
		"materials":["steel"],
		"cats":null,
		"commonness":[5, 50, 1000]
	},
	
	{	
		"name":"silver",
		"atk":-1,
		"par":-1,
		"dmg":0.8,
		"val":4,
		"desc":"+4 DMG against undead",
		"materials":["steel"],
		"cats":null,
		"commonness":[5, 50, 1000]
	},
	
]
