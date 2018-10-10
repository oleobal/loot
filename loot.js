/**
 * This files contains functions for generating equipment
 * Do import utility.js and weapons.js before this file !
 * 
 * 
 */

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
 * 
 * returns an array of sum of rolls
 * once for each combination
 */ 
function computeDiceRolls(dice)
{
	var roll = 1
	var result = []
	
	if (dice.length == 1)
	{
		while (roll<=dice[0])
		{
			result.push(roll)
			roll++
		}
		return result
	}
	
	var source = computeDiceRolls(dice.slice(1))
	while (roll<=dice[0])
	{
		for (i in source)
			result.push(roll+source[i])
		roll++
	}
	
	return result
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
	
	var set = computeDiceRolls(dice)
	var mean = diceMean(dice)
	
	var sum = 0
	for (var i in set)
	{
		sum+=Math.pow(set[i]-mean, 2)
	}
	return Math.sqrt(sum/set.length)
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
		while (i>=0)
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
	
	//console.log(combos)
	
	
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
	//console.log("In: "+max+", "+deviation+", Out: "+out)
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


/**
 * given a weapon and modifier, 
 * returns a copy of that weapon with the mod applied
 * also adds a "appliedModifier" field (string or null)
 */
function finalizeWeapon(weapon, mod)
{
	// this is for "final weapon", but I can't help but
	// pronounce it "firmware"
	fw=Object.assign({}, weapon)
	
	fw.appliedModifier=null
	if (mod != null && mod.name != "")
	{
		// category check
		if (mod.cats!=null)
		{
			var ok=false
			for (var i in weapon.cat)
			{
				if (mod.cats.indexOf(weapon.cat[i])>=0)
				{
					ok=true
					break
				}
			}
			if (!ok)
				throw "Not the right category "+mod.name+" "+weapon.name
		}
		// material check
		if (mod.materials!=null)
		{
			var ok=false
			var mats = Object.keys(weapon.materials)
			for (var i in mats)
			{
				if (mod.materials.indexOf(mats[i])>=0)
				{
					ok=true
					break
				}
			}
			if (!ok)
				throw "Not the right material "+mod.name+" "+weapon.name
		}
		
		fw.name=mod.name+" "+fw.name
		fw.atk+=mod.atk
		fw.par+=mod.par
		fw.dmg*=mod.dmg
		fw.dmgspread*=mod.dmgspread
		fw.val=Math.round(fw.val*mod.val)
		fw.desc+=" "+mod.desc
		fw.appliedModifier=mod.name
		
		// value check comes after the modifier is applied
		if (fw.val < mod.commonness[1])
			throw "Value too low ("+fw.val+">"+mod.commonness[1]+") "+mod.name+" "+weapon.name
		if (fw.val > mod.commonness[2])
			throw "Value too high ("+fw.val+">"+mod.commonness[2]+") "+mod.name+" "+weapon.name
		
	}
		
	
	fw.dmg=nbToDice(fw.dmg, fw.dmgspread)
	fw.name=fw.name.charAt(0).toUpperCase()+fw.name.slice(1)
		
	return fw
}

/*
 * returns an array of weapons
 * according to val spread
 */
function getRandomItems(nbItems, meanval)
{
	chest=[]
	var i=0
	while (i<nbItems)
	{
		w=weapons[weaponPie[getRandom(0,weaponsSum)]]
		
		// modifiers
		try
		{
			var m=null
			if (w.val > meanval)
				m=badMods[badModsPie[getRandom(0,badModsSum)]]
			else if (w.val < meanval)
				m=goodMods[goodModsPie[getRandom(0,goodModsSum)]]
			var fw = finalizeWeapon(w, m)
		}
		catch (err)
		{
			var fw = finalizeWeapon(w, null)
		}
		
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


/**
 * return an array of all possible weapon combinations
 */
function getAllCombinations()
{
	var result=[]
	var mods = goodMods.concat(badMods.slice(1))
	// slice because else we get the neutral mod twice
	for (var i in weapons)
	{
		for (var j in mods)
		{
			try
			{
					result.push(finalizeWeapon(weapons[i], mods[j]))
			}
			catch (err)
			{
				console.log(err)
			}
		}
	}

	return result
}