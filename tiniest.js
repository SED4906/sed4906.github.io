function renderTiniestText() {
  canvas = document.getElementById("tiniestcanvas");
  area = document.getElementById("tiniestarea");
  const s = area.value;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const img = new Image();
  var xs = 0;
  var xsm = 0;
  var ys = 1;
  for (var i = 0; i < s.length; i++) {
    if (s[i] == '\n') { ys++; xs = 0; }
    else if (32 <= s.charCodeAt(i) && s.charCodeAt(i) <= 126) {
      xs++;
      if (xsm < xs) xsm = xs;
    }
  }
  canvas.width = xsm;
  canvas.height = ys * 4;
  img.onload = () => {
    var x = 0;
    var y = 0;
    for (i = 0; i < s.length; i++) {
      if (s[i] == '\n') { y++; x = 0; }
      else if (32 <= s.charCodeAt(i) && s.charCodeAt(i) <= 126) {
        ctx.drawImage(img, Math.min(s.charCodeAt(i) - 32, 95), 0, 1, 4, x, y * 4, 1, 4);
        x++
      }
    }
  };
  img.onerror = err => { throw err };
  img.src = 'm/1x4.png';
}
