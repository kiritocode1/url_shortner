/** @jsxImportSource https://esm.sh/preact */

import type { ComponentChildren, ComponentProps } from "npm:preact";
import type { GithubUser } from "./db.ts";

//! prop drillin for the win : D 
export function Layout({ children  , user}: { children: ComponentChildren , user:GithubUser|null }) { 

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
            <Navbar user={user}/>
          </header>
          <main className="">{children}</main>
        </div>
      </html>
    );
};


const Github = (props: ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 256 250"
    width="1em"
    height="1em"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
  </svg>
);
export default Github;

export function HomePage({ user }: { user: GithubUser | null }) { 
  

    return (
      <Layout user={user}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold flex items-center gap-2 flex-col">
                <DenoLOGO className="w-20 h-20" />
                Hello there {user?.login ?? "Anonymous"}
              </h1>
              <p className="py-6 flex gap-2">
                Deno is cool and I made this URL shortener using the Primitives
                deno gave me 😛
              </p>
              {user ? (
                <div className="flex justify-center gap-4">
                  <a href="/link/new" className="btn   ">
                    Create New Link
                  </a>
                  <a
                    href="/oauth/signout"
                    className={"btn btn-outline btn-error"}
                  >
                    Sign Out
                  </a>
                </div>
              ) : (
                <a href="/oauth/signin/">
                  <button className="btn ">
                    <Github />
                    Sign In with Github
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
}


const Navbar = ({user}: { user : GithubUser|null}) => { 
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" title={"Menu"}>
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
              <a className={""} href={"/about"}  >About</a>
            </li>
            <li>
              <a href={"https://deno.land/"} target={"_blank"}>Deno What ? </a>
            </li>
            <li>
              <a href={"https://github.com/kiritocode1/url_shortner"} target={"_blank"}>Github</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl" href={"/"}>Url Shortener</a>
      </div>
      <div className="navbar-end">
        <img src={user?.avatar_url??"/static/default_image.png"} alt="avatar" className="rounded-full w-10 h-10"/>
      </div>
    </div>
  );
}



const DenoLOGO = (props: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="#000"
      d="M472 106.6c-1.9.2-8 .9-13.5 1.4-78.2 8.2-155.2 41.3-218 93.9-11.6 9.6-38 36-47.6 47.6-52 62.1-82.4 131.8-93.6 214.3-2.5 18.3-2.5 80.1 0 98.4 11.2 82.5 41.6 152.2 93.6 214.3 9.6 11.6 36 38 47.6 47.6 62.1 52 131.8 82.4 214.3 93.6 18.3 2.5 80.1 2.5 98.4 0 82.5-11.2 152.2-41.6 214.3-93.6 11.6-9.6 38-36 47.6-47.6 52-62.1 82.4-131.8 93.6-214.3 2.5-18.3 2.5-80.1 0-98.4-11.2-82.5-41.6-152.2-93.6-214.3-9.6-11.6-36-38-47.6-47.6-61.9-51.8-132.3-82.6-213.7-93.5-8.8-1.2-21.6-1.7-45.3-1.9-18.1-.2-34.6-.1-36.5.1zm5 43.2c0 11.7.8 37.1 1.9 61.2.6 11.8 1.3 28.7 1.6 37.5 1.1 31.2 4.4 113.1 4.9 120.4l.5 7.3-4.5-.5c-2.5-.2-4.8-.8-5.2-1.1-.3-.4-1-7.3-1.4-15.4-1.8-35.6-7.7-173.7-8.3-193.9l-.6-22.2 2.8-.4c1.5-.2 4-.5 5.6-.6l2.7-.1v7.8zm95.7-2.4c.1.1.4 30.3.7 67.1.4 36.9.9 70 1.2 73.6.3 3.7.2 6.9-.3 7.1-.4.3-2.9.3-5.4 0l-4.6-.4-.7-29.1c-.4-16.1-.9-33.9-1.1-39.7-.8-17.7-1.5-77.8-.9-79.3.4-1.1 1.5-1.2 5.7-.5 2.9.6 5.3 1.1 5.4 1.2zm-231.3 33.5c.6.9 5.3 56 11.1 128.1 1.9 24.5 3.8 46.9 4.1 49.7.5 5.1.4 5.3-2.8 7.3-1.8 1.1-3.6 2-4 2-.3 0-.9-2.6-1.2-5.8-1.4-13-6.8-75.8-10.6-121.2-2.2-26.7-4.2-50.6-4.5-53.2-.5-4.4-.4-4.8 2.2-6.2 3.2-1.7 5-2 5.7-.7zM616.7 201c2.8 1 3.1 1.5 3.7 7.2 1 10 .7 57.8-.4 57.8-2.9 0-8.9-3.4-9.4-5.3-.3-1.2-.6-15.4-.6-31.5 0-32.5-.4-30.6 6.7-28.2zM432 205.7c0 2.7.7 17.6 1.5 33.3.8 15.7 1.7 35.6 2.1 44.2.7 17.4.9 16.8-5.8 17.2-3.3.1-3.3.1-3.5-4.9-.2-2.8-.7-11.5-1.3-19.5-.5-8-1.7-25.3-2.5-38.5s-1.8-26.3-2.1-29.1c-.6-5-.5-5.2 2.2-6.2 1.6-.6 4.4-1.1 6.2-1.1 3.2-.1 3.2-.1 3.2 4.6zm277.4 13.7 3.4 1.4.7 13.4c.3 7.3.5 23.1.3 35l-.3 21.8-4.2-2.1-4.2-2-.3-33.2c-.2-18.3-.1-33.8.1-34.5.4-1.5.4-1.5 4.5.2zm-182.6 13.1c.6.6 2 49.1 2.1 73.7l.1 14.8-4.7-.7c-2.7-.3-4.9-.6-5-.7-.3-.2-3.3-74.3-3.3-81.5v-7.4l5.1.6c2.9.4 5.4.9 5.7 1.2zm230.3 7.1c1.2 1.4 1.4 23.3 1.7 144.1.3 138.7.3 142.3-1.5 142.3-1.1 0-2.6-.6-3.5-1.3-1.5-1.1-1.7-13.2-2.2-131.7-.4-71.8-.9-137-1.2-144.9l-.6-14.4 2.9 2.1c1.7 1.2 3.6 2.9 4.4 3.8zm-89.7 20.5c.5.4 1 6.1 1.1 12.6.5 22.1.6 157.6.1 158-.2.2-2-.3-4-1.1l-3.6-1.5V258l2.8.6c1.5.4 3.1 1 3.6 1.5zm-276 5.6c.3 2.7.8 8.8 1.1 13.8.3 4.9 1 16.1 1.6 24.8 1.2 17.6 1 18.7-4.7 18.7-3 0-3.4-.3-3.8-3.3-1-5.9-4.5-55.1-4-55.9.5-.7 5.7-2.5 8.1-2.7.6-.1 1.4 2 1.7 4.6zM226 291.2c1.1 10.6 3.3 32.8 4.9 49.3 1.7 16.5 3.1 30.5 3.1 31.1 0 1.2-7.7 5-8.5 4.2-.5-.5-10.5-89-10.5-93 0-2.4 7.7-12.5 8.7-11.4.3.2 1.3 9.1 2.3 19.8zm392.1 10.5 2.9 1.7.1 21.6c.1 11.8.3 25 .3 29.3.2 9-.9 10.5-6.3 8.6l-3.1-1.1v-8.6c0-4.8-.3-18.7-.7-31l-.6-22.2h2.3c1.2 0 3.5.8 5.1 1.7zm-348.2 38.8c1.8 19.2 4.7 51.6 6.6 72l3.4 37-3.9 3.9-3.8 3.9-.7-7.9c-.4-4.4-2.4-24.8-4.5-45.4-2.1-20.6-5.1-50.5-6.6-66.4l-2.8-28.8 3.9-3.6c3.5-3.3 3.9-3.4 4.6-1.6.4 1 2.1 17.6 3.8 36.9zM195 352.6c2.2 19.7 8 72.1 13 116.4 5 44.3 9.7 87 10.6 95 .8 8 2.2 20.1 3 27 1.4 11.7 1.4 12.5-.2 13.7-2.4 1.8-3.4 1.6-3.4-.5 0-.9-.9-8.5-2-16.7-1.8-13.7-4.8-36.9-11.5-89-1.4-10.5-4.1-31.4-6-46.5-2-15.1-4.9-37.6-6.5-50-1.6-12.4-4.3-33.6-6-47.3-1.8-13.6-2.9-25.7-2.6-27 .7-2.7 6.6-12.1 7.2-11.5.2.3 2.2 16.6 4.4 36.4zm-30.6 43.1c1.5 12 4.3 33.9 6.2 48.8 1.9 14.8 4.3 33.3 5.4 41l1.9 14-2.1 1.8c-1.2 1-2.4 1.4-2.8 1-.4-.4-1.2-4.4-1.8-8.8-.6-4.4-4.3-30.1-8.3-57l-7.1-49 2.3-6.8c1.2-3.7 2.5-6.7 2.8-6.7.4 0 1.9 9.8 3.5 21.7zm549-13.1c1.4 1.4 1.6 7.6 1.6 53.5V488h-2.8c-6.1 0-6 1.5-6.4-55.3l-.3-51.7h3.2c1.7 0 3.9.7 4.7 1.6zm-218.9 17.9c22.6 3.4 42.3 9.7 61.8 19.7 12.6 6.5 18.6 11 32.6 24.4 20.8 19.9 33.6 37.3 45.6 61.9C652 542.3 658.8 574 667.4 659c3.9 38.1 9 107.2 10.1 135.5.3 8.2 1 21.7 1.6 30 1.1 17.6 2.4 15.2-13.1 22.7-21.5 10.4-42.2 17.6-69.5 24.3-33.4 8.2-55 10.8-88 10.9l-24 .1.2-11.5c0-6.3.6-21 1.2-32.5 3-55.7 2.4-126-1.5-165-2.2-22.4-6.5-49.6-8.9-55.6-.5-1.3 1.8-2.4 11.7-5.8 18.1-6.3 33.8-14.2 36.2-18.1 4.3-7.4-3.4-18-13.2-18-1.7 0-6.8 1.8-11.5 3.9-22.4 10.3-67.3 22.4-93.2 25.1-17.9 1.9-45.7.8-65-2.7-10.5-1.9-29.3-9-45-17.1-18.1-9.4-29.2-21.9-32.5-36.7-1.8-8-1.3-24 1-33 2.5-9.9 9.5-24.3 15.9-32.7 28.5-37.5 87.3-70 147.6-81.4 19.2-3.6 46.4-4 67-.9zm308.5 3.1c3.6 1.5 4 1.9 4 5.3.2 27.3-.4 89.7-.9 92.3-.1.9-5.3 1-7.5.2-1.4-.5-1.6-5.9-1.6-50 0-31.6.4-49.4 1-49.4.5 0 2.8.7 5 1.6zm43.7 54.9 3.6 1.5-.7 82.8c-.8 105.5-.9 108.6-4.7 117.7-6.2 14.9-5.9 17.9-5.3-47.5.2-32.7.7-65.8.9-73.5.2-7.7.4-29.4.5-48.3 0-22.8.3-34.2 1-34.2.6 0 2.7.7 4.7 1.5zm-601.4 24.9c.6 8.1.4 8.9-2.5 15.3l-3.2 6.8-1.2-10c-1.9-16-1.9-16.7 1.9-19.1 1.7-1.2 3.5-2 3.8-1.8.3.2.9 4.2 1.2 8.8zm-61.8 60.3c.9 8.2 7.9 62.6 11.5 89.3 5.4 41.3 5.8 47.2 3.4 44.7-.3-.3-2.6-14.2-5-30.9-15.6-107.8-15.5-107.1-14.2-107.9 2.7-1.8 3.6-.8 4.3 4.8zm72 45.8c.6 2.5 3.5 29.6 3.5 32.9 0 2.8-3.6 5.4-5.2 3.8-.5-.5-1.8-9-2.8-18.8-1.1-9.9-2.2-20.2-2.5-22.9l-.6-5 3.5 4c2 2.2 3.8 4.9 4.1 6zm80.7 37.7c1.1 1 1.8 5 2.7 15.8 1.5 19.5 1.7 18-2.4 18-4.2 0-4.1.3-5.5-17.3-1.4-17.9-1.4-17.7 1.3-17.7 1.3 0 3 .6 3.9 1.2zm79.2 1.5c.2 1 .7 7 1.1 13.3.3 6.3 1.2 20.5 2 31.5 2.8 40.4 2.9 45.5 1.2 45.5-1.9 0-2.1-1.5-4.3-30-.8-11.8-2.3-30.4-3.3-41.3-.9-10.9-1.5-20-1.2-20.2 1.1-1.2 4-.3 4.5 1.2zm-188 19.2c.6.9 4.4 32.9 9.1 76.6 1.4 13.2 2.8 25.9 3.1 28.3l.5 4.3-2.5-1.6c-1.9-1.3-2.6-2.6-2.6-4.9 0-6.3-4.3-47.8-7.6-73.2-1.9-14.4-3.4-27.1-3.4-28.3 0-2.1 2.4-2.9 3.4-1.2zm577.1 41.8-.7 41.8-2.5 3.7c-5.7 8.4-5.4 10-5.1-36.8l.2-42.9 3.7-3.8c2-2 4-3.7 4.4-3.7.3 0 .3 18.8 0 41.7zM712 756c.5 58.1.4 62.6-1.2 64.4-1 1.1-1.9 1.8-2.2 1.5-.7-.8-1.7-127.5-.9-128.2.4-.4 1.4-.6 2.3-.5 1.3.3 1.6 7.4 2 62.8zm-326.6-39.8c.7 6.2 3.2 35.9 4.2 49.9.6 9.4.6 9.7-1.6 10.4-1.2.4-2.6.3-3-.2-.7-.7-2.9-22.9-5.6-57.1l-.7-8.2h3.1c2.9 0 3.1.2 3.6 5.2zm-78.6 35c.7.7 1.2 3.2 1.2 5.7 0 2.6 1.2 16.1 2.5 30.1 3.8 38.3 4.1 43.5 2.4 42.5-2.6-1.5-4.9-3.8-4.4-4.4.2-.4-.2-5.4-1-11.1-.7-5.8-1.6-15.2-2-21-.4-5.8-1.3-16.4-2.1-23.5-1.9-17.5-1.8-19.5.4-19.5 1 0 2.3.5 3 1.2zm47.3 67.3c.3 2.2.9 10.4 1.3 18.2.7 15 .4 16.1-3.7 13-1.2-.9-2-4.7-3.2-16.1-2.1-20.6-2.2-19.8 1.7-19.4 2.9.3 3.3.7 3.9 4.3z"
    />
    <path
      fill="#000"
      d="M318.4 448.4C308 452.9 307.2 467 317 472c7.1 3.6 14.3 1.9 18-4.3 7-11.4-4.4-24.6-16.6-19.3zM386.2 458c-9.6 5.9-9.6 20.1 0 26 9.5 5.7 21.8-1.8 21.8-13.2 0-11-12.6-18.4-21.8-12.8z"
    />
  </svg>
);


export function AboutPage({user}: { user:GithubUser|null}) { 
  return (
    <Layout user={user}>
      <div className="flex flex-col items-center justify-center">
        <DenoLOGO className="w-20 h-20" />
        <h1 className="text-5xl font-bold">About</h1>
        <p className="text-xl">
          This is a simple URL shortener built with Deno. It uses the Primitives
          deno gave me
        </p>
        <p className="text-xl">
          The source code is available on{" "}
          <a
            href={"https://github.com/kiritocode1/url_shortner"}
            target={"_blank"}
            rel={"noopener noreferrer"}
            className={" btn btn-ghost"}
          >
            Github.
          </a>
        </p>
        <p className={"text-xl"}>a lot of assets are made by me or collected from cosmos.so  and edited using figma,</p>
        <p className={"text-xl"}>please credit me if them use this assets.</p>
      </div>
    </Layout>
  );
}


export function UnauthorizedPage({user}: { user:GithubUser|null}) { 
  return (
    <Layout user={user}>
      <div className="flex flex-col items-center justify-center gap-4">
        <img src="/static/key.png" alt="key"  className={"size-60"}/>

        <h1 className="text-5xl font-bold">Unauthorized</h1>
        <p className="text-xl">
          You are not authorized to access this page.
        </p>
        <p className="text-xl">
          Please sign in to access this page.
        </p>
      </div>
    </Layout>
  );
}; 


export function CreateShortLinkPage({ user }: { user: GithubUser | null }) {
  return (
    <Layout user={user}>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <h1>Create a Short link here</h1>
        <form className="flex flex-col items-center justify-center w-full" action={"/links"} method={"POST"}>
        
        </form>
      </div>
    </Layout>); 
  
};


export function ErrorPage({user}: { user:GithubUser|null}) { 
  return (
    <Layout user={user}>
      <div className="flex flex-col items-center justify-center gap-4">
        <img src="/static/lost.png" alt="key"  className={"size-60"}/>
        <h1 className="text-5xl font-bold">Error</h1>
        <p className="text-xl">
          Something went wrong. Please try again.
        </p>
      </div>
    </Layout>
  );
};