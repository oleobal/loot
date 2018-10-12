/*
format :
{
	{
		"name":<name of weapon in minuscules>,
		"cat":[list of category names, capitalized],
		"hiddencat":[], (same as cat, optional, used by the system but not displayed to the user)
		"atk": typical attack (real, rounded after mods),
		"par": typical parry (real, rounded after mods),
		(I recommend not using 0, and using -0.4 to 0.4 instead)
		"dmg": typical maximum damage (natural) ; calculations will use dmg/2 as mean,
		"val": typical value in gold pieces (natural),
		"hands": natural, number of hands needed (typically 1 or 2),
		"weight":typical weight in kilograms (positive real, multiple of 0.5),
		"dmgspread": variance (scale),
		"materials":{"material name":[rarity (natural), minimum value (natural), maximum value (natural)]}
	},
}

"typical" values describe the kind of weapon an adventurer "ought" to get, that's neither too cheap nor too expensive for its class.

rarity (for names and materials) is an arbitrary unit, that describe the size of the pie for that name/material
minimum and maximum values is the range (inclusive) at which this name/material can appear

dmg and dmgspread are plugged in a gaussian function :

e^(-(x-(dmg/2)^2/(2*dmgspread^2))/(sqrt(2*pi)*dmgspread)

which is then (through magic) turned into dice rolls
*/

