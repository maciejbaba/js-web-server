const routes = require("./routes");

const matchRoute = (method, url) => {
  for (let route in routes) {
    const [routeMethod, routeUrl] = route.split("/");
    if (method !== routeMethod) continue;

    const urlParts = url.split("/");
    const routeParts = routeUrl.split("/");
    if (urlParts.length !== routeParts.length) continue;

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
