/**
 * To import before :
 *  - utility.js
 *  - list-books.js
 */

function finalizeBook(book, subject, mod)
{
	fb=Object.assign({}, book)
	fb.name=format(book.name, subject.sub)
	//TODO
	if (mod && mod.name != "")
		fb.name+=" ("+mod.name+")"
	fb.val*=subject.val
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
	console.log(booksobj.items.length, mods.length, booksobj.subjects.length)
	
	for (var i in booksobj.items)
	{
		for (var j in mods)
		{
			for (k in booksobj.subjects)
			{
				try
				{
					result.push(finalizeBook(booksobj.items[i], booksobj.subjects[k], mods[j]))
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