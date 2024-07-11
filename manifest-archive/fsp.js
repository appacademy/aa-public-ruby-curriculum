const topics = [
  { id: "one", name: "Tentative Project Proposal" },
  { id: "two", name: "Design Documents" },
  { id: "three", name: "Culture Curriculum Week 9" },
  // online cohort
  { id: "threeD2", name: "Culture Curriculum Week 15" },
  { id: "four", name: "Project" },
  { id: "five", name: "Culture Curriculum Week 10" },
  // online cohort
  { id: "fiveD2", name: "Culture Curriculum Week 16" },
  { id: "six", name: "Resources" }
];

const SWEInPersonTopics = [
  { id: "one", name: "Tentative Project Proposal" },
  { id: "two", name: "Design Documents" },
  // online cohort
  { id: "threeD2", name: "Culture Curriculum Week 12" },
  { id: "four", name: "Project" },
  // online cohort
  { id: "fiveD2", name: "Culture Curriculum Week 13" },
  { id: "six", name: "Resources" }
];

const subtopics = [
  { id: "none", name: "NOSUBTOPIC" },
  { id: "assessment", name: "Assessment" },
  { id: "materials", name: "Materials" },
  { id: "additionalResources", name: "Additional Resources" },
  { id: "homeworks", name: "Homeworks" },
  { id: "culture", name: "Culture" },
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

const courses = {
  courses: {
    live: {
      taskGroupId: "4fd9a208-3b2a-4ae6-a30b-1320a313f873",
      name: "Full Stack Project",
      track: "Full Stack In Person",
      description: "Full Stack Project",
      catalog: true,
      tags: ["Full Stack In Person"],
      urls: ["full-stack-in-person-full-stack-project"],
      order: 9,
      topics: topics,
      subtopics: subtopics
    },
    inPerson: {
      taskGroupId: "3f007044-5463-4c35-8f1e-a3316290776e",
      name: "Full Stack Project",
      track: "SWE In Person",
      description: "Full Stack Project",
      catalog: true,
      tags: ["Full Stack In Person"],
      urls: ["swe-in-person-full-stack-project"],
      order: 9,
      topics: SWEInPersonTopics,
      subtopics: subtopics
    },
    inPersonNYC: {
      taskGroupId: "71bb71ae-d3c5-4ede-92a9-56a2a933ebac",
      name: "Full Stack Project",
      track: "SWE In Person NYC",
      description: "Full Stack Project",
      catalog: true,
      tags: ["Full Stack In Person"],
      urls: ["swe-in-person-nyc-full-stack-project"],
      order: 9,
      topics: SWEInPersonTopics,
      subtopics: subtopics
    },
    open: {
      taskGroupId: "10a1d546-e0b2-4abc-8a89-7c53977cf1d8",
      name: "Full Stack Project",
      track: "Full Stack Online",
      description: "Full Stack Project",
      catalog: true,
      tags: ["Full Stack In Person"],
      urls: ["full-stack-online-full-stack-project"],
      order: 9,
      topics: topics,
      subtopics: subtopics
    },
    online: {
      taskGroupId: "d7d5bc09-a694-4bfe-a903-22d40ce18e98",
      name: "Full Stack Project",
      track: "SWE Online",
      description: "Full Stack Project",
      catalog: true,
      tags: ["Full Stack In Person"],
      urls: ["swe-online-full-stack-project"],
      order: 9,
      topics: topics,
      subtopics: subtopics
    }
  },
  tasks: [
    {
      name: "FSP Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "03cf44be-baf3-4057-95ba-9684e9cc134e",
      topicId: "one",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/FSP_Overview.md",
      change: {
        online: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "FSP Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "2bb6d133-c0ae-47b3-8c3c-ce56f5fdf8c4",
      topicId: "one",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/Online_FSP_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "SWE: FSP Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "34a0299d-f263-4793-a584-c248e1353bd7",
      topicId: "one",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/InPerson_FSP_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Tentative Proposal Guidelines",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "4edfd336-e1de-461c-beb4-60ccc7a7f2db",
      topicId: "one",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/proposal/tentative-project-proposal.md",
      change: {
        online: {
          topicId: "one",
          subtopicId: "none"
        },
        open: {
          topicId: "one",
          subtopicId: "none"
        }
      }
    },
    {
      name: "List of Approved Apps",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "e6406017-6f2c-45b4-b2db-db3fe0a0a3dc",
      topicId: "one",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/proposal/projects-to-clone.md",
      change: {
        online: {
          topicId: "one",
          subtopicId: "none"
        },
        open: {
          topicId: "one",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Design Documents: Schema",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "0f131fe8-f7e2-414b-8347-15d17f852ac5",
      topicId: "two",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/homeworks/proposal-prep/schema.md",
      change: {
        online: {
          topicId: "two",
          subtopicId: "none"
        },
        open: {
          topicId: "two",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Design Documents: State Shape",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "4ddcf0f8-71fb-400b-b655-437055277c4a",
      topicId: "two",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/homeworks/proposal-prep/state-shape.md",
      change: {
        online: {
          topicId: "two",
          subtopicId: "none"
        },
        open: {
          topicId: "two",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Design Documents: Routes",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "ab44d5af-a2ca-434b-905e-847dce5b4cd5",
      topicId: "two",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/homeworks/proposal-prep/routes.md",
      change: {
        online: {
          topicId: "two",
          subtopicId: "none"
        },
        open: {
          topicId: "two",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Full Stack Design Document Instructions",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "3b7c5046-b20a-4b08-9d82-330014905093",
      topicId: "two",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/proposal/README.md",
      change: {
        online: {
          topicId: "two",
          subtopicId: "none"
        },
        open: {
          topicId: "two",
          subtopicId: "none"
        }
      }
    },
    {
      name: "MVP Checklist",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "489ab574-135e-4ec0-af98-2e4dddf1dbdb",
      topicId: "two",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/proposal/mvp-list.md",
      change: {
        online: {
          topicId: "two",
          subtopicId: "none"
        },
        open: {
          topicId: "two",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Sample Design Documents",
      timeEstimate: "00:10:00",
      type: types.externalResource,
      id: "90f1c60a-92cb-410c-9909-6707b6d4c99b",
      topicId: "two",
      subtopicId: "none",
      href: "https://github.com/appacademy/bluebird/wiki",
      change: {
        online: {
          topicId: "two",
          subtopicId: "none"
        },
        open: {
          topicId: "two",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Intersectional Approaches to Diversifying the Tech Sector",
      timeEstimate: "00:06:00",
      type: types.externalResource,
      id: "4aeb3e4c-941e-4c42-896d-bafdc0794aac",
      topicId: "three",
      subtopicId: "none",
      href:
        "https://modelviewculture.com/pieces/intersectional-approaches-to-diversifying-the-tech-sector",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        open: {
          topicId: "three",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "none"
        }
      }
    },
    {
      name: "We Hire The Best",
      timeEstimate: "00:08:00",
      type: types.externalResource,
      id: "c3af4e4f-65f8-442c-8934-2ac591b5b1b5",
      topicId: "three",
      subtopicId: "none",
      href: "https://modelviewculture.com/pieces/we-hire-the-best",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        open: {
          topicId: "three",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Hiring, Rock Stars, and How Camaraderie Fails Us",
      timeEstimate: "00:10:00",
      type: types.externalResource,
      id: "0de89b3d-0777-4d72-bde6-d6b1d57f1a3d",
      topicId: "three",
      subtopicId: "none",
      href:
        "https://modelviewculture.com/pieces/hiring-rock-stars-and-how-camaraderie-fails-us",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        open: {
          topicId: "three",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Improving Diversity Does Not Mean Lowering the Bar",
      timeEstimate: "00:08:00",
      type: types.externalResource,
      id: "a962db0d-a2c6-4e5d-a5f9-20e95a3deaeb",
      topicId: "three",
      subtopicId: "none",
      href:
        "https://kateheddleston.com/blog/improving-diversity-does-not-mean-lowering-the-bar",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        open: {
          topicId: "three",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Tech is Not a Meritocracy",
      timeEstimate: "00:06:00",
      type: types.externalResource,
      id: "01e884eb-7867-4e78-9428-7182385780a6",
      topicId: "three",
      subtopicId: "none",
      href: "https://qz.com/66866/once-and-for-all-tech-is-not-a-meritocracy/",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        open: {
          topicId: "three",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Wage Inequality Statistics",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "5e1acae9-2c11-40d9-8e74-716753ccf85b",
      topicId: "three",
      subtopicId: "none",
      href: "https://hired.com/gender-wage-gap-2017",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        open: {
          topicId: "three",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "none"
        }
      }
    },
    {
      name: "During the Project",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "a24175de-a76a-4a50-9e54-cd55330648f9",
      topicId: "four",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/project/during-the-project.md",
      change: {
        online: {
          topicId: "four",
          subtopicId: "none"
        },
        open: {
          topicId: "four",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Production README",
      timeEstimate: "03:00:00",
      type: types.reading,
      id: "6e2db900-58ea-40d8-ad2a-c281c0437488",
      topicId: "four",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/project/production-readme.md",
      change: {
        online: {
          topicId: "four",
          subtopicId: "none"
        },
        open: {
          topicId: "four",
          subtopicId: "none"
        }
      }
    },
    {
      name: "How to Turn in Your Project",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "be96e1b8-822a-499c-b900-c7a4eb6a06a2",
      topicId: "four",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/project/turn_in_fullstack.md",
      change: {
        online: {
          topicId: "four",
          subtopicId: "none"
        },
        open: {
          topicId: "four",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Intro to InterviewDB",
      type: "Video",
      id: "aacb3c70-ad54-4ad1-aa12-f3684f9ef156",
      href: "https://player.vimeo.com/video/340067199",
      timeEstimate: "00:06:30",
      topicId: "four",
      subtopicId: "none",
      change: {
        open: "exclude"
      }
    },
    {
      name: "Social Media: a tool for minorities, safe spaces and communities",
      timeEstimate: "00:04:00",
      type: types.externalResource,
      id: "4c31230e-b8e3-467c-86b6-f380fe4babee",
      topicId: "five",
      subtopicId: "none",
      href:
        "http://www.lovefromberlin.net/social-media-a-tool-for-minorities-safe-spaces-and-communities/",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "none"
        },
        open: {
          topicId: "five",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "fiveD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "fiveD2",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Technological Advancements To Improve Accessibility In Museums",
      timeEstimate: "00:07:00",
      type: types.externalResource,
      id: "c7acbbc2-4897-46de-8af7-5a255e8228e0",
      topicId: "five",
      subtopicId: "none",
      href:
        "http://amt-lab.org/blog/2016/4/accessibility-rebooted-technological-advancements-to-improve-accessibility-in-museums",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "none"
        },
        open: {
          topicId: "five",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "fiveD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "fiveD2",
          subtopicId: "none"
        }
      }
    },
    {
      name: "10 Great Ways the Internet Is Empowering Women Around the World",
      timeEstimate: "00:06:00",
      type: types.externalResource,
      id: "a2febe3f-7f22-41f9-beef-500926302897",
      topicId: "five",
      subtopicId: "none",
      href:
        "http://www.huffingtonpost.com/kathy-brown/10-great-ways-the-interne_b_6817738.html",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "none"
        },
        open: {
          topicId: "five",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "fiveD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "fiveD2",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Syrian woman explains why refugees need smartphones",
      timeEstimate: "00:04:00",
      type: types.externalResource,
      id: "a4f19ae6-4d2e-4c5b-8ec9-7e9b847d46bd",
      topicId: "five",
      subtopicId: "none",
      href:
        "https://www.independent.co.uk/news/world/europe/why-do-refugees-have-smartphones-syrian-woman-explains-perfectly-refugee-crisis-a7025356.html",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "none"
        },
        open: {
          topicId: "five",
          subtopicId: "none"
        },
        inPerson: {
          topicId: "fiveD2",
          subtopicId: "none"
        },
        inPersonNYC: {
          topicId: "fiveD2",
          subtopicId: "none"
        }
      }
    },
    // Resources
    {
      name: "Getting Your App Production Ready",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "9f96bf4a-b322-488c-80b4-cf7357f94295",
      topicId: "six",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/resources/helpful_tools/production-ready.md",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Deploying to Heroku",
      timeEstimate: "00:25:00",
      type: types.reading,
      id: "00d11728-1f0a-4e33-858c-ccf56aeaffbd",
      topicId: "six",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/resources/helpful_tools/heroku-deployment.md",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Understanding the Asset Pipeline",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "f90422af-84ba-46a4-9125-2bdf20f5da27",
      topicId: "six",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/resources/helpful_tools/asset-pipeline.md",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "How to Securely Store API Keys",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "50cfdd39-e65b-4bf9-bd48-b6bc9afc485e",
      topicId: "six",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/resources/security/hide_api_keys.md",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Active Storage and AWS S3 Hosting Demo",
      timeEstimate: "00:30:00",
      type: types.reading,
      id: "c16b1599-a496-4b87-92ec-de06051d6a1b",
      topicId: "six",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/resources/ActiveStorageDemo/README.md",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Redux Dev Tools Video Demo",
      timeEstimate: "00:08:00",
      type: types.video,
      id: "0aa50514-e5cc-41ce-9ef0-a315a373838a",
      topicId: "six",
      subtopicId: "none",
      href: "https://player.vimeo.com/video/194738174",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Performance and Scaling",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "54f5214b-b85c-45ac-9c88-ff34259932c3",
      topicId: "six",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/bonus/performance.md",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Testing",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "fd716066-e23d-48cc-a29d-af1bf4acec15",
      topicId: "six",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/bonus/testing.md",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Accessibility",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "763a911a-0aa3-4214-b778-bf782b0cdac1",
      topicId: "six",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/bonus/accessibility.md",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Domains",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "241e85f6-f620-434d-b08a-336b819acfaf",
      topicId: "six",
      subtopicId: "none",
      repo: "curriculum",
      path: "full-stack-project/resources/expository_readings/domains.md",
      change: {
        online: {
          topicId: "six",
          subtopicId: "none"
        },
        open: {
          topicId: "six",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Web Architecture",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "580c37da-0805-4f56-ae5a-bd63e9f6d546",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path:
        "full-stack-project/resources/expository_readings/web_app_architecture.md",
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
      name: "ModalBnB",
      timeEstimate: "00:30:00",
      type: types.reading,
      id: "24c1fe55-abfe-4a2f-af4b-166a3931be61",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/ModalBnB/README.md",
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
      name: "Caching in Rails",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "959cd1cb-a007-4e89-a1de-cf595ac3c6fa",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/caching/caching.md",
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
      name: "Caching with Redis in Rails",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "b72fe8bf-eadd-49a3-8584-40ed376d2377",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/caching/redis.md",
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
      name: "AWS vs Heroku",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "d03d70b0-054f-468e-9542-98f242b5fd23",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/expository_readings/aws-vs-heroku.md",
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
      name: "OmniAuth",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "6e521f72-33da-4660-8da6-00d958bed643",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/security/omniauth.md",
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
      name: "OmniAuth and Facebook",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "92850393-0d22-4521-95c6-4a74c9d836d8",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/security/facebook-login.md",
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
      name: "Authorization with CanCan",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "9f1001f5-e452-42f1-a5ab-a4f7aa315b4c",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/security/cancan.md",
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
      name: "General Styling Overview",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "b99fcea6-6834-4634-aad3-01b20c922676",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/styling/css.md",
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
      name: "Styling with Sass",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "9ab9927a-aaf1-4fc1-b5e7-bf845119cac2",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/styling/sass-typography.md",
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
      name: "Cross Browser CSS",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "8e582722-c613-4a5d-852f-446753d1461a",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/styling/autoprefixer.md",
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
      name: "Additional Styling Resources",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "0301db6c-c60a-4a0b-960b-d670634f3a6b",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/styling/styling.md",
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
      name: "Sending Email with Sendgrid",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "3fc36e79-7050-41b2-a41c-aa84b9f59e16",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/apis/sendgrid.md",
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
      name: "Task Automation: Delayed Job Gem",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "f722b059-25a0-4a7b-a96c-a92d890cadac",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/gems/delayed-job.md",
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
      name: "Task Automation: Kaminari Gem",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "6a8cae8a-a503-4ade-85c7-3276e1c5dbff",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/gems/kaminari.md",
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
      name: "Heroku Task Scheduler",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "9cfacc0c-4c0a-47be-9c50-489e9d9636e6",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/helpful_tools/heroku-scheduler.md",
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
      name: "Fixing Git Commit Authorship",
      repo: "curriculum",
      path: "ruby/readings/git-fix-authorship.md",
      type: types.reading,
      id: "38f3d974-3c60-4dd4-bced-93ffd9cf6a5b",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
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
      name: "Compiled List of Additional Resources",
      timeEstimate: "00:08:00",
      type: types.reading,
      id: "189f499d-69e8-453c-953a-c8b55c08328a",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/additional_resources.md",
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
    }
  ]
};

module.exports = courses;
