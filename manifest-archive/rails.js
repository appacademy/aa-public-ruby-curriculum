const openTopics = [
  { id: "zero", name: "Getting started" },
  { id: "one", name: "Routes and Controllers" },
  { id: "two", name: "Rails Views" },
  { id: "three", name: "Rails Auth" },
  { id: "four", name: "Rails Auth II" },
  { id: "five", name: "Testing with Rails" },
  { id: "six", name: "Rails and CSS" },
  { id: "seven", name: "Advanced Rails Forms" },
  { id: "eight", name: "Rails Lite" }
];

const liveTopics = [
  { id: "zero", name: "Getting started" },
  { id: "one", name: "Routes and Controllers (W4D1)" },
  { id: "two", name: "Rails Views (W4D2)" },
  { id: "three", name: "Rails Auth (W4D3)" },
  { id: "four", name: "Rails Auth II (W4D4)" },
  { id: "five", name: "Testing with Rails (W4D5)" },
  { id: "six", name: "Rails and CSS (W5D1)" },
  { id: "seven", name: "Advanced Rails Forms (W5D2)" },
  { id: "eight", name: "Rails Lite (W5D3)" }
];

const onlineTopics = [
  // TODO: Rename these topics
  { id: "zero", name: "Getting started" },
  { id: "one", name: "Routes and Controllers (W9D1)" },
  { id: "oneD2", name: "Controllers Contin.(W9D2)" },
  { id: "two", name: "Rails Views (W9D3)" },
  { id: "three", name: "Rails Auth (W9D4)" },
  { id: "four", name: "Rails Auth II (W9D5)" },
  { id: "five", name: "Testing with Rails (W10D1)" },
  { id: "six", name: "Rails and CSS (W10D2)" },
  { id: "sixD2", name: "CSS Contin. (W10D3)" },
  { id: "seven", name: "Advanced Rails Forms (W10D4)" },
  { id: "eight", name: "Rails Lite (W10D5)" },
  { id: "eightD2", name: "Rails Lite Contin. (W11D1)" }
];

const SWEInPersonTopics = [
  // TODO: Rename these topics
  { id: "zero", name: "Getting started" },
  { id: "one", name: "Routes and Controllers (W6D3)" },
  { id: "oneD2", name: "Controllers Contin.(W6D4)" },
  { id: "two", name: "Rails Views (W6D5)" },
  { id: "three", name: "Rails Auth (W7D1)" },
  { id: "four", name: "Rails Auth II (W7D2)" },
  { id: "five", name: "Testing with Rails (W7D3)" },
  { id: "six", name: "Rails and CSS (W7D4)" },
  { id: "sixD2", name: "CSS Contin. (W7D5)" },
  { id: "seven", name: "Advanced Rails Forms (W8D1)" },
  { id: "eight", name: "Rails Lite (W8D2)" }
];

const CampusHybridTopics = [
  { id: "zero", name: "Getting started" },
  { id: "one", name: "Routes and Controllers (W6D3)" },
  { id: "oneD2", name: "Controllers Contin.(W6D4)" },
  { id: "two", name: "Rails Views (W6D5)" },
  { id: "three", name: "Rails Auth (W7D1)" },
  { id: "four", name: "Rails Auth II (W7D2)" },
  { id: "five", name: "Testing with Rails (W7D3)" },
  { id: "six", name: "Rails and CSS (W7D4)" },
  { id: "seven", name: "Advanced Rails Forms (W7D5)" },
  { id: "eight", name: "Rails Lite (W8D1)" }
];

const subtopics = [
  { id: "none", name: "NOSUBTOPIC" },
  { id: "assessment", name: "Assessment" },
  { id: "materials", name: "Materials" },
  { id: "additionalResources", name: "Additional Resources" },
  { id: "homeworks", name: "Homeworks" },
  { id: "culture", name: "Culture" },
  { id: "lecture", name: "Morning Lecture" },
  { id: "projects", name: "Projects" },
  { id: "bonus", name: "Bonus Projects" }
];

const types = {
  reading: "Reading",
  quiz: "Quiz",
  codingProblem: "CodingProblem",
  project: "Project",
  assessment: "Assessment",
  externalResource: "ExternalResource",
  video: "Video"
};