var weapons=[
	// DAGGERS
	
	{
		"name":"dagger",
		"cat":["Daggers"],
		"desc": "A double-edged blade apt for thrusting and slashing.",
		"atk": 2,
		"par": -3,
		"dmg": 4,
		"val": 15,
		"hands":1,
		"weight":0.5,
		"dmgspread":1,
		"materials":{"steel":[100, 2, 1000], "iron":[20, 0, 5]},
		"commonness":[50, 10, 1000]
	},
	
	{
		"name":"kitchen knife",
		"cat":["Daggers"],
		"desc": "Knives are ever useful ! Who knows what could happen ?",
		"atk": 0,
		"par": -3,
		"dmg": 3,
		"val": 2,
		"hands":1,
		"weight":0.5,
		"dmgspread":2,
		"materials":{"steel":[100, 2, 1000], "iron":[20, 0, 5]},
		"commonness":[15, 0,10]
	},
	
	{
		"name":"parrying dagger",
		"cat":["Daggers"],
		"desc": "See the stout quillons for use in the off-hand ?",
		"atk": 1,
		"par": 0,
		"dmg": 4,
		"val": 30,
		"hands":1,
		"weight":0.5,
		"dmgspread":2,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[5, 25,100]
	},
	
	{
		"name":"stiletto",
		"cat":["Daggers"],
		"desc": "Its very long and slender blade is perfect for stabbing.",
		"atk": 4,
		"par": -3,
		"dmg": 5,
		"val": 30,
		"hands":1,
		"weight":0.5,
		"dmgspread":3,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[10, 0,100]
	},
	
	{
		"name":"miséricorde",
		"cat":["Daggers"],
		"desc": "A heavy dagger for putting down armored foes. Very rare !",
		"atk": 2,
		"par": -2,
		"dmg": 8,
		"val": 60,
		"hands":1,
		"weight":0.5,
		"dmgspread":1.5,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[5, 0,100]
	},
	
	// SWORDS
	
	{
		"name":"sword",
		"cat":["Swords"],
		"desc": "'Sword' is all I was told it was called.",
		"atk": 2,
		"par": 3,
		"dmg": 6,
		"val": 40,
		"hands":1,
		"weight":1,
		"dmgspread":3,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[70, 20, 1000],
	},
	
	{
		"name":"short sword",
		"cat":["Swords"],
		"desc": "Longer than four hands, not a dagger anymore, I say.",
		"atk": 3,
		"par": 1,
		"dmg": 5,
		"val": 30,
		"hands":1,
		"weight":1,
		"dmgspread":3,
		"materials":{"steel":[100, 10, 1000], "iron":[100, 10, 1000]},
		"commonness":[50, 0, 1000],
	},
	
	
	{
		"name":"longsword",
		"cat":["Swords"], // TODO fix up hand and a half name
		"desc": "Or 'Hand and a half' sword.",
		"atk": 2,
		"par": 4,
		"dmg": 5,
		"val": 50,
		"hands":1,
		"weight":1,
		"dmgspread":3,
		"materials":{"steel":[100, 00, 1000]},
		"commonness":[40, 30, 1000],
	},
	
	{
		"name":"bastard sword",
		"cat":["Swords"], 
		"desc": "To me, it has all the good from a longsword, but is handier.",
		"atk": 3,
		"par": 4,
		"dmg": 6,
		"val": 70,
		"hands":1,
		"weight":1,
		"dmgspread":2.5,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[30, 0, 1000],
	},
	
	
	// SABRES
	
	{
		"name":"sabre",
		"cat":["Sabres"],
		"desc":"It has a nicely curved blade with only that edge sharp.",
		"atk": 3,
		"par": 2,
		"dmg": 6,
		"val": 40,
		"hands":1,
		"weight":1,
		"dmgspread":3,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[30, 10, 1000]
	},
	
	{
		"name":"messer",
		"cat":["Sabres"],
		"desc":"Legally, it's but a knife, see. A sort of civilian falchion.",
		"atk": 1,
		"par": 1,
		"dmg": 5,
		"val": 15,
		"hands":1,
		"weight":1,
		"dmgspread":3,
		"materials":{"steel":[100, 0, 1000], "iron":[100, 0, 15]},
		"commonness":[20, 0, 1000]
	},
	
	{
		"name":"falchion",
		"cat":["Sabres"],
		"desc":"Perfect for whacking like this, haha ! Cut their arms off !",
		"atk": 3,
		"par": 1,
		"dmg": 7,
		"val": 30,
		"hands":1,
		"weight":1,
		"dmgspread":3,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[10, 0, 1000]
	},
	
	{
		"name":"scimitar",
		"cat":["Sabres"],
		"desc":"Look at this curve.. You need to have the skill, of course.",
		"atk": 3,
		"par": 3,
		"dmg": 6.5,
		"val": 50,
		"hands":1,
		"weight":1,
		"dmgspread":2.5,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[5, 30, 1000]
	},
	
	{
		"name":"great sabre",
		"cat":["Sabres"],
		"desc":"I'd call this unwieldy, it's more of a cavalry weapon I think.",
		"atk": 2,
		"par": 0,
		"dmg": 8,
		"val": 60,
		"hands":1,
		"weight":2,
		"dmgspread":3,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[2, 30, 1000]
	},
	
	
	// AXES
	
	{
		"name":"battle axe",
		"cat":["Axes"],
		"desc":"Great for getting over shields and ending it quickly !",
		"atk": 4,
		"par": -1,
		"dmg": 8,
		"val": 30,
		"hands":1,
		"weight":2,
		"dmgspread":2,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[50, 10, 1000]
	},
	
	{
		"name":"war hammer",
		"cat":["Axes"],
		"desc":"Cross hammerhead there, spike here.. Fantastic for armor.",
		"atk": 3,
		"par": -2,
		"dmg": 12,
		"val": 65,
		"hands":1,
		"weight":3,
		"dmgspread":2.25,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[30, 10, 1000]
	},
	
	
	// MACES
	
	{
		"name":"mace",
		"cat":["Maces"],
		"desc":"'Just an iron stick' ? It's a mace !",
		"atk": 2,
		"par": -2,
		"dmg": 6,
		"val": 20,
		"hands":1,
		"weight":3,
		"dmgspread":1.5,
		"materials":{"steel":[100, 10, 1000], "iron":[100, 0, 15]},
		"commonness":[15, 0, 1000]
	},
	
	
	{
		"name":"club",
		"cat":["Maces"],
		"desc":"Well, sometimes, simple things to the job.",
		"atk": 0,
		"par": -2,
		"dmg": 5,
		"val": 1,
		"hands":1,
		"weight":2,
		"dmgspread":1.5,
		"materials":{"wood":[100, 0, 1000]},
		"commonness":[10, 0, 2]
	},
	
	{
		"name":"morningstar",
		"cat":["Maces"],
		"desc":"I guarantee people feel these through their armor.",
		"atk": 4,
		"par": -2,
		"dmg": 8,
		"val": 35,
		"hands":1,
		"weight":3,
		"dmgspread":1.5,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[15, 10, 1000]
	},
	
	{
		"name":"flanged mace",
		"cat":["Maces"],
		"desc":"Those are called flanges.. They're more reliable than spikes.",
		"atk": 5,
		"par": -2,
		"dmg": 8,
		"val": 60,
		"hands":1,
		"weight":3,
		"dmgspread":1.5,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[10, 10, 1000]
	},
	

	// SHIELDS

	{
		"name":"round shield",
		"cat":["Shields"],
		"desc":"You wouln't think of fighting without one ? Everyone has one !",
		"atk": -1,
		"par":  4,
		"dmg":  2,
		"val": 15,
		"hands":1,
		"weight":3,
		"dmgspread":1,
		"materials":{"wood":[100, 0, 1000]},
		"commonness":[80, 0, 1000]
	},

	{
		"name":"square shield",
		"cat":["Shields"],
		"desc":"Unwieldy ? Maybe.. But what protection ! And at what cost !",
		"atk": -2,
		"par":  5,
		"dmg":  2,
		"val": 25,
		"hands":1,
		"weight":4,
		"dmgspread":1,
		"materials":{"wood":[100, 0, 1000], "steel":[20, 30, 1000]},
		"commonness":[30, 0, 1000]
	},
	

	{
		"name":"kite shield",
		"cat":["Shields"],
		"desc":"My own grandfather used one like this in his time. Timeless !",
		"atk": -2,
		"par":  6,
		"dmg":  2,
		"val": 35,
		"hands":1,
		"weight":4,
		"dmgspread":1,
		"materials":{"wood":[100, 0, 1000], "steel":[20, 30, 1000]},
		"commonness":[20, 0, 1000]
	},

	{
		"name":"écu",
		"cat":["Shields"],
		"desc":"A knight's, truly. What glory, what destiny behind it !",
		"atk": -1,
		"par":  6,
		"dmg":  2,
		"val": 50,
		"hands":1,
		"weight":3,
		"dmgspread":1,
		"materials":{"wood":[100, 0, 1000], "steel":[20, 30, 1000]},
		"commonness":[30, 0, 1000]
	},



	// SPECIALS


	{
		"name":"falcata",
		"cat":["Swords", "Axes"],
		"desc":"See, messire : choppier than a sword, pointier than an axe !",
		"atk":  4,
		"par":  1,
		"dmg":  8,
		"val": 90,
		"hands":1,
		"weight":3,
		"dmgspread":3,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[1, 0, 1000]
	},

	{
		"name":"backsword",
		"cat":["Swords", "Sabres"],
		"desc":"Well, yes, you can use like this as well. And look at this price !",
		"atk":  2,
		"par":  2,
		"dmg":  5,
		"val": 25,
		"hands":1,
		"weight":1,
		"dmgspread":3,
		"materials":{"steel":[100, 0, 1000], "iron":[20, 0, 24]},
		"commonness":[15, 0, 1000]
	},


	// ========== TWO HANDED ==========
	
	// GREATSWORDS
	
	{
		"name":"greatsword",
		"cat":["Great swords"],
		"desc":"Those are less popular than they should be, I tell you.",
		"atk": 2,
		"par": 5,
		"dmg": 6,
		"val": 40,
		"hands":2,
		"weight":3,
		"dmgspread":3,
		"materials":{"steel":[100, 10, 1000], "iron":[100,0,20]},
		"commonness":[50, 10, 1000]
	},
	
	{
		"name":"claymore",
		"cat":["Great swords"],
		"desc":"It's quite handy, I agree, but look at these aesthetics !",
		"atk": 3,
		"par": 5,
		"dmg": 8,
		"val": 50,
		"hands":2,
		"weight":3,
		"dmgspread":3,
		"materials":{"steel":[100, 10, 1000], "iron":[100,0,20]},
		"commonness":[20, 10, 1000]
	},
	
	{
		"name":"zweihander",
		"cat":["Great swords"],
		"desc":"See, you can grab the blade here, for different techniques.",
		"atk": 3,
		"par": 7,
		"dmg": 8,
		"val": 80,
		"hands":2,
		"weight":3,
		"dmgspread":3,
		"materials":{"steel":[100, 10, 1000], "iron":[100,0,20]},
		"commonness":[25, 10, 1000]
	},
	
	{
		"name":"estoc",
		"cat":["Great swords"],
		"desc":"Just thrusting, yes, but what power behind each thrust !",
		"atk": 4,
		"par": 5,
		"dmg": 10,
		"val": 110,
		"hands":2,
		"weight":3,
		"dmgspread":2.7,
		"materials":{"steel":[100, 0, 1000]},
		"commonness":[10, 0, 1000]
	},
	
	// GREAT AXES
	
	{
		"name":"great war axe",
		"cat":["Great axes"],
		"desc":"Only someone like you would have the great skill required !",
		"atk": 0.4,
		"par": -6,
		"dmg": 16,
		"val": 55,
		"hands":2,
		"weight":5,
		"dmgspread":3.25,
		"materials":{"steel":[100, 10, 1000], "iron":[100,0,20]},
		"commonness":[5, 0, 1000]
	},
	
	{
		"name":"woodcutter",
		"cat":["Great axes"],
		"desc":"Indispensable when setting up camp !",
		"atk": 1,
		"par": -4,
		"dmg": 6,
		"val": 5,
		"hands":2,
		"weight":5,
		"dmgspread":3,
		"materials":{"steel":[100, 5, 1000], "iron":[100,0,10]},
		"commonness":[10, 0, 1000]
	},
	
	{
		"name":"pickaxe",
		"cat":["Great axes"],
		"desc":"Best for digging, but you could also hurt someone quite badly.",
		"atk": -1,
		"par": -5,
		"dmg": 8,
		"val": 5,
		"hands":2,
		"weight":5,
		"dmgspread":3,
		"materials":{"steel":[100, 5, 1000], "iron":[100,0,10]},
		"commonness":[10, 0, 1000]
	},
	
	{
		"name":"bardiche",
		"cat":["Great axes"],
		"desc":"The fright of your enemies sighting the executioner's tool !",
		"atk": 1,
		"par": -3,
		"dmg": 12,
		"val": 30,
		"hands":2,
		"weight":5,
		"dmgspread":3.25,
		"materials":{"steel":[100, 5, 1000], "iron":[50,0,10]},
		"commonness":[10, 0, 1000]
	},
	
	
	// POLEARMS
	
	{
		"name":"pike",
		"cat":["Polearms"],
		"desc":"The ever-present pike ! Great for battle in group formation.",
		"atk": 2,
		"par": -3,
		"dmg": 6,
		"val": 10,
		"hands":2,
		"weight":4,
		"dmgspread":3,
		"materials":{"steel":[100, 5, 1000], "iron":[50,0,10]},
		"commonness":[50, 0, 1000]
	},
	
	{
		"name":"sharp stick",
		"cat":["Polearms"],
		"desc":"Sometimes, the simple tools do their task the best.",
		"atk": 0,
		"par": -3,
		"dmg": 6,
		"val": 2,
		"hands":2,
		"weight":3,
		"dmgspread":3,
		"materials":{"wood":[100, 0, 1000]},
		"commonness":[5, 0, 1000]
	},
	
	{
		"name":"war scythe",
		"cat":["Polearms"],
		"desc":"More of a peasant's weapon. A scythe with the blade upwards.",
		"atk": 0,
		"par": -3,
		"dmg": 6,
		"val": 5,
		"hands":2,
		"weight":4,
		"dmgspread":3,
		"materials":{"steel":[100, 5, 1000], "iron":[100,0,10]},
		"commonness":[5, 0, 1000]
	},
	
	{
		"name":"bill-hook",
		"cat":["Polearms"],
		"desc":"The man who first combined a cleaver and a hook was a genius !",
		"atk": 3,
		"par": -3,
		"dmg": 8,
		"val": 30,
		"hands":2,
		"weight":4,
		"dmgspread":3,
		"materials":{"steel":[100, 5, 1000], "iron":[100,0,10]},
		"commonness":[10, 0, 1000]
	},
	
	{
		"name":"poleaxe",
		"cat":["Polearms"],
		"desc":"It's like a halberd's little sister, see the head.",
		"atk": 4,
		"par": -3,
		"dmg": 8,
		"val": 40,
		"hands":2,
		"weight":4,
		"dmgspread":3,
		"materials":{"steel":[100, 5, 1000]},
		"commonness":[10, 0, 1000]
	},
	
	{
		"name":"halberd",
		"cat":["Polearms"],
		"desc":"The queen of polearms ! Stab, smash and slice !",
		"atk": 4,
		"par": -3,
		"dmg": 10,
		"val": 50,
		"hands":2,
		"weight":6,
		"dmgspread":2.75,
		"materials":{"steel":[100, 5, 1000]},
		"commonness":[10, 0, 1000]
	},
	
]

