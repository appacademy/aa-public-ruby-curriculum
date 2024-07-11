# Git

## A Brief History

Version control has been around as long as writing has been around. In print,
this existed as the numbering of different book editions. However, version
control became much more complicated when the era of computing began. Software
developers needed a way to work simultaneously on the same project, while also
keeping previous versions in case newer versions contained bugs. Thus, the
version control system (VCS) was born.

Git was developed in April 2005 after Larry McVoy withdrew free use of
BitKeeper, the VCS that the Linux kernel community had been using. (Note:
BitKeeper was originally proprietary software but has been released as open
source software as of May 9, 2016). Linus Torvalds, creator of Linux, decided
that none of the current free VCSs met his needs for performance. He wanted to
design a system where:

+ patching would take no more than three seconds

+ workflow would be distributed

+ there would be very strong safeguards against corruption. 

Development began on April 3, the project was announced on April 6th, and it
became self-hosting on April 7th. The first merge of multiple branches happened
on April 18th. In July 2005, Linus handed over maintenance of the Git project to
Junio Hamano.

Since then, Git installations have skyrocketed and many users have switched over
from other VCSs.

## Alternatives and Usage

Today, Git is by far the most widely used VCS. However, there are various other
systems with different benefits. This is by no means an exhaustive list, but
here are a few alternatives to Git.

### Git

Before we dive in to alternatives, let's talk about some characteristics of Git.
Git is a free open source distributed version control system. Unlike its
predecessors, branch operations are fairly cheap. It uses a distributed
(peer-to-peer) model and full history trees are available offline. Git works
very well for many developers working on the same project, but is not
necessarily the best for single developers. While powerful, the learning curve
for Git is steep. In addition, there is limited Windows support compared to
Linux.

Currently Used By: Intel, Netflix, Yahoo, GitHub

### Concurrent Versions System (CVS)

CVS has been around since the 80s and is considered one of the most mature
version control systems. It was released under the GNU license as free open
source software. However, there has not been a new version released since May
2008. Several factors account for its fall from popularity. In CVS, moving or
      renaming a file, or changing a file connected via a symbolic link does not
      register as a change; both of these actions are recognized by Git as a
      change. In addition, commits are not atomic, and branch operations are
      expensive.

### Apache Subversion (SVN)

SVN is another free, open source software, released under the Apache license.
SVN improves upon CVS with atomic operations and cheaper branch operations.
However, compared to other VCSs, it is still slow and doesn't have as many
repository management commands. It is important to note that SVN is server-based
rather than peer-to-peer, which may work better for some situations than others.
It does not fix the bugs that CVS had with renaming files and directories.

Currently Used By: LinkedIn, Atmel

### Mercurial

Like Git, Mercurial uses a distributed model and branching is relatively
inexpensive. Many developers chose Mercurial over Git because of the
similarities it shares with SVN, and because it has better support for Windows
users. Because Mercurial is implemented primarily in Python rather than C, it is
also easier to add extended functionality.

Currently Used By: Bitbucket, OpenOffice

<!-- ### Perforce Helix (Perforce) -->

## Vocabulary

#### Version control aka revision control or source control. 

Versions are usually identified by some number/code, a timestamp, and the person
who made the change.

Ex: "Version control lets the user compare versions, revert to a previous
version, or merge versions."

#### Open source software 

Software where the original source code is available to be redistributed and
modified.

  Ex: "I believe in open source software, like Linux."

#### Proprietary software 

Software that is owned by an individual or company. There are usually
restrictions to use and source code is often kept secret. Proprietary software
that comes free of charge is called freeware.

  Ex: "macOS is proprietary software - that's why building hackintoshes is
illegal."

#### Server-based 

There exists a single central repository that each client synchronizes with.

  Ex: "Gmail is a server-based application."

#### Peer-to-peer 

Each client holds a complete repository and synchronizes by exchanging patches
peer-to-peer. This is an example of a **distributed system**.

  Ex: "Napster was one of the first major peer-to-peer applications."

#### Atomic operations 

Operations whose changes are rolled back if they are somehow interrupted before
completion. This helps prevent source corruption.

  Ex: "The SQL standard requires database operations to be atomic."

#### Repository (repo) 

A collection of commits, and branches and tags to identify commits.

  Ex: "I wanted to be able to access it from home, so I pushed it to my Github
repo."

#### Semantic versioning (a.b.c or x.y.z versioning) 

Given a version number MAJOR.MINOR.PATCH (e.g. 2.0.6), increment the MAJOR
version when you add any backwards incompatible changes, the MINOR version when
you add backwards compatible features, and the PATCH version when you make
backwards compatible bug fixes.

  Ex: "Based on the semantic versioning, I can tell that the new version of Ruby
isn't backwards compatible."

<!-- ### Sources
+ [Atlassian](https://www.atlassian.com/git/)
+ [Time Doctor](https://biz30.timedoctor.com/git-mecurial-and-cvs-comparison-of-svn-software/)
+ [Rhode Code](https://rhodecode.com/insights/version-control-systems-2016)
+ [Stack Share](https://stackshare.io/stackups/git-vs-mercurial-vs-svn)
+ [SemVer](http://semver.org/)-->
