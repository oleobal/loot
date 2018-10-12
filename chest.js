/**
 * Contains things to generate actual lists from parameters
 * 
 * Do import loot.js before this file !
 */


/**
 * Contents include weapons, gold, and precious items
 * 
 */
function getChestContents(value, context, randomWeaponSource)
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
	
	// TODO better
	chest.push({type:"other", val:itval, weight:1, name:"Precious book", desc:"A book."})
	
	chest.push({type:"gold", val:gdval, weight:0, name:"Gold", desc:"A pouch of gold."})
	
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
		
	
	return randomWeaponSource.getRandomWeapons(nbwps, val)
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
