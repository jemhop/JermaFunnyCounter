## Jerma985 Funny Guy Extra Funny Man Tracker Funny Website For His Funny Points

<img src="https://i.redd.it/b6hm1rjvsgc41.jpg" width=100% height="100" />
This is a simple website designed to keep track of the total number of +2 and -2 ratings Jerma gets across all streams. While, to my knowledge the Twitch API doesn't allow me to run this retroactively on VODS, and most VODS will have lost their chat, I can atleast start collecting an average now.

As of right now, the backend is a Node.js/Express/Socket.io server, and the frontend is just HTML, CSS (Technically SASS but same  thing), and JS.


------------

### Contributing:

Im definitely not an expert in web dev, and I hold -10 confidence in the RegEx I wrote to filter Twitch chat, so please make a pull request if you want. Lots of open source projects force people to understand the code structure on their own, but that is lame, and this project is so small that itll take me nearly no time to explain.

This project uses tmi.js to interact with the Twitch API, then runs a Node.js/Express server, using Socket.io to send updates to the clientside. It simply receives every message, and runs a RegEx on it before sending it. The client side then receives the message, and the score update, updates the counter by running CountUp.js, and inserts the new latest message. The server backs its state up every hour, including the score, and a count of the total users to visit the site. It does not back up if the data has not changed.
