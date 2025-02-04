function addnew(){
    let input = prompt("ํYOUR LIST TO DO");
    if (input !== '' && input !== null) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(input));
        div.setAttribute("onclick", "Deletelist(this)");
        document.getElementById("ft_list").insertBefore(div, document.getElementById("ft_list").firstChild);
        setCookie("listd", document.getElementById("ft_list").innerHTML, 30);
    }
}
function Deletelist(elem){
    if (confirm("Are you sureto delete : "+elem.innerText)) {
        elem.parentNode.removeChild(elem);
        setCookie("listd", document.getElementById("ft_list").innerHTML, 30);
    }
}


function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
function getCookie(cname) {
    let listd = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(listd) == 0) {
        return c.substring(listd.length, c.length);
      }
    }
    return "";
}

function checkCookie(){
    let listd = getCookie("listd");
    if (listd !== "") {
        document.getElementById("ft_list").innerHTML = listd;
    }
}