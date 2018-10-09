/*
format :
{
	"Name of category": {
		"names":{
			"singular name in minuscules":[rarity (natural), minimum value (natural), maximum value (natural)]
			},
		"atk": typical attack (relative),
		"par": typical parry (relative),
		"dmg": typical maximum damage (natural) ; calculations will use dmg/2 as mean,
		"val": typical value,
		"hands": number of hands needed,
		"weight":typical weight in kilograms (positive real multiple of 0.5),
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

let weapons=[
	{
		"name":"dagger",
		"cat":["Daggers"],
		"atk": 2,
		"par": -3,
		"dmg": 4,
		"val": 20,
		"hands":1,
		"weight":0.5,
		"dmgspread":1,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[50, 10, 1000]
	},
	
	{
		"name":"sword",
		"cat":["Swords"],
		"atk": 2,
		"par": 3,
		"dmg": 6,
		"val": 40,
		"hands":1,
		"weight":1,
		"dmgspread":10,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[50, 20, 1000],
	},
	/*
	  		"names":{
			"sword":
			"longsword":[30, 30, 1000],
			"short sword":[30,5,70],
			"backsword":[20,5,40]
			"bastard sword":[20,50,1000]
			},
	*/
	
	/*
			"names":{
			"sabre":[100, 10, 1000],
			"messer":[30,5,30],
			"falchion":[20,10,70],
			"scimitar":[10,30,1000],
			},
	*/
	{
		"name":"sabre",
		"cat":["Sabres"],
		"atk": 3,
		"par": 2,
		"dmg": 6,
		"val": 40,
		"hands":1,
		"weight":1,
		"dmgspread":10,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[30, 10, 1000]
	},
	
	{
		"name":"axe",
		"cat":["Axes"],
		"atk": 4,
		"par": -1,
		"dmg": 8,
		"val": 30,
		"hands":1,
		"weight":1,
		"dmgspread":5,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[60, 10, 1000]
	},
	
	{
		"name":"mace",
		"cat":["Maces"],
		"atk": 4,
		"par": -2,
		"dmg": 8,
		"val": 30,
		"hands":1,
		"weight":1,
		"dmgspread":1,
		"materials":{"steel":[100, 10, 1000]},
		"commonness":[30, 10, 1000]
	},
]
// So at first I had this away in another file
// But it turns out loading JS files from one another statically
// is anathema


let badMods=[
	{
		"name":"",
		"atk":0,
		"par":0,
		"dmg":1,
		"val":1,
		"desc":"",
		"materials":null,
		"cats":null,
		"commonness":[100, 0, 1000]
	},

	{
		"name":"rusty",
		"atk":-1,
		"par":-1,
		"dmg":0.8, // fraction
		"val":0.7, // fraction
		"desc":"",
		"materials":["steel", "iron"], // which materials this can be applied to
		"cats":null,
		"commonness":[20, 0, 1000]
	},
	
	{
		"name":"bent",
		"atk":-1,
		"par":-1,
		"dmg":1,
		"val":0.7,
		"desc":"",
		"materials":["steel", "iron"],
		"cats":null,
		"commonness":[15, 0, 1000]
	},
	
	{
		"name":"crude",
		"atk":0,
		"par":0,
		"dmg":0.8,
		"val":0.9,
		"desc":"",
		"materials":["steel", "iron"],
		"cats":["Swords", "Axes", "Sabres", "Daggers"],
		"commonness":[25, 0, 1000]
	},
]

let goodMods=[
	{
		"name":"",
		"atk":0,
		"par":0,
		"dmg":1,
		"val":1,
		"desc":"",
		"materials":null,
		"cats":null,
		"commonness":[100, 0, 1000]
	},
	
	{
		"name":"fine",
		"atk":1,
		"par":1,
		"dmg":1,
		"val":2,
		"desc":"",
		"materials":["steel"],
		"cats":null,
		"commonness":[10, 20, 1000]
	},
	
	{
		"name":"masterwork",
		"atk":2,
		"par":1,
		"dmg":1.3,
		"val":4,
		"desc":"",
		"materials":["steel"],
		"cats":null,
		"commonness":[5, 50, 1000]
	},
	
	{	
		"name":"silver",
		"atk":-1,
		"par":-1,
		"dmg":0.8,
		"val":4,
		"desc":"+4 DMG against undead",
		"materials":["steel"],
		"cats":null,
		"commonness":[5, 50, 1000]
	},
	
]


