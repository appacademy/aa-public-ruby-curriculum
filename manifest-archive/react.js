const openTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "React Fundamentals" },
  { id: "two", name: "Redux Fundamentals" },
  { id: "three", name: "Middleware and Thunks" },
  { id: "four", name: "Redux and the Rails API" },
  { id: "five", name: "Frontend Routing with React" },
  { id: "six", name: "Frontend Auth" },
  { id: "seven", name: "Completing Bench BnB" }
];

const liveTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "React Fundamentals (W6D5)" },
  { id: "two", name: "Redux Fundamentals (W7D1)" },
  { id: "three", name: "Middleware and Thunks (W7D2)" },
  { id: "four", name: "Redux and the Rails API (W7D3)" },
  { id: "five", name: "Frontend Routing with React (W7D4)" },
  { id: "six", name: "Frontend Auth (W7D5)" },
  { id: "seven", name: "Completing Bench BnB (W8D1)" }
];

const onlineTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "React Fundamentals (W13D1)" },
  { id: "oneD2", name: "React MineSweeper (W13D2)" },
  { id: "two", name: "Redux Fundamentals (W13D3)" },
  { id: "three", name: "Middleware and Thunks (W13D4)" },
  { id: "four", name: "Redux and the Rails API (W13D5)" },
  { id: "five", name: "Frontend Routing with React (W14D1)" },
  { id: "fiveD2", name: "Routing Contin. (W14D2)" },
  { id: "six", name: "Frontend Auth (W14D3)" },
  { id: "seven", name: "Frontend Auth Contin. (W14D4)" },
  { id: "sevenD2", name: "Completing Bench BnB (W14D5)" }
];

const SWEInPersonTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "React Fundamentals (W10D2)" },
  { id: "oneD2", name: "React MineSweeper (W10D3)" },
  { id: "two", name: "Redux Fundamentals (W10D4)" },
  { id: "twoD2", name: "Connecting Redux to React (W10D5)" },
  { id: "three", name: "Middleware and Thunks (W11D1)" },
  { id: "four", name: "Redux and the Rails API (W11D2)" },
  { id: "five", name: "Frontend Routing with React (W11D3)" },
  { id: "six", name: "Frontend Auth (W11D4)" },
  { id: "seven", name: "Completing Bench BnB (W11D5)" },
];

const CampusHybridTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "React Fundamentals (W9D5)" },
  { id: "oneD2", name: "React MineSweeper (W10D1)" },
  { id: "two", name: "Redux Fundamentals (W10D2)" },
  { id: "twoD2", name: "Connecting Redux to React (W10D3)" },
  { id: "three", name: "Middleware and Thunks (W10D4)" },
  { id: "four", name: "Structuring Data with Jbuilder (W10D5)" },
  { id: "five", name: "Frontend Routing with React (W11D1)" },
  { id: "six", name: "Frontend Auth (W11D2)" },
  { id: "seven", name: "Bench BnB (W11D3)" },
  { id: "sevenD2", name: "Completing Bench BnB (W11D4)" }
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

