import express from "express";

const PORT = 8000;

const app = express();

app.get("/api", (req,res) => {
    res.json({
        ok: true,
        data: "hello world",
    });
});

app.listen(PORT, () => {
    console.log(`app start on port ${PORT} `)
})