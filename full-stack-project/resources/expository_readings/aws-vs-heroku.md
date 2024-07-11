# Heroku vs AWS

Heroku and AWS are cloud services that enable developers to deploy
web and mobile apps. The main differences between the products are 
that AWS's Elastic Computer Cloud (EC2) is an Infrastructure as a 
Service (IaaS), while Heroku and AWS Elastic Beanstalk are examples
of Platform as a Service (Paas). 


### What's Heroku?
- Platform as a Service (PaaS)
- Provides development instruments, a pre-installed operating system,
and redundant servers
- Initially designed and still optimized for Ruby on Rails. Like
Rails, Heroku was created so developers could rapidly create and 
release new apps. 
  - Also runs environments for Python, PHP, Clojure, Go, Java, Scala,
  and Node.js applications
- Heroku is actually hosted and managed using AWS, but provides a 
  simpler user experience for developers 
- Many features make it easy to deploy and maintain apps:
  - Capacity Provisioning
  - Database Rollback
  - Application Rollback
  - Manual Vertical and Horizontal Scaling
  - App Health Monitoring
  - Full GitHub Integration: this imposes a fast and easy deployment
  workflow
- No bandwidth limitations: your app will continue to work if it
suddenly goes viral and gets a ton of visitors.
- Has many add-ons
  - For example, Redis is easier to start using with Heroku than AWS because less
  setup is required

#### Why would you use Heroku?
  - For a fast MVP
  - Developers don't have to know anything about infrastructure 
    management, freeing them to focus on app development
  - If you don't need many computational resources (otherwise it
    gets more expensive as you purchase the use of more dynos)
    - Heroku is charged on a per-thread basis: you pay for the server 
    resources (dynos) you use
  - If you are a new developer or want lots of support
    - Heroku is very well-documented and well-supported (by online 
    communities and the App Academy instructional staff)


### What are the AWS options?
#### Elastic Computer Cloud (EC2) is an Infrastructure-as-a-Service (IaaS)
  - Developers must set up and manage the infrastructure
  - Includes templates for deployment and multiple configurations
  (CPU, RAM, etc.)
  - Developers need to know basic Unix Admin and AWS DevOps
  
    #### Why would you use EC2 ?
    - For the infrastructure flexibility
    - If you know and love DevOps
    - It's relatively inexpensive to scale
    - If you need a lot of computational resources
    - If you want to use other AWS services: S3 is often used to store
    assets permanently in the cloud

#### Elastic Beanstalk is a PaaS similar to Heroku
- Developers can deploy apps via AWS's Management Console, a Git repo,
or an IDE
- Custom infrastructure setup is available, but not required
- Has environments for Ruby, NodeJS, Python, Go, Docker, PHP, and .NET
applications
- Pricing is based on the AWS resources used, likely EC2 instances or
S3 buckets. There is a free tier, but users will be charged AWS rates
if their applications use more resources than the free tier provides.

#### Why would you use Elastic Beanstalk?
  - For a fast MVP
  - If you don't need many computational resources (paying for Elastic Load
    Balancing and more EC2 instances becomes expensive)


### Additional Resources:
- [Heroku vs AWS Comparison Table][comparison-table]
- [Elastic Beanstalk Product Page][elastic-beanstalk]
- [EC2 Product Page][ec2]

[comparison-table]: https://dzone.com/articles/heroku-or-amazon-web-services-which-is-best-for-your-startup

[elastic-beanstalk]: https://aws.amazon.com/elasticbeanstalk/
[heroku]: https://www.heroku.com/platform
[ec2]: https://aws.amazon.com/ec2/
