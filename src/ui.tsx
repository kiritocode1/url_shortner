/** @jsxImportSource https://esm.sh/preact */

import type { ComponentChildren } from "npm:preact";

export function Layout({ children }: { children: ComponentChildren }) { 

    return (
      <html data-theme="light">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/daisyui@4.12.13/dist/full.min.css"
            type={"text/css"}
          />
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="icon" type="image/svg" href={"/static/icon.svg"} />
        </head>
        <div className="">
          <header>
            <Navbar/>
          </header>
          <main className="">{children}</main>
        </div>
      </html>
    );
};





export function HomePage({ user } :{user : {login: string}}) { 
    return (
      <Layout>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">
                Deno is cool and I made this URL shortner using the Primitives deno gave me 😛
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </Layout>
    );
}


const Navbar = () => { 
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Url Shortner</a>
      </div>
      <div className="navbar-end">
        
      </div>
    </div>
  );
}