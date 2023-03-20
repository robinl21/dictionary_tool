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
                let setInnerHTML = "<div style='text-align: center; font-size: x-large'>" + textName + "<br></div>";
                meanings = result;
                count = 0;
                for (const meaning of meanings) {
                    if (count >= 3) {
                        break;
                    }
                    setInnerHTML += "<div style='font-size: large; text-align: center'><b> MEANING " + (count+1) + "</b><br></div>";
                    setInnerHTML += "<div> Offensive? " + meaning["meta"]["offensive"] + "</div>";
                    console.log(meaning)
                    let curMeaning = "<div>"
                    curMeaning += "Part of Speech: " + meaning["fl"] + "<br>"
                    let defCount = 0;
                    for (const def of meaning["shortdef"]) {
                        curMeaning += "<b>Definition " + (defCount+1) + ": </b>" + def + "<br>";
                        defCount += 1;
                    }
                    
                    setInnerHTML += (curMeaning + "</div>");
                    count += 1;
                }

                document.getElementById("definitions").innerHTML=setInnerHTML
                    
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
                document.getElementById("definitions").innerHTML="<div>We could not find that word</div>";
            }
        });
      });
  });