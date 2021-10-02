//not working

const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/", function (req, res) {
  // res.send("hello")
  //   res.status(200).sendFile(path.join(__dirname, "../public/HTML/index.html"));
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

router.get("/video", function (req, res) {
  // res.send("hello");
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Range header is required");
  }

  const videoPath = path.join(__dirname, "../public/videos/NGGYUP.m4v");
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6; //1 MB
  const start = Number(range.replace(/\D/g, "")); //
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1); //
  const contentLength = end - start + 1;
  //
  const headers = {
    "Content-Range": `bytes ${start}-${end}/$(videoSize)`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers); //Used because we've set the response headers manually here.
  //
  const videoStream = fs.createReadStream(videoPath, { start, end }); //
  videoStream.pipe(res); //
});

module.exports = router;

//-> Not understood
