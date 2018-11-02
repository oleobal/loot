/**
 * Contains things to generate actual lists from parameters
 * Import before this file :
 *  - utility.js
 *  - items.js
 */


/**
 * Contents include weapons, gold, and precious items
 * 
 */
function getChestContents(value, context, randomWeaponSource, randomBookSource, randomPotionSource, randomMusicSource, randomOtherSource)
{
	// decide what part of the total value to allocate to what
	if (context && context.owner=="soldiers")
		var wpval = getRandom(Math.round(value/3),value)
	else
		var wpval = getRandom(0,value)
	var ptval = getRandom(0,value-wpval)
	if (ptval>value/3)
		ptval = Math.round(value/3)
	var itval = getRandom(0,value-wpval-ptval)
	var gdval = value-wpval-itval-ptval
	
	var nbwps = getRandom(1,Math.round((wpval/30))+2)
	//console.log(wpval, itval, gdval, nbwps)
	
	
	var chest=getWeaponRackContents(wpval, context, randomWeaponSource)
	
	if (context && context.owner == "peasants")
		itval+=ptval
	else
		chest = chest.concat(getApothecaryContents(ptval,context,randomPotionSource))
	
	if (context && context.owner=="nobles")
	{
		chest = chest.concat(getLibraryContents(itval*0.6, context, randomBookSource))
		chest = chest.concat(getOtherObjects(itval*0.4, context, randomOtherSource))
	}
	else //TODO improve
		chest = chest.concat(getOtherObjects(itval, context, randomOtherSource))
	
	if (context && context.nbplayers && context.nicegold)
	{
		if (gdval > context.nbplayers)
		{
			var r = gdval%context.nbplayers
			if (r>context.nbplayers/2)
				gdval-=r
			else
				gdval+=context.nbplayers-r
		}
		else
			gdval=getRandom(0,2)*context.nbplayers
	}
	
	// help text
	var gddescadd=""
	if (context && context.nbplayers && gdval > context.nbplayers)
	{
		var r = gdval%context.nbplayers
		if (r == 0)
			gddescadd=" ("+((gdval-r)/context.nbplayers)+"x"+context.nbplayers+")"
		else
			gddescadd=" ("+((gdval-r)/context.nbplayers)+"x"+context.nbplayers+"+"+r+")"
	}
	
	if (gdval > 0)
		chest.push({type:"Gold", val:gdval, weight:0, name:"Gold", desc:"A pouch of gold."+gddescadd})
	
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
	
	var result = randomWeaponSource.getRandomItems(nbwps-nbmoon*moonmult, val, null)
	return result.concat(randomWeaponSource.getRandomItems(nbmoon, moonshot, null))
}

/**
 * same as getChestContents, but just books
 */
function getLibraryContents(value, context, randomBookSource)
{
	//todo skew towards combat and strategy if soldiers ? idk
	var val=Math.round(getRandom(30,50))
	var nbbooks = Math.max(1,Math.round(value/val))
	
	return randomBookSource.getRandomItems(nbbooks, val)
}

function getApothecaryContents(value, context, randomPotionSource)
{
	var val=Math.round(getRandom(5,40))
	var nbpots = Math.max(1,Math.round(value/val))
	
	return randomPotionSource.getRandomItems(nbpots, val)
}

function getLuthierContents(value, context, randomMusicSource)
{
	var total = value
	var result = []
	// generate some better stuff
	while (total > 150)
	{
		if (getRandom(0,3)>0)
		{
			if (total > 500)
				var moonshot = getRandom(60,600)
			else
				var moonshot = getRandom(20,200)
		}
		else
		{
			var moonshot = 10
		}
		result = result.concat(randomMusicSource.getRandomItems(1, moonshot))
		total-=moonshot
	}
	
	var val=getRandom(5,9)
	var nb = Math.max(1,Math.round(total/val))-1
	
	result= result.concat(randomMusicSource.getRandomItems(nb, val))
	result= result.concat(randomMusicSource.getRandomItems(total-val*nb+1, 1))
	
	
	return result
}


function getOtherObjects(value, context, randomObjectSource)
{
	var val = 1
	if (context && context.owner == "nobles")
		val = 10
	
	var nb = Math.max(1,Math.round(value/val))
	return randomObjectSource.getRandomItems(nb, val)
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
