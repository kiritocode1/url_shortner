import {  route, type Route , Handler} from "jsr:@std/http@1.0.9";


export class Router { 
    #routes: Route[] = new Array<Route>();

    get handler() { 
        return route(this.#routes, ()=>new Response("Not found", { status: 404 }));
    }; 

    #addRoute(method: string, path: string, handler: Handler) {
        this.#routes.push({ 
            pattern: new URLPattern({ pathname: path }), 
            method: method, 
            handler: async(req, info, params) => { 
                try {
                    return await handler(req, info!, params!) as Response;
                } catch (e) { 
                    console.error(e);
                    return new Response("Internal server error", { status: 500 });
                }
            }
        })
    };

    get(path: string, handler: Handler) {
        this.#addRoute("GET", path, handler);
    }; 
    post(path: string, handler: Handler) {
        this.#addRoute("POST", path, handler);
    };
    put(path: string, handler: Handler) {
        this.#addRoute("PUT", path, handler);
    };
    delete(path: string, handler: Handler) {
        this.#addRoute("DELETE", path, handler);
    };
    patch(path: string, handler: Handler) {
        this.#addRoute("PATCH", path, handler);
    };
};