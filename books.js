/**
 * To import before :
 *  - utility.js
 *  - list-books.js
 */

/**
 * subjects is a list of subjects
 * only applicable ones will be applied, others ignored
 * if two subjects compete for the same type, the latter one is kept
 */
function finalizeBook(book, subjects, mod)
{
	fb=Object.assign({}, book)
	
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
	}
	
	fb.val = Math.round(fb.val)
	return fb
}


function RandomBookSource(booksobj, context)
{
	var r={}
	r.books=booksobj
	r.items=booksobj.items
	r.goodMods=booksobj.goodMods
	r.badMods=booksobj.badMods
	r.subjectTypes = booksobj.subjectTypes
	r.context = context
	
	r.booksSum = 0
	r.booksPie = []
	for (var i in r.items)
	{
		r.booksSum+=r.items[i].commonness[0]
		var j = 0
		while (j < r.items[i].commonness[0])
		{
			r.booksPie.push(i)
			j++
		}
	}
	r.badModsSum=0
	r.badModsPie=[]
	for (var i in r.badMods)
	{
		r.badModsSum+=r.badMods[i].commonness[0]
		var j = 0
		while (j < r.badMods[i].commonness[0])
		{
			r.badModsPie.push(i)
			j++
		}
	}
	r.goodModsSum=0
	r.goodModsPie=[]
	for (var i in r.goodMods)
	{
		r.goodModsSum+=r.goodMods[i].commonness[0]
		var j = 0
		while (j < r.goodMods[i].commonness[0])
		{
			r.goodModsPie.push(i)
			j++
		}
	}
	
	r.subjectsPies={}
	r.subjectsSums={}
	var types = Object.keys(r.subjectTypes)
	for (var i in types)
	{
		r.subjectsSums[types[i]] = 0
		r.subjectsPies[types[i]] = []
		for (var j in r.subjectTypes[types[i]])
		{
			var k = 0
			while (k<r.subjectTypes[types[i]][j].commonness)
			{
				r.subjectsPies[types[i]].push(j)
				r.subjectsSums[types[i]]++
				k++
			}
		}
		
	}
	
	
	r.getRandomBooks = function(nbItems, meanval)
	{
		var chest = []
		var i=0
		while (i<nbItems)
		{
			var b = {val:-1000}
			var safety=0
			while ((b.val < 0.5*meanval || b.val > 1.5*meanval) && safety<100)
			{
				safety++
				//console.log(b, this.items.length, this.booksSum, this.booksPie.length)
				b=this.items[this.booksPie[getRandom(0,this.booksSum)]]
				// subject
				// let's not bother with determining subject..
				// I'll just put one of each in the substitution dict
				var subs={}
				var types = Object.keys(this.subjectTypes)
				for (var t in types)
				{
					var sub = this.subjectTypes[types[t]][this.subjectsPies[types[t]][getRandom(0,this.subjectsSums[types[t]])]]
					
					subs[types[t]]=sub
				}
				
				// modifiers
				try
				{
					var m=null
					if (b.val > meanval)
						m=this.badMods[this.badModsPie[getRandom(0,this.badModsSum)]]
					else if (b.val < meanval)
						m=this.goodMods[this.goodModsPie[getRandom(0,this.goodModsSum)]]
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
function getAllBookCombinations(booksobj)
{
	var result=[]
	var mods = booksobj.goodMods.concat(booksobj.badMods.slice(1))
	console.log(booksobj.items.length, mods.length, booksobj.subjects.length)
	
	for (var i in booksobj.items)
	{
		// FIXME this does not support multiple subjects per book
		for (k in booksobj.subjects)
		{
			for (var j in mods)
			{
				try
				{
					result.push(finalizeBook(booksobj.items[i], [booksobj.subjects[k]], mods[j]))
				}
				catch (err)
				{
					console.log(err)
				}
			}
		}
	}

	return result
}