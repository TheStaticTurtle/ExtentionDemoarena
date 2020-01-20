function calculate_the_magic(ue) {
	totalNote = 0
	totalCoeff = 0

	for (var i = 0; i < ue["subject"].length; i++) {
		sub = ue["subject"][i]
		console.log(sub)
		if(!isNaN(sub["note"])) {
			totalNote += sub["note"] * sub["coeff"]
			totalCoeff += sub["coeff"]
		}
	}

	return {"moy":(totalNote / totalCoeff),"coeffs":totalCoeff};
}

function do_the_magic() {
	all_tr = document.getElementsByClassName("notes_bulletin")[0].getElementsByTagName("tr")

	UES = []
	currentUE = {"ueId":"BUG", "subject":[]}
	foundTheFirstOne = false;

	for (var i = 0; i < all_tr.length; i++) {
		currentLine = all_tr[i]
		if(currentLine.hasAttribute("class") && currentLine.className == "notes_bulletin_row_ue") {
			//This is a new unit
			if(foundTheFirstOne){ UES.push(currentUE) }
			currentUE = {"ueId":currentLine.children[0].textContent, "subject":[]}
			foundTheFirstOne = true;
		} else if(currentLine.hasAttribute("class") && currentLine.className == "toggle4") { 
			//This is a new note for current subject
		} else {
			//This is a new subject
			if(foundTheFirstOne){
				currentUE["subject"].push({"name":currentLine.children[2].textContent,"note":parseFloat(currentLine.children[4].textContent),"coeff":parseFloat(currentLine.children[6].textContent)})
			}
		}

	}

	if(foundTheFirstOne){
		UES.push(currentUE)
	}

	table = document.getElementsByClassName("notes_bulletin")[0]
	tbody = table.children[0]
	tbody.innerHTML += "<tr class=\"notes_bulletin_row_ue\"> <td class=\"ue\" colspan=\"3\"><span onclick=\"toggle_vis_ue(this);\" class=\"toggle_ue\"><img src=\"imgs/minus_img.png\" alt=\"-\" title=\"\" width=\"13\" height=\"13\" border=\"0\"></span>Moyennes</td> <td class=\"ue_vide style='border-right:none'></td> <td class=\" ue_vide=\"\" style=\"border-right:none\"></td> <td class=\"ue_vide style='border-right:none'></td> <td class=\" ue_vide\"=\"\" style=\"border-right:none\"></td><td class=\"ue_vide\" style=\"border-right:none\"></td> <td class=\"ue\"></td> </tr>"

	totalNote2 = 0
	totalNoteNumber = 0
	totalOffset = 0
	for (var i = 0; i < UES.length; i++) {
		currentUE = UES[i]
		console.log(currentUE)
		if(currentUE["subject"].length > 0) {
			magic = calculate_the_magic(currentUE)
			if(currentUE["ueId"].toLowerCase().includes("bonus")) {
				console.log("Got bonus: "+ magic["moy"]+" of "+currentUE["ueId"])	
				if(!isNaN(magic["moy"])) {
					totalOffset += magic["moy"]
				}
			} else {
				console.log("Got: "+ magic["moy"]+" for "+currentUE["ueId"])
				totalNote2 += magic["moy"]
				totalNoteNumber +=1
			}
			tbody.innerHTML += "<tr>  <td></td> <td class=\"titre\">"+(i+1)+"</td> <td class=\"titre\">"+currentUE["ueId"]+"</td> <td class=\"titre\"></td> <td class=\"titre\">"+(Math.round(magic["moy"]*100)/100)+"</td><td class=\"titre\"></td>  <td class=\"titre\">"+magic["coeffs"]+"</td></tr>"
		} else {
			tbody.innerHTML += "<tr>  <td></td> <td class=\"titre\">"+(i+1)+"</td> <td class=\"titre\">"+currentUE["ueId"]+"</td> <td class=\"titre\"></td> <td class=\"titre\"></td><td class=\"titre\"></td>  <td class=\"titre\"></td></tr>"
			console.log("You don't have any notes for "+currentUE["ueId"])
		}

		
	}
	tbody.innerHTML += "<tr><td colspan=\"6\">&nbsp;</td></tr>"
	tbody.innerHTML += "<tr>  <td></td> <td class=\"titre\"></td> <td class=\"titre\">Moyenne generale</td> <td class=\"titre\"></td> <td class=\"titre\">"+(Math.round(((totalNote2/totalNoteNumber)+totalOffset)*100)/100)+"</td><td class=\"titre\"></td>  <td class=\"titre\"></td></tr>"

}

do_the_magic()