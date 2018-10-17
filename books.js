/**
 * To import before :
 *  - utility.js
 *  - list-books.js
 */

/**
 * subjects is a list of subjects
 * only applicable ones will be applied, others ignored
 * if two subjects compete for the same type, the latter one is kept
 *
 * also adds "appliedModifier" and "baseItem" fields
 * (null and name)
 */
function finalizeBook(book, subjects, mod)
{
	fb=Object.assign({}, book)
	
	fb.appliedModifier=null
	fb.baseItem = fw.name
	
	var bookSubs = getFormatFields(book.name+" "+book.desc)
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
	fb.name=format(fb.name, subdict)
	fb.desc=format(fb.desc, subdict)
	
	var s = Object.keys(subsToApply)
	for (var i in s)
		fb.val*=subsToApply[s[i]].val
	
	
	if (mod && mod.name != "")
	{
		fb.name+=" ("+mod.name+")"
		fb.desc+=" "+mod.desc
		fb.val*=mod.val
		fw.appliedModifier=mod.name
	}
	
	fb.val = Math.round(fb.val)
	return fb
}


function RandomBookSource(...booksobj)
{
	var r={}
	r.books=[] //booksobj
	r.items=[] //booksobj.items
	r.goodMods=[] //booksobj.goodMods
	r.badMods=[] //booksobj.badMods
	r.subjectTypes = [] //booksobj.subjectTypes
	
	r.booksPie = []
	r.badModsPie = []
	r.goodModsPie = []
	r.subjectsPies = []
	r.booksObjPie=[]

	for (var o in booksobj)
	{
		r.books.push(booksobj[o])
		r.items.push(booksobj[o].items)
		r.goodMods.push(booksobj[o].goodMods)
		r.badMods.push(booksobj[o].badMods)
		r.subjectTypes.push(booksobj[o].subjectTypes)
	
		
		r.booksPie[o] = []
		for (var i in r.items[o])
		{
			for (var j = 0;j < r.items[o][i].commonness[0];j++)
				r.booksPie[o].push(i)
		}
		for (var j=0;j<r.booksPie[o].length;j++)
			r.booksObjPie.push(o)
		
		r.badModsPie[o]=[]
		for (var i in r.badMods)
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
	
	
	
	
	r.getRandomBooks = function(nbItems, meanval)
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
					var fb = finalizeBook(b, subs, m)
				}
				catch (err)
				{
					console.log("getRandomBooks: "+err)
					var fb = finalizeBook(b, subs, null)
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
function getAllBookCombinations(...booksobj)
{
	var result=[]
	for (var o in booksobj)
	{
	
		var mods = booksobj[o].goodMods.concat(booksobj[o].badMods.slice(1))
		
		for (var i in booksobj[o].items)
		{
			// FIXME this does not support multiple subjects per book
			for (k in booksobj[o].subjects)
			{
				for (var j in mods)
				{
					try
					{
						result.push(finalizeBook(booksobj[o].items[i], [booksobj[o].subjects[k]], mods[j]))
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