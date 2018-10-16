/**
 * Books about magic
 *
 */

magicbooks = {
items : [
	{
		name:"The Secrets of {domain,c} Magic",
		cat:["Magic"],
		val:50,
		desc:"Magic tomes are hard to come by, and this is better than nothing.",
		commonness:[10, 0,1000]
	},
	{
		name:"An Tntroduction to {domain,c}",
		cat:["Magic"],
		val:80,
		desc:"I'm no expert, but I think this is pretty good. Very clear.",
		commonness:[5, 0,1000]
	},
	{
		name:"The Art of {domain,c}",
		cat:["Magic"],
		val:100,
		desc:"The author is clearly a master of {domain,c} magic.",
		commonness:[2, 0,1000]
	},
	
	
	{
		name:"{element,c} ! A magic primer",
		cat:["Magic"],
		val:50,
		desc:"Some parts are quite vague, but overall it is a good read.",
		commonness:[10, 0,1000]
	},
	
	{
		name:"Mastering {element,c}",
		cat:["Magic"],
		val:70,
		desc:"{element,c} mages should have a copy of this in their collection.",
		commonness:[5, 0,1000]
	},
	{
		name:"Philosophy of {element,c}-bending",
		cat:["Magic"],
		val:100,
		desc:"I'm not sure where it comes from, its approach is very different.",
		commonness:[1, 0,1000]
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
		"val":0.8,
		"desc":"Many errors were made when this one was copied.",
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
],



subjectTypes : {
	domain: [
		{
			name:"elemental attack",
			val:1,
			commonness:5
		},
		{
			name:"shielding",
			val:1,
			commonness:5
		},
		{
			name:"illusion",
			val:1.5,
			commonness:4
		},
		{
			name:"conjuration",
			val:2,
			commonness:3
		},
		{
			name:"necromancy",
			val:3,
			commonness:1
		},
		{
			name:"healing",
			val:1,
			commonness:5
		},
		{
			name:"telekinesis",
			val:1,
			commonness:5
		},
		{
			name:"telepathy",
			val:2,
			commonness:2
		},
		{
			name:"meta",
			val:2,
			commonness:3
		},
		{
			name:"divination",
			val:2,
			commonness:3
		},
	],
	
	element: [
		{
			name:"fire",
			val:1,
			commonness:10
		},
		{
			name:"water",
			val:1,
			commonness:10
		},
		{
			name:"ice",
			val:1,
			commonness:10
		},
		{
			name:"lightning",
			val:1,
			commonness:10
		},
		{
			name:"earth",
			val:1.2,
			commonness:5
		},
		{
			name:"air",
			val:2,
			commonness:1
		},
	
	]
}


}

for (var i in magicbooks.items)
{
	magicbooks.items[i].type="Book"
	magicbooks.items[i].weight=0.5
}

// subjects
// give each of them a 'sub' attribute {subjectType:name}
// and a "type" attribute
// and copy them in a big "subjects"
magicbooks.subjects = []
var types = Object.keys(magicbooks.subjectTypes)
for (var t in types)
{
	for (var i in magicbooks.subjectTypes[types[t]])
	{
		magicbooks.subjectTypes[types[t]][i].type = types[t]
		magicbooks.subjectTypes[types[t]][i].sub = {[types[t]]:magicbooks.subjectTypes[types[t]][i].name}
		var o = Object.assign({}, magicbooks.subjectTypes[types[t]][i])
		magicbooks.subjects.push(o)
	}
}