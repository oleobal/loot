/**
 * This files holds shared functions useful for the web interface
 *
 */

/**
 * for displaying weapons in a table.
 * It expects there to be a table for each weapon type with appropriate ID
 * (eg MeleeWeaponsTable, RangedWeaponsTable, ArmorTable
 *
 * options is a dictionary of booleans that can be left undefined
 *  - colors : whether to enable coloring classes
 *  - perweapon : whether to clearly separate weapons :
 *    - 'base' weapons are colored and preceded with an empty line
 *    - zebra coloring is reinitialized per weapon, instead of per type
 *    - link to anchor added to each base weapon
 *  - total: whether to add a total (value, weight) at the end for all types
 */
function displayWeapons(chest, options)
{
	
	// establish types
	var conf = {
		"Melee Weapon":{
			attrs:["name", "cat",  "atk",   "par",   "dmg",   "hands",  "weight", "val",   "desc"],
			align:["left", "left", "right", "right", "right", "center", "right",  "right", "left"],
			id:"MeleeWeaponsTable",
			tooltips:[],
			totalNumber:0, // of weapons of that type in the chest
			totalVal:0,
			totalWeight:0
		},
		"Ranged Weapon":{
			attrs:["name", "cat",  "min",   "max",   "atk",   "par",   "dmg",   "hands",  "weight", "val",   "desc"],
			align:["left", "left", "right", "right", "right", "right", "right", "center", "right",  "right", "left"],
			id:"RangedWeaponsTable",
			tooltips:[],
			totalNumber:0,
			totalVal:0,
			totalWeight:0
		},
		"Armor":{
			attrs:["name", "cat", "dexmod",  "dmg",   "weight", "val",   "desc"],
			align:["left", "left", "right",  "right", "right",  "right", "left"],
			id:"ArmorTable",
			tooltips:[],
			totalNumber:0,
			totalVal:0,
			totalWeight:0
		}
	}
	for (var c in conf)
	{
		for (var n in conf[c].attrs)
			conf[c].tooltips.push(getWeaponHelpText(conf[c].attrs[n]))
	}
	conf["Armor"].tooltips.dmg = getWeaponHelpText("prot")
	
	
	
	
	// first pass
	
	var wpCount = {}
	var totalVal = 0
	var totalWeight = 0
	var nbOfType = {}
	
	var i = 0
	while (i<chest.length)
	{
		totalVal+=chest[i].val
		totalWeight+=chest[i].weight
		conf[chest[i].type].totalVal+=chest[i].val
		conf[chest[i].type].totalWeight+=chest[i].weight
		conf[chest[i].type].totalNumber++
		
		// deduplication
		if (typeof(wpCount[chest[i].name]) === "undefined")
		{
			wpCount[chest[i].name] = 1
			i++
		}
		else
		{
			wpCount[chest[i].name]++
			chest.splice(i,1)
		}
	}
	
	var zebraIndexOfType = {}
	var types = Object.keys(conf)
	for (var ty in types)
	{
		if (conf[types[ty]].totalNumber == 0)
		{
			
			var t=document.getElementById(conf[types[ty]].id)
			var tr=document.createElement("tr")
			var td = document.createElement("td")
			td.innerHTML="<i>No weapons</i>"
			td.colSpan=conf[types[ty]].attrs.length
			tr.appendChild(td)
			tr.className="gray"
			t.appendChild(tr)
		}
		else
			zebraIndexOfType[types[ty]] = 0
	}
	
	// adding elements
	
	var curCat = ""
	var color = ""
	for (var w in chest)
	{
		var t=document.getElementById(conf[chest[w].type].id)
		var tr=document.createElement("tr")
		tr.className="weaponRow"
		
		
		if (options && options.perweapon && curCat != chest[w]["cat"].toString())
		{
			curCat = chest[w]["cat"].toString()
			color = getLightRGBfromString(chest[w]["cat"].toString())
			var sep = document.createElement("tr")
			sep.style.height = "1em"
			t.appendChild(sep)
		}
		
		if (wpCount[chest[w].name] > 1)
		{
			chest[w].weight = "<b style=\"color:#C00\">"+wpCount[chest[w].name]*chest[w].weight +"</b> <br>("+chest[w].weight+")"
			chest[w].val = "<b style=\"color:#C00\">"+wpCount[chest[w].name]*chest[w].val +"</b> <br>("+chest[w].val+")"
			chest[w].name = "<b style=\"color:#C00\">"+wpCount[chest[w].name]+"x</b> "+chest[w].name
		}
		
		var n = 0
		while (n < conf[chest[w].type].attrs.length)
		{
			var td = document.createElement("td")
			if (options && options.perweapon && !chest[w].appliedModifier && conf[chest[w].type].attrs[n]=="name")
			{
				var a = document.createElement("a")
				a.href = window.location.pathname+"#"+chest[w]["name"].replace(/\ /g, "_").toLowerCase()
				a.innerHTML=chest[w]["name"]
				a.id=chest[w]["name"].replace(/\ /g, "_").toLowerCase()
				td.appendChild(a)
			}
			else if (options && options.colors && conf[chest[w].type].attrs[n]=="cat")
			{
				td.style.backgroundColor=color
				td.innerHTML=chest[w][conf[chest[w].type].attrs[n]]
			}
			else if (conf[chest[w].type].attrs[n]=="dmg")
			{
				td.innerHTML=chest[w]["dmg"].replace(/d/g, "<i style=\"opacity: 0.7;\">d</i>")
				td.innerHTML=td.innerHTML.replace(/\+/g, "<i style=\"opacity: 0.7;\">+</i>")
			}

			else
				td.innerHTML=chest[w][conf[chest[w].type].attrs[n]]
			
			td.style.textAlign=conf[chest[w].type].align[n]
			td.title=conf[chest[w].type].tooltips[n]
			
			// skip following absent values
			while (typeof(chest[w][conf[chest[w].type].attrs[parseInt(n)+1]]) === "undefined" && parseInt(n)+1 < conf[chest[w].type].attrs.length)
			{
				//console.log(n, attrs[parseInt(n)], attrs[parseInt(n)+1])
				// yup, that parseint is required. Else n=0 => string
				// if using for (var n in attrs), that is
				td.colSpan++
				n++
			}
			
			tr.appendChild(td)
			n++
		}
		
		if (options && options.perweapon && !chest[w].appliedModifier)
		{
			
			zebraIndexOfType[chest[w].type]=0
			var color = getLightRGBfromString(chest[w]["cat"].toString())
			//tr.style.borderTop="1px solid black;"
			t.appendChild(document.createElement("tr"))
			tr.style.backgroundColor=color
		}
		else if (zebraIndexOfType[chest[w].type]%2 == 0)
			tr.className+=" gray"
		zebraIndexOfType[chest[w].type]++
		t.appendChild(tr)
	}
	
	if (options && options.total)
	{
		var t=document.getElementById(conf["Armor"].id)
		var tr=document.createElement("tr")
		var tdt = document.createElement("td")
		tdt.innerHTML="Total (weapons)"
		tdt.colSpan=4
		tr.appendChild(tdt)
		var tdw = document.createElement("td")
		tdw.innerHTML=totalWeight
		tdw.id="totalWeaponsWeight"
		tdw.style.textAlign="right"
		tr.appendChild(tdw)
		var tdv = document.createElement("td")
		tdv.innerHTML=totalVal
		tdv.id="totalWeaponsVal"
		tdv.style.textAlign="right"
		tr.appendChild(tdv)
		//tr.appendChild(document.createElement("td"))
		tr.style.backgroundColor="#DDF"
		tr.style.fontWeight="bold"
		t.appendChild(tr)
	}
	
}