var badMods=[
	{
		// This is a "no modifier" modifier
		"name":"", // added (+ a space) at the start of the name
		"atk":1, // multiplied
		"par":1, // multiplied
		// ATK and PAR are  multiplied but with special rules, since they can
		// be applied to negative stats.
		// a value >1 will always make the weapon better, and <1 always worse
		"dmg":1, // multiplied
		"dmgspread":1, // multiplied
		"val":1, // multiplied
		// the result for each of those multipliers is rounded
		"desc":"", // added (+ a space) at the end of the desc
		"matermust":null, // which materials this can be applied to
		"matercant":null, // which materials this can't be applied to
		"catmust":null, // which categories this can be applied to
		"catcant":null, // which categories this can't be applied to
		// categories considered include hidden categories (weapon.hiddencat)
		"wpcant":null, // weapon names to specifically exclude
		// for these last ones, null == no restrictions
		// they can also be left undefined
		"commonness":[100, 0, 1000]
		// at which frequency this appears, which values this can be applied to
		// the value check is made AFTER the modifier is applied
	},

	{
		"name":"rusty",
		"atk":0.8,
		"par":0.8,
		"dmg":0.8,
		"dmgspread":1,
		"val":0.7,
		"desc":"Hasn't been taken care of much, but I reckon it's enough.",
		"matermust":["steel", "iron"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[20, 0, 1000]
	},
	
	{
		"name":"bent",
		"atk":0.8,
		"par":0.8,
		"dmg":1,
		"dmgspread":1.5,
		"val":0.75,
		"desc":"A bit unbalanced, yes, but holding it like this works.",
		"matermust":["steel", "iron"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[15, 0, 1000]
	},
	
	{
		"name":"chipped",
		"atk":1,
		"par":0.8,
		"dmg":1,
		"dmgspread":1.5,
		"val":0.8,
		"desc":"Slight battle damage here and there, but still in good shape !",
		"matermust":null,
		"matercant":["wood"], // now obviously wood can be chipped..
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[15, 0, 1000]
	},
	
	{
		"name":"crude",
		"atk":1,
		"par":1,
		"dmg":0.8,
		"dmgspread":2,
		"val":0.9,
		"desc":"This one was made by some apprentice, I believe.",
		"matermust":["steel", "iron"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[25, 0, 50]
	},
	
	{
		"name":"half a",
		"atk":0.3,
		"par":0.7,
		"dmg":0.5,
		"dmgspread":2,
		"val":0.3,
		"desc":"Only half the blade remains with the handle on that one.",
		"matermust":["steel", "iron"],
		"catmust":["Daggers", "Swords"],
		"catcant":["Axes"],
		"wpcant":null,
		"commonness":[25, 0, 50]
	},
	
	{
		"name":"beaten",
		"atk":1,
		"par":0.7,
		"dmg":1,
		"dmgspread":1,
		"val":0.8,
		"desc":"Judging by its looks, this one sure made itself useful !",
		"matermust":null,
		"matercant":null,
		"catmust":["Shields"],
		"catcant":null,
		"wpcant":null,
		"commonness":[25, 0, 100]
	},
]

var goodMods=[
	{
		"name":"",
		"atk":1,
		"par":1,
		"dmg":1,
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
		"par":1.3,
		"dmg":1,
		"dmgspread":0.8,
		"val":2,
		"desc":"And it's hard to get better quality than this !",
		"matermust":["steel"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[10, 20, 1000]
	},
	
	{
		"name":"masterwork",
		"atk":1.6,
		"par":1.6,
		"dmg":1.3,
		"dmgspread":1,
		"val":4.5,
		"desc":"And admire the piece of art that it is !",
		"matermust":["steel"],
		"catmust":null,
		"catcant":null,
		"wpcant":null,
		"commonness":[5, 50, 1000]
	},
	
	{
		"name":"silver",
		"atk":0.7,
		"par":0.7,
		"dmg":0.8,
		"dmgspread":1,
		"val":3.5,
		"desc":"Made of silver, it deals +4 DMG against undead.",
		"matermust":["steel"],
		"catmust":null,
		"catcant":["Shields"],
		"wpcant":null,
		"commonness":[5, 50, 1000]
	},
	
	
	{
		"name":"flamberged",
		"atk":1,
		"par":1.6,
		"dmg":0.8,
		"dmgspread":1,
		"val":4,
		"desc":"And not only is the flaming gorgeous, it also helps parrying !",
		"matermust":["steel"],
		"catmust":["Swords", "Great swords"],
		"catcant":["Axes", "Sabres"],
		"wpcant":["estoc"],
		"commonness":[5, 200, 1000]
	},
	
	{
		"name":"painted",
		"atk":1,
		"par":1,
		"dmg":1,
		"dmgspread":1,
		"val":1,
		"desc":"And I must say, the decoration on this one is quite nice.",
		"matermust":null,
		"matercant":null,
		"catmust":["Shields"],
		"catcant":null,
		"wpcant":null,
		"commonness":[5, 0, 1000]
	},
	
]

// Add a few things to all of them

for (var i in weapons)
	weapons[i].type="weapon"
for (var i in goodMods)
	goodMods[i].type="weapon"
for (var i in badMods)
	badMods[i].type="weapon"
for (var i in weapons)
{
	if (!weapons[i].hiddencat)
		weapons[i].hiddencat=[]
	weapons[i].hiddencat.push(weapons[i].hands+"-handed")
}