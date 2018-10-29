/**
 * Books about combat
 *
 */

combatbooks = {
items : [
	{
		name:"Learn from the {weapon1h} masters",
		cat:["Combat"],
		val:50,
		uses:5,
		desc:"A reasonable introduction to the {weapon1h}-fighting.",
		commonness:[10, 0,1000]
	},
	
	{
		name:"Fighting and winning with the {weapon1h,c}",
		cat:["Combat"],
		val:80,
		uses:10,
		desc:"A good book all around, I would say.",
		commonness:[8, 0,1000]
	},
	
	{
		name:"Putting your {weapon1h} to the test",
		cat:["Combat"],
		val:120,
		uses:15,
		desc:"A masterful evaluation of {weapon1h} techniques.",
		commonness:[5, 0,1000]
	},
	
	{
		name:"The Play of the {weapon1h,c}",
		cat:["Combat"],
		val:200,
		uses:20,
		desc:"A refreshing look on {weapon1h}-wielding.",
		commonness:[1, 0,1000]
	},
	
	
	{
		name:"Crush and kill with {weapons2h}",
		cat:["Combat"],
		val:50,
		uses:5,
		desc:"A good introduction when you wield {weapons2h}, I suppose.",
		commonness:[8, 0,1000]
	},
	
	{
		name:"Using {weapons2h,c} effectively",
		cat:["Combat"],
		val:80,
		uses:10,
		desc:"The author had decades of experience, and it shows.",
		commonness:[5, 0,1000]
	},
	
	{
		name:"Thinking with {weapons2h,c}",
		cat:["Combat"],
		val:120,
		uses:15,
		desc:"All possibilities offered by {weapons2h} are on display here.",
		commonness:[5, 0,1000]
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
		"name":"with errors",
		"val":0.75,
		"uses":0.6,
		"desc":"Many errors snuck in this copy.",
		"commonness":[20, 0, 1000]
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
		"name":"illustrated",
		"val":1.8,
		"uses":1.1,
		"desc":"The illustrations are very helpful and even beautiful.",
		"commonness":[20, 0, 1000]
	},
],



subjectTypes : {
	weapon1h: [
		{
			name:"dagger",
			val:1,
			commonness:2
		},
		{
			name:"sword",
			val:1,
			commonness:15
		},
		{
			name:"sabre",
			val:1.2,
			commonness:10
		},
		{
			name:"axe",
			val:1,
			commonness:8
		},
		{
			name:"mace",
			val:1,
			commonness:3
		},
		{
			name:"shield",
			val:1,
			commonness:8
		},
		
	],
	
	// those are plural
	weapons2h: [
		{
			name:"great swords",
			val:1,
			commonness:10
		},
		{
			name:"great axes",
			val:2,
			commonness:2
		},
		
		{
			name:"polearms",
			val:1,
			commonness:10
		},
		
		{
			name:"bows",
			val:1,
			commonness:2
		},
	],
}


}

for (var i in combatbooks.items)
{
	combatbooks.items[i].type="Book"
	combatbooks.items[i].weight=0.5
}

// subjects
// give each of them a 'sub' attribute {subjectType:name}
// and a "type" attribute
// and copy them in a big "subjects"
combatbooks.subjects = []
var types = Object.keys(combatbooks.subjectTypes)
for (var t in types)
{
	for (var i in combatbooks.subjectTypes[types[t]])
	{
		combatbooks.subjectTypes[types[t]][i].type = types[t]
		combatbooks.subjectTypes[types[t]][i].sub = {[types[t]]:combatbooks.subjectTypes[types[t]][i].name}
		var o = Object.assign({}, combatbooks.subjectTypes[types[t]][i])
		combatbooks.subjects.push(o)
	}
}