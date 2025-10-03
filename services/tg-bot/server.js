const http = require("http");
const { validateRuntimeEnv } = require("./config-check");

const PORT = parseInt(process.env.PORT || "8091", 10);
const start = () => {
  // Validate env per runtime policy; will exit(1) if required keys absent.
  validateRuntimeEnv();

  const srv = http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ status: "ok", ts: new Date().toISOString() }));
      return;
    }
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  });
  srv.listen(PORT, () => console.log(`[vinops-tg-bot] listening on :${PORT}`));
};
if (require.main === module) start();