const courses = {
  courses: {
    campusHybrid: {
      taskGroupId: "5fa6bb0d-09f2-4589-adaf-bb5d0af20db8",
      name: "React",
      track: "SWE Campus Hybrid",
      urls: ["campus-hybrid-react"],
      description: "All about React!",
      tags: ["React"],
      catalog: false,
      topics: CampusHybridTopics,
      subtopics: subtopics,
      order: 8
    },
    live: {
      taskGroupId: "e20c0842-d843-4513-83a2-6d7da7497e63",
      name: "React",
      track: "Full Stack In Person",
      urls: ["full-stack-in-person-react"],
      description: "All about React!",
      tags: ["React"],
      catalog: false,
      topics: liveTopics,
      subtopics: subtopics, // use the default topics
      order: 8
    },
    inPerson: {
      taskGroupId: "869bef1c-240f-4d89-a565-d8a7f69a8115",
      name: "React",
      track: "SWE In Person",
      urls: ["swe-in-person-react"],
      description: "All about React!",
      tags: ["React"],
      catalog: false,
      topics: SWEInPersonTopics,
      subtopics: subtopics, // use the default topics
      order: 8
    },
    inPersonNYC: {
      taskGroupId: "9cf466f3-1dc2-477f-98d6-de3112ffd346",
      name: "React",
      track: "SWE In Person NYC",
      urls: ["swe-in-person-nyc-react"],
      description: "All about React!",
      tags: ["React"],
      catalog: false,
      topics: SWEInPersonTopics,
      subtopics: subtopics, // use the default topics
      order: 8
    },
    open: {
      taskGroupId: "5509d052-a5a1-4e7c-a694-97c98e06dfb4",
      name: "React",
      track: "Full Stack Online",
      urls: ["full-stack-online-react"],
      description: "All about React!",
      tags: ["React"],
      catalog: false,
      order: 8,
      topics: openTopics, // use the default topics
      subtopics: subtopics // use the default topics
    },
    online: {
      taskGroupId: "85d2887b-ceb9-4e80-8ca8-685d7aacf19a",
      name: "React",
      track: "SWE Online",
      urls: ["swe-online-react"],
      description: "All about React!",
      tags: ["React"],
      catalog: false,
      order: 8,
      topics: onlineTopics, //use topics for online course
      subtopics: subtopics
    }
  },
  tasks: [
    {
      name: "React Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "955fc005-5ce0-4a61-9c01-66601d483a0f",
      topicId: "zero",
      subtopicId: "none",
      repo: "curriculum",
      path: "react/CampusHybrid_React_Overview.md",
      change: {
        live: "exclude",
        online: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "React Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "556d8757-6bb9-4d06-bf0c-6c22cbb278ba",
      topicId: "zero",
      subtopicId: "none",
      repo: "curriculum",
      path: "react/React_Overview.md",
      change: {
        online: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      name: "React Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "6f093d14-3a26-4a7c-9bad-6d9301575894",
      topicId: "zero",
      subtopicId: "none",
      repo: "curriculum",
      path: "react/Online_React_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      name: "React Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "85965485-e77d-4f87-96ac-5da7ff7dc54f",
      topicId: "zero",
      subtopicId: "none",
      repo: "curriculum",
      path: "react/InPerson_React_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      name: "JavaScript 1 Assessment",
      repo: "curriculum",
      path: "course/assessment-day.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "69d68aca-e8b4-4a68-b326-4cfbbbd2ed67",
      topicId: "one",
      subtopicId: "assessment",
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
      path: "react/readings/react_nontech.md",
      name: "NonTechnical Overview of React",
      type: types.reading,
      id: "ff53df18-d4d5-4fec-85a9-39a13be3d181",
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
      path: "react/readings/npm_configuration.md",
      name: "NPM",
      type: types.reading,
      id: "3430b99a-4a4c-475a-b79f-eaa186135dcf",
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
      path: "react/readings/webpack_configuration.md",
      name: "Webpack",
      type: types.reading,
      id: "ce2f1bfc-d5a1-460d-aeb2-8505640f7ad7",
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
      path: "react/readings/object_destructuring.md",
      name: "ES6 Syntax: Object Destructuring",
      type: types.reading,
      id: "add2286a-2ce4-4933-adba-7235b6398a21",
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
      path: "react/readings/import_export.md",
      name: "ES6 Syntax: Import/Export",
      type: types.reading,
      id: "45c8409d-efa3-451f-80c5-a165cb45b6e9",
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
      path: "react/readings/react_dev_tools.md",
      name: "React Developer Tools",
      type: types.reading,
      id: "707ff92a-0fae-4448-81bd-d37d855147e8",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:03:00",
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
      href: "https://facebook.github.io/react/docs/thinking-in-react.html",
      name: "Thinking in React",
      type: types.externalResource,
      id: "03f4cfa5-bbd5-4233-82c9-ab1595978009",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
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
      href: "https://player.vimeo.com/video/188074204",
      name: "React: Intro",
      type: types.video,
      id: "2bb456e9-6f9b-49ae-9749-ad651645a6af",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:27:00",
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
      href: "https://player.vimeo.com/video/188087366",
      name: "React: Transpilation",
      type: types.video,
      id: "7fd08fda-ec31-4f3b-8ef2-f3d4d65749b5",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:08:00",
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
      href: "https://player.vimeo.com/video/188090786",
      name: "React: Functional Components",
      type: types.video,
      id: "92ff1e3b-58d7-49a7-af8b-62761c69d78d",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:22:00",
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
      href: "https://player.vimeo.com/video/188093789",
      name: "React: Lifecycle Methods",
      type: types.video,
      id: "340a0eae-62be-4124-8ce8-c9885d0854b2",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:11:00",
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
      path: "react/readings/props_and_state.md",
      name: "Props and State",
      type: types.reading,
      id: "dee532d9-335b-43c6-bae9-28b62b322806",
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
      href:
        "https://assets.aaonline.io/fullstack/react/demos/click-counter.zip",
      name: "Click Counter Code Demo",
      type: types.externalResource,
      id: "c95b070f-3ac2-4862-bc9a-f5c54c497a65",
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
      path: "react/quizzes/react_fundamentals.md",
      name: "React Fundamentals Quiz",
      type: types.quiz,
      id: "71272f22-e1b7-48c5-a751-104832754e0e",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "react/homeworks/getting_started/README.md",
      name: "Getting Started with NPM",
      type: types.project,
      id: "88a53625-dfa2-4599-ad48-e0117b7b9bbe",
      topicId: "one",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/homeworks/getting_started/solution.zip",
      change: {
        online: {
          topicId: "one",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "one",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/homeworks/calculator/README.md",
      name: "React Calculator",
      type: types.project,
      id: "b510a632-392d-412f-a6a3-9b9daaf21770",
      topicId: "one",
      subtopicId: "homeworks",
      timeEstimate: "00:45:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/homeworks/calculator/solution.zip",
      change: {
        online: {
          topicId: "one",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "one",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/babel_configuration.md",
      name: "Babel",
      type: types.reading,
      id: "526957e6-358d-4d94-a9e7-686308e7a0a1",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
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
      path: "react/readings/intro_to_react.md",
      name: "React",
      type: types.reading,
      id: "a354d974-2211-4c3e-b8ac-62eaf66354fd",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:07:00",
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
      path: "react/readings/intro_to_jsx.md",
      name: "JSX",
      type: types.reading,
      id: "2ce8955c-e77d-4d4b-80fa-0297215b87bf",
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
      path: "react/readings/intro_to_react_components.md",
      name: "React Components",
      type: types.reading,
      id: "eedfc261-caf8-44bb-a0de-ab579a486a64",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:08:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "one",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "one",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/component_declaration.md",
      name: "Declaration",
      type: types.reading,
      id: "e107922f-af4b-4b44-9960-06346f061723",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:10:00",
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
      path: "react/readings/component_lifecycle.md",
      name: "Lifecycle Methods",
      type: types.reading,
      id: "66483a66-bb45-4a15-b48e-a6e49edd2218",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:08:00",
      change: {
        online: {
          topicId: "one",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "one",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "one",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/synthetic_events.md",
      name: "Synthetic Events",
      type: types.reading,
      id: "543ec0f1-9965-40a4-a234-18b066532d3f",
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
      href: "https://facebook.github.io/react/docs/getting-started.html",
      name: "Official React Documentation",
      type: types.externalResource,
      id: "08db253d-9a12-4340-9e7a-bea3f9803491",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:45:00",
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
      href: "https://player.vimeo.com/video/340114806",
      name: "React Intro & First Components",
      type: types.video,
      id: "236536d6-3934-4f7a-8c60-3576f16be560",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:26:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340114494",
      name: "Nested Components & Props",
      type: types.video,
      id: "47dbaee0-748b-43d3-859c-4f4427044845",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:16:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340113953",
      name: "Class Components, State & onClick",
      type: types.video,
      id: "35ea3971-6c21-4ac1-9136-bd6806f10d58",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:23:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340113661",
      name: "Lifecycle Methods, componentDidMount & Fetching",
      type: types.video,
      id: "bf44c7b4-beb3-4fa9-8193-a7ad8fd8370e",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:14:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "html-css/micro-projects/css-friends/css-friends-12/README.md",
      name: "CSS Friends Part 3",
      type: types.project,
      id: "11022746-0016-4686-8393-96039388ed54",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "00:20:00",
      solution:
        "https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/css-friends-12/solution.zip",
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
      repo: "curriculum",
      path: "react/projects/widgets/README.md",
      name: "Widgets",
      type: types.project,
      id: "e4264599-2b23-4051-a2e2-2c78b2a2903f",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "04:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/widgets/solution.zip",
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
      path: "react/projects/react_minesweeper/README.md",
      name: "Minesweeper",
      type: types.project,
      id: "fcda821d-49f3-4417-b675-dbe44440d56c",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "04:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/react_minesweeper/solution.zip",
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
      repo: "curriculum",
      path: "react/projects/redux_lite/README.md",
      name: "Redux Lite",
      type: types.project,
      id: "ac685356-71b3-4eb3-8f3a-f0f92987f279",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "04:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/redux_lite/solution.zip",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
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
      repo: "curriculum",
      path: "react/readings/redux_nontech.md",
      name: "Nontechnical Overview of Redux",
      type: types.reading,
      id: "bfa4deca-358e-4ffd-be70-86e1875ce2e2",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
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
      path: "react/readings/flux_redux.md",
      name: "Flux and Redux Intro",
      type: types.reading,
      id: "96c577b4-c5de-4749-9179-54f6828612d5",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
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
      path: "react/readings/store.md",
      name: "Store",
      type: types.reading,
      id: "1c630531-3557-4829-8f98-9b62d0cb5948",
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
      path: "react/readings/reducers.md",
      name: "Reducers",
      type: types.reading,
      id: "bf7c92c4-700a-458b-9c72-5e2d925ed479",
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
      path: "react/readings/actions.md",
      name: "Actions",
      type: types.reading,
      id: "85d7a426-2ef4-4394-89e8-d62d07b0878a",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
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
      path: "react/readings/provider.md",
      name: "<Provider />",
      type: types.reading,
      id: "5e154e2e-f026-4c51-97b7-4df4fdb7cb45",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "twoD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/connect.md",
      name: "connect()",
      type: types.reading,
      id: "cf290877-f583-4b46-bbb9-295078b389d0",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "twoD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/containers.md",
      name: "Containers",
      type: types.reading,
      id: "942bc844-cfe1-4549-b0e9-ce469a95a763",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "twoD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/selectors.md",
      name: "Selectors",
      type: types.reading,
      id: "32f066e2-ec11-4b05-ba71-507537184256",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "twoD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/the_window.md",
      name: "Window API",
      type: types.reading,
      id: "a8eea29c-0750-45b9-8f7b-ba7f88410f9c",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
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
      href: "https://player.vimeo.com/video/303833296/",
      name: "Testing on the Window",
      type: types.video,
      id: "90eb2f3a-e0f7-4da7-ac05-1f33320543f6",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:07:00",
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
      name: "React 1 Assessment",
      repo: "curriculum",
      path: "full-stack-project/assessment_day.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "5b106fbc-22e8-4f06-9c61-f26afc70cc57",
      topicId: "seven",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        online: {
          topicId: "sevenD2",
          subtopicId: "assessment"
        },
        live: {
          topicId: "seven",
          subtopicId: "assessment"
        },
        campusHybrid: {
          topicId: "sevenD2",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/206661754",
      name: "Intro to UI/UX",
      type: types.video,
      id: "e65015f4-7d54-4d3a-9a9b-749c1ca96f41",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:04:00",
      change: {
        online: {
          topicId: "sevenD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "seven",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "sevenD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/206661769",
      name: "Intro to UX for Web",
      type: types.video,
      id: "9f15adbb-3835-41b1-ba17-03b583c882a9",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:06:00",
      change: {
        online: {
          topicId: "sevenD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "seven",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "sevenD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/206661839",
      name: "UI Affordances and Signifiers",
      type: types.video,
      id: "e4411187-0782-4ad8-af63-3f28175e6692",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:04:00",
      change: {
        online: {
          topicId: "sevenD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "seven",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "sevenD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/206661864",
      name: "Designing to Look Good",
      type: types.video,
      id: "09e2abfe-c8a4-4e01-810d-b971cc09886a",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:11:00",
      change: {
        online: {
          topicId: "sevenD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "seven",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "sevenD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href:
        "http://appacademy.github.io/curriculum/react/fruit_stand_01/index.html",
      name: "Fruit Stand Live Demo: Phase I Redux Only",
      type: types.externalResource,
      id: "bb2082cd-f35e-43fb-a329-a5cd2e47c7d2",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
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
      path: "react/demos/fruit_stand_demos/fruit_stand_01/README.md",
      name: "Fruit Stand Live Demo: Phase I Source Code",
      type: types.reading,
      id: "96c60c8e-2f1a-468c-9c7c-18382b425ba1",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
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
      href: "https://player.vimeo.com/video/184374712",
      name: "Fruit Stand Live Demo: Phase II React/Redux",
      type: types.video,
      id: "a16b5aae-80c5-4d66-b43a-6c80030432c4",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "01:00:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "twoD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/demos/fruit_stand_demos/fruit_stand_02/README.md",
      name: "Fruit Stand Live Demo: Phase II Source Code",
      type: types.reading,
      id: "269c32d5-18b1-4e6a-9219-c7f4c4a126b6",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "twoD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href:
        "http://appacademy.github.io/curriculum/react/fruit_stand_02/index.html",
      name: "Fruit Stand Live Example",
      type: types.externalResource,
      id: "293b0fee-e293-4d31-8755-41345e40eddd",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "two",
          subtopicId: "materials"
        },
        open: {
          topicId: "two",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "twoD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/quizzes/redux_fundamentals.md",
      name: "Redux Fundamentals Quiz",
      type: types.quiz,
      id: "46e2ebab-6353-41a8-a150-ffabe7049f2b",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        inPerson: {
          topicId: "twoD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://github.com/reduxjs/react-redux/blob/master/docs/README.md",
      name: "Official React-Redux Documentation",
      type: types.externalResource,
      id: "41fefdb1-8211-4364-99e2-cae7be4b5370",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "01:00:00",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "two",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "twoD2",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/projects/todos/todos_ii.md",
      name: "Todos (Part 2)",
      type: types.project,
      id: "88ea4a60-31fa-4f0e-863b-bd7052d30d95",
      topicId: "three",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/todos/solution_1.zip",
      change: {
        online: {
          topicId: "three",
          subtopicId: "projects"
        },
        open: {
          topicId: "three",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "twoD2",
          subtopicId: "projects"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/homeworks/job_listing/README.md",
      name: "Job Listing",
      type: types.project,
      id: "96d81d9a-bfc7-40a8-8ad1-60db9cdf8592",
      topicId: "two",
      subtopicId: "homeworks",
      timeEstimate: "00:45:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/homeworks/job_listing/solution.zip",
      change: {
        online: {
          topicId: "two",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "two",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/homeworks/ux/README.md",
      name: "UX/UI Layout Practice",
      type: types.project,
      id: "9dec6971-b791-48ea-8f87-3b6870e1c5cd",
      topicId: "two",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      change: {
        online: {
          topicId: "sevenD2",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "two",
          subtopicId: "homeworks"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "homeworks"
        },
        inPersonNYC: {
          topicId: "seven",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "sevenD2",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "full-stack-project/proposal/selecting-a-fsp.md",
      name: "Selecting a Full-Stack Project",
      type: types.reading,
      id: "9a64bba5-15a9-4ff4-97df-3f178f49702d",
      topicId: "three",
      subtopicId: "homeworks",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        online: {
          topicId: "two",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "full-stack-project/proposal/projects-to-clone.md",
      name: "Approved Full-Stack Apps",
      type: types.reading,
      id: "563fa404-dbdf-4983-946f-1e89bde3db9b",
      topicId: "three",
      subtopicId: "homeworks",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        online: {
          topicId: "two",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "homeworks"
        }
      }
    },
    {
      href:
        "https://www.fastcompany.com/3054204/is-ageism-in-tech-an-under-the-radar-diversity-issue",
      name: "Is Ageism In Tech An Under-The-Radar Diversity Issue?",
      type: types.externalResource,
      id: "e3bfbac9-3537-4dce-853b-2f4c53061843",
      topicId: "two",
      subtopicId: "culture",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "two",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/building-accessibility-culture",
      name: "Building Accessibility Culture",
      type: types.externalResource,
      id: "8e644e39-3737-4815-941d-4e30f8d91aad",
      topicId: "two",
      subtopicId: "culture",
      timeEstimate: "00:08:00",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "two",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/building-better-tech-cultures-for-people-with-adhd",
      name: "Building Better Tech Cultures for People with ADHD",
      type: types.externalResource,
      id: "7b96332c-3816-48eb-bba1-25c6a7e8c3f4",
      topicId: "two",
      subtopicId: "culture",
      timeEstimate: "00:06:00",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "two",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/brilliance-pride-and-genius-how-tech-culture-hides-mental-illness",
      name:
        '"Brilliance," "Pride," and "Genius": How Tech Culture Hides Mental Illness',
      type: types.externalResource,
      id: "b9b7977a-a3d0-4612-bba9-3e66119e3186",
      topicId: "two",
      subtopicId: "culture",
      timeEstimate: "00:06:00",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "two",
          subtopicId: "culture"
        }
      }
    },
    {
      href: "https://redux.js.org/",
      name: "Official Redux Documentation",
      type: types.externalResource,
      id: "1244d5ff-ebbf-465d-a34d-18214b25e8aa",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "01:00:00",
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
      href: "https://player.vimeo.com/video/340778392",
      name: "Redux Intro & Store",
      type: types.video,
      id: "1c142426-1ade-46f9-8319-c6035670acdb",
      topicId: "two",
      subtopicId: "materials",
      timeEstimate: "00:49:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340779518",
      name: "Redux Reducers",
      type: types.video,
      id: "f030e6a3-5834-4adf-8b9a-684149e61f6a",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:19:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340779952",
      name: "Action Creators",
      type: types.video,
      id: "314ea604-8482-4c4a-9dd7-351cce549c98",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:13:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340781052",
      name: "React-Redux Intro & mapStateToProps",
      type: types.video,
      id: "28406efa-6d79-41f0-b44f-5aae971692e9",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:22:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340781971",
      name: "Redux - mapDispatchToProps",
      type: types.video,
      id: "ff7ef93c-2ec3-4d90-8ef1-929d62923639",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:29:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "react/projects/todos/todos_i.md",
      name: "Todos (Part 1)",
      type: types.project,
      id: "8e4b8197-ac3e-4311-b87d-3e6cccb36edb",
      topicId: "two",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/todos/solution_1.zip",
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
      repo: "curriculum",
      path: "react/readings/higher_order_functions.md",
      name: "Higher-Order Functions",
      type: types.reading,
      id: "c98117bc-7f6e-4243-8830-e519973934e6",
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
      repo: "curriculum",
      path: "react/readings/middleware.md",
      name: "Middleware",
      type: types.reading,
      id: "191ea9cb-378f-418b-a393-38178f3e41b4",
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
      repo: "curriculum",
      path: "react/readings/thunks.md",
      name: "Thunks",
      type: types.reading,
      id: "a2fa0d68-b33a-4610-8319-018b64f3002d",
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
      repo: "curriculum",
      path: "react/readings/object_freeze.md",
      name: "Object.freeze",
      type: types.reading,
      id: "51b56326-3b9d-4234-9290-1eec5fd5ee21",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
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
      path: "react/readings/rails_router_namespacing.md",
      name: "Namespacing",
      type: types.reading,
      id: "fb899a71-ddd7-4268-9a8a-91c8199b5d2e",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
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
      path: "react/readings/debugging_arrow_functions.md",
      name: "Debugging Arrow Functions in React",
      type: types.reading,
      id: "3d459690-a1cb-4f54-9a8c-6e00868f1cde",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
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
      path: "react/quizzes/middleware_thunks.md",
      name: "Middleware Quiz",
      type: types.quiz,
      id: "66413b96-ba35-4cc5-9641-db9465775a90",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "javascript/readings/fat-arrows.md",
      name: "ES6 Arrow Functions",
      type: types.reading,
      id: "141127be-fb98-4f8f-8d78-51b9ff00531c",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
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
      path: "javascript/readings/arguments.md",
      name: "Arguments",
      type: types.reading,
      id: "bc47faca-a2c2-48fc-bf29-987a031ccac5",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
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
      path: "full-stack-project/proposal/tentative-project-proposal.md",
      name: "Submit Tentative Full-Stack Proposal",
      type: types.reading,
      id: "9cfc6436-cde1-489f-9577-bca8fda4eb05",
      topicId: "four",
      subtopicId: "homeworks",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        online: {
          topicId: "three",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "two",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "full-stack-project/proposal/mvp-list.md",
      name: "MVP List",
      type: types.reading,
      id: "f477f8af-9a82-4673-9d8b-fe30286eb39e",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        online: {
          topicId: "three",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/homeworks/middleware/README.md",
      name: "Middleware Homework",
      type: types.project,
      id: "c4161f77-a419-47d0-8402-04e1f675f2a9",
      topicId: "three",
      subtopicId: "homeworks",
      timeEstimate: "00:45:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/homeworks/middleware/solution.zip",
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
      path: "react/projects/todos/todos_iii.md",
      name: "Todos (Part 3)",
      type: types.project,
      id: "8bcd0ec8-0b58-4e59-aed6-cd20b29d5d96",
      topicId: "three",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/todos/solution_2.zip",
      change: {
        online: {
          topicId: "three",
          subtopicId: "projects"
        },
        open: {
          topicId: "three",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "three",
          subtopicId: "projects"
        },
        campusHybrid: {
          topicId: "three",
          subtopicId: "projects"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/341894192",
      name: "React-Redux Review",
      type: types.video,
      id: "1a5b7a0a-3d0c-45bc-8c8d-b68e00afa17c",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:13:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/341894847",
      name: "Middleware Lecture",
      type: types.video,
      id: "2f6ff0f6-9170-4948-b872-16956efdb4d0",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "00:25:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/341895670",
      name: "Why the nested functions, applyMiddleware?",
      type: types.video,
      id: "d4e7833c-2d8a-4441-b69c-7aa126b24105",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "00:17:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/341901003",
      name: "Thunk Lecture",
      type: types.video,
      id: "0bde0b49-e487-4773-9c64-13fd341e4672",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "01:02:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/intro_to_jbuilder.md",
      name: "Intro to Jbuilder",
      type: types.reading,
      id: "18291012-4fb6-47ee-8e73-760341e1a792",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
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
      href: "https://github.com/rails/jbuilder",
      name: "Jbuilder Documentation",
      type: types.externalResource,
      id: "3e104e22-7926-4b93-8ab8-9f5ece207634",
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
      href:
        "https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape",
      name: "Normalizing State Shape",
      type: types.externalResource,
      id: "46d810e8-d03f-491f-a021-c4600fe956ec",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
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
      href:
        "https://redux.js.org/recipes/structuring-reducers/updating-normalized-data",
      name: "Updating Normalized Data",
      type: types.externalResource,
      id: "a638615b-f688-4ea6-9003-e8fc074cd11f",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
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
      path: "react/quizzes/redux_rails_api.md",
      name: "Redux and Rails API Quiz",
      type: types.quiz,
      id: "9cf7931d-629f-4173-8c7d-d1f39ccb7d58",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "react/homeworks/giphy/README.md",
      name: "Giphy Homework",
      type: types.project,
      id: "167b13e2-12d9-487c-93aa-861bf705503a",
      topicId: "four",
      subtopicId: "homeworks",
      timeEstimate: "01:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/homeworks/giphy/solution.zip",
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
      repo: "curriculum",
      path: "full-stack-project/homeworks/proposal-prep/schema.md",
      name: "Full-Stack Proposal Prep: Schema",
      type: types.reading,
      id: "95aa91f9-defb-4612-b5d5-7f5217936764",
      topicId: "five",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      change: {
        open: "exclude",
        online: {
          topicId: "four",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "three",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/redux_dev_tools.md",
      name: "Redux Developer Tools",
      type: types.reading,
      id: "d5949855-1a4e-494f-9b14-faba58832cf7",
      topicId: "four",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "four",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/n_plus_one.md",
      name: "N Plus One",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "6a5fe4bc-b2f8-4c85-a889-b38e2feae45e",
      topicId: "four",
      subtopicId: "additionalResources",
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
      href: "https://player.vimeo.com/video/214597789",
      name: "CSS Review Video",
      type: types.video,
      id: "1e9061ab-34bf-4778-b04d-f827b80353d1",
      topicId: "four",
      subtopicId: "additionalResources",
      timeEstimate: "00:24:00",
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
      href: "https://player.vimeo.com/video/342109524",
      name: "jBuilder Lecture",
      type: types.video,
      id: "4567a564-95bc-4f44-b9fe-5bae501b8b0f",
      topicId: "four",
      subtopicId: "lecture",
      timeEstimate: "00:18:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/342110042",
      name: "Normalized State",
      type: types.video,
      id: "d5faa315-c3ff-410f-8ebd-e7753a7ce6b6",
      topicId: "four",
      subtopicId: "lecture",
      timeEstimate: "00:28:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/342111584",
      name: "Selectors Lecture",
      type: types.video,
      id: "a5c1119f-0a30-43a2-b1b6-5f13eee721c8",
      topicId: "four",
      subtopicId: "lecture",
      timeEstimate: "00:14:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "react/projects/jbuilder/README.md",
      name: "Jbuilder",
      type: types.project,
      id: "528c904e-a2dc-4334-9c68-d3b6be4825d9",
      topicId: "four",
      subtopicId: "projects",
      timeEstimate: "01:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/jbuilder/solution.zip",
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
      repo: "curriculum",
      path: "react/projects/pokedex/pokedex_i.md",
      name: "Pokedex (Part 1)",
      type: types.project,
      id: "894b4b0d-e202-49ec-b5a5-03576ba8974d",
      topicId: "four",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/pokedex/solution.zip",
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
      repo: "curriculum",
      path: "react/readings/intro_to_react_router.md",
      name: "Intro to React Router",
      type: types.reading,
      id: "33d44aa4-bb1d-4356-99d3-819549e63aac",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
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
      path: "react/readings/link.md",
      name: "<Link>",
      type: types.reading,
      id: "58da4af2-bf17-47a5-850d-428a9780ec0b",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
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
      path: "react/readings/switch.md",
      name: "<Switch>",
      type: types.reading,
      id: "96aa97a5-aa73-45ec-8716-19445a00c92a",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:02:00",
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
      path: "react/readings/with_router.md",
      name: "withRouter",
      type: types.reading,
      id: "c4830906-ed11-4b00-85ab-d7a76e4d2d12",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:02:00",
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
      path: "react/readings/redirect.md",
      name: "<Redirect>",
      type: types.reading,
      id: "ab5d308a-2097-4738-ac82-f631f2b34d27",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:02:00",
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
      path: "react/readings/advanced_containers.md",
      name: "Advanced Containers",
      type: types.reading,
      id: "52e92e95-8bc0-4712-9e8c-5e74c337eef0",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "fiveD2",
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
      path: "react/quizzes/frontend_routing_react.md",
      name: "Frontend Routing with React Quiz",
      type: types.quiz,
      id: "19e34a28-9940-4e72-846b-80cb74f4b4c4",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "react/homeworks/rainbow_routes/README.md",
      name: "Rainbow Routes",
      type: types.project,
      id: "de6b39b6-ebbd-4706-8645-cb45e0c2e9ad",
      topicId: "five",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/homeworks/rainbow_routes/solution.zip",
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
      path: "full-stack-project/homeworks/proposal-prep/state-shape.md",
      name: "Full-Stack Proposal Prep: Sample State Shape",
      type: types.reading,
      id: "2fed4337-c61b-4140-8005-472c5cc6f959",
      topicId: "six",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      change: {
        open: "exclude",
        online: {
          topicId: "fiveD2",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "four",
          subtopicId: "homeworks"
        }
      }
    },
    {
      href: "https://reacttraining.com/react-router/web/guides/quick-start",
      name: "React Router Docs",
      type: types.externalResource,
      id: "0d613d17-0a01-40e3-abd3-44fc06061714",
      topicId: "five",
      subtopicId: "additionalResources",
      timeEstimate: "01:30:00",
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
      href: "https://player.vimeo.com/video/342316185",
      name: "Frontend Routing Intro",
      type: types.video,
      id: "c921b825-cfd6-483f-bb86-eafab25d3c18",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:17:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/342319540",
      name: "Route Wildcard Props",
      type: types.video,
      id: "49c39a59-3e63-4d52-ba7f-7b9825d5d6bc",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:12:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/342319155",
      name: "history.push",
      type: types.video,
      id: "9f0eb92c-a55f-40ec-bf59-14605ca74edb",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:11:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/342318480",
      name: "Frontend Routes with Rails",
      type: types.video,
      id: "67975832-e6cf-403e-bd8b-22d26c3da224",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:21:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/342316812",
      name: "Container Component ownProps & Wildcard Routes",
      type: types.video,
      id: "4f29942e-454c-4795-99ff-258c536cd922",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:55:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/342319968",
      name: "componentDidUpdate",
      type: types.video,
      id: "65635e3f-d45c-41ad-b927-bb465b2c95a6",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:18:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/342320552",
      name: "Form Redirection (history.push)",
      type: types.video,
      id: "88fadcaf-2038-42a6-8f62-c7f10a57d0e2",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:29:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "react/projects/pokedex/pokedex_ii.md",
      name: "Pokedex (Part 2)",
      type: types.project,
      id: "d364456d-5547-477c-8349-5753b71a55f5",
      topicId: "five",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/pokedex/solution.zip",
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
      path: "react/projects/pokedex/pokedex_iii.md",
      name: "Pokedex (Part 3)",
      type: types.project,
      id: "1bef2b9a-bc4e-4f7a-b5f7-52981f64dc09",
      topicId: "five",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/pokedex/solution.zip",
      change: {
        online: {
          topicId: "fiveD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "five",
          subtopicId: "projects"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/210683007",
      name: "Frontend Auth: Intro",
      type: types.video,
      id: "35ed6ed9-c0b6-4339-a78c-26ba8328d2b6",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:02:00",
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
      href: "https://player.vimeo.com/video/210683951",
      name: "Frontend Auth: API Authentication",
      type: types.video,
      id: "f1ed5a9d-b4ab-4cb1-b99b-6f316d5930e7",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:03:00",
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
      href: "https://player.vimeo.com/video/210684312",
      name: "Frontend Auth: Frontend Auth Pattern",
      type: types.video,
      id: "772962dc-e407-4758-adb1-1bce56d7378e",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:14:00",
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
      path: "react/readings/preloaded_state.md",
      name: "preloadedState",
      type: types.reading,
      id: "4b71c183-f2cf-4e2d-8349-f6b2e2238f53",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
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
      path: "react/readings/front_end_auth.md",
      name: "Front End Authentication",
      type: types.reading,
      id: "f8873c60-b3dc-43ae-b2fa-b0bce038734b",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
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
      path: "react/quizzes/frontend_auth.md",
      name: "Frontend Authentication Quiz",
      type: types.quiz,
      id: "823a01e6-cd50-4365-9db6-f5be187352d7",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "rails/readings/auth-part-i.md",
      name: "Rails Auth Prep: Auth Pattern (Part One)",
      type: types.reading,
      id: "4c1e5980-cbce-4ceb-8f6c-4a2eada91e1a",
      topicId: "six",
      subtopicId: "homeworks",
      timeEstimate: "01:00:00",
      change: {
        online: {
          topicId: "six",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "six",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/readings/checklist.md",
      name: "Rails/React/Redux Configuration Checklist",
      type: types.reading,
      id: "a4d1d169-ac41-4b4d-9410-18823d5499d2",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://facebook.github.io/react/docs/context.html",
      name: "React Context",
      type: types.externalResource,
      id: "814d4919-48d0-40c0-90ca-08a91a1e68fb",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "01:00:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "materials"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
      name: "localStorage",
      type: types.externalResource,
      id: "0885ecde-3632-4d4d-a952-348aa372119e",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "materials"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Active Storage and AWS S3 Hosting Demo",
      timeEstimate: "01:00:00",
      type: types.reading,
      id: "895823e0-4d78-4907-a455-dbbfdd49dcfc",
      topicId: "six",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "full-stack-project/resources/ActiveStorageDemo/README.md",
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
      repo: "assessment-prep",
      path: "react_1.md",
      name: "React 1 Practice Assessment",
      timeEstimate: "01:45:00",
      type: types.reading,
      id: "a94f0c79-2132-4fff-a85d-c8bfa654568e",
      topicId: "six",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        online: {
          topicId: "fiveD2",
          subtopicId: "assessment"
        },
        inPerson: {
          topicId: "five",
          subtopicId: "assessment"
        },
        inPersonNYC: {
          topicId: "five",
          subtopicId: "assessment"
        },
        campusHybrid: {
          topicId: "four",
          subtopicId: "assessment"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/projects/front_end_auth/README.md",
      name: "Front End Authentication Project",
      type: types.project,
      id: "fea3f5a4-ae4f-4bcd-81c4-697f971d411c",
      topicId: "six",
      subtopicId: "projects",
      timeEstimate: "03:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/front_end_auth/solution.zip",
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
      path: "react/projects/bench_bnb/bench_bnb_i.md",
      name: "BenchBnB (Part 1)",
      type: types.project,
      id: "2bcd95db-4b72-46eb-839b-03dc42c6c5bb",
      topicId: "six",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/bench_bnb/solution.zip",
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
      path: "react/demos/react_map_demo/README.md",
      name: "React Map Demo",
      type: types.reading,
      id: "8fe6e2c8-6740-477c-b6b5-3c7eb9e74213",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
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
      name: "React Hooks Demo",
      type: types.video,
      id: "811be2ed-e0c7-49d5-aa99-29c1accf0c3a",
      topicId: "seven",
      href: "https://player.vimeo.com/video/338923484",
      subtopicId: "additionalResources",
      timeEstimate: "00:07:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "react/quizzes/last_quiz.md",
      name: "Last Quiz",
      type: types.quiz,
      id: "fbf96c57-639b-4049-b130-83cec72d2ed4",
      topicId: "seven",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        open: "exclude",
        online: "exclude",
        campusHybrid: {
          topicId: "sevenD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "full-stack-project/homeworks/proposal-prep/routes.md",
      name: "Full-Stack Proposal Prep: Routes",
      type: types.reading,
      id: "4321890d-2d2c-4495-95e6-4b9d801da842",
      topicId: "seven",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      change: {
        open: "exclude",
        online: {
          topicId: "seven",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "five",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "full-stack-project/proposal/full-stack-project-proposal.md",
      name: "Submit Full-Stack Project Proposal",
      type: types.project,
      id: "73781198-1334-4fd1-98fd-155661832cba",
      topicId: "five",
      subtopicId: "homeworks",
      timeEstimate: "01:30:00",
      change: {
        open: "exclude",
        online: {
          topicId: "five",
          subtopicId: "homeworks"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "homeworks"
        },
        inPersonNYC: {
          topicId: "five",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "twoD2",
          subtopicId: "homeworks"
        }
      }
    },
    {
      href:
        "https://thetempest.co/2017/05/01/now-beyond/tech-money/tech-industry-gentrification/",
      name: "The Tech Industry is Forcing Gentrification",
      type: types.externalResource,
      id: "342e1533-b480-476b-9d60-1f5378b6ffaf",
      topicId: "seven",
      subtopicId: "culture",
      timeEstimate: "00:04:00",
      change: {
        online: {
          topicId: "sevenD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "seven",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "seven",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "seven",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://www.wired.com/2017/02/tech-campuses-hinder-diversity-help-gentrification/",
      name: "How Tech Campuses Hinder Diversity and Help Gentrification",
      type: types.externalResource,
      id: "2809b73e-6939-4862-b585-2d16a842f641",
      topicId: "seven",
      subtopicId: "culture",
      timeEstimate: "00:04:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "culture"
        },
        open: {
          topicId: "seven",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://www.theguardian.com/technology/2016/jan/28/silicon-valley-service-workers-poor-intel-tech-facebook",
      name: "Silicon Valley's Poorest Workers",
      type: types.externalResource,
      id: "04943bd1-4aa6-45ba-961b-ae0c80ba0004",
      topicId: "seven",
      subtopicId: "culture",
      timeEstimate: "00:03:00",
      change: {
        online: {
          topicId: "sevenD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "seven",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "seven",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "seven",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/tech-in-underserved-communities-beyond-feel-good-stories",
      name: "Tech in Underserved Communities: Beyond Feel Good Stories",
      type: types.externalResource,
      id: "43019ce0-f77c-464e-8d18-68102e218ba0",
      topicId: "seven",
      subtopicId: "culture",
      timeEstimate: "00:07:00",
      change: {
        online: {
          topicId: "seven",
          subtopicId: "culture"
        },
        open: {
          topicId: "seven",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/the-accidental-classism-and-unintentional-racism-of-ios-development-for-children",
      name:
        "The Accidental Classism and Unintentional Racism Of iOS Development for Children",
      type: types.externalResource,
      id: "687bc770-0b01-4210-8eba-a18a4457d35d",
      topicId: "seven",
      subtopicId: "culture",
      timeEstimate: "00:08:00",
      change: {
        online: {
          topicId: "sevenD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "seven",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "seven",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "seven",
          subtopicId: "culture"
        }
      }
    },
    {
      repo: "curriculum",
      path: "react/projects/bench_bnb/maps_api_key.md",
      name: "Google Maps API Key",
      type: types.reading,
      id: "5465c41f-38e4-4dfc-bcc4-c44ea5d37081",
      topicId: "seven",
      subtopicId: "homeworks",
      timeEstimate: "00:20:00",
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
      path: "react/projects/bench_bnb/bench_bnb_ii.md",
      name: "BenchBnB (Part 2)",
      type: types.project,
      id: "dda4bfd1-cf1b-40f2-8c0f-373c9b17ed09",
      topicId: "seven",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
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
      repo: "curriculum",
      path: "react/projects/bench_bnb/bench_bnb_iii.md",
      name: "BenchBnB (Part 3)",
      type: types.project,
      id: "e3d95d7d-c085-44ae-9582-7ca34c17a347",
      topicId: "seven",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/react/projects/bench_bnb/solution.zip",
      change: {
        open: {
          topicId: "seven",
          subtopicId: "projects"
        },
        online: {
          topicId: "sevenD2",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "seven",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "seven",
          subtopicId: "projects"
        },
        campusHybrid: {
          topicId: "sevenD2",
          subtopicId: "projects"
        }
      }
    }
  ]
};

module.exports = courses;
