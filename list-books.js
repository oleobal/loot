/**
 * books !
 *
 * Weapons were pretty simple, but here modifiers will insert subjects
 * and adjectives
 */

var books = {
items : [
	{
		name:"{titleadj} Genealogies",
		cat:["Politics"],
		val:15,
		desc:"An awkward and wordy genealogy.",
		commonness:[5, 0, 1000]
	},
	{
		name:"History of {titleadj} families",
		cat:["Politics"],
		val:20,
		desc:"An interesting if lengthy genealogy.",
		commonness:[5, 0, 1000]
	},
	{
		name:"Lineages: A {titleadj} Genealogy",
		cat:["Politics"],
		val:25,
		desc:"An insightful genealogy.",
		commonness:[2, 0, 1000]
	},
	
	{
		name:"Learn combat from the {people}",
		cat:["Strategy"],
		val:15,
		desc:"I'm not sure the writer mastered the subject, frankly.",
		commonness:[5, 0, 1000]
	},
	
	{
		name:"Strategies of the {people}",
		cat:["Strategy"],
		val:25,
		desc:"Great historical outlook and strategy primer in one.",
		commonness:[2, 0, 1000]
	},
	
	
	{
		name:"Surviving in the {sceneries}",
		cat:["Geography"],
		val:10,
		desc:"I've been in those, it's not like written in there.",
		commonness:[2, 0, 1000]
	},
	
	{
		name:"Across the {sceneries}",
		cat:["Geography"],
		val:25,
		desc:"I don't think you can find better for those.",
		commonness:[2, 0, 1000]
	},
],




badMods : [
{
	"name":"",
	"val":1,
	"desc":"",
	"commonness":[100, 0, 1000]
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
	"desc":"The illustration is quite something.",
	"commonness":[20, 0, 1000]
},
],

objects : {
	titleadj: [
		{
			name:"Comital",
			val:1,
			commonness:10
		},
		{
			name:"Ducal",
			val:1,
			commonness:5
		},
		{
			name:"Royal",
			val:1,
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
			name:"Pirates",
			val:1,
			commonness:5
		},
		{
			name:"Nomads",
			val:1,
			commonness:5
		}
	],
	sceneries: [
		{
			name:"Seas",
			val:1,
			commonness:10
		},
		{
			name:"Mountains",
			val:1,
			commonness:10
		},
		{
			name:"Plains",
			val:1,
			commonness:10
		},
		{
			name:"Forests",
			val:1,
			commonness:10
		},
		{
			name:"Fields",
			val:1,
			commonness:10
		},
		{
			name:"Swamps",
			val:1,
			commonness:5
		},
		{
			name:"Steppes",
			val:1,
			commonness:5
		},
	]
}


}
	
for (var i in books.items)
	books.items[i].type="Book"