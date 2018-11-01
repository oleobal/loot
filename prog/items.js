/**
 * manages books and potions
 *
 * To import before :
 *  - utility.js
 */

 
/**
 * Returns a small help text for item attributes (name, cat, atk..)
 */
function getItemHelpText(attribute)
{
	switch(attribute)
	{
		case "name":
			return "Name of the item."
		case "cat" :
			return "Class(es) this item belongs to."
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
			return "How much this item weights, kgrams."
		case "val" :
			return "How much this item costs, gold pieces."
		case "uses" :
			return "How many times the item can be used."
		case "desc" :
			return "What the salesman thinks of this item."
		default :
			return "No info."
	
	}

}
 
/**
 * subjects is a list of subjects
 * only applicable ones will be applied, others ignored
 * if two subjects compete for the same type, the latter one is kept
 *
 * also adds "appliedModifier" and "baseItem" fields
 * (null and name)
 */
function finalizeItem(item, subjects, mod)
{
	var fi=Object.assign({}, item)
	
	fi.appliedModifier=null
	fi.baseItem = fi.name
	
	var bookSubs = getFormatFields(item.name+" "+item.desc)
	var subsToApply={}
	var subdict = {}
	for (var i in bookSubs)
	{
		for (var j in subjects)
		{
			if (bookSubs[i] == subjects[j].type)
			{
				subsToApply[subjects[j].type]= subjects[j]
				subdict[subjects[j].type] = subjects[j].name
			}
		}
	}
	fi.name=format(fi.name, subdict)
	fi.desc=format(fi.desc, subdict)
	
	var s = Object.keys(subsToApply)
	for (var i in s)
		fi.val*=subsToApply[s[i]].val
	
	if (mod && mod.name != "")
	{
		
		if (mod.type && mod.type != fi.type)
			throw "Not the same type - "+mod.name+" "+fi.name
		if (fi.hiddencat && fi.hiddencat.indexOf("Unique")>=0)
			throw "Is unique - "+mod.name+" "+fi.name
		
		var c = fi.cat.concat(fi.hiddencat)
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
				throw "Not the right category - "+mod.name+" "+fi.name
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
				throw "In excluded category - "+mod.name+" "+fi.name
		}
		// MUST material check
		if (mod.matermust)
		{
			var ok=false
			var mats = Object.keys(fi.materials)
			for (var i in mats)
			{
				if (mod.matermust.indexOf(mats[i])>=0)
				{
					ok=true
					break
				}
			}
			if (!ok)
				throw "Not the right material - "+mod.name+" "+fi.name
		}
		
		// CAN'T material check
		if (mod.matercant)
		{
			var ok=true
			var mats = Object.keys(fi.materials)
			for (var i in mats)
			{
				if (mod.matercant.indexOf(mats[i])>=0)
				{
					ok=false
					break
				}
			}
			if (!ok)
				throw "Excluded material - "+mod.name+" "+fi.name
		}
		
		// TODO those checks do the job but do not correspond to specifications
		// a fi with 2 materials can be excluded even if a modifier only
		// excludes one
		// also value for material is not checked
		
		// Specifically excluded
		if (mod.itemcant)
		{
			if (mod.itemcant.indexOf(fi.name) >= 0)
				throw "Excluded - "+mod.name+" "+fi.name
		}
		
		
		var m = Object.keys(mod)

		// apply modifiers
		for (var i in m)
		{
			if (fi.type.includes("Weapon") || fi.type == "Armor")
			{
				var flagCont = false
				switch (m[i])
				{
					case "atk":
					case "par":
						fi[m[i]]=Math.round(fi[m[i]]+(Math.abs(fi[m[i]])*(mod[m[i]]-1)))
						flagCont = true
						break
					case "dmg":
					case "dmgspread":
						fi[m[i]]*=mod[m[i]]
						flagCont = true
						break
				}
				if (flagCont)
					continue
			}
			// all other properties are multiplied
			if (typeof(fi[m[i]]) === "number")
				fi[m[i]] = mod[m[i]]*fi[m[i]]
		}
		
		
		
		// value check comes after the modifier is applied
		if (fi.val < mod.commonness[1])
			throw "Value too low ("+fi.val+"<"+mod.commonness[1]+") - "+mod.name+" "+fi.name
		if (fi.val > mod.commonness[2])
			throw "Value too high ("+fi.val+">"+mod.commonness[2]+") - "+mod.name+" "+fi.name
		
		
		if (fi.type === "Book")
			fi.name+=" ("+mod.name+")"
		else
			fi.name=mod.name+" "+fi.name
		fi.appliedModifier=mod.name
		fi.desc+=" "+mod.desc
	}
	
	if (fi.type.includes("Weapon") || fi.type == "Armor")
		fi.dmg=nbToDice(fi.dmg, fi.dmgspread)
	
	// final rounding of all numbers
	var f = Object.keys(fi)
	for (var i in f)
	{
		if (typeof(fi[f[i]]) === "number")
			fi[f[i]] = Math.round(fi[f[i]])
	}
	
	fi.name = fi.name.trim()
	fi.name=fi.name.charAt(0).toUpperCase()+fi.name.slice(1)
	return fi
}


