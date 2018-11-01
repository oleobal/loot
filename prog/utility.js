/**
 * This file contains various utility functions
 *
 */

/**
 * returns linear interpolation from a to b at i
 * (0<i<1)
 */
function interp(a,b,i)
{
	if (typeof(a) !== "number")
		throw a+" (a) is not a number"
	if (typeof(b) !== "number")
		throw b+" (b) is not a number"
	if (typeof(i) !== "number")
		throw i+" (c) is not a number"
	
	return a+(b-a)*i
}

function sumArray(a)
{
	if (typeof(a) !== "object")
		throw a+" is not an object"
	
	if (a.length==0)
		return 0
	if (a.length==1)
		return a[0]
	
	var sum=0
	for (var i in a)
		sum+=a[i]
	return sum
}

/**
 * returns a concatenation of the two objects
 * which are expected to contain arrays
 */
function simpleDictConcat(a,b)
{
	if (!b)
		return a
	if (!a)
		return b
	var res = Object.assign({},a)
	var bk = Object.keys(b)
	for (var i in bk)
	{
		if (!res[bk[i]])
		{
			res[bk[i]] =b[bk[i]]
		}
		else
		{
			res[bk[i]] = res[bk[i]].concat(b[bk[i]])
		}
	}
	return res
}

/**
 * returns an array that is the inner join of the two
 * (order is not considered)
 * indexOf() is used, so no objects
 * duplicates are eliminated
 */
function innerJoinArrays(a,b)
{
	if (!a || !b || a.length==0 || b.length==0)
		return []
		
	var res = []
	for (var i in a)
	{
		if (b.indexOf(a[i])>=0 && res.indexOf(a[i])<0)
			res.push(a[i])
	}
	return res
}



// uniform
// max exclusive
function getRandom(min, max)
{
	if (typeof(min) !== "number")
		throw min+" (min) is not a number"
	if (typeof(max) !== "number")
		throw max+" (max) is not a number"
	
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
 * returns a #-prefixed hex RGB, with each value from 205 to 255
 */
function getLightRGBfromString(str)
{
	var color = [0,0,0]
	for (var i=0;i<str.length;i++)
		color[i%3]+=str.charCodeAt(i)
	for (var i=0;i<3;i++)
		color[i]=((color[i]%10)*5+205).toString(16)
	
	return "#"+color[0]+color[1]+color[2]
}


/**
 * takes a string formatted like for format(s, pars)
 * returns an array of the fields in it (as strings)
 * for instance :
 * getFormatFields("{na} apples, {nb} bananas") == ["na","nb"]
 */
function getFormatFields(s)
{
	var result= []
	var i = 0
	while (i<s.length)
	{
		if (s[i] == "{")
		{
			i++
			var n = ""
			while (s[i] != "}" && s[i] != "," && i<s.length)
			{
				n+=s[i]
				i++
			}
			if (s[i] == ",")
			{
				i++
				while (s[i] != "}" && i<s.length)
					i++
			}
			
			result.push(n)
		}
		i++
	}
	
	return result
}

/**
 * takes a string that may have fields formatted as braces with names,
 * and a dictionary with corresponding values.
 * for instance :
 * format("{na} apples, {nb} bananas", {na:2, nb:4}) == "2 apples, 4 bananas"
 * flags can be added in brackets, like this :
 * {nba,c} will capitalize the substitute
 * ('c' is currently the only flag)
 *
 * Will throw an exception is a subtitution is not in the provided dictionary
 */
function format(s, pars)
{
	var result= ""
	var i = 0
	while (i<s.length)
	{
		if (s[i] == "{")
		{
			i++
			var n = ""
			var flags = ""
			while (s[i] != "}" && s[i] != "," && i<s.length)
			{
				n+=s[i]
				i++
			}
			if (s[i] == ",")
			{
				i++
				while (s[i] != "}" && i<s.length)
				{
					flags+=s[i]
					i++
				}
			}
			
			if (pars[n])
			{
				var z = pars[n]
				if (flags != "")
				{
					if (flags.indexOf("c") >= 0)
						z = z.charAt(0).toUpperCase()+z.slice(1)
				}
				result+=z
			}
			else
				throw "No substitution provided for "+n+" (s:"+s+",p:"+Object.keys(pars)+")"
		}
		else
		{
			result+=s[i]
		}
		i++
	}
	
	return result
}