/*
 * returns linear interpolation from a to b at i
 * (0<i<1)
 */
function interp(a,b,i)
{
	return a+(b-a)*i
}

function sumArray(a)
{
	if (a.length==0)
		return 0
	if (a.length==0)
		return a[0]
	
	var sum=0
	for (var i in a)
		sum+=a[i]
	return sum
}

// uniform
// max exclusive
function getRandom(min, max)
{
	var min = Math.ceil(min)
	var max = Math.floor(max)
	return Math.floor(Math.random()*(max-min)) + min
}

// probably shit
function getGaussValue(mean, deviation)
{
	var u=0, v=0
	while(u===0) u = Math.random()
	while(v===0) u = Math.random()
	let num = Math.sqrt(-2.0*Math.log(u))*Math.cos(2.0*Math.PI * v)
	
	return mean + num * deviation
}


/*
 * takes a string of dice, of the form
 * <x1>d<y1>+...+<xi>d<yi>
 * 
 * returns an array with each xi in it yiu times
 */
function diceStrToArr(dice)
{
	dice=dice.replace(" ", "")
	dice=dice.split("+")

	var result = []
	
	for (var i in dice)
	{
		var n = parseInt(dice[i].split("d")[0])
		var d = parseInt(dice[i].split("d")[1])
		
		var j = 0
		while (j < n)
		{
			result.push(d)
			j++
		}
	}
	
	return result
}

/*
 * Given an array of dice
 * Returns the mean for those dice
 */
function diceMean(dice)
{
	const preCompValues={
			 2:1.5,
			 4:2.5,
			 6:3.5,
			 8:4.5,
			10:5.5,
			12:6.5,
			20:10.5
		}
	var totMean=0
	for (var i in dice)
	{
		
		// precomputed values to avoid too much inefficiency
		if (dice[i] in preCompValues)
		{
			totMean+=preCompValues[dice[i]]
			continue
		}
		
		var thisDieMean=0
		var j = 1
		while (j<=dice[i])
		{
			thisDieMean+=j
			j++
		}
		thisDieMean/=dice[i]
		totMean+=thisDieMean
	}
	return totMean
}


/*
 * recursive function
 * expects an array describing dice
 * and the mean of the total array
 * 
 * returns (in an array)
 * - sum of rolls
 * - number of rolls
 */ 
function computeDiceRolls(dice, mean)
{
	if (dice.length == 0)
		return [0,0]
		
	var roll = 1
	
	var buf = computeDiceRolls(dice.slice(1), mean)
	var r = [0,0]
	while (roll<=dice[0])
	{
		
		r[0]+=Math.pow(roll-mean, 2)+buf[0]
		r[1]+=1+buf[1]
		roll++
	}
	
	return r
}

/*
 * Given an array of dice
 * Returns the standard deviation for those dice
 */
function diceStdDeviation(dice)
{
	
	// compute every single combination
	// part of me thinks there could be a better way
	// at least in some cases, it's obvious..
	
	var s = computeDiceRolls(dice, diceMean(dice))
	return Math.sqrt(s[0]/s[1])
}


/*
 * approximates a dice combination to reach the given max with the
 * given standard deviation
 */
