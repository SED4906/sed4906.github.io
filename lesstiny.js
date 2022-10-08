function renderLessTinyText() {
  canvas = document.getElementById("lesscanvas");
  argument = document.getElementById("lessargument");
  area = document.getElementById("lessarea");
  const s = area.value;
  const ctx = canvas.getContext('2d');
  if(!ctx) return;
  const img = new Image();
  var xs=0;
  var xsm=0;
  var ys=1;
  for(var i=0;i<s.length;i++) {
    if(s[i] == '\n') {ys++;xs=0;}
    else if(32 <= s.charCodeAt(i) && s.charCodeAt(i) <= 255) {
    xs++;
    if(xsm < xs) xsm = xs;
    }
  }
  canvas.width = xsm*9;
  canvas.height = ys*14;
  img.onload = () => {
  var x=0;
  var y=0;
  for(i=0;i<s.length;i++) {
    if(s[i] == '\n') {y++; x=0;}
    else if(32 <= s.charCodeAt(i) && s.charCodeAt(i) <= 255) {ctx.drawImage(img, Math.min(s.charCodeAt(i)*9, 255*9), 0, 9, 14, x*9, y*14, 9, 14);
    x++}
    }
  };
  img.onerror = err => { throw err };
  if(argument.checked) img.src = 'm/9x14tw.png'; else img.src = 'm/9x14.png';
}