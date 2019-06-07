# Setting up your own blog with Next.js and Now

## The Idea
There are a lot of personal web presences of developers sharing stuff they learned.
I kinda wanted to so something similar to give something back to the community that
I have learned so much of.

## Why Next
[Next.js](https://github.com/zeit/next.js/) is a fairly small framework for react
that brings some nice features such as routing and rocks SSR and a dev server out
of the box which is a total time-saver. But most of all, I just wanted something
new to try out.

## Setup
To start off, create a new [GitHub](https://github.com/new) Repo and clone it to
your local workspace. I personally like to have a folder called `Git-Repos` where
I keep all my cloned repos but it doesn't really matter where you put it.

The next step is to setup the dependencies. I like to use yarn for dependency management
but if you prefer npm, it's going to work just fine. Initialize the package using:
```bash
yarn init -y
```

We're going to need a few packages: react, react-dom and next. Install them by executing the following:
```bash
yarn add react react-dom next
```

Before we actually write any code though, we're going to add a few lines to the `package.json`
to let Now know how to build your app and be able to easily start the development server:
```json
{
  // ...
  "scripts": {
    "dev": "next",
    "now-build": "next build"
  }
  // ...
}
```

Next requires a folder called `pages` where your pages are going to live. Create a file called `index.js` which is going
to be the entry point to your application. Populate `index.js` with the simplest of simple react components:
```javascript
const Index = () => "Hello, World!";
export default Index;
```
_Note: You don't have to import React, Next handles this for you out of the box._

You now have to most basic of setups. You can see it by launching your development server with `yarn dev`. Per default, it runs on [localhost:3000](http://localhost:3000).
