const http = require("http")
const PORT = 8000;

const server = http.createServer((req, res) => {
    if (req.url === "/api" && req.method === "GET") {
        res.writeHead(200, { "Content-Type" : "application/json" });
        res.write(
            JSON.stringify({
                ok: true,
                data: "hello world",
            })
        );
        res.end();
    } else {
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.write (
            JSON.stringify({
                ok: false,
                data: "url is not found"
            })
        );
        res.end();
    };
    
});

server.listen(PORT, () => {
    console.log(`server start on port : ${PORT}`);
})
