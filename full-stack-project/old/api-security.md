# API Keys

Third party APIs can be extremely useful for gaining access to data and
services that would be impractical or impossible to set up on your own. In
order to control usage, most commercial APIs require the use of an API key;
this serves to authenticate requests and, in many cases, to charge for the
use of paid APIs.

## Protecting API Keys

If you are accessing an API from the server, you can keep it secret by using
Figaro to set it as an environment variable; since all requests come from the
server, clients never need access to the key. For some services (for example,
Amazon Web Services), key secrecy is essential: AWS key theft from Github is
a major problem. These keys must never be checked into Git, and if the key
ever appears in a publicly available remote repo you should assume that it is
compromised.

APIs accessed from the client, such as Google Maps, cannot avoid exposing their
keys. Security depends instead on limiting where requests can originate.
Javascript APIs should make it easy to configure your key only to authenticate
requests from certain domains, and you should go through this process even if
you are using a free tier. Even for keys that will be exposed in the HTML, you
may want to use Figaro for management, as it allows you to easily change the
key wherever it appears.

