/**
 * To import before :
 *  - utility.js
 *  - list-books.js
 */

function finalizeBook(book, object, mod)
{
	fb=Object.assign({}, book)
	fb.name=format(book.name, {})
	//TODO
	fb.name+=" ("+mod.name+")"
	fb.val*=object.val
	fb.val*=mod.val
	
	return fb
}

/**
 * return an array of all possible book combinations
 */
function getAllBookCombinations(booksobj)
{
	var result=[]
	var mods = booksobj.goodMods.concat(booksobj.badMods.slice(1))
	
	for (var i in booksobj.items)
	{
		for (var j in mods)
		{
			// TODO make something more generic
			for (k in booksobj.objects.titleadj)
			{
			for (l in booksobj.objects.people)
			{
			for (m in booksobj.objects.sceneries)
			{
				try
				{
					result.push(finalizeBook(booksobj.items[i], {}, mods[j]))
				}
				catch (err)
				{
					console.log(err)
				}
			}
			}
			}
		}
	}

	return result
}