var blob = new Blob([document.documentElement.outerHTML], {type: "text/html"});
var link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = "page.html";
link.click();
