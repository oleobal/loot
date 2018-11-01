/**
 * manages books and potions
 *
 * To import before :
 *  - utility.js
 */

/**
 * subjects is a list of subjects
 * only applicable ones will be applied, others ignored
 * if two subjects compete for the same type, the latter one is kept
 *
 * also adds "appliedModifier" and "baseItem" fields
 * (null and name)
 */
function finalizeThing(thing, subjects, mod)
{
	var fi=Object.assign({}, thing)
	
	fi.appliedModifier=null
	fi.baseItem = fi.name
	
	var bookSubs = getFormatFields(thing.name+" "+thing.desc)
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
		if (fi.type === "Potion")
			fi.name=mod.name+" "+fi.name
		else
			fi.name+=" ("+mod.name+")"
		fi.desc+=" "+mod.desc
		fi.val*=mod.val
		if (fi.uses && mod.uses)
			fi.uses=Math.round(fi.uses*mod.uses)
		fi.appliedModifier=mod.name
	}
	
	fi.val = Math.round(fi.val)
	fi.name=fi.name.charAt(0).toUpperCase()+fi.name.slice(1)
	return fi
}


function RandomThingSource(...thingsobj)
{
	var r={}
	r.books=[] //thingsobj
	r.items=[] //thingsobj.items
	r.goodMods=[] //thingsobj.goodMods
	r.badMods=[] //thingsobj.badMods
	r.subjectTypes = [] //thingsobj.subjectTypes
	
	r.booksPie = []
	r.badModsPie = []
	r.goodModsPie = []
	r.subjectsPies = []
	r.booksObjPie=[]

	for (var o in thingsobj)
	{
		r.books.push(thingsobj[o])
		r.items.push(thingsobj[o].items)
		r.goodMods.push(thingsobj[o].goodMods)
		r.badMods.push(thingsobj[o].badMods)
		r.subjectTypes.push(thingsobj[o].subjectTypes)
	
		
		r.booksPie[o] = []
		for (var i in r.items[o])
		{
			for (var j = 0;j < r.items[o][i].commonness[0];j++)
				r.booksPie[o].push(i)
		}
		for (var j=0;j<r.booksPie[o].length;j++)
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
	
	
	
	
	r.getRandomThings = function(nbItems, meanval)
	{
		var chest=[]
		var i=0
		while (i<nbItems)
		{
			
			var obji = this.booksObjPie[getRandom(0,this.booksObjPie.length)]
			
			var b = {val:-1000}
			var safety=0
			while ((b.val < 0.5*meanval || b.val > 1.5*meanval) && safety<100)
			{
				safety++
				b=this.items[obji][this.booksPie[obji][getRandom(0,this.booksPie[obji].length)]]
				// subject
				// let's not bother with determining subject..
				// I'll just put one of each in the substitution dict
				var subs={}
				var types = Object.keys(this.subjectTypes[obji])
				for (var t in types)
				{
					var sub = this.subjectTypes[obji][types[t]][this.subjectsPies[obji][types[t]][getRandom(0,this.subjectsPies[obji][types[t]].length)]]
					
					subs[types[t]]=sub
				}
				
				// modifiers
				try
				{
					var m=null
					if (b.val > meanval)
						m=this.badMods[obji][this.badModsPie[obji][getRandom(0,this.badModsPie[obji].length)]]
					else if (b.val < meanval)
						m=this.goodMods[obji][this.goodModsPie[obji][getRandom(0,this.goodModsPie[obji].length)]]
					var fb = finalizeThing(b, subs, m)
				}
				catch (err)
				{
					console.log("getRandomBooks: "+err)
					var fb = finalizeThing(b, subs, null)
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
 * return an array of all possible book combinations
 */
function getAllThingCombinations(...thingsobj)
{
	var result=[]
	for (var o in thingsobj)
	{
	
		var mods = thingsobj[o].goodMods.concat(thingsobj[o].badMods.slice(1))
		
		for (var i in thingsobj[o].items)
		{
			// FIXME this does not support multiple subjects per book
			for (k in thingsobj[o].subjects)
			{
				for (var j in mods)
				{
					try
					{
						result.push(finalizeThing(thingsobj[o].items[i], [thingsobj[o].subjects[k]], mods[j]))
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