# DNS

## History

The "Domain Name System," or DNS, is a naming system that translates domain
names to IP addresses (e.g., "www.example.com" translates to
"93.184.216.119" and "2606:2800:220:6d:26bf:1447:1097:aa7"). The DNS replaced an
earlier system called "HOSTS.TXT" that performed the same function, albeit on a
much smaller, more analog scale (to add an address to the master file, one would
have to call the holder of the text file by telephone).

## Domain names

A domain name consists of one or more "labels" that are typically separated by
dots - "www.example.com" has three labels, "www", "example", and "com". The
labels are hierarchically ordered from right to left - "example" is a subdomain
of "com".

## Name servers and resolvers

The DNS includes a distributed directory service - there is no one central
database of domain names and IP addresses. Instead, there is a set of
authoritative name servers for each domain that can, in turn, delegate authority
for a subdomain to another name server.

The counterparts of name servers (holders of information) are DNS resolvers
(lookers-up of information). Every operating system has a DNS resolver built
into it, and all Internet Service Providers (ISPs) do as well. These resolvers
can not only query for IP addresses but can also cache recent or popular
results.

## Querying for a domain name

A query's journey will start with its being sent from a DNS resolver to a DNS
name server. That name server can deliver a result directly if it doesn't need
to look anything else up (this typically happens as a result of DNS look-up
caching). If it doesn't have all of the necessary information locally, one of
two things can happen. The name server can change its role from being a holder
of information to being a looker-up of information and pass the query on to
another name server (the recursive case), or it can return its best guess as to
what other name server might have the appropriate information and return that IP
address to the original resolver (the iterative case). In the iterative case,
the original resolver will send its query to the new name server, and the
process will repeat.

## Cache poisoning

A common attack on the DNS takes the form of "cache poisoning," where an
attacker will try to replace valid cache entries with corrupted data. The
typical form this corrupted data takes is the IP address of a different site. In
this way, an attacker can redirect you from the site you're looking for (e.g.,
www.bankofamerica.com) to a dangerous site - one that can capture your login
information or infect your computer with a virus.

## Domain name registration

There are databases used to store domain names and information about the person
who registered that name. By purchasing the rights to a domain name through a
domain name registrar such as GoDaddy, a person or organization can claim
ownership of that domain name. This allows them to change the records stored by
the name servers that handle their domain, allowing the registrant of, say,
www.google.com to decide what IP address www.google.com should point to.

## Fun facts

- A domain name can be registered for a maximum of ten years.

- As of July 2022, there were 1487 top-level domains, including `.arpa`,
  `.lighting`, `.to`, and `.immo`.

- The most expensive domain name ever sold was Insurance.com, for \$35.6M
  in 2010.

- The oldest registered domain name is symbolics.com.
