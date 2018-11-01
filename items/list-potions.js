/**
 * potions
 * work exactly like books
 */

var potions = {
items : [
	{
		name:"potion of {healthmana,c}",
		cat:["Health & Mana"],
		val:25,
		desc:"Restores 1 point of {healthmana}.",
		commonness:[25, 0, 1000]
	},
	
	{
		name:"antidote",
		cat:["Medicine"],
		val:10,
		desc:"Removes poisoning.",
		commonness:[10, 0, 1000]
	},
	
	{
		name:"{element} vial",
		cat:["Combat"],
		val:10,
		desc:"When opened, deals 1d4 {element} damage on contact.",
		commonness:[10, 0, 1000]
	},
	
	{
		name:"{element} grenade",
		cat:["Combat"],
		val:21,
		desc:"When opened, deals 1d4 {element} damage to all adjacent squares (9 total).",
		commonness:[20, 0, 1000]
	},
	
	{
		name:"potion of {ability1,c}",
		cat:["Ability"],
		val:60,
		desc:"Adds 1 to {ability1} for an hour.",
		commonness:[8, 0, 1000]
	},
	{
		name:"potion of {ability2,c}",
		cat:["Ability"],
		val:40,
		desc:"Adds 1 to {ability2} for an hour.",
		commonness:[8, 0, 1000]
	},
],

badMods : [
	{
		"name":"",
		"val":1,
		"desc":"",
		"commonness":[100, 0, 1000]
	},
	{
		"name":"expired",
		"val":0.8,
		"desc":"Roll a d10 on use ; if 1, this potion has no or adverse effects.",
		"commonness":[30, 0, 50]
	},
	{
		"name":"crude",
		"val":0.6,
		"desc":"Roll a d6 on use ; if 1, this potion has no or adverse effects.",
		"commonness":[30, 0, 30]
	}
],

goodMods : [
	{
		"name":"",
		"val":1,
		"desc":"",
		"commonness":[100, 0, 1000]
	},
	{
		"name":"fine",
		"val":1.5,
		"desc":"Roll a d2 on use ; if 2, repeat the effects.",
		"commonness":[30, 20, 1000],
		"catcant":["Medicine"]
	},
	
	{
		"name":"unleashed",
		"val":2,
		"desc":"Add regardless of cap.",
		"catmust":["Health & Mana"],
		"commonness":[15, 30, 1000]
	},
],

subjectTypes : {
	healthmana: [
		{
			name:"mana",
			val:1,
			commonness:20
		},
		{
			name:"health",
			val:1.2,
			commonness:1
		},
	],
	
	// all those modifiers are 1 to conform to the alchemy rules
	// maybe there should be a merchant algo to mark up prices depending
	// on rarity (TODO)
	element: [
		{
			name:"fire",
			val:1,
			commonness:20
		},
		{
			name:"water",
			val:1,
			commonness:1
		},
		{
			name:"ice",
			val:1,
			commonness:10
		},
		{
			name:"lightning",
			val:1,
			commonness:2
		},
	],
	ability1: [
		{
			name:"strength",
			val:1,
			commonness:10
		},
		{
			name:"dexterity",
			val:1,
			commonness:10
		},
		{
			name:"intelligence",
			val:1,
			commonness:5
		},
		{
			name:"wisdom",
			val:1,
			commonness:2
		},
		{
			name:"charisma",
			val:1,
			commonness:5
		},
	],
	
	ability2: [
		{
			name:"will",
			val:1,
			commonness:10
		},
		{
			name:"constitution",
			val:1,
			commonness:10
		},
		{
			name:"luck",
			val:1,
			commonness:2
		},
	],
}


}

for (var i in potions.items)
{
	potions.items[i].type="Potion"
	potions.items[i].weight=0.5
}

// subjects
// give each of them a 'sub' attribute {subjectType:name}
// and a "type" attribute
// and copy them in a big "subjects"
potions.subjects = []
var types = Object.keys(potions.subjectTypes)
for (var t in types)
{
	for (var i in potions.subjectTypes[types[t]])
	{
		potions.subjectTypes[types[t]][i].type = types[t]
		potions.subjectTypes[types[t]][i].sub = {[types[t]]:potions.subjectTypes[types[t]][i].name}
		var o = Object.assign({}, potions.subjectTypes[types[t]][i])
		potions.subjects.push(o)
	}
}