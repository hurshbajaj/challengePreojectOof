const http = require('http');
const fs = require("fs");
const path = require("path")

let params = "No Params Given"

let server = http.createServer((req, res) => {
    let baseURL = req.url.split("?")[0]
    console.log(params)
    if(req.url.split("?")[1]){
        params = req.url.split("?")[1];
    }
    if(req.method != "POST"){
        switch (baseURL) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            let stream2 = fs.createReadStream(path.join(__dirname, "/normal.html"))
            stream2.pipe(res)
            break;
        case "/dynamic":
            res.writeHead(200, { "Content-Type": "text/html" });
            let stream3 = fs.createReadStream(path.join(__dirname, "/dynamic.html"))
            stream3.pipe(res)
            break;

        default:
            res.writeHead(200, { "Content-Type": "image/jpg" });
            let pathToImg = path.join(__dirname, "/img.jpg")
            let stream = fs.createReadStream(pathToImg)
            stream.pipe(res);
            break;
        }
    }
    else if(req.method === "POST"){
        res.writeHead(200, {"content-Type": "text/plain"})
        res.end(params);

    }
    

    }
)

server.listen(3000, 'localhost', ()=>{
    console.log("Listening");
})
