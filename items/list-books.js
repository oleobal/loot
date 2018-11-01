/**
 * books !
 *
 * Weapons were pretty simple, but here modifiers will insert subjects
 * and adjectives
 */

var books = {
items : [
	{
		name:"{titleadj,c} Genealogies",
		cat:["Politics"],
		val:30,
		desc:"An awkward and wordy genealogy.",
		commonness:[10, 0, 1000]
	},
	{
		name:"History of {titleadj,c} families",
		cat:["Politics"],
		val:40,
		desc:"An interesting if lengthy genealogy.",
		commonness:[5, 0, 1000]
	},
	{
		name:"Lineages: A {titleadj,c} Genealogy",
		cat:["Politics"],
		val:50,
		desc:"An insightful genealogy.",
		commonness:[3, 0, 1000]
	},
	
	{
		name:"Learn combat from the {people}",
		cat:["Strategy"],
		val:30,
		desc:"I'm not sure the writer mastered the subject, frankly.",
		commonness:[10, 0, 1000]
	},
	
	{
		name:"Strategies of the {people}",
		cat:["Strategy"],
		val:50,
		desc:"Great historical outlook and strategy primer in one.",
		commonness:[5, 0, 1000]
	},
	
	
	{
		name:"Surviving in the {sceneries,c}",
		cat:["Geography"],
		val:25,
		desc:"I've been to {sceneries}, it's not like the author writes.",
		commonness:[7, 0, 1000]
	},
	
	{
		name:"Across the {sceneries,c}",
		cat:["Geography"],
		val:50,
		desc:"I don't think you can find better for {sceneries}.",
		commonness:[2, 0, 1000]
	},
	
	
	{
		name:"Across the Stars",
		cat:["Other"],
		val:30,
		desc:"The song of a young knight in love with whom he can never be with.",
		commonness:[3, 0, 1000]
	},
	
	{
		name:"Live, Battle and Travel",
		cat:["Other"],
		val:30,
		desc:"A popular (if wordy) hero epic.",
		commonness:[3, 0, 1000]
	},
	
	{
		name:"Songs of the {people}",
		cat:["Other"],
		val:30,
		desc:"A collection of traditional songs.",
		commonness:[3, 0, 1000]
	},
	
	{
		name:"The Art of measured chant",
		cat:["Other"],
		val:50,
		desc:"An interesting treatise on rythm notation for music.",
		commonness:[3, 0, 1000]
	},
	
	{
		name:"Philosophy of the Ancients",
		cat:["Other"],
		val:60,
		desc:"I wish I could spend my time pondering these questions.",
		commonness:[1, 0, 1000]
	},
	
	{
		name:"Eastern Philosophy",
		cat:["Other"],
		val:70,
		desc:"This is a fascinating and quite alien outlook on life.",
		commonness:[1, 0, 1000]
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
	{
		"name":"illuminated",
		"val":2,
		"desc":"Beautiful illustrations.",
		"commonness":[20, 0, 1000]
	},
],

subjectTypes : {
	titleadj: [
		{
			name:"comital",
			val:0.6,
			commonness:10
		},
		{
			name:"ducal",
			val:1,
			commonness:5
		},
		{
			name:"royal",
			val:1.2,
			commonness:5
		}
	],
	people: [
		{
			name:"Ancients",
			val:1,
			commonness:10
		},
		{
			name:"Seafarers",
			val:1,
			commonness:2
		},
		{
			name:"Pirates",
			val:1,
			commonness:2
		},
		{
			name:"Nomads",
			val:1.2,
			commonness:5
		},
		{
			name:"Barbarians",
			val:1.2,
			commonness:3
		}
	],
	sceneries: [
		{
			name:"seas",
			val:1,
			commonness:10
		},
		{
			name:"mountains",
			val:1,
			commonness:10
		},
		{
			name:"plains",
			val:0.8,
			commonness:10
		},
		{
			name:"forests",
			val:1,
			commonness:10
		},
		{
			name:"swamps",
			val:1,
			commonness:5
		},
		{
			name:"steppes",
			val:1.2,
			commonness:5
		},
	]
	
}


}

for (var i in books.items)
{
	books.items[i].type="Book"
	books.items[i].weight=0.5
}

// subjects
// give each of them a 'sub' attribute {subjectType:name}
// and a "type" attribute
// and copy them in a big "subjects"
books.subjects = []
var types = Object.keys(books.subjectTypes)
for (var t in types)
{
	for (var i in books.subjectTypes[types[t]])
	{
		books.subjectTypes[types[t]][i].type = types[t]
		books.subjectTypes[types[t]][i].sub = {[types[t]]:books.subjectTypes[types[t]][i].name}
		var o = Object.assign({}, books.subjectTypes[types[t]][i])
		books.subjects.push(o)
	}
}