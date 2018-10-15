/**
 * armors
 *
 */

var armors = {
items : [
	{
		name:"chainmail",
		cat:["Light Armors"],
		dmg:4,
		dmgspread:0.5,
		val:60,
		dexmod:-1,
		desc:"A set of riveted chain mail that perfectly contours one's body.",
		weight:10,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[50, 0, 1000]
	}
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
],
}


for (var i in armors.items)
	armors.items[i].type="Armor"
for (var i in armors.goodMods)
	armors.goodMods[i].type="Armor"
for (var i in armors.badMods)
	armors.badMods[i].type="Armor"
for (var i in armors.items)
{
	// meta-categories
	
	if (!armors.items[i].hiddencat)
		armors.items[i].hiddencat=[]
}