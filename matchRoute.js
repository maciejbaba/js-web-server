const routes = require("./routes");

const matchRoute = (method, url) => {
  for (let route in routes) {
    const routeMethod = route.split("/")[0]; // first part f.e. "GET" from "GET/posts/:id"
    const routeUrl = route.split("/").slice(1).join("/"); // the rest of the route f.e. "posts/:id" from "GET/posts/:id"
    if (method !== routeMethod) continue;
    if (url.startsWith("/")) url = url.slice(1); // remove leading slash, otherwise it won't match because of the split below which will create an empty string at the beginning of the array
    const urlParts = url.split("/"); // here will be an empty string at the beginning of the array if there was a leading slash and the length will be + 1
    const routeParts = routeUrl.split("/"); // here there will be no empty string
    if (urlParts.length !== routeParts.length) continue; // and this will fail if there was a leading slash

    const params = {};

    const match = routeParts.every((routePart, i) => {
      if (routePart[0] === ":") {
        params[routePart.slice(1)] = urlParts[i];
        return true;
      }
      return routePart === urlParts[i];
    });
    if (match) {
      return { handler: routes[route], params };
    }
  }
  return null;
};
module.exports = matchRoute;
