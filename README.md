![Demo Application](https://snipboard.io/a6KUBL.jpg "Demo Application")

# Example search and filter user table application with Vue Resilient Architecture 🚀

The Vue and JavaScript ecosystem is full of tools and libraries to help you build your applications. In this example we’ll build an application from scratch using [Vue Resilient Architecture].

- Load users in the first page
- Cloud-enabled, mobile-ready and PWA ready
- Search, filter, and sort in the table
- ✨Magic ✨

## Live Demo

You can see the running example here [the deployment of the app on Netlify](https://lds-vue-random-user.netlify.app).

## Features

- Load users collection from randomuser.me
- Do filter like:
  - Debounced search by keyword
  - Filer by gender
  - Easy Pagination
  - Sort by column
  - Reset all filter
    > Not all funtionality currently provided from randomuser.me
    > You can see the API doc from <https://randomuser.me/documentation>
- Can transfrom to dark mode 😎

## Prerequisites

- At the very least, read the motivation, project, and folder structure from [Vue Resilient Architecture].

## Tech

This example uses a number of open source projects to work properly:

- [VueJs] - the progressive javaScript framework
- [randomuser.me] - a free, open-source API for generating random user data. Like Lorem Ipsum, but for people.
- [Vuex] - state management pattern + library for Vue.js applications
- [Axios] -  a simple promise based HTTP client for the browser and node.js.
- [Vuetify] - Vue UI Library with beautifully handcrafted Material Components
- [Vue Resilient Architecture] - boilerplate to help you build production-grade projects using the Vue framework.

## System Requirements

- [git][git] v2.13 or greater
- [NodeJS][node] `14 || 15 || 16`
- [npm][npm] v6 or greater

All of these must be available in your `PATH`. To verify things are set up properly, you can run this:

```shell
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment variable and how to fix it here for [windows][win-path] or [mac/linux][mac-path].

## Setup

After you've made sure to have the correct things (and versions) installed, you should be able to just run a few commands to get set up:

```
git clone https://github.com/lucky401/vue-random-user.git
cd vue-random-user
npm run setup
```

This may take a few minutes. If you get any errors, please read through them and see if you can find out what the problem is. If you can't work it out on your own then please [file an issue][issue] and provide _all_ the output from the commands you ran (even if it's a lot).

If you can't get the setup script to work, then just make sure you have the
right versions of the requirements listed above, and run the following commands:

```
npm install
```

If you are still unable to fix issues and you know how to use Docker 🐳 you can
setup the project with the following command:

```shell
docker-compose up --detach --build
```

## Running the app

To get the app up and running (and really see if it worked), run:

```shell
npm run serve
```

Verify the deployment by navigating to your server address in
your preferred browser.

```shell
localhost:8080
```

You can also open [the deployment of the app on Netlify](https://lds-vue-random-user.netlify.app).

## Improvement method that you can implement for Better Web Performance

Increasing load speed can be done on Frontend, Transport, and Backend

- On the transport side (network) we can do
  - Minimize text (CSS, JS, HTML)
  - Minimize Image and use appropriate image format
    - JPG is good for photos that have a lot of colors, make sure the quality is at (30-60%)
    - PNG can be used if you need transparency
    - GIFs can be used for animations or images that don't require a lot of color
    - SVG is suitable for icons that need to be displayed on large or high resolution screens
  - Display images with different sizes according to the screen size, for example mobile, don't use images for desktop
  - Use CDN
  - Delete image metadata if necessary
  - Combine CSS and JS that way will not access many requests at one time because there are Max Parallel Requests per browser. Source: <https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser>
  - Use HTTP version 2
- On the Frontend App
  - Check the Critical Render Path
    - HTML
      - Load style on head tag to make sure css and dom downloaded together
      - If you can load the script right before </body> to avoid rendering blocking
    - CSS
      - Only load what is needed
      - Use the above the fold loading concept, so users can see our styling components while they are still at the top of the website
      - Don't be too specific on the css selector because the browser will take longer to calculate it
    - Javascript
      - Load scripts async or defer
      - Minimizing manipulation of the DOM
      - Avoid javascript that causes rendering crashes like prompt()
  - Optimize the code
  - Use Code splitting and Dynamic import
  - Use Progressive web app
- On the backend/server
  - Improve caching
  - Use Gzip and brotli
  - Use Load balancing

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [VueJS]: <https://vuejs.org/>
   [Vuetify]: <https://vuetifyjs.com>
   [Vuex]: <https://vuex.vuejs.org/>
   [Axios]: <https://axios-http.com>
   [npm]: <https://www.npmjs.com/>
   [node]: <https://nodejs.org>
   [git]: <https://git-scm.com/>
   [randomuser.me]: <https://randomuser.me/documentation>
   [win-path]: <https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/>
   [mac-path]: <http://stackoverflow.com/a/24322978/971592>
   [Vue Resilient Architecture]: <https://bit.ly/vue-resilient-architecture>
   [issue]: <https://github.com/lucky401/vue-random-user/issues/new>
