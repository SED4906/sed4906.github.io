function renderTinyText() {
  canvas = document.getElementById("canvas");
  argument = document.getElementById("argument");
  area = document.getElementById("area");
  const s = area.value;
  const ctx = canvas.getContext('2d');
  if(!ctx) return;
  const img = new Image();
  var xs=0;
  var xsm=0;
  var ys=1;
  for(var i=0;i<s.length;i++) {
    if(s[i] == '\n') {ys++;xs=0;}
    else if(32 <= s.charCodeAt(i) && s.charCodeAt(i) <= 126) {
    xs++;
    if(xsm < xs) xsm = xs;
    }
  }
  canvas.width = xsm*4;
  canvas.height = ys*6;
  img.onload = () => {
  var x=0;
  var y=0;
  for(i=0;i<s.length;i++) {
    if(s[i] == '\n') {y++; x=0;}
    else if(32 <= s.charCodeAt(i) && s.charCodeAt(i) <= 126) {ctx.drawImage(img, Math.min(s.charCodeAt(i)*4, 127*4), 0, 4, 6, x*4, y*6, 4, 6);
    x++}
    }
  };
  img.onerror = err => { throw err };
  if(argument.checked) img.src = 'm/4x6tw.png'; else img.src = 'm/4x6.png';
}