function nbToDice(max, deviation)
{
	var dice=[2,4,6,8,10,12,20,100]
	// first, find out what dice combinations would approximate the max
	
	// we build a list of available dice, work out a combination with
	// the biggest dice possible, then remove the biggest die and try
	// again
	var avail=[]
	var i = 0
	while (i<dice.length)
	{
		if (dice[i]>max+1)
			break
		avail[avail.length]=(dice[i])
		i++
	}
	
	var combos=[]
	while (avail.length>=1)
	{
		i=avail.length-1
		var cmb=[]
		while (i>0)
		{
			var s=sumArray(cmb)+avail[i]
			if (s <= max+1)
			{
				cmb.push(avail[i])
			}
			else // if (s > max+1)
			{
				i--
			}
		}
		if (cmb.length > 0) // shouldn't be needed..
		{
			//console.log("Empty dice combo produced for input "+max+", "+deviation)
			combos.push(cmb)
		}
		avail.pop()
	}
	
	console.log(combos)
	
	
	chosenCombo = []
	chosenComboDev = -1000
	
	for (var i in combos)
	{
		// TODO improve heuristic to also include max compared to target
		// Right now a 10.4 dmg masterwork mace gets 1d8 instead of 1d10
		var dev = diceStdDeviation(combos[i])
		if (Math.abs(deviation-dev) < Math.abs(deviation-chosenComboDev))
		{
			chosenCombo = combos[i]
			chosenComboDev = dev
		}
	}
	
	
	count={
		"2" :0,
		"4" :0,
		"6" :0,
		"8" :0,
		"10":0,
		"12":0,
		"20":0
	}
	for (var i in chosenCombo) // change to whichever combo is picked
	{
		count[chosenCombo[i].toString()]+=1
	}
	out=""
	for (var i in count)
	{
		if (count[i] != 0)
		{
			if (out != "")
				out+="+"
			out+=count[i]+"d"+i
		}
	}
	console.log("In: "+max+", "+deviation+", Out: "+out)
	return out
}





// weapon probabilities sum (for dart throwing)
// TODO fake random for shops that would stock a few of each category
// TODO use better repartition
weaponsSum=0
weaponPie=[]
for (var w in weapons)
{
	var i=weaponsSum
	weaponsSum+=weapons[w]["commonness"][0]
	while (i<weaponsSum)
	{
		weaponPie[i]=w
		i++
	}
	// this does feel a bit stupid eh
}
badModsSum=0
badModsPie=[]
for (var w in badMods)
{
	var i=badModsSum
	badModsSum+=badMods[w]["commonness"][0]
	while (i<badModsSum)
	{
		badModsPie[i]=w
		i++
	}
}
goodModsSum=0
goodModsPie=[]
for (var w in goodMods)
{
	var i=goodModsSum
	goodModsSum+=goodMods[w]["commonness"][0]
	while (i<goodModsSum)
	{
		goodModsPie[i]=w
		i++
	}
}





/*
 * returns an array of weapons
 * according to val spread
 */
function getItems(nbItems, meanval)
{
	chest=[]
	var i=0
	while (i<nbItems)
	{
		// this is for "final weapon", but I can't help but
		// pronounce it "firmware"
		fw={}
		
		w=weapons[weaponPie[getRandom(0,weaponsSum)]]
		
		fw.name=w.name
		fw.cat=w.cat
		fw.atk=w.atk
		fw.par=w.par
		fw.dmg=w.dmg
		fw.val=w.val
		fw.hands=w.hands
		fw.dmgspread=w.dmgspread
		fw.materials=w.materials
		fw.commonness = w.commonness
		
		// modifiers
		// TODO add checks
		var m={"name":""}
		if (fw.val > meanval)
		{
			m=badMods[badModsPie[getRandom(0,badModsSum)]]
		}
		else if (fw.val < meanval)
		{
			m=goodMods[goodModsPie[getRandom(0,goodModsSum)]]
		}
		if (m.name != "")
		{
			fw.name=m.name+" "+fw.name
			fw.atk+=m.atk
			fw.par+=m.par
			fw.dmg*=m.dmg
			fw.val*=m.val
			fw.desc+=" "+m.desc
		}
		
		fw.dmg=nbToDice(fw.dmg, fw.dmgspread)
		fw.name=fw.name.charAt(0).toUpperCase()+fw.name.slice(1)
		
		chest.push(fw)
		
		i++
	}
		
	/*
	for (var weap in cats)
	{
		w=cats[weap])
		
	}
	*/
	return chest
}


