// Builds a single self-contained hebrew-app.html with the CSS and both
// scripts inlined, so the app can be opened directly from disk or dropped
// onto any static host with no other files alongside it.
//
//   node build-single-file.js [outputPath]

const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = process.argv[2] || path.join(root, "hebrew-app.html");

const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

const safe = (js, name) => {
  if (/<\/script/i.test(js)) {
    throw new Error(name + " contains a literal </script>; escape it before inlining.");
  }
  return js;
};

const html = read("index.html")
  .replace('<link rel="stylesheet" href="style.css">', "<style>\n" + read("style.css") + "\n</style>")
  .replace('<script src="data.js"></script>', "<script>\n" + safe(read("data.js"), "data.js") + "\n</script>")
  .replace('<script src="app.js"></script>', "<script>\n" + safe(read("app.js"), "app.js") + "\n</script>");

for (const marker of ["style.css", "data.js", "app.js"]) {
  if (html.includes('href="' + marker + '"') || html.includes('src="' + marker + '"')) {
    throw new Error("Failed to inline " + marker + " — the tag in index.html did not match.");
  }
}

fs.writeFileSync(out, html);
console.log("Wrote " + out + " (" + (Buffer.byteLength(html) / 1024).toFixed(0) + " KB, self-contained)");
