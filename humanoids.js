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
	var constraints = {catmust:[]}
	var s = Object.keys(fp.skills)
	for (var i in s)
		constraints.catmust.push(s[i])
	for (var i in inv)
	{
		console.log(i, inv[i])
		
		if (inv[i].type == "Gold" || inv[i].name == "Gold")
			fp.inventory.push({name:"Gold", type:"Gold", val:getRandom(Math.max(0,inv[i].val-5), inv[i].val+5) // FIXME better repartition
			                  , weight:0, name:"Gold", desc:"A pouch of gold."})
		else
			fp.inventory.push(gearSources[inv[i].name].getRandomWeapons(1,inv[i].val, simpleDictConcat(constraints, inv[i].constraints))[0])
	}
	
	if (fp.armorVal > 0)
		fp.armor = gearSources["Armor"].getRandomWeapons(1, fp.armorVal)[0]
	
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