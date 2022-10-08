---
title: 'Different Rendering Modes'
description: 'In the modern World, websites are much like applications since we can transact, shop, send messages and do so much more. We have a variety of ways we can use to render a page to a user when the user requests for a page in our web application. In this article, we are going to be looking at the different rendering modes, the advantages and disadvantages of each rendering mode and when to use each one of them. 
If that sounds interesting lets get started. Here are the topics we are going to be covering: '
image: "/img/image.jpg"
tags: [NuxtJs,Vue, React, NextJs]
publishedAt: "2022-08-8"
---
## CSR
- CSR stands for Client Side Rendering. It is a technique where all the page resources are loaded on the client's browser rather than on the server. 

- CSR is a rendering mode in which the client(browser) sends a request to the web server and the web server responds by sending an empty HTML page with only a reference to your JavaScript bundle and your CSS styles.

- CSR became popular as a method of building Single Page Application as it helped to blur the difference between websites and installed applications.

### How does CSR work
1. Request is sent to the web server by the client.
2. The web server responds by sending back an empty HTML page with only a reference to your JavaScript bundle and your CSS styles.
3. The browser then starts downloading the JavaScript of the page.
4. The browser then executes the JavaScript.
5. The page is now viewable and interactive.

### Advantages of using CSR
::list 
- Fast rendering - The page renders quickly after the initial page load time.
- Reduced server workload - Client Side Rendering technologies use the client device's processor to perform the logic thus the processing power is offloaded from the server and transferred down to the client.
- Great with Progressive Web Apps - Client Side Rendered applications work great with PWAs because the code can be entirely rendered on the browser.
- Quicker navigation of the website - CSR offers a quicker navigation because the placeholders are loaded first.
::

### Disadvantages of using CSR 
::wrong
- Not good for SEO - SEO stands for Search Engine Optimization. CSR is not good for SEO because it takes time to convert JavaScript to HTML and also because the response gotten from the web server is an empty HTML page with only a reference to a JavaScript bundle and CSS styles.
- Caching issue - Since the HTML is not available in the initial render, browsers cannot cache the HTML structure of the page.One way to avoid this issue is to cache the JavaScript but this may prove to be costly as JavaScript files can take up a lot of space in the browser's memory.
- Slower load time - A client-side rendered application needs to make an additional round-trip to your API server to render. This means your website will always load slower than an equivalent server-side rendered application.
::

### When to use CSR 
::list
- When your application has large and dynamic data.
- When your application has a very complex UI with many pages / features.
- When your application has a huge number of users.
::

### Examples of Client-Side Frameworks
1. Vue :icon{ name="logos:vue" }
2. React :icon{ name="vscode-icons:file-type-reactjs" }
3. Angular :icon{ name="vscode-icons:file-type-angular" }
4. Svelte :icon{ name="logos:svelte-icon" }

## SSR 
- SSR stands for Server Side Rendering. SSR is a technique where rendering is conducted by the server. It is a rendering mode in which the client sends a request to the web server and instead of the server delivering an empty HTML page, it responds by delivering a fully populated HTML page.

- The server will serve the page on demand every single time meaning the HTML is generated on each request.

### How does SSR work
1. Request is sent to the web server by the client.
2. The browser the connects to the server, which already has the pre-rendered HTML and CSS code for the page.
3. The server then responds by sending back a fully populated HTML page but the page is not yet interactive. The page is viewable but not interactive.
4. The browser then downloads the JavaScript of the page which is readily available on the server.
5. The HTML page is now made interactive through a process known as `Hydration`. `Hydration` is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML.
6. The browser then executes the JavaScript.
7. The page is now fully loaded and interactive.

### Advantages of using SSR
::list
- Good for SEO - Since Server Side Rendered pages have a faster initial page load time, search engine bots can crawl and index pages very well.
- Amazing User Experience - Since SSR pages have a faster initial page load time, they provide a good user experience.
- No slow internet connection barrier - If a user has a slow internet connection, he/she can view the rendered HTML page while the JavaScript is processing.
- Performance benefit for users and customers.
::

### Disadvantages of using SSR 
::wrong
- Server cost - SSR applications often need bigger and powerful servers to provide high performances which often lead to high expenses in acquiring and maintaining the servers.
- Complexity of caching - Configuring your cache is usually complex in Server Side Rendered Applications.
- Slow page transitions - If your pages contain complex data, browsing from page to page is often slow.
::

### When to use SSR
::list
- When you want good SEO performance.
- When you want faster data transmission.
- When you have dynamic content.
::

### Examples of Server Side Frameworks
1. NuxtJs :icon{ name="teenyicons:nuxtjs-outline" class="text-emerald-500"}
2. NextJs :icon{ name="logos:nextjs-icon" class="bg-white rounded-full"}
3. SvelteKit :icon{ name="logos:svelte-icon" }


## SSG 
- SSG stands for Static Site Generator. SSG is a tool that generates a full static HTML website based on raw data and a set of templates.
- SSG automates the task of coding individual HTML pages and gets those pages ready to serve users ahead of time.
- In SSG the HTML is generated at build time.

### How SSG works
1. At build time before the content reaches the CDN, a SSG or Framework reads content from the files.
2. The content then gets rendered to HTML based on templates and served to the CDN.
3. The results are then saved in a directory and laid out to match the source files and keep them available when requests to view the contents are made.

### Advantages of using SSG 
::list
- Blazingly fast - Statically generated websites are blazingly fast because the content of your website is generated as HTML files ahead of time. When a user comes to your application and requests for a certain page, the server will quickly respond and serve it. It doesn't have to do any processing nor generate any HTML, it just serves it.

- Cheap to host - Hosting a static website is very cheap since there are not many resources to serve in a static website hence the low memory usage and bandwidth which cuts the cost of hosting services.

- Plain and simple - A static website is just a collection of HTML files hosted on a server.

- Host anywhere - You can host your static website on a cloud CDN or anywhere else making your application easier to scale globally and serve data quickly.

- Great SEO performance.
::

### Disadvantages of using SSG 
::wrong
- Build time - The biggest disadvantage of SSG is the build time because once the pages are published, the only way to update them is by building the application again which might take some time.

- Steep learning curve - You need some technical and coding knowledge to customize and maintain Static Site Generators.
::

### When to use SSG
::list
- When you have a lot of static content.
- When you want good SEO performance.
- When you want a fast website.
::

### Examples of SSG Frameworks
1. NuxtJs :icon{ name="teenyicons:nuxtjs-outline" class="text-emerald-500"}
2. NextJs :icon{ name="logos:nextjs-icon" class="bg-white rounded-full"}
3. Gridsome :icon{ name="logos:gridsome-icon" }
4. Gatsby :icon{ name="logos:gatsby" }
5. Jekyll :icon{ name="vscode-icons:file-type-jekyll" }

## ISR 
- ISR stands for Incremental Static Regeneration. It is a rendering mode that enables developers and content editors to use static generation on a per-page basis without needing to build the entire site.

- With ISR you can retain the benefits of static while scaling to millions of pages.

### Examples of frameworks with ISR capabilities
1. NuxtJs :icon{ name="logos:nuxt-icon"}
2. NextJs :icon{ name="logos:nextjs-icon"}


Thanks for reading :icon{ name="bi:stars" color="yellow"}