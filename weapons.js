/**
 * This files contains functions for generating equipment
 * Import utility.js before.
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

/**
 * Returns a small help text for weapon attributes (name, cat, atk..)
 */
function getWeaponHelpText(attribute)
{
	switch(attribute)
	{
		case "name":
			return "Name of the weapon."
		case "cat" :
			return "Class(es) this weapon belongs to."
		case "min" :
			return "Start of this weapon's optimal range, meters."
		case "max" :
			return "End of this weapon's optimal range, meters."
		case "atk" :
			return "How good this weapon is at attacking."
		case "par" :
			return "How good this weapon is at parrying."
		case "dmg" :
			return "How much damage this weapon deals."
		case "hands" :
			return "How many hands are needed to wield this weapon."
		case "prot" :
			return "How much damage this armor can deflect or absorb."
		case "dexmod" :
			return "How much this armor impedes movement."
		case "weight" :
			return "How much this weapon weights, kgrams."
		case "val" :
			return "How much this weapon costs, gold pieces."
		case "desc" :
			return "What the salesman thinks of this weapon."
		default :
			return "No info."
	
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
	if (mod && mod.name != "")
	{
		if (mod.type != weapon.type)
			throw "Not the same type - "+mod.name+" "+weapon.name
		
		var c = weapon.cat.concat(weapon.hiddencat)
		// MUST category check
		if (mod.catmust)
		{
			var ok=false
			for (var i in c)
			{
				if (mod.catmust.indexOf(c[i])>=0)
				{
					ok=true
					break
				}
			}
			if (!ok)
				throw "Not the right category - "+mod.name+" "+weapon.name
		}
		// CAN'T category check
		if (mod.catcant)
		{
			var ok=true
			for (var i in c)
			{
				if (mod.catcant.indexOf(c[i])>=0)
				{
					ok=false
					break
				}
			}
			if (!ok)
				throw "In excluded category - "+mod.name+" "+weapon.name
		}
		// MUST material check
		if (mod.matermust)
		{
			var ok=false
			var mats = Object.keys(weapon.materials)
			for (var i in mats)
			{
				if (mod.matermust.indexOf(mats[i])>=0)
				{
					ok=true
					break
				}
			}
			if (!ok)
				throw "Not the right material - "+mod.name+" "+weapon.name
		}
		
		// CAN'T material check
		if (mod.matercant)
		{
			var ok=true
			var mats = Object.keys(weapon.materials)
			for (var i in mats)
			{
				if (mod.matercant.indexOf(mats[i])>=0)
				{
					ok=false
					break
				}
			}
			if (!ok)
				throw "Excluded material - "+mod.name+" "+weapon.name
		}
		
		// TODO those checks do the job but do not correspond to specifications
		// a weapon with 2 materials can be excluded even if a modifier only
		// excludes one
		// also value for material is not checked
		
		// Specifically excluded
		if (mod.wpcant)
		{
			if (mod.wpcant.indexOf(weapon.name) >= 0)
				throw "Excluded weapon - "+mod.name+" "+weapon.name
		}
		
		fw.name=mod.name+" "+fw.name
		if (typeof(mod.atk) === "number")
			fw.atk=Math.round(fw.atk+(Math.abs(fw.atk)*(mod.atk-1)))
		if (typeof(mod.par) === "number")
			fw.par=Math.round(fw.par+(Math.abs(fw.par)*(mod.par-1)))
		if (typeof(mod.dmg) === "number")
			fw.dmg*=mod.dmg
		if (typeof(mod.min) === "number" === typeof(mod.max))
		{
			fw.min*=mod.min
			fw.max*=mod.max
		}
		if (typeof(mod.dmgspread) === "number")
			fw.dmgspread*=mod.dmgspread
		if (typeof(mod.dexmod) === "number")
			fw.dexmod*=mod.dexmod
		fw.val=Math.round(fw.val*mod.val)
		fw.desc+=" "+mod.desc
		fw.appliedModifier=mod.name
		
		// value check comes after the modifier is applied
		if (fw.val < mod.commonness[1])
			throw "Value too low ("+fw.val+">"+mod.commonness[1]+") - "+mod.name+" "+weapon.name
		if (fw.val > mod.commonness[2])
			throw "Value too high ("+fw.val+">"+mod.commonness[2]+") - "+mod.name+" "+weapon.name
		
	}
	fw.atk = Math.round(fw.atk)
	fw.par = Math.round(fw.par)
	
	fw.dmg=nbToDice(fw.dmg, fw.dmgspread)
	fw.name=fw.name.charAt(0).toUpperCase()+fw.name.slice(1)
		
	return fw
}


/**
 * returns an object with a getRandomWeapons(nbItems, meanval) method
 * expecting each object to have its own list of weapons, with relevant
 * modifiers and everything
 */
function RandomWeaponSource(...weaponsobj)
{
	
	var r = {}
	
	r.weapons = []
	r.goodMods = []
	r.badMods = []
	// hang on couldn't I just use .length ? Am I stupid ?
	// Stupid maybe, too lazy to refactor certainly
	// TODO
	r.weaponPie = []
	r.badModsPie = []
	r.goodModsPie = []
	for (var o in weaponsobj)
	{
		r.weapons[o] = weaponsobj[o].items
		r.goodMods[o] = weaponsobj[o].goodMods
		r.badMods[o] = weaponsobj[o].badMods
		// weapon probabilities sum (for dart throwing)
		// TODO fake random for shops that would stock a few of each category
		// TODO use better repartition
		r.weaponPie[o]=[]
		for (var w in r.weapons[o])
		{
			for (var i = 0 ; i < r.weapons[o][w]["commonness"][0] ; i++)
				r.weaponPie[o].push(w)
			// this does feel a bit stupid eh
		}
		r.badModsPie[o]=[]
		for (var w in r.badMods[o])
		{
			for (var i = 0 ; i < r.badMods[o][w]["commonness"][0] ; i++)
				r.badModsPie[o].push(w)
		}
		r.goodModsPie[o]=[]
		for (var w in r.goodMods[o])
		{
			for (var i = 0 ; i < r.goodMods[o][w]["commonness"][0] ; i++)
				r.goodModsPie[o].push(w)
		}
	}
	
	// pie for which obj to target
	r.weaponObjPie = []
	for (var o in weaponsobj)
	{
		for (var n in r.weaponPie[o])
			r.weaponObjPie.push(o)
	}
	

	/*
	 * returns an array of nbItems weapons
	 * each of them will be 0.5*meanval<value<1.5*meanval
	 *
	 */
	r.getRandomWeapons = function(nbItems, meanval)
	{
		var chest=[]
		var i=0
		while (i<nbItems)
		{
			// first, decide which weapon set to target
			var obji = this.weaponObjPie[getRandom(0,this.weaponObjPie.length)]
		
			var w = {val:-1000}
			var safety=0
			while ((w.val < 0.5*meanval || w.val > 1.5*meanval) && safety<100)
			{
				safety++
				w=r.weapons[obji][this.weaponPie[obji][getRandom(0,this.weaponPie[obji].length)]]
				
				// modifiers
				var modTries = 3
				while (modTries > 0)
				{
					try
					{
						//TODO add code to distinguish between types better
						// IE not try to attribute ranged mods to melee weaps
						var m=null
						if (w.val > meanval)
							m=this.badMods[obji][this.badModsPie[obji][getRandom(0,this.badModsPie[obji].length)]]
						else if (w.val < meanval)
							m=this.goodMods[obji][this.goodModsPie[obji][getRandom(0,this.goodModsPie[obji].length)]]
						var fw = finalizeWeapon(w, m)
						modTries = 0
					}
					catch (err)
					{
						console.log("getRandomWeapons ("+modTries+"):  "+err)
						var fw = finalizeWeapon(w, null)
					}
					modTries--
				}
			}
			chest.push(fw)
			i++
		}
		return chest
	}
	
	
	
	return r
}




/**
 * return an array of all possible weapon combinations
 * for mods I recommend something like
 * melee.goodMods.concat(melee.badMods.slice(1))
 * (slice because else we get the neutral mod twice)
 */
function getAllWeaponCombinations(weapons, mods)
{
	var result=[]
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