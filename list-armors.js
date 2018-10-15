/**
 * armors
 *
 */

var armor = {
items : [
	{
		name:"padding",
		cat:["Light Armors"],
		dmg:2,
		dmgspread:0.5,
		val:10,
		dexmod:0,
		desc:"Thick clothing, usually worn under a set.",
		weight:3,
		"materials":{"fabric":[100, 0, 1000]},
		"commonness":[10, 0, 1000]
	},
	
	{
		name:"leather armor",
		cat:["Light Armors"],
		dmg:4,
		dmgspread:0.5,
		val:30,
		dexmod:0,
		desc:"Stiff, hardened leather ! Try punching it, you'll see.",
		weight:5,
		"materials":{"fabric":[100, 0, 1000]},
		"commonness":[15, 0, 1000]
	},
	
	{
		name:"brigandine",
		cat:["Light Armors"],
		dmg:5,
		dmgspread:1.5,
		val:40,
		dexmod:-1,
		desc:"Metal scales are affixed to the fabric like so. It's easy to make.",
		weight:5,
		"materials":{"steel":[20,40,1000], "iron":[50,45,1000] ,"fabric":[100, 0, 1000]},
		"commonness":[25, 0, 1000]
	},
	
	{
		name:"chainmail",
		cat:["Light Armors"],
		dmg:6,
		dmgspread:1,
		val:60,
		dexmod:0,
		desc:"This set of riveted chain mail perfectly contours one's body !",
		weight:10,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[60, 0, 1000]
	},
	
	{
		name:"torso cuirass",
		cat:["Light Armors"],
		dmg:7,
		dmgspread:2.1,
		val:90,
		dexmod:0,
		desc:"Great protection for what matters, leaving you free to move.",
		weight:8,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[30, 0, 1000]
	},
	
	
	// HEAVY ARMORS
	
	{
		name:"laminar armor",
		cat:["Heavy Armors"],
		dmg:7,
		dmgspread:1.5,
		val:70,
		dexmod:-2,
		desc:"Horizontal strips of metal. Some say outdated, I say effective !",
		weight:12,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[15, 0, 1000]
	},
	
	{
		name:"plated mail",
		cat:["Heavy Armors"],
		dmg:8,
		dmgspread:1.5,
		val:100,
		dexmod:-2,
		desc:"Full body mail with metal plates where it matters. The best !",
		weight:13,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[20, 0, 1000]
	},
	
	{
		name:"Early plate armor",
		cat:["Heavy Armors"],
		dmg:10,
		dmgspread:2.4,
		val:150,
		dexmod:-3,
		desc:"What better protection ? The man of iron knows no fear !",
		weight:17,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[15, 0, 1000]
	},
	
	{
		name:"Late plate armor",
		cat:["Heavy Armors"],
		dmg:12,
		dmgspread:2.3,
		val:350,
		dexmod:-2,
		desc:"These new designs allow for fine joints and thorough plating.",
		weight:20,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[10, 0, 10000]
	},
],

badMods : [
	{
		"name":"",
		"dmg":1,
		"dmgspread":1,
		"val":1,
		"dexmod":1,
		"desc":"",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[100, 0, 1000]
	},
	
	{
		"name":"rusty",
		"dmg":1,
		"dmgspread":3,
		"val":0.8,
		"dexmod":1,
		"desc":"This one did sit around here and there, but it works fine !",
		"matermust":["steel", "iron"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[30, 0, 150]
	},
	
	{
		"name":"crude",
		"dmg":0.8,
		"dmgspread":1,
		"val":0.6,
		"dexmod":0.6,
		"desc":"I believe this one was made by an apprentice.",
		"matermust":null,
		"catmust":null,
		"catcant":null,
		"wpcant":["padding"],
		"commonness":[30, 0, 100]
	},
],

goodMods : [
	{
		"name":"",
		"dmg":1,
		"dmgspread":1,
		"dexmod":1,
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
		"dmg":1.2,
		"dmgspread":0.9,
		"dexmod":1.2,
		"val":2,
		"desc":"And see the quality of this one !",
		"matermust":["steel"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[15, 75, 10000]
	},
	
	{
		"name":"masterwork",
		"dmg":1.5,
		"dmgspread":1,
		"dexmod":1.5,
		"val":4.5,
		"desc":"And see these details, this workmanship.. A master's work !",
		"matermust":["steel"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[5, 100, 10000]
	},
],
}


for (var i in armor.items)
	armor.items[i].type="Armor"
for (var i in armor.goodMods)
	armor.goodMods[i].type="Armor"
for (var i in armor.badMods)
	armor.badMods[i].type="Armor"
for (var i in armor.items)
{
	// meta-categories
	
	if (!armor.items[i].hiddencat)
		armor.items[i].hiddencat=[]
}