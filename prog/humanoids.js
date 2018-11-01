/**
 * Before this, import :
 *  - weapons.js
 *  - utility.js
 */

 
/**
 * turns a person into a tabular table for latex
 */
function latexTableFromPerson(ch)
{
	if (ch.hp)
		var hp=ch.hp
	else
		var hp = 5+ch.abilities["CONS"]
	result="\\fbox {"+"\n"
	+"\\begin{tabular}{c|c|c}"+"\n"
	+"\\multicolumn{2}{c|}{\\textbf{"+ch.name+"}} & \\textbf{"+hp+"} HP\\\\"+"\n"
	+"    \\hline\\hline"+"\n"
	+"    \\begin{tabular}[t]{r c}"+"\n"
	+"        \\multicolumn{2}{c}{\\textit{Abilities}}\\\\"+"\n"
	+"        \\hline"+"\n"
	+"        STR &  "+ch.abilities["STR"]+"  \\\\"+"\n"
	+"        DEX &  "+ch.abilities["DEX"]+"  \\\\"+"\n"
	+"        INT &  "+ch.abilities["INT"]+"  \\\\"+"\n"
	+"        WIS &  "+ch.abilities["WIS"]+"  \\\\"+"\n"
	+"        CHA &  "+ch.abilities["CHA"]+"  \\\\"+"\n"
	+"        \\cline{1-2}"                        +"\n"
	+"        CONS &  "+ch.abilities["CONS"]+" \\\\"+"\n"
	+"        WILL &  "+ch.abilities["WILL"]+" \\\\"+"\n"
	+"        LUCK &  "+ch.abilities["LUCK"]+" \\\\"+"\n"
	+"        MANA &  "+ch.abilities["MANA"]+" \\\\"+"\n"
	+"    \\end{tabular}"+"\n"
	+"    &"+"\n"
	+"    \\begin{tabular}[t]{r c}"+"\n"
	+"        \\multicolumn{2}{c}{\\textit{Skills}}\\\\"+"\n"
	+"        \\hline"+"\n"
	var s = Object.keys(ch.skills)
	for (var i in s)
	{
		result+="        "+s[i] + "&" + ch.skills[s[i]] + "\\\\" + "\n"
	}
	result+="    \\end{tabular}"+"\n"
	+"    &"+"\n"
	+"    \\begin{tabular}[t]{l}"+"\n"
	+"        \\multicolumn{1}{c}{\\textit{Inventory}}\\\\"+"\n"
	+"        \\hline"+"\n"
	for (var i in ch.inventory)
	{
		result+="        "+ch.inventory[i] + "\\\\" + "\n"
	}
	result+="    \\end{tabular}"+"\n"
	+"    \\\\"+"\n"
	+"    \\hline\\hline"+"\n"
	+"    \\multicolumn{2}{c|}{\\textbf{"+ch.armor.name+"} ("+ch.armor.dexmod+" DEX)} & \\textit{PROT :} "+ch.armor.prot+"\\\\"+"\n"
	+"\\end{tabular}"+"\n"
	+"}"+"\n"

	return result
}
 
/**
 * gearSources is a dictionary (weapon type => random source for that)
 */
function finalizeHumanoid(p, mod, gearSources)
{
	var fp = Object.assign({},p)
	// TODO handle modifiers
	
	if (!fp.hp)
	{
		fp.hp=7+fp.abilities.CONS
	}
	var inv = Object.assign({},fp.inventory)
	fp.inventory=[]
	var constraints = {}
	if (fp.inventoryWeaponsNeedSkills)
	{
		constraints = {catmust:[]}
		var s = Object.keys(fp.skills)
		for (var i in s)
			constraints.catmust.push(s[i])
	}
	
	fp.inventory = getObjects(inv, constraints, gearSources)
	
	if (fp.armorVal > 0)
		fp.armor = gearSources["Armor"].getRandomItems(1, fp.armorVal)[0]
	
	fp.cr = fp.abilities.STR
	      + fp.abilities.DEX
	      + fp.abilities.INT
	      + fp.abilities.WIS /2
	      + fp.abilities.CHA /2
	      + fp.abilities.CONS
	      + fp.abilities.WILL /2
	      + fp.abilities.LUCK /2
	      + fp.abilities.MANA /2
	
	return fp
}

/**
 * takes an NPC inventory description and returns a set of objects
 */
function getObjects(inv, constraints, gearSources)
{
	var result = []
	for (var i in inv)
	{
		if (inv[i].name === "EITHER")
		{
			var choice = inv[i].options[getRandom(0,inv[i].options.length)]
			if (typeof(choice.name) !== "undefined") // it's not a list already
				choice = [choice]                    // not great, I know
			result = result.concat(getObjects(choice, constraints, gearSources))
		}
		
		else if (inv[i].name === "Gold")
			result.push({name:"Gold", type:"Gold", val:getRandom(Math.max(0,inv[i].val-5), inv[i].val+5) // FIXME better repartition
			                  , weight:0, name:"Gold", desc:"A pouch of gold."})
		
		else
		{
			var cons = simpleDictConcat(constraints, inv[i].constraints)
			cons.catmust = []
			if (!inv[i].constraints || !inv[i].constraints.catmust || inv[i].constraints.catmust.length == 0)
				var a = undefined
			else
				var a = inv[i].constraints.catmust
			if (!constraints || !constraints.catmust || constraints.catmust.length == 0)
				var b = undefined
			else
				var b = constraints.catmust
			
			if (!a)
				cons.catmust = b
			else if (!b)
				cons.catmust = a
			else
				cons.catmust = innerJoinArrays(a,b)
			
			result.push(gearSources[inv[i].name].getRandomItems(1,inv[i].val, cons)[0])
		}
	}
	return result
}


