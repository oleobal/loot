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
	return a+(b-a)*i
}

function sumArray(a)
{
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
			while (s[i] != "}" && i<s.length)
			{
				console.log(s[i], i)
				n+=s[i]
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
			while (s[i] != "}" && i<s.length)
			{
				n+=s[i]
				i++
			}
			if (pars[n])
				result+=pars[n]
			else
				throw "No substitution provided for "+n
		}
		else
		{
			result+=s[i]
		}
		i++
	}
	
	return result
}