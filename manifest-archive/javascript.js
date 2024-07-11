const openTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "JavaScript Fundamentals" },
  { id: "two", name: "The Event Loop" },
  { id: "three", name: "Object-oriented JavaScript" },
  { id: "four", name: "jQuery" },
  { id: "five", name: "AJAX" },
  { id: "six", name: "JavaScript DOM API" }
];

const liveTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "JavaScript Fundamentals (W5D4)" },
  { id: "two", name: "The Event Loop (W5D5)" },
  { id: "three", name: "Object-oriented JavaScript (W6D1)" },
  { id: "four", name: "jQuery (W6D2)" },
  { id: "five", name: "AJAX (W6D3)" },
  { id: "six", name: "JavaScript DOM API (W6D4)" }
];

const onlineTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "JavaScript Fundamentals (W11D2)" },
  { id: "oneD2", name: "Reversi Contin. (W11D3)" },
  { id: "two", name: "The Event Loop (W11D4)" },
  { id: "three", name: "Object-oriented JavaScript (W11D5)" },
  { id: "threeD2", name: "Asteroids (W12D1)" },
  { id: "four", name: "jQuery (W12D2)" },
  { id: "five", name: "AJAX (W12D3)" },
  { id: "six", name: "JavaScript DOM API (W12D4)" },
  { id: "sixD2", name: "Vanilla DOM Contin. (W12D5)" }
];

const SWEInPersonTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "JavaScript Fundamentals (W8D3)" },
  { id: "oneD2", name: "Reversi Contin. (W8D4)" },
  { id: "two", name: "The Event Loop (W8D5)" },
  { id: "three", name: "Object-oriented JavaScript (W9D1)" },
  { id: "threeD2", name: "Asteroids (W9D2)" },
  { id: "four", name: "jQuery (W9D3)" },
  { id: "five", name: "AJAX (W9D4)" },
  { id: "six", name: "JavaScript DOM API (W9D5)" },
  { id: "sixD2", name: "Vanilla DOM Contin. (W10D1)" }
];

