# Custom Domain Name

When you first sign up for heroku and create an app it will either be given a
nice auto generated name like whispering-willo-9882.herokuapp.com or you may
have named your app when you created it. In which case your heroku apps domain
is something like fatpenguin.herokuapp.com. In either case having herokuapp.com
in the domain is not desirable. The pros will see this from a mile away and
smell n00b. To really step up your game, buy a custom domain.


### Note App IP Address

Acquire the IP address of the server where your heroku app is served by
making a DNS query using `nslookup` or `dig` command line tools like this:

```sh
nslookup fatpenguin.herokuapp.com
```

The output looks like this. Make note of the Address, in this case
**54.235.137.114**. This is the IP that we need to set the A record of our
domain to.

```
Server:         10.128.128.128
Address:        10.128.128.128#53

Non-authoritative answer:
fatpenguin.herokuapp.com        canonical name =
us-east-1-a.route.herokuapp.com.
Name:   us-east-1-a.route.herokuapp.com
Address: 54.235.137.114
```

### Add Domain to Heroku

Use the heroku cli to set the domain like this (**NB**: both root (no subdomain) and
`www` subdomains):

```sh
heroku domains:add fatpenguin.com
heroku domains:add www.fatpenguin.com
```

## Register a Domain

The following are steps for registering domain names using a few different
providers. We recommend [Namecheap][namecheap] and we'll go through that one
first. These instructions assume you've already gone through the process of
purchasing the domain.


### [Namecheap][namecheap]

On namecheap.com:

* Log in.
* Hover over "My account" and click "manage domains".
* Click on your domain.
* Click "All Host records" in the blue menu on the left.
* In the "www" row
* Enter the URL you want to point to under the "IP Address/URL" column.
* Select CNAME (Alias) under "Record Type".
* Click "Save Changes".

[Namecheap howto video ][namecheap-howto]

### [GoDaddy][godaddy]

* Sign in.
* Under Domains click "Manage"
<img src="https://assets.aaonline.io/fullstack/full-stack-project/resources/assets/godaddy_manage.png" style="max-height: 100px">
* Click the "DNS Zone" tab
<img src="https://assets.aaonline.io/fullstack/full-stack-project/resources/assets/godaddy_dnszone.png" style="max-height: 100px">
* Click the pencil icon to the right of the `@` host'
<img src="https://assets.aaonline.io/fullstack/full-stack-project/resources/assets/godaddy_edit.png" style="max-height: 100px">
* Paste in the App IP Address from above
* Click "Add Record"
<img src="https://assets.aaonline.io/fullstack/full-stack-project/resources/assets/godaddy_addrecord.png" style="max-height: 100px">
* Select "CNAME"
<img src="https://assets.aaonline.io/fullstack/full-stack-project/resources/assets/godaddy_CNAME.png" style="max-height: 100px">
* Set `www` as the host
* Set `yourapp.herokuapp.com` as the points to
* Click finish
* Scroll up and click "Save"

### [Google Domains][google]

* Sign in.
* Click the Icon in the DNS column for your domain.
<img src="https://assets.aaonline.io/fullstack/full-stack-project/resources/assets/google_settings.png" style="max-height: 100px">
* Scroll down to "Custom resource records"
* Fill in `www` `CNAME` `1H` `yourapp.herokuapp.com`
<img src="https://assets.aaonline.io/fullstack/full-stack-project/resources/assets/google_CNAME.png" style="max-height: 100px">
* Click "Add"
* Fill in `@` `A` `1H` `App IP Address`
<img src="https://assets.aaonline.io/fullstack/full-stack-project/resources/assets/google_A.png" style="max-height: 100px">
* Click "Add"

## HTTPS ($20/month heroku)

If for some reason you want to be extra special and are determined to have a
legit SSL Certificate to go along with your fancy new domain there's an extra
step to getting the domain setup. 

First, acquire a certificate by following [these instructions][heroku-cert].

Then, follow the [Heroku SSL instructions][heroku-ssl] to add this certificate
to your app. When you run the `heroku certs:add server.crt server.key` command,
the output will contain a domain in the form `<something>.herokudns.com`.
**UPDATE ALL CNAMES TO POINT TO THIS DOMAIN**. Go back to all your domain
registrar settings and replace references of `<yourapp>.herokuapp.com` with
`<something>.herokudns.com`.

[heroku-cert]: https://devcenter.heroku.com/articles/acquiring-an-ssl-certificate
[heroku-ssl]: https://devcenter.heroku.com/articles/ssl
[google]: https://domains.google.com/registrar
[godaddy]: https://www.godaddy.com/
[namecheap]: https://www.namecheap.com/
[namecheap-howto]: https://www.namecheap.com/support/knowledgebase/article.aspx/1031/2/
