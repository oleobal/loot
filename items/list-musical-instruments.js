/**
 * random objects
 */

var musicalinstruments = {
items : [
	// strings
	{
		name:"lute",
		cat:["Musical instrument"],
		val:7,
		weight:0.5,
		desc:"Prepare to get girls fawning over your playing !",
		materials:{"wood":[100, 0, 10]},
		commonness:[10, 0, 1000]
	},
	
	{
		name:"lyre",
		cat:["Musical instrument"],
		val:3,
		weight:0.5,
		desc:"Ah, the instrument of poets.",
		materials:{"wood":[100, 0, 10]},
		commonness:[3, 0, 1000]
	},
	
	{
		name:"fiddle",
		cat:["Musical instrument"],
		val:5,
		weight:0.5,
		desc:"A bowed instrument, great for dancing.",
		materials:{"wood":[100, 0, 200]},
		commonness:[5, 0, 1000]
	},
	
	{
		name:"hurdy-gurdy",
		cat:["Musical instrument"],
		val:70,
		weight:0.5,
		desc:"This complex arrangement of keys produces a unique sound.",
		materials:{"wood":[100, 0, 200]},
		commonness:[1, 0, 1000]
	},
	
	// cannot appear
	{
		name:"RG550",
		cat:["Musical instrument"],
		val:500,
		weight:0.5,
		desc:"A HSH superstrat with ultra-thin neck and double locking vibrato.",
		materials:{"wood":[100, 0, 1000], "steel":[100, 0, 1000]},
		commonness:[0, 0, 1000]
	},
	
	
	// percussions
	{
		name:"tambourine",
		cat:["Musical instrument"],
		val:1,
		weight:0.5,
		desc:"Simple to make, sounds great !",
		materials:{"wood":[100, 0, 10], "fabric":[100, 0, 10]},
		commonness:[15, 0, 1000]
	},
	
	{
		name:"drum",
		cat:["Musical instrument"],
		val:1,
		weight:0.5,
		desc:"Well, it's a drum. Not sure what to say.",
		materials:{"wood":[100, 0, 10], "fabric":[100, 0, 10]},
		commonness:[2, 0, 1000]
	},
	
	// winds
	{
		name:"flute",
		cat:["Musical instrument"],
		val:1,
		weight:0.5,
		desc:"The timeless flute, yes.. Now please, spare my ears, stop playing.",
		materials:{"wood":[100, 0, 10]},
		commonness:[10, 0, 1000]
	},
	{
		name:"chalumeau",
		cat:["Musical instrument"],
		val:7,
		weight:0.5,
		desc:"Reed instruments aren't the easiest, indeed..",
		materials:{"wood":[100, 0, 10]},
		commonness:[2, 0, 1000]
	},
	{
		name:"shawm",
		cat:["Musical instrument"],
		val:7,
		weight:0.5,
		desc:"A bit nasal, eh ? I guess some like it.",
		materials:{"wood":[100, 0, 10]},
		commonness:[2, 0, 1000]
	},
	{
		name:"horn",
		cat:["Musical instrument"],
		val:1,
		weight:0.5,
		desc:"Ow, my ears ! Step outside to play !",
		materials:{"wood":[100, 0, 10]},
		commonness:[5, 0, 1000]
	},
	{
		name:"bagpipes",
		cat:["Musical instrument"],
		val:10,
		weight:0.5,
		desc:"I find people take a charming beetroot color when playing.",
		materials:{"wood":[100, 0, 10], "fabric":[100, 0, 10]},
		commonness:[2, 0, 1000]
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
		"name":"crude",
		"val":0.7,
		"desc":"Not made by the most renowned, but still just as good.",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"itemcant":null,
		"commonness":[30, 2, 30]
	},
	
	{
		"name":"cracked",
		"val":0.5,
		"desc":"Little cracks here and there, nothing major.",
		"matermust":["wood"],
		"catmust":null,
		"catcant":null,
		"itemcant":null,
		"commonness":[30, 0, 1000]
	},
],

goodMods : [
	{
		"name":"",
		"val":1,
		"desc":"",
		"commonness":[100, 0, 1000]
	},
	
	{
		"name":"quality",
		"val":2.5,
		"desc":"This one is of great quality.",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"itemcant":null,
		"commonness":[30, 5, 1000]
	},
	
	{
		"name":"masterwork",
		"val":10,
		"desc":"Subtle touch and beautiful engraving with this one.",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"itemcant":null,
		"commonness":[5, 5, 1000]
	},
	
],

subjectTypes : {
}


}

for (var i in musicalinstruments.items)
{
	musicalinstruments.items[i].type="Other"
	musicalinstruments.items[i].weight=0.5
}

// subjects
// give each of them a 'sub' attribute {subjectType:name}
// and a "type" attribute
// and copy them in a big "subjects"
musicalinstruments.subjects = []
var types = Object.keys(musicalinstruments.subjectTypes)
for (var t in types)
{
	for (var i in musicalinstruments.subjectTypes[types[t]])
	{
		musicalinstruments.subjectTypes[types[t]][i].type = types[t]
		musicalinstruments.subjectTypes[types[t]][i].sub = {[types[t]]:musicalinstruments.subjectTypes[types[t]][i].name}
		var o = Object.assign({}, musicalinstruments.subjectTypes[types[t]][i])
		musicalinstruments.subjects.push(o)
	}
}