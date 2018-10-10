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