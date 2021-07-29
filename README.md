Just imagine it.

> We just finished a website at Odeo called Twitter. It allows you to update
> your personal status to the world. It's so easy to use! Just ...
> 
> ```
> POST /statuses/update.json HTTP/1.1
> Host: twttr.com
> Content-Type: application/x-www-form-urlencoded
> Content-Length: 31
> status=just+setting+up+my+twttr
> ```

Expecting people to know **how** to speak to Twitter in order to tweet sounds
ridiculous. Web browsers should know **how** to speak to Twitter for us. We just
need to tell them **what** we would like to say.

For example, it's second nature for people to tweet by:

+ Clicking "Compose new Tweet..."
+ Typing something
+ Clicking "Tweet"

The problem is that web API providers expect us to speak their language when we
aren't using their website. Otherwise, why would a web API need
[documentation to compose a Tweet](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update)?

The thing is, web APIs are websites for computers. So what makes web APIs
complicated enough that they require documentation?

People can browse websites because people are conscious. Computers may not be
conscious (yet?), but there's no reason they can't browse web APIs with a little
help.

There's a reason why HTML is a **HyperText** Markup Language.

---

[Coast](https://github.com/ttahmouch/coast) is an open-source, full-stack,
convention over configuration, JavaScript framework **that makes building
self-documented, HyperText REST APIs simple.**

---

Or so I thought.

Building a business around a solution in search of a problem is really difficult
especially when your potential customers don't agree that they have a problem.
At least it was when I tried to build HyperText APIs as a Service a decade back.

I had this lofty goal to build a Groupon competitor back when that was cool.
As I architected the app, I became fascinated with this idea
that I could build the REST API in the same way that the World Wide Web
implements REST, i.e., using hyperlinks. So as I continued to build the
app, it became both the app and a framework sort of like how Ruby on Rails
derived from Basecamp.

One day, I decided to pitch both of the ideas to Ludlow Ventures, a Detroit
venture capital firm, hoping to secure a seed round. They didn't really think
that my take on Groupon with a different financial model would work, but one
of the VCs was really into my idea of HyperText APIs as a Service. So they gave
me a small seed investment, and off I went.

I started thinking, "if so many companies already have REST APIs, then how can I
get them to start adopting this concept of making their APIs work like a web
browser?" "No problem," I thought, "I'll just wrap their existing APIs with
HyperText."

So I created the **Navigation Application Language**, i.e., NavAL, a multipart
media type capable of wrapping any REST API response with HyperText. It
basically gave any REST API the ability to use hyperlinks and forms without
needing to alter their existing behavior or implementation details. An app would
just use content negotiation to ask if the server supports NavAL. If the app
received NavAL, it would be able to see what actions it is capable of doing at
any state in the app by navigating the additional links and forms provided.

I built a client and server framework showing the power of HyperText in a REST
API. It proved that an API could be just as self-documenting and evolvable as
any basic HTML web page, and I demonstrated it to dozens of businesses around
yet nobody seemed to care. I think it was for a couple reasons.

1. "If it ain't broke, don't fix it."
I don't think people really cared that documenting and supporting their APIs
came at a cost of time and energy spent maintaining them because that is just
expected cost of doing business.

2. It didn't "just work."
I quickly learned that the reason the World Wide Web works so well is because
the actions presented to the user **are the user interface**. The `<a>`nchor tag
is a hyperlink the user clicks to navigate. The `<form>` tag is the form the
user submits data for processing or querying. Having an existing app built with
a programming language like `Java`, `Objective-C`, `JavaScript`, etc., try to
use additional HyperText is possible, but it is difficult and counterintuitive.
It would require generating user interface elements based on those hyperlinks
and forms.

So years went by, and I was no longer working on this as an attempt at a
business. However, I still couldn't let the original idea go. I
decided that since I knew I was tackling it from the wrong angle before maybe I
would try it from a different angle this time around. I decided I would start
simply embracing the idea that I could build **any** app using basic HyperText.

Since years had passed, new technologies came about that I didn't previously
have at my disposal. So I decided to build something new.

---

[Covfefe](https://github.com/ttahmouch/covfefe) is a side-project that attempts
to prove something I've never seen done before. It attempts to prove that not
only are most apps in the wild too complicated because they are written using
conventional, "powerful," programming languages, but also that I can build most
of those same apps using nothing more than plain, old JSON.

---

I thought, "if I could prove that building apps can be as simple as writing
static markup like HTML, but could also have features that you could
conventionally only get from dynamic programming languages like JavaScript, then
I've succeeded." So I started simply looking for inspiration from existing
declarative languages, e.g., `JSON`, `JSX/XML/HTML`, `JSON Schema`, `JSON Path`,
`RegExp`, `CSS`, etc.

I built a boring app using those languages as a proof of concept, but I had to
prove to myself that I could build something useful. So I set out to build a
Netflix clone. I spent about a week or two doing just that. I found an open
source `Netflix` clone, and I reverse-engineered its `JavaScript` to rebuild it
in `JSON`.

The underlying code in `Covfefe` is built using `React` and `Redux`, but you
don't use `React` in the conventional sense, i.e., you don't write "components."
You write basic elements. Choosing `React` was strategic because it allowed me
the ability to use the exact same framework to build `JSON` web and native apps
using `React Native`. The majority of the code in `Covfefe` is fully
cross-compatible. This means that for the first time maybe ever, I will have
seen and built a **native** app that could be fully server-side rendered without
using HTML.

A glimpse of my Netflix web clone, Netflux, can be found
[here](https://github.com/ttahmouch/covfefe/blob/feature/jsonml%2Bdisneyplus/netflux/src/netflux.json).

A glimpse of my extremely recent Disney+ native clone can be found
[here](https://github.com/ttahmouch/covfefe/blob/feature/jsonml%2Bdisneyplus/disneyplus/src/index.js). 