const rails = {
  courses: {
    campusHybrid: {
      taskGroupId: "b8961798-f369-40a7-8d7a-444e7cecb18e",
      name: "Rails",
      track: "SWE Campus Hybrid",
      urls: ["campus-hybrid-rails"],
      description: "All about Rails!",
      tags: ["rails"],
      catalog: false,
      topics: CampusHybridTopics,
      subtopics: subtopics,
      order: 6
    },
    live: {
      taskGroupId: "7de8670d-36ea-470e-bcf3-e591696f4994",
      name: "Rails",
      track: "Full Stack In Person",
      urls: ["full-stack-in-person-rails"],
      description: "All about Rails!",
      tags: ["rails"],
      catalog: false,
      order: 6,
      topics: liveTopics,
      subtopics: subtopics // use the default topics
    },
    inPerson: {
      taskGroupId: "42e18294-ffab-4602-add3-9b65e38831e2",
      name: "Rails",
      track: "SWE In Person",
      urls: ["swe-in-person-rails"],
      description: "All about Rails!",
      tags: ["rails"],
      catalog: false,
      order: 6,
      topics: SWEInPersonTopics,
      subtopics: subtopics // use the default topics
    },
    inPersonNYC: {
      taskGroupId: "d9e5ad39-1427-4710-ad83-84ae59d2e5c3",
      name: "Rails",
      track: "SWE In Person NYC",
      urls: ["swe-in-person-nyc-rails"],
      description: "All about Rails!",
      tags: ["rails"],
      catalog: false,
      order: 6,
      topics: SWEInPersonTopics,
      subtopics: subtopics // use the default topics
    },
    open: {
      taskGroupId: "0b9f45f2-02c9-46eb-b5e8-6d5f30c50e4e",
      name: "Rails",
      track: "Full Stack Online",
      urls: ["full-stack-online-rails"],
      description: "All about Rails!",
      tags: ["rails"],
      catalog: false,
      order: 6,
      topics: openTopics, // use the default topics
      subtopics: subtopics // use the default topics
    },
    online: {
      taskGroupId: "b059fb06-27dd-4ff7-8537-0a2a5188bc23",
      name: "Rails",
      track: "SWE Online",
      description: "All about Rails!",
      tags: ["rails"],
      catalog: false,
      urls: ["swe-online-rails"],
      order: 6,
      topics: onlineTopics, // use the default topics
      subtopics: subtopics
    }
  },
  tasks: [
    {
      name: "Rails Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "5cb60a57-7b6c-4c53-a581-923e77d7e485",
      topicId: "zero",
      subtopicId: "none",
      repo: "curriculum",
      path: "rails/Rails_Overview.md",
      change: {
        online: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      name: "Rails Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "dd116edf-fb97-4e25-9938-b13a84b957f7",
      topicId: "zero",
      subtopicId: "none",
      repo: "curriculum",
      path: "rails/Online_Rails_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      name: "Rails Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "bd52a17c-487e-4850-b92f-1c59e710c038",
      topicId: "zero",
      subtopicId: "none",
      repo: "curriculum",
      path: "rails/InPerson_Rails_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      name: "Rails Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "5eb59310-7bda-47b3-aa60-30cf355a02df",
      topicId: "zero",
      subtopicId: "none",
      repo: "curriculum",
      path: "rails/CampusHybrid_Rails_Overview.md",
      change: {
        online: "exclude",
        open: "exclude",
        live: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/rails-setup.md",
      name: "Rails Setup",
      type: types.reading,
      id: "aec74acc-5996-46da-b57d-5217be602117",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "zero",
          subtopicId: "none"
        },
        open: {
          topicId: "zero",
          subtopicId: "none"
        }
      }
    },
    {
      href: "http://api.rubyonrails.org/v5.1.3/",
      name: "Rails API (api.rubyonrails.org)",
      type: types.externalResource,
      id: "07aff749-2f3e-4fe2-9103-bfda29d3ed7c",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "zero",
          subtopicId: "none"
        },
        open: {
          topicId: "zero",
          subtopicId: "none"
        }
      }
    },
    {
      href: "http://guides.rubyonrails.org/v5.1.3/",
      name: "Rails Guides (guides.rubyonrails.org)",
      type: types.externalResource,
      id: "d18c7ed9-6940-42f5-bef7-86affe187b29",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "zero",
          subtopicId: "none"
        },
        open: {
          topicId: "zero",
          subtopicId: "none"
        }
      }
    },
    {
      href:
        "https://assets.aaonline.io/fullstack/rails/assets/rails_diagram.png",
      name: "Diagram of Rails",
      type: types.externalResource,
      id: "25b0514d-8d18-4155-ab5e-2adf2f6a5e6a",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "zero",
          subtopicId: "none"
        },
        open: {
          topicId: "zero",
          subtopicId: "none"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/rails-5-updates.md",
      name: "Rails 4 vs Rails 5",
      type: types.reading,
      id: "e048c0ba-9521-4936-9505-394cfac52608",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "zero",
          subtopicId: "none"
        },
        open: {
          topicId: "zero",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Rails 1 Assessment",
      repo: "curriculum",
      path: "course/assessment-day.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "39cdb0dd-c68d-4ead-9c0d-ffc33f0c8c5d",
      topicId: "one",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/168498417",
      name: "What is an API?",
      type: types.video,
      id: "bf8f4c08-4d4e-496d-828d-44308aec5328",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/168498424",
      name: "HTTP Request/Response",
      type: types.video,
      id: "2baf03f4-abe6-43f5-b346-5351a0956bc5",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/168498679",
      name: "Rails Routing",
      type: types.video,
      id: "f1d5141e-a556-4df6-a8b0-f893240d9b16",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/168499905",
      name: "Routes Demo",
      type: types.video,
      id: "ff6f089a-2644-49b7-8733-cb60726d0576",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/168501163",
      name: "Basic Controller Demo",
      type: types.video,
      id: "f6b66015-7d39-4020-9bd3-e7cf0d61facd",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/168505535",
      name: "RESTful Controller Demo",
      type: types.video,
      id: "3971511f-fec4-496d-beb7-949a2030a62c",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/routing-part-i.md",
      name: "Routing I: Basics",
      type: types.reading,
      id: "aa8f7e6d-3196-4c9a-a996-40051bb1003b",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/basic-controllers.md",
      name: "Basic Controllers and Strong Params",
      type: types.reading,
      id: "ecaae355-c5d0-46ee-bc59-8093f0142163",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/callbacks.md",
      name: "Callbacks",
      type: types.reading,
      id: "901c9ce8-c16e-4aad-beb0-7729e8c5b0be",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/delegation.md",
      name: "Delegation",
      type: types.reading,
      id: "77fff0da-a74f-40cb-9bff-106b89eeee25",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/dns.md",
      name: "Contextual Overview of DNS",
      type: types.reading,
      id: "6047e311-9c47-4967-9b72-93f49497b956",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/postman.md",
      name: "Testing Routes with Postman",
      type: types.reading,
      id: "54e8d0c5-e1f0-4cdd-bba0-b231bb38af56",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Routes and Controllers Quiz",
      repo: "curriculum",
      path: "rails/quizzes/routes_and_controllers.md",
      type: types.quiz,
      id: "b11064d8-e04b-43fc-bff3-713c97736129",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {}
    },
    {
      href:
        "https://medium.com/projectinclude/true-diversity-is-intersectional-2282b8da8882",
      name: "True Diversity is Intersectional",
      type: types.externalResource,
      id: "d7f223f4-f486-4b44-b100-19152c392fc0",
      topicId: "one",
      subtopicId: "culture",
      timeEstimate: "00:09:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "culture"
        },
        open: {
          topicId: "one",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://www.theatlantic.com/science/archive/2017/01/six-year-old-girls-already-have-gendered-beliefs-about-intelligence/514340/",
      name: "6-Year-Old Girls Already Have Gendered Beliefs About Intelligence",
      type: types.externalResource,
      id: "de995c22-535f-44fa-b224-435e2deb8d17",
      topicId: "one",
      subtopicId: "culture",
      timeEstimate: "00:04:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "one",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://hbr.org/2017/05/we-recorded-vcs-conversations-and-analyzed-how-differently-they-talk-about-female-entrepreneurs",
      name: "VCs and Female Entrepreneurs",
      type: types.externalResource,
      id: "702a4121-00d3-4322-9867-4794b04ffa65",
      topicId: "one",
      subtopicId: "culture",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "one",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "culture"
        }
      }
    },
    {
      href: "https://www.elephantinthevalley.com/",
      name: "Elephant in the Valley",
      type: types.externalResource,
      id: "2748daf5-2db4-4729-addd-0d5af337d80b",
      topicId: "one",
      subtopicId: "culture",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "culture"
        },
        open: {
          topicId: "one",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://techcrunch.com/2016/11/16/when-bias-in-product-design-means-life-or-death/",
      name: "When Bias in Product Design Means Life or Death",
      type: types.externalResource,
      id: "849de883-97f6-42ea-b056-046693118291",
      topicId: "one",
      subtopicId: "culture",
      timeEstimate: "00:06:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "one",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "culture"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/basic-json-api.md",
      name: "Basic JSON API",
      type: types.reading,
      id: "3062629e-331d-469d-b56c-94e2a8618115",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:08:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/routing-part-ii.md",
      name: "Routing II: Nested Collections",
      type: types.reading,
      id: "bc2bde8d-27ad-4fb1-8301-07b41324a533",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/routing-part-iii.md",
      name: "Routing III: Adding non-default routes",
      type: types.reading,
      id: "da5d0eb4-1928-423f-949e-c71a968d3ff8",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:08:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100267303",
      name: "(cc) 03-basic-rails-routing",
      type: types.video,
      id: "07f0b596-1958-4124-a006-d9a0c7ac4c3a",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:25:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100267304",
      name: "(cc) 04-strong-params",
      type: types.video,
      id: "8876e00d-d9fc-4898-bd93-15dda02b7d69",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:26:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100267305",
      name: "(cc) 05-nested-resources",
      type: types.video,
      id: "8df47c0a-d43c-4b26-8fec-31e15989f593",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:16:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100267306",
      name: "(cc) 06-erb-and-views",
      type: types.video,
      id: "4388d425-b497-4bb9-9956-9f70fe56980e",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:17:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100358537",
      name: "(cc) 07-basic-forms",
      type: types.video,
      id: "b883dee4-b877-4185-aec4-f6c0778f7060",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:19:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100359278",
      name: "(cc) 08-form-request-cycle",
      type: types.video,
      id: "c345a5e8-23d9-4ab5-b60b-ef98d494ff3d",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:14:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100729432",
      name: "(cc) 09-select",
      type: types.video,
      id: "a3eee0e2-bdac-4ba3-8a02-58281eba1c95",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:22:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100729434",
      name: "(cc) 10-form-partial",
      type: types.video,
      id: "cb2f9bf0-88a3-4be2-91f4-7777e58c431b",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:14:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100729435",
      name: "(cc) 11-form-encoding",
      type: types.video,
      id: "b63de732-4e02-4d92-b6ee-89e11115e393",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href:
        "https://assets.aaonline.io/fullstack/rails/demos/intro_rails_video_demo.zip",
      name: "Code from Rails demos (Intro Rails Video Demo)",
      type: types.externalResource,
      id: "02ef1a67-df76-4d34-b323-e67906608d7f",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/335016614",
      name: "Rails Routing Intro",
      type: types.video,
      id: "05535d20-5f8f-4237-803b-dc7affd84fba",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:23:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        inPersonNYC: {
          topicId: "one",
          subtopicId: "materials"
        },
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335017586",
      name: "First Route & Controller Action",
      type: types.video,
      id: "868aff82-759c-49d9-aba5-e8438941aa85",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:31:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        inPersonNYC: {
          topicId: "one",
          subtopicId: "materials"
        },
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335018812",
      name: "Show Controller Action",
      type: types.video,
      id: "1b864680-6c72-4351-b1e4-cb77f5f5f839",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:14:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335019368",
      name: "Create & New Controller Actions",
      type: types.video,
      id: "87cf1a23-6edd-4cb5-965f-aee78140b510",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:40:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335021237",
      name: "Update & Destroy Controller Actions",
      type: types.video,
      id: "11096c09-649b-4e34-9882-ff9f5302534b",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:24:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/first_routes/README.md",
      name: "First Routes and Controllers",
      type: types.project,
      id: "5d41cc68-4bec-4860-b7e1-0c3b47f2f792",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "01:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/first_routes/solution.zip",
      change: {
        online: {
          topicId: "one",
          subtopicId: "projects"
        },
        open: {
          topicId: "one",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/art_share_api/README.md",
      name: "Art Share API",
      type: types.project,
      id: "ad2d53e7-1e3f-4f32-afb5-318e28b87013",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "08:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/art_share_api/solution.zip",
      change: {
        online: {
          topicId: "one",
          subtopicId: "projects"
        },
        open: {
          topicId: "one",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/micro-projects/css_friends_combined/css_friends_0/README.md",
      name: "CSS Friends Part 1",
      type: types.project,
      id: "6fd2d05a-9d5e-48c1-aae2-fed8fdb23fab",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "02:00:00",
      solution: "https://assets.aaonline.io/fullstack/html-css/micro-projects/combined-css-friends/css-friends-pt1/solution.zip",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "one",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/art_share_api/part_two.md",
      name: "Art Share API (Part Two)",
      type: types.project,
      id: "3c0b6e1f-9ab2-4083-81d4-29539e2d2c5e",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "08:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/art_share_api/solution.zip",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "one",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "projects"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/194372657",
      name: "Rails Views: Intro",
      type: types.video,
      id: "12052137-4792-46b5-80e4-cddccb30d337",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:27:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/194376967",
      name: "Rails Views: Forms",
      type: types.video,
      id: "566d57cc-f409-40c7-86a0-6c70d80788bd",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:40:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/194385069",
      name: "Rails Views: Partials",
      type: types.video,
      id: "a13d7701-ccf6-46a5-a47a-4b705ba999d0",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:36:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/194394048",
      name: "Debugging a Rails Project",
      type: types.video,
      id: "6fbdf26b-c9c4-4020-81e1-8921fbb4d80e",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://assets.aaonline.io/fullstack/rails/demos/library_demo.zip",
      name: "Code from Rails demos (Library Demo)",
      type: types.externalResource,
      id: "9f02bed3-7044-46d7-b64d-55fca87aa938",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/quizzes/views.md",
      name: "Rails Views Quiz",
      type: types.quiz,
      id: "2a0da6f6-bf74-44a8-804c-6768913dcd39",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:07:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "rails/readings/partials.md",
      name: "Partials",
      type: types.reading,
      id: "4f5707ea-b4b4-44fa-aca3-9ee1cf8cf12f",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "two",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/erb.md",
      name: "ERB",
      type: types.reading,
      id: "f56baf4a-8e25-475b-b574-dc78db4ba439",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "two",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/parameter-conventions.md",
      name: "Rails Parameter Conventions",
      type: types.reading,
      id: "6df38015-553a-4cc6-9de9-fbd16d4f2e64",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "two",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/debugging-rails.md",
      name: "Debugging",
      type: types.reading,
      id: "27c6731d-ec48-4e25-b0b4-e39607e9b414",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "two",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href:
        "https://assets.aaonline.io/fullstack/rails/demos/easy_forms_demo.zip",
      name: "Easy Forms Demo",
      type: types.externalResource,
      id: "709cf8cf-8183-45f2-aae3-109eddefc0cd",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "two",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/sql-ternary-logic.md",
      name: "Ternary Logic in SQL",
      timeEstimate: "00:08:00",
      type: types.reading,
      id: "0eeef193-99ff-4509-b986-0d20d2bc122d",
      topicId: "two",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "two",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "two",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/335906952",
      name: "Art Share API Solutions",
      type: types.video,
      id: "2a0d1316-59a7-4a0a-ae9a-e426688d8098",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:18:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335909324",
      name: "Rails Views - BleatsController#index",
      type: types.video,
      id: "dc0a0648-917e-4b5b-b1a3-0a6acd873193",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:26:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        inPersonNYC: {
          topicId: "two",
          subtopicId: "materials"
        },
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335911420",
      name: "Rails Views - BleatsController#show",
      type: types.video,
      id: "2d1a1d44-6524-406f-a249-7d6a11dee36b",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:12:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335912633",
      name: "Rails Views - BleatsController#new & #create",
      type: types.video,
      id: "2629fbb7-ceb3-4bb1-a535-ddbaa29b07d5",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:51:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335917285",
      name: "Rails Views - BleatsController#edit & #update",
      type: types.video,
      id: "a1d2aa60-12f9-46df-92c9-1be5617a7d79",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:20:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335919026",
      name: "Partials Lecture",
      type: types.video,
      id: "2a9cef43-5f58-4a28-b9db-b6f0516b6bc5",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:19:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/335920703",
      name: "Rails Views - BleatsController#destroy",
      type: types.video,
      id: "70260fa4-d7a7-4098-a0b1-ed92285ff6d7",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:15:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/ninety_nine_cats_i/README.md",
      name: "99 Cats",
      type: types.project,
      id: "65ed3559-29a1-4456-a274-ceef6aff59ed",
      topicId: "two",
      subtopicId: "projects",
      timeEstimate: "08:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/ninety_nine_cats_i/solution.zip",
      change: {
        online: {
          topicId: "two",
          subtopicId: "projects"
        },
        open: {
          topicId: "two",
          subtopicId: "projects"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/160819941",
      name: "Secure State",
      type: types.video,
      id: "b2e5ba97-a7d2-41ee-8a84-888f356e6e61",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:11:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "materials"
        },
        open: {
          topicId: "three",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/160820294",
      name: "Cookies and Authentication",
      type: types.video,
      id: "80688ad9-2056-4dd6-b2c4-20097d226a4d",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:17:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "materials"
        },
        open: {
          topicId: "three",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/160820971",
      name: "Encoding and Encryption",
      type: types.video,
      id: "43fcf2e6-50f4-4f97-96a1-22287d535693",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:19:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "materials"
        },
        open: {
          topicId: "three",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/160821222",
      name: "Hashing for Authentication",
      type: types.video,
      id: "385737a9-81cd-4010-a6a1-f09271b43a11",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:11:00",
      change: {}
    },
    {
      href: "https://player.vimeo.com/video/160822597",
      name: "Salting",
      type: types.video,
      id: "651dca23-30cd-4c92-838f-54db77de8545",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:31:00",
      change: {}
    },
    {
      href: "https://player.vimeo.com/video/160825250",
      name: "BCrypt",
      type: types.video,
      id: "60fba809-b3f2-4ad0-9899-e4e76db9cc65",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:07:00",
      change: {}
    },
    {
      href: "https://player.vimeo.com/video/160824886",
      name: "Session and Flash",
      type: types.video,
      id: "797467fb-c1d4-455e-999d-12b86f182c76",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "materials"
        },
        open: {
          topicId: "three",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/160826910",
      name: "Auth Pattern",
      type: types.video,
      id: "1a0c3995-4e39-4f5c-8fc1-35d9bf2a4fb3",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "materials"
        },
        open: {
          topicId: "three",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/93114286",
      name: "(cc) 06 CSRF Attack",
      type: types.video,
      id: "f147e76b-0d60-4c9f-ad2b-5ddc1ee63849",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:13:00",
      change: {}
    },
    {
      href: "https://player.vimeo.com/video/93114288",
      name: "(cc) 07 CSRF Protection",
      type: types.video,
      id: "655f1e10-491b-47fe-bce8-e3325ab0c3ea",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:12:00",
      change: {}
    },
    {
      href: "https://player.vimeo.com/video/93114287",
      name: "(cc) 08 CSRF Methods",
      type: types.video,
      id: "85851258-6703-438a-8d8c-b5634c68e75c",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "rails/readings/singular-resources.md",
      name: "Singular resource",
      type: types.reading,
      id: "47a704dd-1256-4962-b239-a1294476eed8",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:02:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "materials"
        },
        open: {
          topicId: "three",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/quizzes/auth.md",
      name: "Rails Auth Quiz",
      type: types.quiz,
      id: "9a62a3f7-1717-4274-8ae2-2b7c7dd01fd4",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:07:00",
      change: {}
    },
    {
      href: "https://player.vimeo.com/video/336447623",
      name: "Cookies, JSON",
      type: types.video,
      id: "34a8e6e4-fd59-448a-9369-58397ac74876",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:33:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/336448651",
      name: "Encrypted Cookies & #session",
      type: types.video,
      id: "ff665c5e-47f7-49e9-b33f-df7ed0670c20",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:11:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/336449027",
      name: "#flash & #flash.now",
      type: types.video,
      id: "f1bcdc6f-704c-4e68-aa98-c9ece7d931e1",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:21:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "rails/homeworks/rails-auth/README.md",
      name: "Rails Auth",
      type: types.project,
      id: "61d22458-09d8-4adb-9c23-2c3e296e2c44",
      topicId: "three",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/homeworks/rails-auth/solution.zip",
      change: {
        online: {
          topicId: "three",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "three",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/cookies.md",
      name: "Cookies",
      type: types.reading,
      id: "4949c8d7-fcea-4d88-93a4-0e3e5eb6c1c9",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "three",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/controllers-and-state.md",
      name: "Controllers and State",
      type: types.reading,
      id: "1ebf109d-d4c7-4cb5-9c62-b1b6e4caf500",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:30:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "three",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/csrf.md",
      name: "CSRF and Forms",
      type: types.reading,
      id: "cd48274a-1ea9-48e2-8e13-ba16811bf92a",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:12:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "rails/readings/validation.md",
      name: "Displaying validation errors; flash",
      type: types.reading,
      id: "d9f72b30-e35d-4b4f-b15b-d1603796e07e",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "three",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/auth-part-i.md",
      name: "Auth I: Creating Users",
      type: types.reading,
      id: "692b2b22-d858-4983-ac47-4514eb01d9b3",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:30:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "three",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/auth-part-ii.md",
      name: "Auth II: Sessions",
      type: types.reading,
      id: "5f242094-fe1a-482f-ae52-5768baffe4b3",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:35:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "three",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "rails_user_authentication",
      path: "README.md",
      name: "Common User Auth Questions",
      type: types.reading,
      id: "9d992004-c395-4499-aaee-8c9937ea560e",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:30:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "three",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/336446896",
      name: "99Cats pt. 1 Solution",
      type: types.video,
      id: "55f2b9ce-4ec8-4079-a951-c8438052ff69",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:24:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/336449760",
      name: "User Password Functionality & User Signup",
      type: types.video,
      id: "7869e601-ba3c-4747-9a4e-ba8660305b3e",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "00:47:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/336451736",
      name: "Auth Intro, Log In on Signup, #current_user",
      type: types.video,
      id: "6d7e072f-564e-4de8-9ac0-3ba66db8df84",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "00:22:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/336452376",
      name: "SessionsController",
      type: types.video,
      id: "495672df-5f10-42b4-9df8-d2c628df8454",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "00:33:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/336453330",
      name: "Authorization (before_action)",
      type: types.video,
      id: "b4aeeab3-3624-4651-a031-9aec5d1e068c",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "00:27:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/ninety_nine_cats_ii/README.md",
      name: "99 Cats II: Auth",
      type: types.project,
      id: "ee87450c-1114-4a3b-936b-727cf72d408e",
      topicId: "three",
      subtopicId: "projects",
      timeEstimate: "07:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/ninety_nine_cats_ii/solution.zip",
      change: {
        online: {
          topicId: "three",
          subtopicId: "projects"
        },
        open: {
          topicId: "three",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/assessments/rails_olympics.md",
      name: "Rails Olympics Practice",
      type: types.project,
      id: "36ee1e6e-082e-4ac7-a7fd-e1178c26a3d0",
      topicId: "four",
      subtopicId: "assessment",
      download:
        "https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/rails_olympics_practice.zip",
      solution:
        "https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/rails_olympics_practice_solution.zip",
      timeEstimate: "01:15:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "five",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/362821819",
      name: "RO - HackerRank - Multiple Choice",
      type: types.video,
      id: "8613db51-e52a-4ed4-9496-4775bfca2e4a",
      topicId: "four",
      subtopicId: "assessment",
      timeEstimate: "00:15:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "five",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/362821761",
      name: "RO - HackerRank - CSS",
      type: types.video,
      id: "3cadd599-bcb6-4f3e-9d38-01b362477cbb",
      topicId: "four",
      subtopicId: "assessment",
      timeEstimate: "00:05:47",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "five",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/362821798",
      name: "RO - HackerRank - Short Answer",
      type: types.video,
      id: "f772dc38-09c1-43b6-babb-17c775baf481",
      topicId: "four",
      subtopicId: "assessment",
      timeEstimate: "00:03:30",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "five",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/362598930",
      name: "RO - Build Rails Project - Model 1",
      type: types.video,
      id: "107b7311-048d-43f5-836e-19a96a3cecb3",
      topicId: "four",
      subtopicId: "assessment",
      timeEstimate: "00:17:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "five",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/362598998",
      name: "RO - Build Rails Project - Model 2",
      type: types.video,
      id: "a3c39027-f297-4c1e-a94e-564ba18e0d4e",
      topicId: "four",
      subtopicId: "assessment",
      timeEstimate: "00:08:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "five",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/362598820",
      name: "RO - Build Rails Project - Controllers 1",
      type: types.video,
      id: "bcf5e6d4-4fda-4342-ac68-c59ab3cb8dde",
      topicId: "four",
      subtopicId: "assessment",
      timeEstimate: "00:12:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "five",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/362598875",
      name: "RO - Build Rails Project - Controllers 2",
      type: types.video,
      id: "5887acf7-dbe2-4467-b6b3-c44ab7b4865f",
      topicId: "four",
      subtopicId: "assessment",
      timeEstimate: "00:14:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "five",
          subtopicId: "assessment"
        }
      }
    },
    {
      repo: "swe_assessments",
      path: "rails/rails_assessment_2/study_guide.md",
      name: "Study Guide - Rails Assessment 2",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "01ae9854-766f-48a6-9b76-c36aa9a30311",
      topicId: "four",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "five",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100729825",
      name: "(cc) 14-radio-and-textarea",
      type: types.video,
      id: "c17d6c14-52d1-436c-a983-7b85546ecd54",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:16:00",
      change: {
        online: {
          topicId: "four",
          subtopicId: "materials"
        },
        open: {
          topicId: "four",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100780885",
      name: "(cc) 15-helpers",
      type: types.video,
      id: "6e40ebff-bfa3-4767-8ef8-4c2fd92013e7",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:13:00",
      change: {
        online: {
          topicId: "four",
          subtopicId: "materials"
        },
        open: {
          topicId: "four",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/168822741",
      name: "layouts",
      type: types.video,
      id: "ae78f33b-bf7e-4f32-a004-aed42ab5fbc0",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "four",
          subtopicId: "materials"
        },
        open: {
          topicId: "four",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/mailing-1.md",
      name: "ActionMailer",
      type: types.reading,
      id: "2636d147-af20-4891-ad68-11e9cf1a2e3c",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "four",
          subtopicId: "materials"
        },
        open: {
          topicId: "four",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/helpers.md",
      name: "View helpers",
      type: types.reading,
      id: "9d438d6b-cb8d-4128-b5b4-f2a85b41c349",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "four",
          subtopicId: "materials"
        },
        open: {
          topicId: "four",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/layouts.md",
      name: "View layouts",
      type: types.reading,
      id: "0e3ed2c6-bc5b-4d21-a908-da42896ddc16",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "four",
          subtopicId: "materials"
        },
        open: {
          topicId: "four",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/rails_nontech.md",
      name: "Nontechnical Overview of Rails",
      type: types.reading,
      id: "ae899127-8b52-4adb-9ea0-ca46df9f09a2",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "four",
          subtopicId: "materials"
        },
        open: {
          topicId: "four",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/homeworks/helpers-layouts-mailer/README.md",
      name: "Helpers, Layouts, and Partials",
      type: types.project,
      id: "07728715-2933-4cf9-b73e-9ee647b80890",
      topicId: "four",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/homeworks/helpers-layouts-mailer/solution.zip",
      change: {
        online: {
          topicId: "four",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "four",
          subtopicId: "homeworks"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/168810895",
      name: "Action Mailer Demo",
      type: types.video,
      id: "5e4b36fc-f458-44b1-a774-9c6a196588be",
      topicId: "four",
      subtopicId: "additionalResources",
      timeEstimate: "00:11:00",
      change: {
        online: {
          topicId: "four",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "four",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/336454209",
      name: "CSRF Attacks & Protection",
      type: types.video,
      id: "fd25a0a7-7364-47b2-b804-07dd3a93faf9",
      topicId: "four",
      subtopicId: "lecture",
      timeEstimate: "00:37:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/336455270",
      name: "Auth Review",
      type: types.video,
      id: "9b1e3696-4732-427f-968a-81c73d1e00f8",
      topicId: "four",
      subtopicId: "lecture",
      timeEstimate: "00:37:00",
      change: {
        open: "exclude",
        inPerson: {
          topicId: "four",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "four",
          subtopicId: "materials"
        },
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/music_app/README.md",
      name: "Music App",
      type: types.project,
      id: "25796322-aa1d-4273-ae83-86c7f01a2e73",
      topicId: "four",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/music_app/solution.zip",
      change: {
        online: {
          topicId: "four",
          subtopicId: "projects"
        },
        open: {
          topicId: "four",
          subtopicId: "projects"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/292415799",
      name: "Rails Testing: Intro",
      type: types.video,
      id: "f7e88cc4-6b6b-455d-83a2-89cc2a902472",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:06:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "materials"
        },
        open: {
          topicId: "five",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/292423696",
      name: "Rails Testing: Setup",
      type: types.video,
      id: "508ceea0-c1de-4b86-9172-5db58dcad2f2",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "materials"
        },
        open: {
          topicId: "five",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/292829125",
      name: "Rails Testing: Models",
      type: types.video,
      id: "89dc2b13-f917-4a7d-a751-ce5c37dd42d1",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "materials"
        },
        open: {
          topicId: "five",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/292829352",
      name: "Rails Testing: Factories",
      type: types.video,
      id: "0eef2425-eb7a-45e6-8d1e-97f5f543c863",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:08:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "materials"
        },
        open: {
          topicId: "five",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/292827733",
      name: "Rails Testing: Controllers",
      type: types.video,
      id: "f3205376-54a1-49d4-81f4-b867d8e1d937",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:14:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "materials"
        },
        open: {
          topicId: "five",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/292828799",
      name: "Rails Testing: Capybara",
      type: types.video,
      id: "369a545d-45b6-4320-a401-e6ea2f66ecf6",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:17:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "materials"
        },
        open: {
          topicId: "five",
          subtopicId: "materials"
        }
      }
    },
    {
      href:
        "https://assets.aaonline.io/fullstack/rails/demos/CapybaraParty.zip",
      name: "Code from Rails Testing demo (Capybara Party)",
      type: types.externalResource,
      id: "ec5591bd-dac4-4704-9488-e62d2b22d3fa",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "materials"
        },
        open: {
          topicId: "five",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/rspec-views.md",
      name: "RSpec View Testing",
      type: types.reading,
      id: "dbaedc5b-9954-4126-8ca9-bd46bb6d9c01",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:07:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "rails/quizzes/testing.md",
      name: "Rails Testing Quiz",
      type: types.quiz,
      id: "ba0f2254-8d67-41ee-8f18-4a507b15e350",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:07:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "rails/homeworks/capybara/README.md",
      name: "Capybara",
      type: types.project,
      id: "c39894c9-c72a-4ace-81a2-69ef481e4e59",
      topicId: "five",
      subtopicId: "homeworks",
      timeEstimate: "00:45:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/homeworks/capybara/solution.md",
      change: {
        online: {
          topicId: "five",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "five",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/integration-testing.md",
      name: "Integration Testing",
      type: types.reading,
      id: "46fd4763-20c4-4522-a7d4-7c0cde24f0e1",
      topicId: "five",
      subtopicId: "additionalResources",
      timeEstimate: "00:07:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "five",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/rspec-and-rails-setup.md",
      name: "RSpec and Rails Setup",
      type: types.reading,
      id: "6acaf229-b5bf-40cf-ad3a-784f08ca397b",
      topicId: "five",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "five",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/rspec-models.md",
      name: "Testing Models",
      type: types.reading,
      id: "8995107a-2a46-4ef1-9738-6b17100d1fe5",
      topicId: "five",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "five",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/factorybot-and-faker.md",
      name: "FactoryBot and Faker Gems",
      type: types.reading,
      id: "c955ba8f-bdd1-4d03-9907-8140075f6ac9",
      topicId: "five",
      subtopicId: "additionalResources",
      timeEstimate: "00:30:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "five",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/rspec-controllers.md",
      name: "Testing Controllers",
      type: types.reading,
      id: "b605a1ab-19a2-41d8-9855-d0cb6afe539e",
      topicId: "five",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "five",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/capybara.md",
      name: "Testing with Capybara",
      type: types.reading,
      id: "d7442a1d-2ab9-4ce8-8950-eaf0ba8bd0c2",
      topicId: "five",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "five",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/guard-spring-setup.md",
      name: "Spring and Guard Setup",
      type: types.reading,
      id: "62d20a82-45a0-4ada-b07a-dfb055905ca8",
      topicId: "five",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "five",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/shoulda-matchers-setup.md",
      name: "Shoulda Matchers Setup",
      type: types.reading,
      id: "c972c4dc-3a4f-4e08-a4b5-a8d79b24e5a2",
      topicId: "five",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "five",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/336465423",
      name: "Rails Testing Intro & Model Tests",
      type: types.video,
      id: "271739ae-7dd3-4e51-bd51-8e22995aa8f3",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:55:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/336466846",
      name: "Rails Controller Testing",
      type: types.video,
      id: "ec4568e7-cbac-4ec2-b89f-742632c6a9d5",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:25:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/336467425",
      name: "Rails Feature Tests",
      type: types.video,
      id: "3d3d2637-d8d3-4021-b6a8-c374a7594cfd",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:29:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/goal_app/README.md",
      name: "Goal App",
      type: types.project,
      id: "88c57748-c8e4-47b2-87d1-aa89da8a09e8",
      topicId: "five",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/goal_app/solution.zip",
      change: {
        online: {
          topicId: "five",
          subtopicId: "projects"
        },
        open: {
          topicId: "five",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/appacademy.io_tests/README.md",
      name: "Appacademy.io Tests (Bonus)",
      type: types.project,
      id: "6cb855f0-12ef-41a5-905f-1251d27d5e47",
      topicId: "five",
      subtopicId: "bonus",
      timeEstimate: "04:00:00",
      change: {
        online: {
          topicId: "five",
          subtopicId: "bonus"
        },
        open: {
          topicId: "five",
          subtopicId: "bonus"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/readings/css_nontech.md",
      name: "CSS Nontechnical Overview",
      type: types.reading,
      id: "25178c09-1712-4ac2-9f9a-d7e642e32241",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "materials"
        },
        open: {
          topicId: "six",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/readings/responsive_design.md",
      name: "CSS Responsive Design",
      type: types.reading,
      id: "86e1c2c0-80dd-45c4-b0f0-a3cd506cbd55",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "materials"
        },
        open: {
          topicId: "six",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/quizzes/css.md",
      name: "CSS Quiz",
      type: types.quiz,
      id: "ce81f802-0705-45de-875b-f17b35dea202",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:07:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "html-css/micro-projects/positioning_media_queries/exercise.md",
      name: "Positioning & Media Queries",
      type: types.project,
      id: "7e51dbd8-61c4-4190-ab3a-a4574f35022b",
      topicId: "six",
      subtopicId: "homeworks",
      timeEstimate: "01:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/html-css/micro-projects/positioning_media_queries/solution.zip",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "six",
          subtopicId: "homeworks"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "homeworks"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/projects/css_review/README.md",
      name: "CSS Review",
      type: types.project,
      id: "768eee04-4007-4024-b5e8-8143dccfb2e5",
      topicId: "six",
      subtopicId: "homeworks",
      timeEstimate: "01:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/html-css/projects/css_review/solution.zip",
      change: {
        online: {
          topicId: "six",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "six",
          subtopicId: "homeworks"
        },
        inPerson: {
          topicId: "six",
          subtopicId: "homeworks"
        },
        inPersonNYC: {
          topicId: "six",
          subtopicId: "homeworks"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/214597789",
      name: "CSS Review Video",
      type: types.video,
      id: "f7705a5b-1827-4038-9f0b-d80ccd02107d",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:24:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/intro_to_css.md",
      name: "CSS Intro",
      type: types.reading,
      id: "35709f71-b6d5-4c54-839f-8baf6e4e71ce",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_syntax.md",
      name: "CSS Syntax",
      type: types.reading,
      id: "77d9efd5-55d1-46e7-a16f-14bd800ebadd",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_display.md",
      name: "CSS Display",
      type: types.reading,
      id: "6214dc7f-7886-4c84-87f3-c2000199b98f",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_box_model.md",
      name: "CSS Box Model",
      type: types.reading,
      id: "e623d236-b9d7-4733-97b4-3905fae77b24",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_margin.md",
      name: "CSS Margin",
      type: types.reading,
      id: "ef84a971-aee7-44fb-91c6-8354feab2d88",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_inherit.md",
      name: "CSS Inheritence",
      type: types.reading,
      id: "27a05649-1789-4a4c-9975-846571c1b99c",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_reset.md",
      name: "CSS Reset",
      type: types.reading,
      id: "b33d86c6-ebd1-42c1-9773-aeb56d6266e2",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_pseudo_content.md",
      name: "CSS Pseudo Content",
      type: types.reading,
      id: "af019ba4-1205-4e1d-8306-e0167692a988",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_float.md",
      name: "CSS Float",
      type: types.reading,
      id: "8c72322a-0491-4e00-990f-5c080d25e31a",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_grid.md",
      name: "CSS Grid",
      type: types.reading,
      id: "e1afe03e-5516-4663-b5ea-a1cacef481a5",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_navbar.md",
      name: "CSS Navbar Demo",
      type: types.reading,
      id: "5fc0bfcf-f356-47a5-9be0-657d7a42f939",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_positioning.md",
      name: "CSS Positioning",
      type: types.reading,
      id: "acff7931-126d-425f-9362-6baf14dfc7f8",
      topicId: "seven",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "seven",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_glasses.md",
      name: "CSS Glasses Demo",
      type: types.reading,
      id: "6b4d532a-c35f-4d83-8ccf-64b1c168b512",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "http://css-tricks.com/almanac/properties/t/transform/",
      name: "CSS Transform Property",
      type: types.externalResource,
      id: "01ca338a-65ea-4b0d-9b89-41c95a883c16",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://flexboxfroggy.com/",
      name: "Flexbox Froggy",
      type: types.externalResource,
      id: "83a26eec-816e-4884-bd84-b5f444b085d8",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:45:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "http://www.flexboxdefense.com/",
      name: "Flexbox Defense",
      type: types.externalResource,
      id: "efc2d50b-e2ca-4714-a441-a1f2a92dc34d",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:45:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "http://cssgridgarden.com/",
      name: "CSS Grid Garden",
      type: types.externalResource,
      id: "5b433205-92b9-4797-b798-61aa1c562579",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:45:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/337140888",
      name: "Intro & Boxes Demo",
      type: types.video,
      id: "f2727204-2ac5-4aa4-9ca6-ff2725e74472",
      topicId: "six",
      subtopicId: "lecture",
      timeEstimate: "00:26:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337142705",
      name: "Display Property & Floats Demo",
      type: types.video,
      id: "7bd7f65a-6ea7-4248-beac-ce26fc6deb0b",
      topicId: "six",
      subtopicId: "lecture",
      timeEstimate: "00:25:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337144348",
      name: "Flexbox Demo",
      type: types.video,
      id: "056ccb4a-b5d6-43e3-9b39-d0f4fc9ae06a",
      topicId: "six",
      subtopicId: "lecture",
      timeEstimate: "00:33:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337146602",
      name: "Position Demo",
      type: types.video,
      id: "73b7b0ae-3371-451a-b0c7-f40e35ccd243",
      topicId: "six",
      subtopicId: "lecture",
      timeEstimate: "00:24:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337149109",
      name: "Styling Demo with Rails",
      type: types.video,
      id: "d953ac17-eee1-4265-bb7b-115780e3dd5b",
      topicId: "sixD2",
      subtopicId: "lecture",
      timeEstimate: "00:47:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "html-css/projects/aa_times/README.md",
      name: "AA Times",
      type: types.project,
      id: "facc5c81-64b2-45ef-ba97-69a30c1d8eaf",
      topicId: "six",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution.zip",
      change: {
        online: {
          topicId: "six",
          subtopicId: "projects"
        },
        open: {
          topicId: "six",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/projects/aa_times/part_two.md",
      name: "AA Times (Part Two)",
      type: types.project,
      id: "ea2e7ad5-4498-455d-b5aa-a563b4cea21a",
      topicId: "six",
      subtopicId: "projects",
      timeEstimate: "04:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution.zip",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "six",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "projects"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "bonus"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/projects/google_homepage/README.md",
      name: "Google Homepage (Bonus)",
      type: types.project,
      id: "964e9629-6706-4137-966f-b90ab8f0d199",
      topicId: "six",
      subtopicId: "bonus",
      timeEstimate: "04:00:00",
      solution: "https://www.google.com/",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "bonus"
        },
        open: {
          topicId: "six",
          subtopicId: "bonus"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "bonus"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "bonus"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "bonus"
        }
      }
    },
    {
      href:
        "https://www.comparably.com/guest/culture/tech/all-departments/109-have-you-ever-experienced-racism-in-the-workplace",
      name: "Have You Experienced Racism in the Workplace?",
      type: types.externalResource,
      id: "7b30e2ff-66aa-4b8b-bc13-d481ccd44c9e",
      topicId: "six",
      subtopicId: "culture",
      timeEstimate: "00:03:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "culture"
        },
        open: {
          topicId: "six",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/diversity-in-tech-remains-elusive-due-to-racism-lack-of-representation-and-cultural-differences",
      name: "Diversity in Tech Remains Elusive",
      type: types.externalResource,
      id: "79a45c47-c617-4242-af93-71f2f82e8eb8",
      topicId: "six",
      subtopicId: "culture",
      timeEstimate: "00:07:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "six",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/damaged-karma-commoditization-and-exploitation-of-asians-in-tech",
      name: "Commoditization and Exploitation of Asians in Tech",
      type: types.externalResource,
      id: "81eabd10-3fe1-475b-b19b-a8e01f1761f7",
      topicId: "six",
      subtopicId: "culture",
      timeEstimate: "00:11:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "culture"
        },
        open: {
          topicId: "six",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://medium.com/this-is-hard/the-other-side-of-diversity-1bb3de2f053e",
      name: "The Other Side of Diversity",
      type: types.externalResource,
      id: "f5b325dd-790e-4578-85aa-e1cb20078c23",
      topicId: "six",
      subtopicId: "culture",
      timeEstimate: "00:11:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "six",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "sixD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "six",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://www.theguardian.com/inequality/2017/aug/08/rise-of-the-racist-robots-how-ai-is-learning-all-our-worst-impulses",
      name: "How AI is Learning All of Our Worst Impulses",
      type: types.externalResource,
      id: "99bce80c-75e9-47a2-b4af-2c57225653e6",
      topicId: "six",
      subtopicId: "culture",
      timeEstimate: "00:09:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "culture"
        },
        open: {
          topicId: "six",
          subtopicId: "culture"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100780886",
      name: "(cc) 16-tag-ids-setter",
      type: types.video,
      id: "7809c475-d9d9-442f-9725-ee77433e4ad6",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:22:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "materials"
        },
        open: {
          topicId: "seven",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100780887",
      name: "(cc) 17-checkboxes-1",
      type: types.video,
      id: "57724d2d-f9f3-4ade-814a-ec13a7c8b269",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "materials"
        },
        open: {
          topicId: "seven",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100846847",
      name: "(cc) 18-checkboxes-2",
      type: types.video,
      id: "a5eb9157-1248-4268-9935-d624da6d9e14",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:11:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "materials"
        },
        open: {
          topicId: "seven",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100846848",
      name: "(cc) 19-checkboxes-3",
      type: types.video,
      id: "43d4286e-8be5-438c-9cf0-8f9aa87b9a51",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:06:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "materials"
        },
        open: {
          topicId: "seven",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100849678",
      name: "(cc) 20-query-string",
      type: types.video,
      id: "c42235ae-11b7-4749-92bb-277a9b3aa6b8",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:03:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "materials"
        },
        open: {
          topicId: "seven",
          subtopicId: "materials"
        }
      }
    },
    {
      href:
        "http://guides.rubyonrails.org/association_basics.html#polymorphic-associations",
      name: "Polymorphic Associations: Section 2.9",
      type: types.externalResource,
      id: "05ffa03d-88d8-4ac7-a8e7-cee8e1489577",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "materials"
        },
        open: {
          topicId: "seven",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/concerns.md",
      name: "Concerns",
      type: types.reading,
      id: "c03f22d0-863b-4006-bb5a-9a45bf53f152",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "materials"
        },
        open: {
          topicId: "seven",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/quizzes/rails_forms.md",
      name: "Rails Forms Quiz",
      type: types.quiz,
      id: "8ed7bf68-0731-4fbd-8cc3-4607ae131daa",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:07:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "rails/homeworks/polymorphism-concerns/README.md",
      name: "Polymorphism and Concerns",
      type: types.project,
      id: "b1f6da46-1354-4449-aea2-a4ada9aae992",
      topicId: "seven",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/homeworks/polymorphism-concerns/solution.zip",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "seven",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/decorators.md",
      name: "Decorators (Bonus)",
      type: types.reading,
      id: "8e851f9c-cd1e-48b8-92f3-4e1908e47c11",
      topicId: "seven",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "seven",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/checkboxes.md",
      name: "Checkboxes and Id Setters Reference",
      type: types.reading,
      id: "99ae0e00-e29f-4567-a5ce-7825e2940da2",
      topicId: "seven",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "seven",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/reddit_on_rails/README.md",
      name: "RedditClone",
      type: types.project,
      id: "265f84d1-5531-4633-babd-85ef7a2ecaa3",
      topicId: "seven",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/reddit_on_rails/solution.zip",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "projects"
        },
        open: {
          topicId: "seven",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Rails 2 Assessment",
      repo: "curriculum",
      path: "rails/assessments/rails_assessment_2.md",
      name: "Rails 2 Practice",
      type: types.project,
      id: "ef7cb0f7-5af8-47e9-b016-208cd532f80b",
      topicId: "eight",
      subtopicId: "assessment",
      download:
        "https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/rails_2_practice_skeleton.zip",
      solution:
        "https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/rails_2_practice_solution.zip",
      timeEstimate: "02:00:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "eightD2",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/376923664",
      name: "Rails 2 Walkthrough - Models & Migrations",
      type: types.video,
      id: "63906bd6-56d6-4c10-b428-07da917f86d9",
      topicId: "eight",
      subtopicId: "assessment",
      timeEstimate: "00:16:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "eightD2",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/376923598",
      name: "Rails 2 Walkthrough - Controllers",
      type: types.video,
      id: "df128126-2e28-45e7-bd3d-91bca63f59ce",
      topicId: "eight",
      subtopicId: "assessment",
      timeEstimate: "00:36:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "eightD2",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/376926867",
      name: "Rails 2 Walkthrough - Views and Features",
      type: types.video,
      id: "d0e34c0d-3ef2-4619-81e6-4543b7cae66f",
      topicId: "eight",
      subtopicId: "assessment",
      timeEstimate: "00:40:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "eightD2",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161381457",
      name: "Rails Lite Intro",
      type: types.video,
      id: "9f492240-a88e-485b-a1eb-6292b0bfd08e",
      topicId: "eight",
      subtopicId: "materials",
      timeEstimate: "00:04:00",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161381484",
      name: "HTTP",
      type: types.video,
      id: "79aa6ebb-6a1f-421e-8ba5-50af98cbb56c",
      topicId: "eight",
      subtopicId: "materials",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161381489",
      name: "HTTP Demo",
      type: types.video,
      id: "310e21ba-4cdc-4bfd-b9f4-3371b38a6e77",
      topicId: "eight",
      subtopicId: "materials",
      timeEstimate: "00:04:00",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161381601",
      name: "Rails from the Inside Out",
      type: types.video,
      id: "5b92e968-4f6f-41b1-8945-d59b49f365c2",
      topicId: "eight",
      subtopicId: "materials",
      timeEstimate: "00:13:00",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161384649",
      name: "Rack",
      type: types.video,
      id: "2d560f8d-e2d0-4d7a-a83d-b09f45ebbc15",
      topicId: "eight",
      subtopicId: "materials",
      timeEstimate: "00:09:00",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161381828",
      name: "Rack Demo",
      type: types.video,
      id: "cdf4130a-cbba-4633-b507-145744a1de52",
      topicId: "eight",
      subtopicId: "materials",
      timeEstimate: "00:25:00",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/tcp_ip.md",
      name: "Contextual Overview of TCP/IP",
      type: types.reading,
      id: "f6642272-c77a-4d7d-9c0d-fde102326400",
      topicId: "eight",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "http://regexone.com/",
      name: "RegexOne",
      type: types.externalResource,
      id: "76fdcff5-0a1c-47f3-85cb-dfa86b75cd3c",
      topicId: "eight",
      subtopicId: "homeworks",
      timeEstimate: "00:45:00",
      change: {
        online: "exclude",
        open: {
          topicId: "eight",
          subtopicId: "homeworks"
        }
      }
    },
    {
      href: "https://regexone.com/lesson/repeating_characters",
      name: "RegexOne (Lesson 1 - 6)",
      type: types.externalResource,
      id: "b4e58988-15b1-4272-99ba-2e33564bb6fb",
      topicId: "eight",
      subtopicId: "homeworks",
      timeEstimate: "00:45:00",
      change: {
        open: "exclude",
        live: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://regexone.com/lesson/kleene_operators",
      name: "RegexOne (Lesson 7 - 14)",
      type: types.externalResource,
      id: "246f68dd-c252-4d41-8bb9-aca35ae82299",
      topicId: "eightD2",
      subtopicId: "homeworks",
      timeEstimate: "00:45:00",
      change: {
        open: "exclude",
        live: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "rails/quizzes/rails_lite.md",
      name: "Rails Lite Quiz",
      type: types.quiz,
      id: "30a829f3-e825-48bd-be65-01d9b1e8b1d2",
      topicId: "eight",
      subtopicId: "materials",
      timeEstimate: "00:07:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161382367",
      name: "Rack Middleware",
      type: types.video,
      id: "85f7762a-56fd-4cd2-a7d9-a3b470f46a2f",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:04:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161386029",
      name: "Rack Middleware Demo",
      type: types.video,
      id: "cf67c30e-4406-42a7-9fa0-ccd25c465cb7",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:22:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://assets.aaonline.io/fullstack/rails/demos/middleware.rb",
      name: "Rack Middleware Demo code",
      type: types.externalResource,
      id: "06e8be8a-2c28-4ec9-a620-fb4a6c0957ff",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161382361",
      name: "TCP",
      type: types.video,
      id: "3517659e-0707-4e6e-a4f0-1bef875f5305",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/161381921",
      name: "DNS",
      type: types.video,
      id: "5b9a109c-57d0-4132-a0ed-e13ee82a76a1",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100169899",
      name: "(cc) 00-webserver",
      type: types.video,
      id: "e29b34c1-362c-41ed-849b-7acb927d5732",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:16:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100169898",
      name: "(cc) 01-protocols",
      type: types.video,
      id: "945bd025-7dc0-4b13-8770-b68ebea283da",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:14:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/100267302",
      name: "(cc) 02-http",
      type: types.video,
      id: "45d4039e-6c7f-4fc0-9941-f76ffe75007c",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:43:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/http.md",
      name: "HTTP Reading",
      type: types.reading,
      id: "2dba48e3-7f83-48ae-a73c-90a5c67e3496",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:25:00",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/rack.md",
      name: "Rack Reading",
      type: types.reading,
      id: "917ef906-9e55-4df7-966a-a85f1dca5c68",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:18:00",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/middleware.md",
      name: "Rack Middleware Stack",
      type: types.reading,
      id: "29dafe36-f747-452f-9695-cda4b55c38c7",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/instance-eval-class-eval.md",
      name: "Class and Instance Eval",
      type: types.reading,
      id: "ffcb7f4f-fd91-42b7-8171-cdb735c25215",
      topicId: "eight",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "eight",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/337172677",
      name: "Rack - Intro & Basic Apps",
      type: types.video,
      id: "93a8648a-a350-4ac0-bffa-3d89b8126b61",
      topicId: "eight",
      subtopicId: "lecture",
      timeEstimate: "00:22:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337173410",
      name: "Rack - Request & Response",
      type: types.video,
      id: "d562dead-bbcd-41eb-b777-ba0d4eb3b4dc",
      topicId: "eight",
      subtopicId: "lecture",
      timeEstimate: "00:32:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337174410",
      name: "Rack - Class App",
      type: types.video,
      id: "42fe6bcf-8d43-4a31-a868-9966e5335927",
      topicId: "eight",
      subtopicId: "lecture",
      timeEstimate: "00:07:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/rails_lite/rails-lite-i.md",
      name: "Rails Lite Part 1",
      type: types.project,
      id: "b86d4871-dcba-40af-bed6-df4411dbec47",
      topicId: "eight",
      subtopicId: "projects",
      timeEstimate: "03:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/rails_lite/solution.zip",
      change: {
        online: {
          topicId: "eight",
          subtopicId: "projects"
        },
        open: {
          topicId: "eight",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/projects/rails_lite/rails-lite-ii.md",
      name: "Rails Lite Part 2",
      type: types.project,
      id: "667e3eed-b0f9-4e19-a55c-9a79dbdf607c",
      topicId: "eight",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/rails/projects/rails_lite/solution.zip",
      change: {
        online: {
          topicId: "eightD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "eight",
          subtopicId: "projects"
        }
      }
    }
  ]
};

module.exports = rails;
