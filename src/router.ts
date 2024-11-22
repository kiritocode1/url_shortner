import {  route, type Route , Handler} from "jsr:@std/http@1.0.9";
import { type GithubUser } from "./db.ts";
import { getCurrentUser } from "./auth.ts";
import { render } from "npm:preact-render-to-string";
import { ErrorPage } from "./ui.tsx";

export class Router {
  #routes: Route[] = new Array<Route>();
  currentUser: GithubUser | null = null;
  

  get handler() {
    return route(
      this.#routes,
      () => { return new Response(render(ErrorPage({ user: this.currentUser })), {
        status: 500,
        headers: { "content-type": "text/html" },
      }); }
    );
  }

  #addRoute(method: string, path: string, handler: Handler) {
    this.#routes.push({
      pattern: new URLPattern({ pathname: path }),
      method: method,
      handler: async (req, info, params) => {
        try {
          this.currentUser = await getCurrentUser(req);
          // console.dir(this.currentUser, { depth: Infinity, colors: true });
          return (await handler(req, info!, params!)) as Response;
        } catch (e) {
          console.error(e);
          return new Response("Internal server error : Route.ts", {
            status: 500,
          });
        }
      },
    });
  }

  get(path: string, handler: Handler) {
    this.#addRoute("GET", path, handler);
  }
  post(path: string, handler: Handler) {
    this.#addRoute("POST", path, handler);
  }
  put(path: string, handler: Handler) {
    this.#addRoute("PUT", path, handler);
  }
  delete(path: string, handler: Handler) {
    this.#addRoute("DELETE", path, handler);
  }
  patch(path: string, handler: Handler) {
    this.#addRoute("PATCH", path, handler);
  }
};