function RandomItemSource(...thingsobj)
{
	var r={}
	r.itobj=[] //thingsobj
	r.items=[] //thingsobj.items
	r.goodMods=[] //thingsobj.goodMods
	r.badMods=[] //thingsobj.badMods
	r.subjectTypes = [] //thingsobj.subjectTypes
	
	r.itemsPie = []
	r.badModsPie = []
	r.goodModsPie = []
	r.subjectsPies = []
	r.booksObjPie=[]

	for (var o in thingsobj)
	{
		r.itobj.push(thingsobj[o])
		r.items.push(thingsobj[o].items)
		r.goodMods.push(thingsobj[o].goodMods)
		r.badMods.push(thingsobj[o].badMods)
		r.subjectTypes.push(thingsobj[o].subjectTypes)
	
		
		r.itemsPie[o] = []
		for (var i in r.items[o])
		{
			for (var j = 0;j < r.items[o][i].commonness[0];j++)
				r.itemsPie[o].push(i)
		}
		for (var j=0;j<r.itemsPie[o].length;j++)
			r.booksObjPie.push(o)
		
		r.badModsPie[o]=[]
		for (var i in r.badMods[o])
		{
			for (var j = 0;j < r.badMods[o][i].commonness[0];j++)
				r.badModsPie[o].push(i)
		}
		r.goodModsPie[o]=[]
		for (var i in r.goodMods[o])
		{
			for (var j=0;j < r.goodMods[o][i].commonness[0];j++)
				r.goodModsPie[o].push(i)
		}
		
		
		r.subjectsPies[o]={}
		if (r.subjectTypes[o])
		{
			var types = Object.keys(r.subjectTypes[o])
			for (var i in types)
			{
				r.subjectsPies[o][types[i]] = []
				for (var j in r.subjectTypes[o][types[i]])
				{
					for (var k=0 ; k<r.subjectTypes[o][types[i]][j].commonness;k++)
						r.subjectsPies[o][types[i]].push(j)
				}
				
			}
		}
	
	}
	
	
	
	
	r.getRandomItems = function(nbItems, meanval, constraints)
	{
		if (nbItems ===0)
			return []
		if (!nbItems || !meanval)
			throw "Please provide nbItems and meanval"
			
		var chest=[]
		var i=0
		while (i<nbItems)
		{
			
			var obji = this.booksObjPie[getRandom(0,this.booksObjPie.length)]
			
			var b = {val:-1000}
			var safety=0
			while ((b.val < 0.5*meanval || b.val > 1.5*meanval) && safety<200)
			{
				safety++
				b=this.items[obji][this.itemsPie[obji][getRandom(0,this.itemsPie[obji].length)]]
				// subject
				// let's not bother with determining subject..
				// I'll just put one of each in the substitution dict
				var subs={}
				if (this.subjectTypes[obji])
				{
					var types = Object.keys(this.subjectTypes[obji])
					for (var t in types)
					{
						var sub = this.subjectTypes[obji][types[t]][this.subjectsPies[obji][types[t]][getRandom(0,this.subjectsPies[obji][types[t]].length)]]
						
						subs[types[t]]=sub
					}
				}
				
				var c = b.cat.concat(b.hiddencat)
				// constraints compliance
				// ok retrying until it works is stupid
				if (constraints)
				{
					if (constraints.catmust && constraints.catmust.length > 0)
					{
						var ok = false
						for (i in c)
						{
							if (constraints.catmust.indexOf(c[i])>=0)
							{
								ok=true
								break
							}
						}
						if (!ok)
							{b = {val:-1000};continue}
					}
					if (constraints.catcant && constraints.catcant.length > 0)
					{
						var ok = true
						for (i in c)
						{
							if (constraints.catcant.indexOf(c[i])>=0)
							{
								ok=false
								break
							}
						}
						if (!ok)
							{b = {val:-1000};continue}
					}
					if (constraints.wpcant)
					{
						if (constraints.wpcant.indexOf(b.name)>=0)
							{b = {val:-1000};continue}
					}
				}
				
				// modifiers
				var modTries = 3
				while (modTries > 0)
				{
					try
					{
						var m=null
						if (b.val > meanval)
							m=this.badMods[obji][this.badModsPie[obji][getRandom(0,this.badModsPie[obji].length)]]
						else if (b.val < meanval)
							m=this.goodMods[obji][this.goodModsPie[obji][getRandom(0,this.goodModsPie[obji].length)]]
						var fb = finalizeItem(b, subs, m)
						modTries = 0
					}
					catch (err)
					{
						console.log("getRandomItems("+modTries+" tries left) : "+err)
						modTries--
						if (modTries == 0)
						{
							var fb = finalizeItem(b, subs, null)
							break
						}
						
					}
					
				}
			}
			chest.push(fb)
			i++
		}
		return chest
	}
	
	return r
}


/**
 * return an array of all possible combinations
 */
function getAllItemCombinations(...thingsobj)
{
	var result=[]
	for (var o in thingsobj)
	{

		var mods = thingsobj[o].goodMods.concat(thingsobj[o].badMods.slice(1))
		
		for (var i in thingsobj[o].items)
		{

			// FIXME this does not support multiple subjects per book
			if (thingsobj[o].subjects && thingsobj[o].subjects.length > 0)
				var target = thingsobj[o].subjects
			else
				var target = [null]
			for (k in target)
			{
				for (var j in mods)
				{
					try
					{
						result.push(finalizeItem(thingsobj[o].items[i], [target[k]], mods[j]))
					}
					catch (err)
					{
						console.log(err)
					}
				}
			}
		}
	}
	
	return result
}