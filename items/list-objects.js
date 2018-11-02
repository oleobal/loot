/**
 * random objects
 */

var objects = {
items : [

	// cooking
	
	{
		name:"kitchen ustensils",
		cat:["Cooking"],
		val:2,
		weight:0.5,
		desc:"A few spoons, forks and bowls.",
		materials:{"iron":[100, 0, 5], "wood":[20, 0, 5]},
		commonness:[100, 0, 1000]
	},
	{
		name:"cast pot",
		cat:["Cooking"],
		val:1,
		weight:1,
		desc:"This will last you decades !",
		materials:{"iron":[100, 0, 5], "bronze":[20, 0, 5]},
		commonness:[70, 0, 1000]
	},
	{
		name:"cauldron",
		cat:["Cooking"],
		val:3,
		weight:3,
		desc:"A deep and sturdy cauldron.",
		materials:{"iron":[100, 0, 10], "bronze":[20, 0, 10]},
		commonness:[30, 0, 1000]
	},
	
	/*
	{
		name:"kitchen knife",
		cat:["Cooking"],
		val:2,
		weight:0.5,
		desc:"A large cutting implement.",
		materials:{"steel":[100, 2, 1000], "iron":[20, 0, 5]},
		commonness:[30, 0, 1000]
	},
	*/
	
	// go see the weapon stats for kitchen knife and hammer..
	
	// tools
	
	/*
	{
		name:"hammer",
		cat:["Tools"],
		val:1,
		weight:0.5,
		desc:"A small tool.",
		materials:{"iron":[100, 0, 10], "wood":[20, 0, 10]},
		commonness:[15, 0, 1000]
	},
	*/
	
	{
		name:"saw",
		cat:["Tools"],
		val:1,
		weight:0.5,
		desc:"A large wood saw.",
		materials:{"iron":[100, 0, 10], "wood":[20, 0, 10]},
		commonness:[15, 0, 1000]
	},
	
	
	// clothing
	
	{
		name:"poor clothing",
		cat:["Clothing"],
		val:1,
		weight:0.5,
		desc:"The fabric is rough and the cut uncomfortable.",
		materials:{"fabric":[100, 0, 1000],},
		commonness:[30, 0, 1000]
	},
	
	{
		name:"good clothing",
		cat:["Clothing"],
		val:3,
		weight:0.5,
		desc:"Good (if simplistic) clothing.",
		materials:{"fabric":[100, 0, 1000],},
		commonness:[20, 0, 1000]
	},
	
	{
		name:"rich clothing",
		cat:["Clothing"],
		val:10,
		weight:0.5,
		desc:"Complex clothing made with rare dyes.",
		materials:{"fabric":[100, 0, 1000],},
		commonness:[10, 5, 1000]
	},
	
	
	// lighting and fire
	{
		name:"candles",
		cat:["Lighting"],
		val:1,
		weight:0.5,
		desc:"A small bundle of candles.",
		materials:{},
		commonness:[100, 0, 1000]
	},
	{
		name:"lantern",
		cat:["Lighting"],
		val:1,
		weight:0.5,
		desc:"A wood frame with fabric to protect the candle inside.",
		materials:{"wood":[100, 0, 10], "fabric":[100, 0, 10]},
		commonness:[50, 0, 1000]
	},
	
	{
		name:"oil lamp",
		cat:["Lighting"],
		val:2,
		weight:0.5,
		desc:"An oil-burning light.",
		materials:{"iron":[100, 0, 5], "bronze":[20, 0, 5]},
		commonness:[15, 0, 1000]
	},
	
	{
		name:"oil flask",
		cat:[],
		val:1,
		weight:0.5,
		desc:"A flask of oil.",
		materials:{},
		commonness:[10, 0, 1000]
	},
	
	{
		name:"flint and steel",
		cat:[],
		val:1,
		weight:0.5,
		desc:"Good for starting fires",
		materials:{},
		commonness:[10, 0, 1000]
	},
	
	
	
	// adventuring
	{
		name:"grappling hook",
		cat:[],
		val:2,
		weight:0.5,
		desc:"A specially-bent hook good for catching onto things.",
		materials:{"iron":[100, 0, 10]},
		commonness:[1, 0, 1000]
	},
	
	{
		name:"rope",
		cat:[],
		val:1,
		weight:0.5,
		desc:"Five meters of good rope.",
		materials:{"fabric":[100, 0, 10]},
		commonness:[5, 0, 1000]
	},
	
	
	{
		name:"food rations",
		cat:[],
		val:3,
		weight:0.5,
		desc:"Five days worth of long-lasting food.",
		materials:{"food":[100,0,1000]},
		commonness:[2, 0, 1000]
	},
	
	{
		name:"alchemy ingredients",
		cat:[],
		val:1,
		weight:0.5,
		desc:"Herbs and other products for potion-making.",
		materials:{"food":[100,0,1000]},
		commonness:[5, 0, 1000]
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
		"matercant":["food"],
		"catmust":null,
		"catcant":["Clothing"],
		"itemcant":null,
		"commonness":[30, 0, 50]
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
	{
		"name":"rusty",
		"val":0.8,
		"desc":"Hasn't been taken care of much, but I reckon it's enough.",
		"matermust":["steel", "iron"],
		"catmust":null,
		"catcant":null,
		"itemcant":null,
		"commonness":[20, 0, 1000]
	},
	
	{
		"name":"caked",
		"val":0.8,
		"desc":"I can't get this hardened sludge off, but it's usable as is.",
		"matermust":null,
		"catmust":["Cooking"],
		"catcant":null,
		"itemcant":null,
		"commonness":[20, 0, 30]
	},
	
	{
		"name":"expired",
		"val":0.7,
		"desc":"Weird smell ? I smell nothing, personally.",
		"matermust":["food"],
		"catmust":null,
		"catcant":null,
		"itemcant":null,
		"commonness":[20, 0, 30]
	},
	
	{
		"name":"rotten",
		"val":0.3,
		"desc":"Don't pay attention to the color.. Or the flies.. It's protein !",
		"matermust":["food"],
		"catmust":null,
		"catcant":null,
		"itemcant":null,
		"commonness":[20, 0, 30]
	},
	
	
	{
		"name":"patched",
		"val":0.9,
		"desc":"This piece has been mended many times over the years.",
		"matermust":["fabric"],
		"catmust":["Clothing"],
		"catcant":null,
		"itemcant":["rich clothing"],
		"commonness":[20, 0, 5]
	},
	
	{
		"name":"moth-eaten",
		"val":0.6,
		"desc":"This piece is full of moth holes.",
		"matermust":["fabric"],
		"catmust":["Clothing"],
		"catcant":null,
		"itemcant":null,
		"commonness":[10, 0, 10]
	},
	
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
}


}

for (var i in objects.items)
{
	objects.items[i].type="Other"
	objects.items[i].weight=0.5
}

// subjects
// give each of them a 'sub' attribute {subjectType:name}
// and a "type" attribute
// and copy them in a big "subjects"
objects.subjects = []
var types = Object.keys(objects.subjectTypes)
for (var t in types)
{
	for (var i in objects.subjectTypes[types[t]])
	{
		objects.subjectTypes[types[t]][i].type = types[t]
		objects.subjectTypes[types[t]][i].sub = {[types[t]]:objects.subjectTypes[types[t]][i].name}
		var o = Object.assign({}, objects.subjectTypes[types[t]][i])
		objects.subjects.push(o)
	}
}