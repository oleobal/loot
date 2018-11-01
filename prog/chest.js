/**
 * Contains things to generate actual lists from parameters
 * Import before this file :
 *  - utility.js
 *  - weapons.js
 *  - things.js
 */


/**
 * Contents include weapons, gold, and precious items
 * 
 */
function getChestContents(value, context, randomWeaponSource, randomBookSource)
{
	// decide what part of the total value to allocate to what
	if (context && context.owner=="soldiers")
		var wpval = getRandom(Math.round(value/3),value)
	else
		var wpval = getRandom(0,value)
	var itval = getRandom(0,value-wpval)
	var gdval = value-wpval-itval
	
	var nbwps = getRandom(1,Math.round((wpval/30))+2)
	//console.log(wpval, itval, gdval, nbwps)
	
	
	var chest=getWeaponRackContents(wpval, context, randomWeaponSource)
	
	if (context && context.owner=="nobles")
		chest = chest.concat(getLibraryContents(itval, context, randomBookSource))
	else //TODO improve
		chest.push({type:"Other", val:itval, weight:1, name:"Kitchen ustensils", desc:"Great for making quiche."})
	
	chest.push({type:"Gold", val:gdval, weight:0, name:"Gold", desc:"A pouch of gold."})
	
	return chest
}

/**
 * same as getChestContents, but just weapons
 */
function getWeaponRackContents(value, context, randomWeaponSource)
{
	var val=30
	var nbwps = Math.max(1,Math.round(value/val))
	if (context)
	{
		if (context.owner==="peasants")
			val=10
		else if (context.owner==="soldiers")
			val=40
		else if (context.owner==="nobles")
			val=70
		var delta=Math.round(0.3*(value/val))
		var a = Math.max(1, Math.round(value/val)-delta)
		var b = Math.round(value/val)+delta
		var nbwps = Math.round(getRandom(a, b))
	}
	
	var moonmult = 4
	var moonshot = val*moonmult
	var nbmoon = 0
	if (nbwps > moonmult)
	{
		moonshot = val*moonmult
		nbmoon = 0.025
		if (context && context.owner === "soldiers")
			nbmoon *= 2
		else if (context && context.owner === "nobles")
			nbmoon *= 4
		nbmoon = Math.round(nbwps*nbmoon)
	}
	
	
	var result = randomWeaponSource.getRandomWeapons(nbwps-nbmoon*moonmult, val)
	return result.concat(randomWeaponSource.getRandomWeapons(nbmoon, moonshot))
}

/**
 * same as getChestContents, but just books
 */
function getLibraryContents(value, context, randomBookSource)
{
	//todo skew towards combat and strategy if soldiers ? idk
	var val=Math.round(getRandom(30,50))
	var nbbooks = Math.max(1,Math.round(value/val))
	
	return randomBookSource.getRandomThings(nbbooks, val)
}

function calculateTotalValue(chest)
{
	var total=0
	for (var i in chest)
		total+=chest[i].val
	return total
}

function calculateTotalWeight(chest)
{
	var total=0
	for (var i in chest)
		total+=chest[i].weight
	return total
}
