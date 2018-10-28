var ranged = {
items:[
	{
	name:"hunting bow",
	cat:["Bows"],
	hiddencat:["Civilian"],
	desc:"Great for hunting small game.",
	atk:4,
	par:-7,
	dmg:5,
	min:3,  // start of optimal range, meters
	max:50, // end of optimal range
	val:5,
	hands:2,
	weight:1,
	dmgspread:3,
	"materials":{"wood":[100, 0, 1000]},
	"commonness":[50, 0, 1000]
	},
	
	{
	name:"longbow",
	cat:["Bows"],
	desc:"Look at how tall it is ! And its strength !",
	atk:6,
	par:-7,
	dmg:8,
	min:3,
	max:75,
	val:35,
	hands:2,
	weight:2,
	dmgspread:3,
	"materials":{"wood":[100, 0, 1000]},
	"commonness":[30, 0, 1000]
	},
	{
	name:"composite bow",
	cat:["Bows"],
	desc:"It's great technology ! Sensitive, but what potential.",
	atk:7,
	par:-7,
	dmg:8,
	min:3,
	max:75,
	val:65,
	hands:2,
	weight:3,
	dmgspread:3,
	"materials":{"wood":[100, 0, 1000]},
	"commonness":[15, 0, 1000]
	},
	
	{
	name:"sling",
	cat:["Special"],
	desc:"Using it takes a full turn. Simple but effective !",
	atk:-2,
	par:-5,
	dmg:3,
	min:3,
	max:20,
	val:1,
	hands:1,
	weight:0.5,
	dmgspread:1,
	"materials":{"fabric":[100, 0, 1000]},
	"commonness":[2, 0, 1000]
	},
	
	{
	name:"crossbow",
	cat:["Special"],
	desc:"Damage does not get STR bonuses. Loading it takes a standard action.",
	atk:10,
	par:-8,
	dmg:12,
	min:5,
	max:100, 
	val:150,
	hands:2,
	weight:7,
	dmgspread:2.4,
	"materials":{"wood":[100, 0, 1000], "steel":[30,150,1000]},
	"commonness":[5, 10, 1000]
	},
	
	{
	name:"M60",
	cat:["Special"],
	hiddencat:["Unique"],
	desc:"A cold war gas-operated, rotating bolt machine gun. 10 rounds burst.",
	atk:20,
	par:-8,
	dmg:20,
	min:1,
	max:200, 
	val:6000,
	hands:2,
	weight:10,
	dmgspread:4,
	"materials":{"steel":[30,0,1000]},
	"commonness":[0, 1000, 10000]
	},
],

badMods:[
	{
		"name":"",
		"atk":1,
		"par":1,
		"dmg":1,
		"min":1,
		"max":1,
		"dmgspread":1,
		"val":1,
		"desc":"",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[100, 0, 1000]
	},
	{
		"name":"cracked",
		"atk":0.8,
		"par":1,
		"dmg":0.6,
		"min":1,
		"max":0.6,
		"dmgspread":1,
		"val":0.5,
		"desc":"Little cracks here and there, nothing major.",
		"matermust":["wood"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[10, 0, 1000]
	},
	
	{
		"name":"crude",
		"atk":0.8,
		"par":1,
		"dmg":0.8,
		"min":1,
		"max":0.8,
		"dmgspread":2,
		"val":0.8,
		"desc":"This one was made by some apprentice, I believe.",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"wpcant":["sling"],
		"commonness":[25, 0, 50]
	},

	{
		"name":"rusty",
		"atk":0.8,
		"par":1,
		"dmg":0.8,
		"min":1,
		"max":0.8,
		"dmgspread":1,
		"val":0.7,
		"desc":"Hasn't been taken care of much, but I reckon it's enough.",
		"matermust":["steel", "iron"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[20, 0, 1000]
	},
],

goodMods:[
	{
		"name":"",
		"atk":1,
		"par":1,
		"dmg":1,
		"min":1,
		"max":1,
		"dmgspread":1,
		"val":1,
		"desc":"",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[100, 0, 1000]
	},
	
	{
		"name":"fine",
		"atk":1.3,
		"par":1,
		"dmg":1,
		"min":1,
		"max":1.4,
		"dmgspread":0.8,
		"val":2,
		"desc":"And it's hard to get better quality than this !",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[10, 20, 5000]
	},
	
	{
		"name":"masterwork",
		"atk":1.6,
		"par":1,
		"dmg":1.3,
		"min":1,
		"max":1.8,
		"dmgspread":1,
		"val":4.5,
		"desc":"And admire the piece of art that it is !",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[5, 50, 10000]
	},
]

}

for (var i in ranged.items)
	ranged.items[i].type="Ranged Weapon"
for (var i in ranged.goodMods)
	ranged.goodMods[i].type="Ranged Weapon"
for (var i in ranged.badMods)
	ranged.badMods[i].type="Ranged Weapon"
for (var i in ranged.items)
{
	// meta-categories
	
	if (!ranged.items[i].hiddencat)
		ranged.items[i].hiddencat=[]
	
	ranged.items[i].hiddencat.push(ranged.items[i].hands+"-handed")
	
	ranged.items[i].toString = function() {
	return this.name+" ("+this.cat+")\n"
		+ "ATK "+this.atk+" PAR "+this.par+"\n"
		+ "MIN "+this.min+" MAX "+this.max+"\n"
		+ "DMG "+this.dmg+"\n"
		+ "HND "+this.hands+" VAL "+this.val+" W "+this.weight+"kg"

	}
}