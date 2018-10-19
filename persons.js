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
function finalizePerson(p, mod, gearSources)
{
	// TODO handle modifiers
	
	if (!p.hp)
	{
		p.hp=7+p.abilities.CONS
	}
	var inv = Object.assign({},p.inventory)
	p.inventory=[]
	var constraints = {catmust:[]}
	var s = Object.keys(p.skills)
	for (var i in s)
		constraints.catmust.push(s[i])
	
	for (var i in inv)
	{
		if (inv[i].name == "Gold")
			p.inventory.push({type:"Gold", val:getRandom(Math.max(0,inv[i].val-5), inv[i].val+5) // FIXME better repartition
			                  , weight:0, name:"Gold", desc:"A pouch of gold."})
		else
			p.inventory.push(gearSources[inv[i].name].getRandomWeapons(1,inv[i].val, constraints)[0])
	}
	
	if (p.armorVal > 0)
		p.armor = gearSources["Armor"].getRandomWeapons(1, p.armorVal)[0]
	
	p.cr = p.abilities.STR
	     + p.abilities.DEX
	     + p.abilities.INT
	     + p.abilities.WIS /2
	     + p.abilities.CHA /2
	     + p.abilities.CONS
	     + p.abilities.WILL /2
	     + p.abilities.LUCK /2
	     + p.abilities.MANA /2
		 
	return p
}