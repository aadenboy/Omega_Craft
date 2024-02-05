var elements = window.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements

function save() {
  localStorage.setItem("infinite-craft-data", JSON.stringify({
    elements: elements
  }))
}

function createButton(disp, funct, style) {
    function buttonFunct() {
        funct()
        save()
    }

    let addElt = document.createElement('input');
    addElt.value = disp;
    addElt.type = "button";
    addElt.onclick = function(){buttonFunct()};
    addElt.classList.add("sidebar-input");
    addElt.style = "width: 30px; height: 30px; border: 1px solid #0005; border-radius: 3px; text-align: center; text-size: 80%;" + style
    document.querySelector('.sidebar-controls').appendChild(addElt);
}

createButton("-", function() {
    let name = prompt("Element to remove");

    if (name != "" && name != null) {
        var i = 0;
        elements.every(elem => {
            if (elem.text == name) {
                elements.splice(i, 1)
                return false
            }
            i++;
            return true
        })
    }
}, "")

createButton("$", function() {
    let name = prompt("Element to award (or unaward) as First Discovery");

    if (name != "" && name != null) {
        var i = 0;
        elements.every(elem => {
            if (elem.text == name) {
                elem.discovered = !elem.discovered;
                return false
            }
            i++;
            return true
        })
    }
}, "")

createButton("$", function() {
    let named = prompt("Element to award (or unaward) as First Discovery");
    
    if (named != "" && named != null) {
        var elem = elements.findIndex(named)
        
        if (elem != -1) {
            elem.discovered = !elem.discovered
        }
    }
}, "")

createButton("X", function() {
    let confirm = prompt("Are you sure you want to reset your progress?");
    
    if (confirm.substring(0, 1) == "y") {
        // I tried replacing elements with an array but it just wasn't cooperating >:/

        elements.splice(0, elements.length)
        elements.push({text: "Water", emoji: "💧", discovered: false})
        elements.push({text: "Fire", emoji: "🔥", discovered: false})
        elements.push({text: "Wind", emoji: "🌬️", discovered: false})
        elements.push({text: "Earth", emoji: "🌍", discovered: false})
    }
}, "background-color: #f009;")
