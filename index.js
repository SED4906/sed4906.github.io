function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setTheme(tname)
{
  if(tname == "dark") {
    $("body").css("background-color","#474747");
    $("body").css("color","#C4CAC5");
    $("a:link, a:visited").css("color","#D4AF37");
  } else if(tname == "light") {
    $("body").css("background-color","#C4CAC5");
    $("body").css("color","#474747");
    $("a:link, a:visited").css("color","#B87333");
  }
}

function toggleTheme()
{
  if(getCookie("theme") == "dark") {
    setCookie("theme","light",365);
    setTheme(getCookie("theme"));
  } else if(getCookie("theme") == "light") {
    setCookie("theme","dark",365);
    setTheme(getCookie("theme"));
  }
}

$(document).ready(function(){
if(getCookie("theme") == "") setCookie("theme","dark",365);
setTheme(getCookie("theme"));
});
