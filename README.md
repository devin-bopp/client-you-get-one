![YOU GET ONE: AN EXCLUSIVE VIRTUAL PET EXPERIENCE](/README/yougetone-wordmark.png)

YOU GET ONE is a MERN-stack game about scarcity on the web. Users play with a virtual pet. However, only one user can access the pet at a time. While they wait, users can chat with their fellow users.

In addition to MongoDB, YOU GET ONE uses Socket.io to faciliate instant messaging and a live feed of the user's queue position.

You can view the original pitch document for this project, including some unglamorous wireframes, [here](https://docs.google.com/document/d/1ATUdEO1df3Jbxw9fFq4ZcCc5KMltbLvkcoPU0fGot1c/edit?usp=sharing).

# Components
## The Queue
The queue page shows the user's current position in the queue and allows them to chat with other users who are also waiting. The username's in the chat also include a number--the number of times the user has fed the pet. The chat mimics Slack/Discord, where consecutive messages from the same user fall under a single header with their username.

## The Pet
The pet is decidedly not the point of this app, but it's still pretty cute, if I say so myself.

The 'Feed Him' button triggers a MongoDB `findOneAndUpdate()` via Socket.io.

# Installation
To install, fork and clone this repository. Be sure to run `npi i` to install the necessary dependencies. By default, this application will run on `http://localhost:3000`.

The back-end application can be found [in a separate repository](https://github.com/devinrbopp/server-you-get-one).

# Some Challenges
- Socket.io requires some additional steps to integrate with React, namely in how it is implemented with `useEffect`. My initial implementation included a memory leak in which a new client-side listener was started every time the server emitted. A cleanup function solved this quickly.
- I considered several options for the queue before realizing a separate collection, `queues` would work well for this purpose. Using only an `owner` and `createdAt` fields, a function in server.js deletes the earliest-created queue-er at a set interval.

# Future Updates
- Further options for caring for the pet.
- Email notification to the user at the front of the queue.
- Further profile details and play stats.
