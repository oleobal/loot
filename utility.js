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

