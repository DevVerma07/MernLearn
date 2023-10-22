const http = require("node:http");

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.url === "/") {
    response.end(
      JSON.stringify({
        name: "dev is op",
        class: 13,
        main: "local",
      })
    );
  } else if (request.url === "/create") {
    response.end(
      JSON.stringify({
        name: "create is here",
        class: 35,
        main: "hai",
      })
    );
  } else if (request.url === "/not") {
    response.end(
      JSON.stringify({
        name: "not is not here",
        class: "de",
        main: "focal",
      })
    );
  } else if (request.url === "/what") {
    response.end(
      JSON.stringify({
        name: "what is here",
        class: 45,
        main: "provider",
      })
    );
  } else {
    response.end(
      JSON.stringify({
        message: "route is not found",
      })
    );
  }
});

server.listen(3000, () => {
  console.log("listening on");
});
