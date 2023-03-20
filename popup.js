document.addEventListener('DOMContentLoaded', function() {
    lookupForm = document.getElementById("lookupForm");
    console.log(lookupForm);
    lookupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // handle submit
        textName = document.getElementById("lookup").value;
        console.log(textName);
        $.ajax({
            method: 'GET',
            url: "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + textName + "?key=4a081931-a26c-4144-8e98-835dd8f2d239",
            contentType: 'application/json',
            success: function(result) {
                console.log(result);
                let setInnerHTML = "<div style='text-align: center'>" + textName + "<br>";
                meanings = result;
                count = 0;
                for (const meaning of meanings) {
                    if (count >= 3) {
                        break;
                    }
                    setInnerHTML += "<b> DEFINITION " + (count+1) + "</b><br>";
                    console.log(meaning)
                    let curMeaning = ""
                    curMeaning += "Part of Speech: " + meaning["fl"] + "<br>"
                    for (const def of meaning["shortdef"]) {
                        curMeaning += "Definition: " + def + "<br>";
                    }
                    
                    setInnerHTML += curMeaning;
                    count += 1;
                }
                setInnerHTML += "</div>"
                document.getElementById("definitions").innerHTML=setInnerHTML
                    
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
      });
  });