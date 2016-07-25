# Harold

An API server that is easy to extend. Fewer bells and whistles in an effort to keep its core functional and
simple. Harold responds to HTTP requests as specified by its easily-extensible module system. 

Harold was originally designed for rapidly prototyping a collection of API's for training frontend engineers
at [the Iron Yard](https://theironyard.com).

## Extending Harold

There are two ways that Harold can be extended:

1. Instantiating new **state containers**; Harold comes with some useful templates built-in such as lists, queues
priority queues, and the like. Extend an existing state container or create your own and it'll be automatically
instantiated when the server is loaded.

2. Configuring new **routes**; Harold is built on [Hapi](https://hapijs.com) and can route along any routes that Hapi
recognizes. In the normal case, defining a route simply involves exporting a single handler function.

All routes have access to all state. CORS is enabled by default on all routes.