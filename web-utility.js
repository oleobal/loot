/**
 * This files holds shared functions useful for the web interface
 *
 */

/**
 * Turns strings like "1d2+3d4"
 * Into the same but with neat web formatting
 */ 
function getWebDiceDisplay(input)
{
	var res = input
	res = res.replace(/d/g, "<i style=\"opacity: 0.7;\">d</i>")
	res = res.replace(/\+/g, "<i style=\"opacity: 0.7;\">+</i>")
	return res
}
 
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
			td.innerHTML="<i>No "+types[ty].toLowerCase()+"s</i>"
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
		
		
		if (options && (options.perweapon || options.colors) && curCat != chest[w]["cat"].toString())
		{
			curCat = chest[w]["cat"].toString()
			color = getLightRGBfromString(chest[w]["cat"].toString())
			if (options.perweapon)
			{
				var sep = document.createElement("tr")
				sep.style.height = "1em"
				t.appendChild(sep)
			}
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
				
				if (chest[w][conf[chest[w].type].attrs[n]].length>1)
				{
					for (var ca in chest[w].cat)
					{
					var sp = document.createElement("span")
					sp.style.backgroundColor = getLightRGBfromString(chest[w].cat[ca])
					sp.innerHTML = chest[w].cat[ca]
					td.appendChild(sp)
					if (ca < chest[w].cat.length-1)
						td.innerHTML+=", "
					}
				}
				else
					td.innerHTML=chest[w][conf[chest[w].type].attrs[n]]
			}
			else if (conf[chest[w].type].attrs[n]=="dmg")
			{
				td.innerHTML=getWebDiceDisplay(chest[w]["dmg"])
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

/**
 * RETURNS a DOM table representing an NPC
 * or empty string if npc is null or undefined
 */
function getNPCdisplay(npc)
{
	if (!npc)
		return ""
	
	var table = document.createElement('table')
	table.style.borderCollapse="collapse"
	table.style.borderStyle="solid"
	var tr = document.createElement('tr')
	tr.style.borderBottom = "1px solid"
	var tdn = document.createElement('td')
	tdn.style.textAlign="center"
	tdn.colSpan = 2
	tdn.innerHTML = "<b>"+npc.name+"</b>"
	tr.appendChild(tdn)
	
	var tdh = document.createElement('td')
	tdh.innerHTML = "<i>HP&nbsp;:</i> <b>"+npc.hp+"</b>"
	var initiativeBonus=npc.abilities.WIS
	if (Object.keys(npc.skills).indexOf("Initiative")>=0)
		initiativeBonus+=npc.skills["Initiative"]
	if (initiativeBonus > 0)
		initiativeBonus = "+"+initiativeBonus
	tdh.innerHTML+=" <i>Init&nbsp;:</i> <b>"+initiativeBonus+"</b>"
	tr.appendChild(tdh)
	
	var td = document.createElement('td')
	td.innerHTML = npc.alignment
	tr.appendChild(td)
	
	table.appendChild(tr)
	
	
	tr = document.createElement('tr')
	var tda = document.createElement('td')
	tda.style.verticalAlign="top"
	// abilities
	var tab = document.createElement('table')
	
	var abi = Object.keys(npc.abilities)
	for (var i in abi)
	{
		var tra = document.createElement('tr')
		td = document.createElement('td')
		td.innerHTML = abi[i]
		tra.appendChild(td)
		td = document.createElement('td')
		if (abi[i] == "DEX" && npc.armor && npc.armor.dexmod != 0)
		{
			td.innerHTML=npc.abilities[abi[i]]+npc.armor.dexmod
			if (npc.armor.dexmod > 0)
				tra.style.color="#0A0"
			else
				tra.style.color="#A00"
			tra.title="DEX "+npc.abilities[abi[i]]+" "+(npc.armor.dexmod>0?'+':'') + npc.armor.dexmod
		}
		else
			td.innerHTML=npc.abilities[abi[i]]
		td.style.textAlign = "right"
		tra.appendChild(td)
		tab.appendChild(tra)
	}
	tda.appendChild(tab)
	tr.appendChild(tda)
	
	var tds = document.createElement('td')
	tds.style.verticalAlign="top"
	tds.style.borderLeft="1px solid"
	tds.style.borderRight="1px solid"
	tab = document.createElement('table')
	var ski = Object.keys(npc.skills)
	for (var i in ski)
	{
		var tra = document.createElement('tr')
		td = document.createElement('td')
		td.innerHTML = ski[i]
		tra.appendChild(td)
		td = document.createElement('td')
		td.innerHTML=npc.skills[ski[i]]
		td.style.textAlign = "right"
		tra.appendChild(td)
		tab.appendChild(tra)
	}
	tds.appendChild(tab)
	tr.appendChild(tds)
	
	var tdi = document.createElement('td')
	tdi.colSpan=2
	tdi.style.verticalAlign="top"
	tab = document.createElement('table')
	var inv = Object.keys(npc.inventory)
	for (var i in inv)
	{
		var item = npc.inventory[inv[i]]
		var tra = document.createElement('tr')
		tra.title = item.toString()
		td = document.createElement('td')
		td.style.minWidth="9em"
		td.innerHTML = item.name
		tra.appendChild(td)
		if (item.type.indexOf("Weapon")>=0)
		{
			td = document.createElement('td')
			var mods = 0
			{
				mods+=npc.abilities.DEX
				if (npc.armor)
					mods+=npc.armor.dexmod
				var wpSkill = 0
				for (var j in ski)
				{
					if (item.cat.indexOf(ski[j]) >= 0 && npc.skills[ski[j]] > wpSkill)
						wpSkill = npc.skills[ski[j]]
				}
				mods+=wpSkill
			}
			if (mods > 0) {var wpColor = "#0A0" }
			else if (mods > 0) {var wpColor = "#A00" }
			else {var wpColor = "#000" }
			td.innerHTML = item.atk+mods
			td.title="ATK "+item.atk+" "+(mods>0?'+':'') + mods
			if (item.hands==1)
				td.title+="\n"+(item.atk+mods+1)+" if off-hand free"
			td.style.color = wpColor
			td.style.textAlign="right"
			td.style.minWidth="1em"
			tra.appendChild(td)
			td = document.createElement('td')
			td.innerHTML = item.par+mods
			td.title="PAR "+item.par+" "+(mods>0?'+':'') + mods
			if (item.hands==1)
				td.title+="\n"+(item.par+mods+1)+" if off-hand free"
			td.style.color = wpColor
			td.style.textAlign="right"
			td.style.minWidth="1em"
			tra.appendChild(td)
		}
		else
		{
			tra.appendChild(document.createElement('td'))
			tra.appendChild(document.createElement('td'))
		}
		td = document.createElement('td')
		td.innerHTML=item.val
		td.style.textAlign = "right"
		td.style.minWidth="1.5em"
		tra.appendChild(td)
		tab.appendChild(tra)
	}
	tdi.appendChild(tab)
	tr.appendChild(tdi)

	table.appendChild(tr)
	
	if (npc.armor)
		var armor = npc.armor
	else
		var armor = {name:"No armor", dmg:"0",toString:function(){return "Not wearing armor"}}
	tr = document.createElement('tr')
	tr.title = armor.toString()
	tr.style.borderTop = "1px solid"
	td = document.createElement('td')
	td.colSpan=2
	td.style.textAlign="center"
	td.innerHTML = armor.name
	tr.appendChild(td)
	td = document.createElement('td')
	td.colSpan=2
	td.style.textAlign="right"
	td.style.paddingRight="1em"
	td.innerHTML = "<i>PROT&nbsp;:</i> <b>"+getWebDiceDisplay(armor.dmg)+"</b>"
	tr.appendChild(td)
	
	table.appendChild(tr)
	
	return table
}


/**
 * A levenshtein distance calculator
 * from kigiri on Github, thanks
 * (MIT licensed)
 *
 * cost should be an object {sub:x, ins:y, del:z},
 * with 1,1,1 defaults if left undefined
 */
function levenshtein(a, b, cost)
{
  if (typeof(cost) === 'undefined')
    var cost = {sub:1, ins:1, del:1}

  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  let tmp, i, j, prev, val, row
  // swap to save some memory O(min(a,b)) instead of O(a)
  if (a.length > b.length) {
    tmp = a
    a = b
    b = tmp
  }

  row = Array(a.length + 1)
  // init the row
  for (i = 0; i <= a.length; i++) {
    row[i] = i
  }

  // fill in the rest
  for (i = 1; i <= b.length; i++) {
    prev = i
    for (j = 1; j <= a.length; j++) {
      if (b[i-1] === a[j-1]) {
        val = row[j-1] // match
      } else {
        val = Math.min(row[j-1] + cost.sub, // substitution
              Math.min(prev + cost.ins,     // insertion
                       row[j] + cost.del))  // deletion
      }
      row[j - 1] = prev
      prev = val
    }
    row[a.length] = prev
  }
  return row[a.length]
}