const CampusHybridTopics = [
  { id: "zero", name: "Getting Started" },
  { id: "one", name: "JavaScript Fundamentals (W8D2)" },
  { id: "oneD2", name: "Reversi (W8D3)" },
  { id: "two", name: "The Event Loop (W8D4)" },
  { id: "three", name: "Object-oriented JavaScript (W8D5)" },
  { id: "threeD2", name: "Asteroids (W9D1)" },
  { id: "four", name: "JavaScript DOM API (W9D2)" },
  { id: "five", name: "JS DOM Manipulation and Server Requests (W9D3)" }
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
      taskGroupId: "683e794e-56f0-4ec8-ad3c-645d6b979e1f",
      name: "JavaScript",
      track: "SWE Campus Hybrid",
      urls: ["campus-hybrid-javascript"],
      description: "All about JavaScript!",
      tags: ["javascript"],
      catalog: false,
      topics: CampusHybridTopics,
      subtopics: subtopics,
      order: 7
    },
    live: {
      taskGroupId: "24bbb8ec-05ad-4a05-9788-009a3dcb9e06",
      name: "JavaScript",
      description: "All about JavaScript!",
      tags: ["javascript"],
      catalog: false,
      track: "Full Stack In Person",
      urls: ["full-stack-in-person-javascript"],
      order: 7,
      topics: liveTopics,
      subtopics: subtopics // use the default topics
    },
    inPerson: {
      taskGroupId: "7e2925b1-8c9c-4eca-bb7c-6ef17fab86f9",
      name: "JavaScript",
      track: "SWE In Person",
      urls: ["swe-in-person-javascript"],
      description: "All about JavaScript!",
      tags: ["javascript"],
      catalog: false,
      order: 7,
      topics: SWEInPersonTopics,
      subtopics: subtopics // use the default topics
    },
    inPersonNYC: {
      taskGroupId: "b27fc74a-a88a-4fcd-a26a-8d6dcc830f57",
      name: "JavaScript",
      track: "SWE In Person NYC",
      urls: ["swe-in-person-nyc-javascript"],
      description: "All about JavaScript!",
      tags: ["javascript"],
      catalog: false,
      order: 7,
      topics: SWEInPersonTopics,
      subtopics: subtopics // use the default topics
    },
    open: {
      taskGroupId: "b2dc3819-0256-4d2c-b3ea-1e1cd8889b58",
      name: "JavaScript",
      track: "Full Stack Online",
      urls: ["full-stack-online-javascript"],
      description: "All about JavaScript!",
      tags: ["javascript"],
      catalog: false,
      order: 7,
      topics: openTopics, // use the default topics
      subtopics: subtopics // use the default topics
    },
    online: {
      taskGroupId: "05d5674f-1299-4cfb-abbe-62368e0ecfa6",
      name: "JavaScript",
      track: "SWE Online",
      description: "All about JavaScript!",
      tags: ["javascript"],
      catalog: false,
      urls: ["swe-online-javascript"],
      order: 7,
      topics: onlineTopics, // use the default topics
      subtopics: subtopics
    }
  },
  tasks: [
    {
      name: "JavaScript Module Overview",
      type: types.reading,
      id: "ecba36b3-c056-4897-839b-98ead53fcb9b",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:05:00",
      repo: "curriculum",
      path: "javascript/JavaScript_Overview.md",
      change: {
        online: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      name: "JavaScript Module Overview",
      type: types.reading,
      id: "d1d3ce6c-2631-421c-a249-011e6bed0316",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:05:00",
      repo: "curriculum",
      path: "javascript/Online_JavaScript_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      name: "JavaScript Module Overview",
      type: types.reading,
      id: "8b523169-46db-4d07-bf91-547ab93d874f",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:05:00",
      repo: "curriculum",
      path: "javascript/InPerson_JavaScript_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      name: "JavaScript Module Overview",
      type: types.reading,
      id: "23e6de86-3ecd-402c-9ffd-da4b8ddad6ad",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:05:00",
      repo: "curriculum",
      path: "javascript/CampusHybrid_JavaScript_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "course/readings/dev-setup.md",
      name: "Setting up a Development Environment (Phase 3) ",
      type: types.reading,
      id: "af556c17-ca93-4735-99c6-034db052a87e",
      topicId: "zero",
      subtopicId: "none",
      timeEstimate: "00:10:00",
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
      href: "https://player.vimeo.com/video/169645510",
      name: "Intro to JS Video",
      type: types.video,
      id: "c816f315-1ad4-4786-a398-709979acbb03",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:12:00",
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
      href: "https://player.vimeo.com/video/169806088",
      name: "Object-Oriented JS: Intro",
      type: types.video,
      id: "f55bca78-455d-478e-9f0c-566378a84213",
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
      href: "https://player.vimeo.com/video/169804475",
      name: "Object-Oriented JS: Demo",
      type: types.video,
      id: "093bc342-1902-4476-accd-51462bcbd770",
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
      href: "https://player.vimeo.com/video/169898573",
      name: "Closures and Callbacks",
      type: types.video,
      id: "47681b9f-eff7-4ddc-bf06-29c8ff177b68",
      topicId: "one",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
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
      path: "javascript/readings/vs-code-node-debugger.md",
      name: "Debugging JS in VSCode",
      type: types.reading,
      id: "5eb13b5d-1ffa-4618-a5a5-8de2d786db61",
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
      path: "javascript/readings/js-intro.md",
      name: "Intro to JS",
      type: types.reading,
      id: "baf852e0-da14-4507-89ab-a08233804d09",
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
      path: "javascript/readings/syntax-and-methods.md",
      name: "Syntax and Useful Methods",
      type: types.reading,
      id: "51320406-44b2-436a-8a8d-0a3b95578f35",
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
      path: "javascript/readings/data-types.md",
      name: "Data Types",
      type: types.reading,
      id: "a3ffb31c-0257-4b26-bdc2-ba868272c910",
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
      path: "javascript/readings/variables.md",
      name: "Variables",
      type: types.reading,
      id: "1c303dfc-1598-4e40-b908-b644ae51ba3e",
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
      path: "javascript/readings/functions-js.md",
      name: "Functions",
      type: types.reading,
      id: "9944a943-557b-4511-b8fd-7995367b11f2",
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
      path: "javascript/readings/closures.md",
      name: "Closures and Scope",
      type: types.reading,
      id: "710f719f-e4a8-43d0-9110-3ecd7c136c3c",
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
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/this-and-that.md",
      name: "this and that",
      type: types.reading,
      id: "5e830594-7e0d-46c2-91f6-a560d9f845ac",
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
      path: "javascript/readings/fat-arrows.md",
      name: "ES6 Arrow Functions",
      type: types.reading,
      id: "f7b5c4de-b2a6-42cc-a292-3922ae1f525c",
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
      path: "javascript/quizzes/js_fundamentals.md",
      name: "Javascript Fundamentals Quiz",
      type: types.quiz,
      id: "7cf0d808-dd12-4747-9f90-3343d75e1e37",
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
        },
        live: {
          topicId: "one",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/homeworks/intro_js_problems/part_i.md",
      name: "Intro JavaScript Problems (Part 1)",
      type: types.project,
      id: "8574c99c-5526-41c6-9c05-1ea6aa6c4a87",
      topicId: "one",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/homeworks/intro_js_problems/solution.zip",
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
      path: "javascript/homeworks/intro_js_problems/part_ii.md",
      name: "Intro JavaScript Problems (Part 2)",
      type: types.project,
      id: "1832275f-1259-416d-8fb0-105b08d38b72",
      topicId: "one",
      subtopicId: "homeworks",
      timeEstimate: "00:25:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/homeworks/intro_js_problems/solution.zip",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "one",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "homeworks"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "homeworks"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "homeworks"
        }
      }
    },
    // Additional Resources
    {
      repo: "curriculum",
      path: "javascript/readings/object-oriented-js.md",
      name: "Object Oriented JS: Continued",
      type: types.reading,
      id: "f42d404d-501c-4ad1-8c48-ee995eb4583c",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:11:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/function-invocation-briefly.md",
      name: "Function Invocation, briefly",
      type: types.reading,
      id: "dd70c313-6c6f-4586-af3e-a4ed420d1b5e",
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
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://www.codecademy.com/learn/introduction-to-javascript",
      name: "Codecademy JS Curriculum",
      type: types.externalResource,
      id: "aac7c939-a1b1-4b5f-9a64-24e8cd3e2b19",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "05:00:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "http://jqfundamentals.com/chapter/javascript-basics",
      name: "jQuery Fundamentals: Javascript Basics",
      type: types.externalResource,
      id: "90dce1da-0b3c-4437-86c3-634048c7d70e",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "03:00:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      name: "MDN Guide",
      type: types.externalResource,
      id: "e57867c4-b779-4f54-979d-10d5c83849db",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/mdn-js.md",
      name: "MDN Documentation",
      type: types.reading,
      id: "c0e33505-d5bf-4afa-8332-4b5ea232dd58",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_positioning.md",
      name: "CSS Positioning",
      type: types.reading,
      id: "a9d09697-5293-4435-97c6-55b1ef11a725",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/lecture_readings/css_pseudo_content.md",
      name: "CSS Pseudo Content",
      type: types.reading,
      id: "f7120120-1511-4aa0-bf14-a14fd32d9286",
      topicId: "one",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "one",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/337414181",
      name: "Intro to JS & Variables Lecture",
      type: types.video,
      id: "31b7c8b0-f112-43b7-9491-1e88591147b7",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:43:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        online: {
          topicId: "one",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/337415731",
      name: "Functions Lecture",
      type: types.video,
      id: "40e916ea-618e-43b1-b38e-541e7312c9ff",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:41:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337417596",
      name: "Hoisting Lecture",
      type: types.video,
      id: "22c4c0bf-2b6e-4865-ae39-25462ed39cf3",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:11:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337417926",
      name: "Closures Lecture",
      type: types.video,
      id: "5df1accd-0abd-45b3-b607-373e59f5c9a3",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:09:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337418311",
      name: "Callbacks Lecture",
      type: types.video,
      id: "a6ec4943-9875-4c21-8037-425f4779ffa9",
      topicId: "one",
      subtopicId: "lecture",
      timeEstimate: "00:08:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        live: "exclude",
        campusHybrid: "exclude"
      }
    },
    // projects
    {
      repo: "curriculum",
      path: "javascript/projects/intro_js_exercises/README.md",
      name: "Intro JavaScript Exercises",
      type: types.project,
      id: "f13cf237-b926-4c63-8a42-3ecfd99981e3",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "04:00:00",
      solution: "https://assets.aaonline.io/fullstack/javascript/projects/intro_js_exercises/solution.zip",
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
      path: "html-css/micro-projects/css_friends_combined/css_friends_1/README.md",
      name: "CSS Friends Part 2",
      type: types.project,
      id: "f064f1b5-2a5b-4297-87e5-1b6e5bb7ab6b",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "02:00:00",
      solution: "https://assets.aaonline.io/fullstack/html-css/micro-projects/combined-css-friends/css-friends-pt2/solution.zip",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "one",
          subtopicId: "projects"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/projects/js_reversi/README.md",
      name: "JS: Reversi",
      type: types.project,
      id: "3ead46ab-ba52-4af3-ab55-27e9db7c790a",
      topicId: "one",
      subtopicId: "projects",
      timeEstimate: "05:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/js_reversi/solution.zip",
      change: {
        online: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "one",
          subtopicId: "projects"
        },
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/arguments.md",
      name: "Arguments",
      type: types.reading,
      id: "23ac5f11-5da4-49a2-8a45-5bf1cdaedd3d",
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
        campusHybrid: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oneD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oneD2",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/function-invocation-in-depth.md",
      name: "Function Invocation, in-depth",
      type: types.reading,
      id: "f1fe3261-076f-48b0-a7ab-207e2b00134c",
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
      path: "javascript/readings/intro-to-callbacks.md",
      name: "Intro to Callbacks: File I/O",
      type: types.reading,
      id: "5ba2c9aa-bf25-4345-828c-2ba534f6ab67",
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
      href: "http://latentflip.com/loupe",
      name: "Event Loop Visualization",
      type: types.externalResource,
      id: "d205c8c9-538f-40db-8be1-ecf2cc89382c",
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
      path: "javascript/readings/es6-classes.md",
      name: "ES6 Class Syntax",
      type: types.reading,
      id: "7a8c3db3-76ef-4e97-bd19-8da82cd3bbff",
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
      repo: "curriculum",
      path: "javascript/readings/module-pattern.md",
      name: "Node Module Pattern",
      type: types.reading,
      id: "2ce267c2-5dbc-4a9d-99d7-9ff37e1bd076",
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
      path: "javascript/readings/chrome_dev_tools.md",
      name: "Chrome Dev Tools",
      type: types.reading,
      id: "6e6eed3a-1dbc-4481-8d55-7e965ed7f744",
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
      href:
        "https://appacademy.github.io/curriculum/language_comparison/index.html",
      name: "Ruby, ES5 & ES6 Comparison Chart",
      type: types.externalResource,
      id: "78437e6b-7f87-4281-9388-56f19015a6c5",
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
      path: "javascript/quizzes/event_loop.md",
      name: "Event Loop Quiz",
      type: types.quiz,
      id: "913587ae-535b-4187-a98a-b200f105a673",
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
          topicId: "two",
          subtopicId: "materials"
        },
        live: {
          topicId: "two",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/homeworks/callbacks_and_functions/README.md",
      name: "Callbacks and Function Calls",
      type: types.project,
      id: "6ea3d45f-6bcd-42d0-9994-972f5af4a01f",
      topicId: "two",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/homeworks/callbacks_and_functions/solution.js",
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
      path: "javascript/readings/indentation.md",
      name: "Writing Clean Code",
      type: types.reading,
      id: "e9883563-3a47-45cd-be38-d775835d9743",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
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
      href: "http://javascript.crockford.com/code.html",
      name: "Crockford",
      type: types.externalResource,
      id: "2b535cc0-c35b-4d48-9056-6a563148f5fa",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:30:00",
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
      href: "http://contribute.jquery.org/style-guide/js/",
      name: "jQuery",
      type: types.externalResource,
      id: "b868d4f8-c531-4020-a186-3c28cbb1f57a",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:30:00",
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
      href: "https://github.com/airbnb/javascript",
      name: "AirBnB",
      type: types.externalResource,
      id: "3bed31f1-bdc2-4a47-b9e0-ba0f73d6bb7d",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:30:00",
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
      path: "javascript/readings/tagged-templates.md",
      name: "Tagging Template Literals (Bonus)",
      type: types.reading,
      id: "1b300790-21dd-4ce4-9dbf-5fe6cf79d3be",
      topicId: "two",
      subtopicId: "additionalResources",
      timeEstimate: "00:07:00",
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
      href: "https://player.vimeo.com/video/337176717",
      name: "Call & Apply",
      type: types.video,
      id: "9f42b018-7f48-4e6b-b5cc-997a8ee8a8d9",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:17:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337181208",
      name: "Bind pt. 1",
      type: types.video,
      id: "353ee457-0327-4414-a4c2-36333e7e6230",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:23:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337186583",
      name: "Bind pt. 2",
      type: types.video,
      id: "fa19a0bd-9706-4efe-9689-b31ef6664779",
      topicId: "two",
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
      href: "https://player.vimeo.com/video/337189725",
      name: "Async Behavior",
      type: types.video,
      id: "3eec25cc-fc4c-4870-af59-263dfa4a17b4",
      topicId: "two",
      subtopicId: "lecture",
      timeEstimate: "00:06:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/projects/functions_exercises/README.md",
      name: "Intro to Callbacks Exercises",
      type: types.project,
      id: "d39c93ab-18f6-4a04-bb19-8f4f145d026a",
      topicId: "two",
      subtopicId: "projects",
      timeEstimate: "02:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/functions_exercises/solution.zip",
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
      path: "javascript/projects/hanoi_node/README.md",
      name: "Towers of Hanoi: JS Edition",
      type: types.project,
      id: "ecfe7d43-ca7c-43b0-88c9-eae2d2098846",
      topicId: "two",
      subtopicId: "projects",
      timeEstimate: "02:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/hanoi_node/solution.zip",
      change: {
        online: {
          topicId: "one",
          subtopicId: "projects"
        },
        campusHybrid: {
          topicId: "one",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "one",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "one",
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
      path: "javascript/projects/ttt_node/README.md",
      name: "Tic-Tac-Toe: JS Edition",
      type: types.project,
      id: "e8da1780-6c27-472f-8580-a11ba4450589",
      topicId: "two",
      subtopicId: "projects",
      timeEstimate: "02:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/ttt_node/solution.zip",
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
      href: "https://player.vimeo.com/video/162131042",
      name: "Prototype Chain and Inheritance",
      type: types.video,
      id: "e3a9ae2f-9a11-4f48-a70b-0f641d713af7",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
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
      href: "https://player.vimeo.com/video/162115223",
      name: "Inheritance Demo",
      type: types.video,
      id: "1624f9a8-ff4d-4792-ab5c-e9714937ae08",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:20:00",
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
      href: "https://player.vimeo.com/video/162115224",
      name: "JS in Browser",
      type: types.video,
      id: "f2f2da18-ed15-45db-9be5-bc1285426331",
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
      path: "javascript/readings/prototypal-inheritance.md",
      name: "Prototypal Inheritance",
      type: types.reading,
      id: "7b4a0c47-80af-4ac5-ba77-3239209ee768",
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
      path: "javascript/readings/browser-modules.md",
      name: "Modules in the Browser",
      type: types.reading,
      id: "9b17c1c1-0bb5-44fa-a2a4-28fb36837833",
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
      href: "https://joshondesign.com/p/books/canvasdeepdive/chapter01.html",
      name: "Basic Canvas Driving",
      type: types.externalResource,
      id: "ff6ca50f-7772-415e-802b-0d86118b1eb4",
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
      // homeworks
      href: "https://webpack.js.org/guides/getting-started/",
      name: "Webpack Tutorial",
      type: types.externalResource,
      id: "02337023-8db8-4f5d-9321-ab6f00b1dedb",
      topicId: "three",
      subtopicId: "homeworks",
      timeEstimate: "00:20:00",
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
      path: "javascript/homeworks/canvas_practice/README.md",
      name: "Intro to Canvas",
      type: types.project,
      id: "0f79540f-5d2e-4be5-bea8-ffa6b8085018",
      topicId: "three",
      subtopicId: "homeworks",
      timeEstimate: "00:20:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/homeworks/canvas_practice/solution.js",
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
      path: "javascript/demos/drunken_circles/README.md",
      name: "Canvas Demo: DrunkenCircles",
      type: types.reading,
      id: "12331fc2-6dfe-422a-98fb-16a1100bbd26",
      topicId: "three",
      subtopicId: "homeworks",
      timeEstimate: "00:15:00",
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
      href: "http://outandequal.org/2017-workplace-equality-fact-sheet/",
      name: "LGBT Workplace Fact Sheet",
      type: types.externalResource,
      id: "228d61f8-0aba-476c-8a00-e5673e4a25a7",
      topicId: "three",
      subtopicId: "culture",
      timeEstimate: "00:03:00",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "three",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/it-is-bigger-than-microaggressions",
      name: "It is Bigger Than Microaggressions",
      type: types.externalResource,
      id: "53e0d694-6f2f-4be7-9ffa-a3aefbd46885",
      topicId: "three",
      subtopicId: "culture",
      timeEstimate: "00:07:00",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "three",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "culture"
        }
      }
    },
    {
      href: "http://fortune.com/2017/06/25/lgbtq-employment-discrimination/",
      name: "LGBT Minorities Face Job Discrimination",
      type: types.externalResource,
      id: "9765d81a-dc34-48a2-9046-ae4480ece194",
      topicId: "three",
      subtopicId: "culture",
      timeEstimate: "00:05:00",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "three",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://www.geekwire.com/2015/out-in-tech-what-its-like-to-be-lgbt-in-an-industry-struggling-with-diversity/",
      name: "Out in Tech",
      type: types.externalResource,
      id: "e589a4e5-f755-4410-9792-099d1548f0ea",
      topicId: "three",
      subtopicId: "culture",
      timeEstimate: "00:08:00",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "three",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/transitioning-in-the-digital-age",
      name: "Transitioning in the Digital Age",
      type: types.externalResource,
      id: "55457adc-53d6-4e69-a3f3-970813b59e87",
      topicId: "three",
      subtopicId: "culture",
      timeEstimate: "00:07:00",
      change: {
        online: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "three",
          subtopicId: "culture"
        },
        campusHybrid: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "culture"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/asynchronous-js.md",
      name: "Asynchronous Client-Side Code",
      type: types.reading,
      id: "d502dfd6-edb5-46ef-a8fc-8ac517ab3649",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:12:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "three",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "three",
          subtopicId: "materials"
        },
        open: {
          topicId: "three",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/client-side-javascript.md",
      name: "Client-Side JavaScript",
      type: types.reading,
      id: "641a928c-2299-452d-bc16-9c51bdc57e97",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "three",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "three",
          subtopicId: "materials"
        },
        open: {
          topicId: "three",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/quizzes/object_oriented_js.md",
      name: "Object Oriented Javascript Quiz",
      type: types.quiz,
      id: "c3b57552-cc0c-4660-a000-47c50932683c",
      topicId: "three",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "three",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "three",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "three",
          subtopicId: "materials"
        },
        open: {
          topicId: "three",
          subtopicId: "materials"
        },
        live: {
          topicId: "three",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "assessment-prep",
      path: "javascript_1.md",
      name: "JavaScript 1 Practice Assessment",
      type: types.reading,
      id: "677c7cf7-23a6-4b29-b410-cb89f8885d22",
      topicId: "three",
      subtopicId: "assessment",
      timeEstimate: "01:15:00",
      change: {
        open: "exclude",
        online: {
          topicId: "threeD2",
          subtopicId: "assessment"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/332499533",
      name: "myBind Solutions",
      type: types.video,
      id: "04ddce28-bc75-47bb-82e4-b365f72bfd84",
      topicId: "threeD2",
      subtopicId: "materials",
      timeEstimate: "00:31:00",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/332501585",
      name: "Currying Solutions",
      type: types.video,
      id: "f58c5ae3-ec92-4730-8246-14be01bc3868",
      topicId: "threeD2",
      subtopicId: "materials",
      timeEstimate: "00:19:00",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/332504701",
      name: "Prototypal Inheritance Lecture",
      type: types.video,
      id: "70bc9821-c59b-4383-804c-3432a5a0d6fd",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "00:35:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/332503425",
      name: "Webpack Lecture",
      type: types.video,
      id: "9c37d494-757d-4f87-a57b-f563138774ca",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "00:16:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/332502700",
      name: "Canvas Intro Lecture",
      type: types.video,
      id: "d09ae291-3d28-4f64-9fdb-171c1c38b625",
      topicId: "three",
      subtopicId: "lecture",
      timeEstimate: "00:11:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/projects/arguments_exercises/README.md",
      name: "arguments Exercise Problems",
      type: types.project,
      id: "5900dfe6-603c-4c72-9ce9-22580e868e54",
      topicId: "three",
      subtopicId: "projects",
      timeEstimate: "01:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/arguments_exercises/solution.zip",
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
      path: "javascript/projects/inherits_exercises/README.md",
      name: "Prototypal Inheritance Exercises",
      type: types.project,
      id: "5b3fb9ff-12dd-4dbf-b023-97238cb133a2",
      topicId: "three",
      subtopicId: "projects",
      timeEstimate: "01:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/inherits_exercises/solution.zip",
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
      path: "javascript/projects/flappy_bird/README.md",
      name: "Flappy Bird",
      type: types.project,
      id: "00ac1ff6-2362-4efb-9879-d6e51d54a078",
      topicId: "three",
      subtopicId: "additionalResources",
      timeEstimate: "05:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/flappy_bird/solution.zip",
      change: {
        open: "exclude",
        campusHybrid: {
          topicId: "three",
          subtopicId: "projects"
        },
        online: {
          topicId: "three",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "three",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "three",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/projects/asteroids/README.md",
      name: "Asteroids",
      type: types.project,
      id: "2bf31df5-14e9-4cef-9d59-4f44942f8d91",
      topicId: "three",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/asteroids/prototypal_syntax_solution.zip",
      change: {
        campusHybrid: {
          topicId: "threeD2",
          subtopicId: "projects"
        },
        online: {
          topicId: "threeD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "three",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "threeD2",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "threeD2",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/document-object-model.md",
      name: "The Document Object Model",
      type: types.reading,
      id: "05c5b4af-47f3-48f8-8a2f-d62fd2c5471a",
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
      path: "javascript/readings/jquery-01-selection-and-manipulation.md",
      name: "jQuery I: Selection and Manipulation",
      type: types.reading,
      id: "e9e65c1f-78a9-4ee9-8520-fe8ae776566c",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "materials"
        },
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
      path: "javascript/readings/jquery-02-events.md",
      name: "jQuery II: Events",
      type: types.reading,
      id: "8b4f9311-f36e-4b2e-b480-3705f147664d",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "materials"
        },
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
      path: "javascript/readings/jquery-03-ready.md",
      name: "jQuery III: Ready",
      type: types.reading,
      id: "69e8cae2-aa44-4583-8f1d-6ea4c1b90c15",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "materials"
        },
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
      path: "javascript/readings/jquery-04-all-the-ways.md",
      name: "jQuery IV: All the Ways",
      type: types.reading,
      id: "5d5148c0-e86e-4e02-8918-c1e7faff312e",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
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
      path: "javascript/readings/jquery-05-data-attributes.md",
      name: "jQuery V: Data Attributes",
      type: types.reading,
      id: "b9378af1-a7ec-4af3-8f63-ccb7405ac7fa",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
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
      href: "https://player.vimeo.com/video/85221706",
      name: "backbone-14: jQuery Event Delegation",
      type: types.video,
      id: "0493cda1-1f6d-431f-a675-aede51bf6e11",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:25:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
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
      path: "javascript/readings/jquery-06-event-delegation.md",
      name: "jQuery VI: Event Delegation",
      type: types.reading,
      id: "38aa269a-abf6-421e-8f24-670cee12c913",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
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
      path: "javascript/quizzes/jquery.md",
      name: "jQuery Quiz",
      type: types.quiz,
      id: "80f93209-1dc6-434e-b5bf-ceb0ba8f84b9",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "materials"
        },
        online: {
          topicId: "four",
          subtopicId: "materials"
        },
        open: {
          topicId: "four",
          subtopicId: "materials"
        },
        live: {
          topicId: "four",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "four",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "four",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/homeworks/wacky_painter/README.md",
      name: "Wacky jQuery",
      type: types.project,
      id: "122bc71b-a512-4e90-ab50-31a5c2008259",
      topicId: "four",
      subtopicId: "homeworks",
      timeEstimate: "00:45:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/homeworks/wacky_painter/solution.zip",
      change: {
        campusHybrid: "exclude",
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
      path: "javascript/readings/new-prototypal-inheritance.md",
      name: "ES6 Prototypal Inheritance",
      type: types.reading,
      id: "8603c022-09c4-4e6c-8c81-291bfd521a69",
      topicId: "four",
      subtopicId: "additionalResources",
      timeEstimate: "00:15:00",
      change: {
        campusHybrid: {
          topicId: "three",
          subtopicId: "additionalResources"
        },
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
      href: "http://api.jquery.com/",
      name: "jQuery Documentation",
      type: types.externalResource,
      id: "35556b2a-7b64-4b21-a6ca-b5e6bf06669f",
      topicId: "four",
      subtopicId: "additionalResources",
      timeEstimate: "00:30:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
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
      href: "http://jqfundamentals.com/",
      name: "jQuery Fundamentals (Ch 2-4)",
      type: types.externalResource,
      id: "78e551da-0e25-4eb0-948f-166dd90aef00",
      topicId: "four",
      subtopicId: "additionalResources",
      timeEstimate: "01:30:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
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
      href: "https://player.vimeo.com/video/337661679",
      name: "jQuery - Intro & Selector Functions",
      type: types.video,
      id: "4cff179a-dab5-4749-93c5-3fc59ff1b35e",
      topicId: "four",
      subtopicId: "lecture",
      timeEstimate: "00:18:00",
      change: {
        campusHybrid: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337661180",
      name: "jQuery - Events",
      type: types.video,
      id: "c5c43eb6-a9ee-4707-8962-4e45f132b525",
      topicId: "four",
      subtopicId: "lecture",
      timeEstimate: "00:16:00",
      change: {
        campusHybrid: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337660471",
      name: "jQuery - Form Submission & DOM Insertion",
      type: types.video,
      id: "f2333f87-a836-4db4-b554-4421728ffb4f",
      topicId: "four",
      subtopicId: "lecture",
      timeEstimate: "00:23:00",
      change: {
        campusHybrid: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/337656355",
      name: "jQuery.data Function",
      type: types.video,
      id: "99734e15-3bff-4744-a620-91b3613e9c4a",
      topicId: "four",
      subtopicId: "lecture",
      timeEstimate: "00:13:00",
      change: {
        campusHybrid: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/projects/_deprecated/ttt_jquery/README.md",
      name: "jQuery Tic Tac Toe",
      type: types.project,
      id: "754ae2fa-4d7c-49f6-87ac-a1d10aa7d79c",
      topicId: "four",
      subtopicId: "projects",
      timeEstimate: "02:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/ttt_jquery/solution.zip",
      change: {
        campusHybrid: "exclude",
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
      path: "javascript/projects/hanoi_jquery/README.md",
      name: "jQuery Towers of Hanoi",
      type: types.project,
      id: "3a175c9b-0b3a-43dc-a3b7-44373b38449d",
      topicId: "four",
      subtopicId: "projects",
      timeEstimate: "03:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/hanoi_jquery/solution.zip",
      change: {
        campusHybrid: "exclude",
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
      path: "javascript/projects/snake/README.md",
      name: "jQuery Snake",
      type: types.project,
      id: "dab119f3-a3a0-4939-9d24-de2893265bef",
      topicId: "four",
      subtopicId: "bonus",
      timeEstimate: "03:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/snake/solution.zip",
      change: {
        campusHybrid: "exclude",
        online: {
          topicId: "four",
          subtopicId: "bonus"
        },
        open: {
          topicId: "four",
          subtopicId: "bonus"
        }
      }
    },
    // Day 5
    {
      // readings
      href: "https://player.vimeo.com/video/162860823",
      name: "AJAX Video Lecture",
      type: types.video,
      id: "5b02b40a-ff35-4fc1-b038-8f1372627d2b",
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
      href: "https://player.vimeo.com/video/162764008",
      name: "AJAX Demo",
      type: types.video,
      id: "9dd8b057-4262-41ff-ae4c-29bc39d98ca9",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:35:00",
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
        "https://assets.aaonline.io/fullstack/javascript/demos/chat_demo/chat_demo.zip",
      name: "AJAX Demo: code",
      type: types.externalResource,
      id: "5ef337c0-b8db-4878-86dd-329e1df1f5b7",
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
      repo: "curriculum",
      path: "javascript/readings/basic-ajax.md",
      name: "Basic AJAX",
      type: types.reading,
      id: "23b1e84a-71cf-4721-94c0-baed16f9e998",
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
      repo: "curriculum",
      path: "javascript/readings/ajax-remote-forms.md",
      name: "AJAX Remote Forms",
      type: types.reading,
      id: "84505ec9-7bad-435b-935d-d14af2d2a87f",
      topicId: "five",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
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
      path: "javascript/readings/rails-api.md",
      name: "Using Rails as an API",
      type: types.reading,
      id: "01550ba4-e007-434f-b882-be6f90ab79f8",
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
      repo: "curriculum",
      path: "javascript/readings/promises.md",
      name: "Promises",
      type: types.reading,
      id: "c4db7456-8c26-4867-b648-50d9ba536ed8",
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
      path: "javascript/quizzes/ajax.md",
      name: "AJAX Quiz",
      type: types.quiz,
      id: "a901af76-0651-4907-9654-d95604b33e33",
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
        },
        live: {
          topicId: "five",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "five",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "five",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/homeworks/first_ajax/README.md",
      name: "Your First AJAX Request",
      type: types.project,
      id: "6e39d909-db8b-47ee-88b9-1c0d1f58a33d",
      topicId: "five",
      subtopicId: "homeworks",
      timeEstimate: "00:30:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/homeworks/first_ajax/solution.zip",
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
      href: "http://jqfundamentals.com/chapter/ajax-deferreds",
      name: "jQuery Fundamentals: AJAX",
      type: types.externalResource,
      id: "92fa3745-4350-4c84-8341-3ee1be334403",
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
      path: "javascript/readings/simple-ajax-example.md",
      name: "Simple AJAX Example",
      type: types.reading,
      id: "3069eb93-92c8-486b-8d6f-9851ef93aa16",
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
      href: "https://player.vimeo.com/video/340062966",
      name: "Intro & First Request",
      type: types.video,
      id: "afa7628b-d98d-4eea-951f-fe9a6364ee87",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:26:00",
      change: {
        campusHybrid: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340065552",
      name: "Webpack & AJAX on Rails",
      type: types.video,
      id: "4f0928d5-f758-477f-96c7-909b8df4da3c",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:32:00",
      change: {
        campusHybrid: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340064662",
      name: "AJAX Forms",
      type: types.video,
      id: "fbb3f6cb-fba3-47bd-bdd6-f722ce8d6c73",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:20:00",
      change: {
        campusHybrid: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/340063851",
      name: "ApiUtil & Promises",
      type: types.video,
      id: "17e4ae6d-762d-4889-ba15-8df1ae00b29d",
      topicId: "five",
      subtopicId: "lecture",
      timeEstimate: "00:15:00",
      change: {
        campusHybrid: "exclude",
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/projects/ajax_twitter/README.md",
      name: "AJAX Twitter",
      type: types.project,
      id: "c07a25df-f340-475d-a7a4-496fea75cb8b",
      topicId: "five",
      subtopicId: "projects",
      timeEstimate: "06:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/ajax_twitter/solution.zip",
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
    // Day 6
    {
      name: "JavaScript 1 Assessment",
      repo: "curriculum",
      path: "course/assessment-day.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "0d155953-4b47-48ab-87fa-0e12c7ab33b7",
      topicId: "sixD2",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        live: {
          topicId: "six",
          subtopicId: "assessment"
        },
        campusHybrid: "exclude",
        online: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/dom_types.md",
      name: "DOM Data Types",
      type: types.reading,
      id: "02ff4b4e-6749-4fa8-b3a6-3c1092858cfc",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        live: "exclude",
        open: "exclude",
        online: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/events.md",
      name: "Events",
      type: types.reading,
      id: "2c5c44a8-ea22-4c32-9f59-440ef163ea8a",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        live: "exclude",
        open: "exclude",
        online: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/jquery-07-triggering.md",
      name: "jQuery VII: Triggering",
      type: types.reading,
      id: "def0f618-9515-4cc1-9392-07a04ce3f89d",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        campusHybrid: {
          topicId: "five",
          subtopicId: "additionalResources"
        },
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
      path: "javascript/readings/event-propagation.md",
      name: "Event Propagation",
      type: types.reading,
      id: "b261ebfa-7130-40a8-a53a-37ad28ada60b",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        campusHybrid: {
          topicId: "four",
          subtopicId: "materials"
        },
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
      path: "javascript/readings/dom-content-loaded.md",
      name: "DOM Content Loaded",
      type: types.reading,
      id: "afc3a582-2d62-4c60-8e85-8848403f430e",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        live: "exclude",
        open: "exclude",
        online: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/selecting-and-manipulating-elements.md",
      name: "DOM Manipulation",
      type: types.reading,
      id: "df5bbe72-1975-47a8-9615-130f1c0c99a7",
      topicId: "four",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        live: "exclude",
        open: "exclude",
        online: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/readings/history-location.md",
      name: "History and Location",
      type: types.reading,
      id: "83f5d272-2051-4bbd-b732-ae5f946262f9",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        campusHybrid: {
          topicId: "four",
          subtopicId: "materials"
        },
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
      path: "javascript/readings/vanilla_javascript.md",
      name: "Vanilla JavaScript",
      type: types.reading,
      id: "8e8d89e2-584d-461b-bb6e-d77d4366fca5",
      topicId: "six",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        campusHybrid: "exclude",
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
      path: "javascript/quizzes/js_dom_api.md",
      name: "Vanilla JavaScript Quiz",
      type: types.quiz,
      id: "92e39aa2-8e0a-4ad6-b030-a55812dd33a7",
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
        },
        live: {
          topicId: "six",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "four",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "six",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "six",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/homeworks/vanilla-dom/README.md",
      name: "Vanilla DOM Manipulation",
      type: types.project,
      id: "623f0c2d-a017-4b3c-91f0-570ef43cb28d",
      topicId: "six",
      subtopicId: "homeworks",
      timeEstimate: "00:45:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/homeworks/vanilla-dom/solution.js",
      change: {
        campusHybrid: {
          topicId: "four",
          subtopicId: "homeworks"
        },
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
      path: "javascript/readings/js-nontech.md",
      name: "Non-technical Overview of JavaScript",
      type: types.reading,
      id: "c30a2c1d-499b-40a6-a65c-960ab179e2e6",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "one",
          subtopicId: "materials"
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
      href:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
      name: "localStorage Documentation",
      type: types.externalResource,
      id: "d3ed0b1c-f93c-4da0-8911-99f99898ae79",
      topicId: "sixD2",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        campusHybrid: {
          topicId: "four",
          subtopicId: "additionalResources"
        },
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href:
        "https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36",
      name: "localStorage Simple Examples",
      type: types.externalResource,
      id: "54075014-8841-44c9-a72a-9f476403e470",
      topicId: "sixD2",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        campusHybrid: {
          topicId: "four",
          subtopicId: "additionalResources"
        },
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://css-tricks.com/debouncing-throttling-explained-examples/",
      name: "Throttling and Debouncing Overview",
      type: types.externalResource,
      id: "8e57bbce-6a7b-4714-822e-fb94bbeae3e6",
      topicId: "sixD2",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        campusHybrid: {
          topicId: "two",
          subtopicId: "additionalResources"
        },
        open: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "html-css/readings/browser_tech.md",
      name: "Technical Overview of Browsers",
      type: types.reading,
      id: "ad8d1c68-cc42-4be0-912d-213f033873de",
      topicId: "six",
      subtopicId: "additionalResources",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "sixD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "six",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "four",
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
      path: "javascript/projects/browser-ttt/README.md",
      name: "Browser TicTacToe",
      type: types.project,
      id: "c36309bc-42c1-497d-b01e-d7afd6f3ffda",
      topicId: "six",
      subtopicId: "projects",
      timeEstimate: "02:30:00",
      solution:
      "https://assets.aaonline.io/fullstack/javascript/projects/browser-ttt/solution.zip",
      change: {
        live: "exclude",
        open: "exclude",
        campusHybrid: {
          topicId: "four",
          subtopicId: "projects"
        },
        online: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "javascript/projects/pocket_projects/README.md",
      name: "Pocket Projects",
      type: types.project,
      id: "6496be0c-4512-45cd-a42f-ee36923a85a7",
      topicId: "six",
      subtopicId: "projects",
      timeEstimate: "05:00:00",
      solution:
      "https://assets.aaonline.io/fullstack/javascript/projects/pocket_projects/solution.zip",
      change: {
        open: "exclude",
        campusHybrid: {
          topicId: "four",
          subtopicId: "projects"
        },
        online: {
          topicId: "sixD2",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "six",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "sixD2",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "javascript/projects/jquery_lite/README.md",
      name: "jQuery Lite",
      type: types.project,
      id: "c14b6947-7e03-469b-a3e4-dbe77655d67e",
      topicId: "six",
      subtopicId: "projects",
      timeEstimate: "05:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/jquery_lite/solution.zip",
      change: {
        campusHybrid: "exclude",
        online: {
          topicId: "six",
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
      }
    },
    {
      repo: "curriculum",
      path: "javascript/projects/mail/README.md",
      name: "Mail",
      type: types.project,
      id: "bb7d232e-8dc1-4dcd-9690-2498ae2a425a",
      topicId: "six",
      subtopicId: "projects",
      timeEstimate: "03:00:00",
      solution:
        "https://assets.aaonline.io/fullstack/javascript/projects/mail/solution.zip",
      change: {
        campusHybrid: "exclude",
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
        }
      }
    }
  ]
};

module.exports = courses;
