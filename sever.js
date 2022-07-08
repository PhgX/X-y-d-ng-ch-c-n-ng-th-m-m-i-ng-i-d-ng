const http = require("http");
const fs = require("fs");
const qs = require("qs");

let personsInfo = [];
let display = "";

const server = http.createServer(function (req, res) {
  if (req.method === "GET") {
    fs.readFile("./views/info.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let userInfo = qs.parse(data);
      personsInfo.push(userInfo);
      console.log(personsInfo);

      fs.readFile("./views/info.html", "utf8", function (err, datahtml) {
        if (err) {
          console.log(err);
        }
        display += `<p>${userInfo.name}</p>
    <p>${userInfo.phone}</p>
    <p>${userInfo.email}</p>
    <p>${userInfo.address}</p>`;
        datahtml = datahtml.replace("{listUser}", display);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(datahtml);
        return res.end();
      });
    });
    req.on("error", () => {
      console.log("error");
    });
  }
});

server.listen(8080, function () {
  console.log("server running at localhost:8080 ");
});
