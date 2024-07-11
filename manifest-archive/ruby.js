const openTopics = [
  { id: "welcome", name: "Getting Started" },
  { id: "enumerablesAndDebugging", name: "Enumerables and Debugging" },
  { id: "reference", name: "Reference" },
  { id: "recursion", name: "Recursion" },
  { id: "git", name: "Git" },
  { id: "dataStructures", name: "Data Structures" },
  { id: "oop", name: "Object-oriented programming" },
  { id: "oopD2", name: "OOP Contin." },
  { id: "tdd", name: "RSpec and TDD" },
  { id: "bigO", name: "Big-O" },
  { id: "lruCache", name: "LRU Cache" }
];

const liveTopics = [
  { id: "welcome", name: "Getting Started" },
  { id: "enumerablesAndDebugging", name: "Enumerables and Debugging (W1D1)" },
  { id: "reference", name: "Reference (W1D2)" },
  { id: "recursion", name: "Recursion (W1D3)" },
  { id: "git", name: "Git (W1D4)" },
  { id: "dataStructures", name: "Data Structures (W1D5)" },
  { id: "oop", name: "Object-oriented programming (W2D1)" },
  { id: "oopD2", name: "OOP Contin. W2D2)" },
  { id: "tdd", name: "RSpec and TDD (W2D3)" },
  { id: "bigO", name: "Big-O (W2D4)" },
  { id: "lruCache", name: "LRU Cache (W2D5)" }
];

const onlineTopics = [
  { id: "welcome", name: "Getting Started" },
  { id: "enumerablesAndDebugging", name: "Enumerables and Debugging (W5D1)" },
  { id: "reference", name: "Reference (W5D2)" },
  { id: "recursion", name: "Recursion (W5D3)" },
  { id: "git", name: "Git (W5D4)" },
  { id: "review_d1", name: "Review Day (W5D5)" },
  { id: "dataStructures", name: "Data Structures (W6D1)" },
  { id: "dataStructuresD2", name: "DS Contin. (W6D2)" },
  { id: "oop", name: "Object-oriented programming (W6D3)" },
  { id: "oopD2", name: "Chess Contin. (W6D4)" },
  { id: "tdd", name: "RSpec and TDD (W6D5)" },
  { id: "bigO", name: "Big-O (W7D1)" },
  { id: "review_d2", name: "Review Day (W7D2)" },
  { id: "lruCache", name: "LRU Cache (W7D3)" }
];

const SWEInPersonTopics = [
  { id: "welcome", name: "Getting Started" },
  { id: "enumerablesAndDebugging", name: "Enumerables and Debugging (W3D1)" },
  { id: "reference", name: "Reference (W3D2)" },
  { id: "recursion", name: "Recursion (W3D3)" },
  { id: "git", name: "Git (W3D4)" },
  { id: "dataStructures", name: "Data Structures (W3D5)" },
  { id: "dataStructuresD2", name: "DS Contin. (W4D1)" },
  { id: "oop", name: "Object-oriented programming (W4D2)" },
  { id: "oopD2", name: "Chess Contin. (W4D3)" },
  { id: "tdd", name: "RSpec and TDD (W4D4)" },
  { id: "bigO", name: "Big-O (W4D5)" },
  { id: "lruCache", name: "LRU Cache (W5D1)" }
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

const ruby = {
  courses: {
    campusHybrid: {
      taskGroupId: "d7e8360d-fe21-478e-9ce1-33eecaaac6cb",
      name: "Ruby",
      track: "SWE Campus Hybrid",
      urls: ["campus-hybrid-ruby"],
      description: "All about ruby!",
      tags: ["ruby"],
      catalog: false,
      topics: SWEInPersonTopics,
      subtopics: subtopics,
      order: 4
    },
    live: {
      taskGroupId: "2356fb23-8e6c-48e3-9678-681d4229c96e",
      name: "Ruby",
      track: "Full Stack In Person",
      urls: ["full-stack-in-person-ruby"],
      description: "All about ruby!",
      tags: ["ruby"],
      catalog: false,
      topics: liveTopics,
      subtopics: subtopics,
      order: 4
    },
    inPerson: {
      taskGroupId: "459f23b3-d44f-44b9-9c0b-aaa39225cafc",
      name: "Ruby",
      track: "SWE In Person",
      description: "All about ruby!",
      tags: ["ruby"],
      catalog: false,
      urls: ["swe-in-person-ruby"],
      topics: SWEInPersonTopics,
      subtopics: subtopics,
      order: 4
    },
    inPersonNYC: {
      taskGroupId: "28aa086f-87d7-4154-b03c-149aabab108e",
      name: "Ruby",
      track: "SWE In Person NYC",
      description: "All about ruby!",
      tags: ["ruby"],
      catalog: false,
      urls: ["swe-in-person-ruby"],
      topics: SWEInPersonTopics,
      subtopics: subtopics,
      order: 4
    },
    open: {
      taskGroupId: "b091e487-0516-4bda-aa2c-b5f52d7dd49a",
      name: "Ruby",
      track: "Full Stack Online",
      urls: ["full-stack-online-ruby"],
      description: "All about ruby!",
      tags: ["ruby"],
      catalog: false,
      topics: openTopics,
      subtopics: subtopics,
      order: 4
    },
    online: {
      taskGroupId: "ea3a0bf9-d897-4b0f-bf53-4990edee9469",
      name: "Ruby",
      track: "SWE Online",
      urls: ["swe-online-ruby"],
      description: "All about ruby!",
      tags: ["ruby"],
      catalog: false,
      topics: onlineTopics,
      subtopics: subtopics,
      order: 4
    }
  },
  tasks: [
    {
      name: "SF Logistics",
      type: types.reading,
      id: "0202e56e-4bb4-4f6d-94e3-ed528b7f03f4",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/logistics/sf.md",
      timeEstimate: "00:10:00",
      change: {
        online: "exclude",
        open: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "NYC Logistics",
      type: types.reading,
      id: "b5e7d7b0-b650-475c-b77a-6a559c9e8572",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/logistics/nyc-159_w_25.md",
      timeEstimate: "00:10:00",
      change: {
        online: "exclude",
        open: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Daily Requirements",
      type: types.reading,
      id: "6184062a-e215-435d-b8b9-b697086cb558",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/daily-requirements.md",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Working In Class",
      type: types.reading,
      id: "96576f46-bec8-41e2-ba42-d1d1e300a965",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/working-in-class.md",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Homework and Classwork",
      type: types.reading,
      id: "e3d57406-577e-4940-b5b0-2bf4f06d5453",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/homework-and-classwork.md",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Assessments and Advice",
      type: types.reading,
      id: "140ff5a4-6fad-4bed-a0b9-2ce196c51cff",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/assessments.md",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Looking Things Up",
      type: types.reading,
      id: "0abc8cab-62f9-4739-991a-61682157151e",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/looking-things-up.md",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Pair Programming",
      type: types.reading,
      id: "aba172ac-0416-48cb-b09f-7a4327a3ae41",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/pair-programming.md",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Ergonomics",
      type: types.reading,
      id: "02a53cf7-e05e-40f8-a3a3-b71cbef51512",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/ergonomics.md",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Diversity and Culture in Tech",
      type: types.reading,
      id: "70010947-4f0f-4286-8fb9-a03a73f30d23",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/diversity_reading.md",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Code of Conduct",
      type: types.reading,
      id: "635bc3f7-2ccb-4034-afb9-90bd9b071133",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/code-of-conduct.md",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Illness Policy",
      type: types.reading,
      id: "583e4f45-8392-4e94-9747-fd704f479af7",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/illness.md",
      timeEstimate: "00:03:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Strike Policy",
      type: types.reading,
      id: "9820de1c-a65d-498a-8502-70dda989333d",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/strike-policy.md",
      timeEstimate: "00:07:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Book List",
      type: types.reading,
      id: "be42967e-6e31-40b5-8939-d102388657d0",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/book-list.md",
      timeEstimate: "00:02:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Keyboard Shortcuts",
      type: types.reading,
      id: "3c6e04b1-5cb0-4d24-8d78-1980adf01f74",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "setup/shortcuts.md",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Assessment Checker",
      type: types.reading,
      id: "958ee9ab-1e36-4d13-b90e-c3956c100314",
      topicId: "welcome",
      subtopicId: "none",
      repo: "meta",
      path: "first-day-instructions/assessment-checker/README.md",
      timeEstimate: "00:15:00",
      change: {
        open: "exclude",
        online: {
          topicId: "welcome",
          subtopicId: "none"
        },
        inPersonNYC: "exclude"
      }
    },
    {
      //module summary
      name: "Ruby Module",
      type: types.reading,
      id: "8487e84c-049a-4305-88a3-1ab6609728da",
      topicId: "welcome",
      subtopicId: "none",
      repo: "curriculum",
      path: "ruby/Ruby_Overview.md",
      timeEstimate: "00:05:00",
      change: {
        online: "exclude",
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      //online module summary
      name: "Online Ruby Module",
      type: types.reading,
      id: "6b0fafd8-3952-488e-abf9-305756f4ce2b",
      topicId: "welcome",
      subtopicId: "none",
      repo: "curriculum",
      path: "ruby/Online_Ruby_Overview.md",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      // 16 week module summary
      name: "In Person Ruby Module",
      type: types.reading,
      id: "7afff972-efbf-49f3-a0b6-ba7eadd72e46",
      topicId: "welcome",
      subtopicId: "none",
      repo: "curriculum",
      path: "ruby/InPerson_Ruby_Overview.md",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        online: "exclude",
        live: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      // 16 week NYC module summary
      name: "In Person Ruby Module",
      type: types.reading,
      id: "5c07e2c2-ed34-4b72-8ffd-40c6b0de016c",
      topicId: "welcome",
      subtopicId: "none",
      repo: "curriculum",
      path: "ruby/InPersonNYC_Ruby_Overview.md",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        online: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude"
      }
    },
    {
      name: "Setting up a Development Environment (Phase 1)",
      type: types.reading,
      id: "152502c5-7be3-47b4-a33a-e2393d7e8a70",
      topicId: "welcome",
      subtopicId: "none",
      repo: "curriculum",
      path: "course/readings/dev-setup.md",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "welcome",
          subtopicId: "none"
        },
        online: {
          topicId: "welcome",
          subtopicId: "none"
        }
      }
    },
    {
      name: "Nontechnical Overview of Ruby",
      type: types.reading,
      id: "2373aaa6-6098-4740-b78f-6f9450475ded",
      topicId: "enumerablesAndDebugging",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/readings/ruby_nontech.md",
      timeEstimate: "00:15:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "materials"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Debugging",
      type: types.reading,
      id: "571086fa-414b-48f3-bf92-acb1dc220838",
      topicId: "enumerablesAndDebugging",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/readings/debugger.md",
      timeEstimate: "00:20:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "materials"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Common Exceptions",
      type: types.reading,
      id: "69a04114-a13a-4fb3-90b7-0ec8d93576ba",
      topicId: "enumerablesAndDebugging",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/readings/common-exceptions.md",
      timeEstimate: "00:15:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "materials"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "More Byebug Commands: display and where",
      type: types.reading,
      id: "c38091fc-4d0e-460a-aa8c-3bf8a529556d",
      topicId: "enumerablesAndDebugging",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "ruby/readings/bonus-debugger.md",
      timeEstimate: "00:15:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Debugging Cheatsheet",
      type: types.reading,
      id: "aa33fad0-669d-455b-aff2-52c38fd5aa07",
      topicId: "enumerablesAndDebugging",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "ruby/readings/debugging_cheatsheet.md",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Breaking Methods Into Parts",
      type: types.reading,
      id: "f27812be-34e0-4328-aa5c-0c31b0c96022",
      topicId: "enumerablesAndDebugging",
      subtopicId: "additionalResources",
      repo: "curriculum",
      path: "ruby/readings/breaking-into-parts.md",
      timeEstimate: "00:15:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Enumerables",
      type: types.project,
      id: "78970365-6cf9-4028-938f-8420dd9021a8",
      topicId: "enumerablesAndDebugging",
      subtopicId: "projects",
      repo: "curriculum",
      path: "ruby/projects/enumerables/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/enumerables/solution.zip",
      timeEstimate: "03:00:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "projects"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Ghost",
      type: types.project,
      id: "1df753e0-63f3-45c6-8fdc-d9004e057247",
      topicId: "enumerablesAndDebugging",
      subtopicId: "projects",
      repo: "curriculum",
      path: "ruby/projects/ghost/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/ghost/solution.zip",
      timeEstimate: "05:30:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "projects"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Maze Solver (Bonus)",
      repo: "curriculum",
      path: "ruby/projects/maze_solver/README.md",
      type: types.project,
      id: "f6360d61-e802-439c-95e5-34cc2b71260c",
      topicId: "enumerablesAndDebugging",
      subtopicId: "bonus",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/maze_solver/solution.zip",
      timeEstimate: "04:00:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "bonus"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "bonus"
        }
      }
    },
    {
      name: "Eight Queens Puzzle (Bonus)",
      type: types.externalResource,
      id: "77c2a54f-72af-4b43-9f24-47095ee294d4",
      topicId: "enumerablesAndDebugging",
      subtopicId: "bonus",
      href: "https://en.wikipedia.org/wiki/Eight_queens_puzzle",
      timeEstimate: "04:00:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "bonus"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "bonus"
        }
      }
    },
    {
      name: "Project Euler (Bonus)",
      type: types.externalResource,
      id: "34d9a64d-e61f-44ab-a0bf-a93452ebf049",
      topicId: "enumerablesAndDebugging",
      subtopicId: "bonus",
      href: "https://projecteuler.net/problems",
      timeEstimate: "04:00:00",
      change: {
        open: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "bonus"
        },
        online: {
          topicId: "enumerablesAndDebugging",
          subtopicId: "bonus"
        }
      }
    },
    {
      name: "References Video",
      type: types.video,
      id: "55308b7a-6fc0-4180-ac33-9a63a4eff086",
      topicId: "reference",
      subtopicId: "materials",
      href: "https://player.vimeo.com/video/165965713",
      timeEstimate: "00:20:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "materials"
        },
        online: {
          topicId: "reference",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "References",
      type: types.reading,
      id: "7489b51f-bd7b-45a1-9a6d-0f27136fde25",
      topicId: "reference",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/readings/references.md",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "materials"
        },
        online: {
          topicId: "reference",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Array/Hash Defaults",
      type: types.reading,
      id: "afb99d1b-ae17-4efc-9c7f-adc4e23db865",
      topicId: "reference",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/readings/array-hash-defaults.md",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "materials"
        },
        online: {
          topicId: "reference",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Scope",
      type: types.reading,
      id: "69703f21-5598-4431-8106-771f956fed98",
      topicId: "reference",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/readings/scope.md",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "materials"
        },
        online: {
          topicId: "reference",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "DRY (Dont Repeat Yourself)",
      type: types.reading,
      id: "5b445f83-07c7-4060-b289-a830fe7cafba",
      topicId: "reference",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/readings/dry.md",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "materials"
        },
        online: {
          topicId: "reference",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Method Decomposition & Design",
      type: types.reading,
      id: "4346aef0-4030-4dae-97cd-8c39b9108af5",
      topicId: "reference",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/readings/method-decomposition.md",
      timeEstimate: "00:20:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "materials"
        },
        online: {
          topicId: "reference",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Refactoring and Code Smells",
      type: types.reading,
      id: "7f98a941-32ee-4418-a911-a518bd9b7e6a",
      topicId: "reference",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/readings/refactoring.md",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "materials"
        },
        online: {
          topicId: "reference",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Reference Quiz",
      type: types.quiz,
      id: "d1502663-f228-4ce4-b3d8-9409386fed78",
      topicId: "reference",
      subtopicId: "materials",
      repo: "curriculum",
      path: "ruby/quizzes/reference.md",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "reference",
          subtopicId: "materials"
        },
        open: {
          topicId: "reference",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "VSCode Cheatsheet",
      repo: "curriculum",
      path: "course/readings/vscode_cheatsheet.md",
      type: types.reading,
      id: "eb913fd2-f628-4d5c-bec9-0318e7fe20fb",
      topicId: "reference",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "reference",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Testing Small (from Memory Puzzle)",
      repo: "curriculum",
      path: "ruby/readings/testing-small.md",
      type: types.reading,
      id: "b6d1c237-2ed1-4308-8451-c45b33b3c4fa",
      topicId: "reference",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "reference",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "my_flatten Solution Video",
      type: types.video,
      id: "648e05e4-4aa4-4383-8516-bb563ea802a4",
      topicId: "reference",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/336469470",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "my_zip Solution Video",
      type: types.video,
      id: "bf1c35de-8945-4f5c-ac84-166f35a9d90a",
      topicId: "reference",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/336469834",
      timeEstimate: "00:13:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "my_rotate Solution Video",
      type: types.video,
      id: "c1c0b163-fefc-41ee-b7c9-95a75d4757f2",
      topicId: "reference",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/336470349",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Pass by Reference Lecture",
      type: types.video,
      id: "e7ae3f90-6feb-476f-8637-aceb2b95a159",
      topicId: "reference",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/336470662",
      timeEstimate: "00:30:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Hash Defaults Lecture",
      type: types.video,
      id: "b7f6c26f-cbc9-46a4-9a42-7c2bd851c722",
      topicId: "reference",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/336471687",
      timeEstimate: "00:21:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Block and Procs Lecture",
      type: types.video,
      id: "56ee162c-5471-4a82-af08-1db7b2912eef",
      topicId: "reference",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/336472385",
      timeEstimate: "00:11:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Methods Lecture",
      type: types.video,
      id: "1216260d-7f1e-4c91-abef-81cc734e0055",
      topicId: "reference",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/336472772",
      timeEstimate: "00:11:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Memory Puzzle",
      type: types.project,
      id: "13ec399c-fdfe-46aa-b72f-d88e8e68202e",
      topicId: "reference",
      subtopicId: "projects",
      repo: "curriculum",
      path: "ruby/projects/memory/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/memory/solution.zip",
      timeEstimate: "05:00:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "projects"
        },
        online: {
          topicId: "reference",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Sudoku",
      type: types.project,
      id: "3021cfb6-ea64-402a-acb0-d8f40562150f",
      topicId: "reference",
      subtopicId: "projects",
      repo: "curriculum",
      path: "ruby/projects/sudoku/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/sudoku/solution.zip",
      timeEstimate: "05:00:00",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "projects"
        },
        online: {
          topicId: "reference",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Recursion Intro",
      type: types.video,
      id: "cb3a01ab-88db-4039-b9f0-76d893f423fb",
      topicId: "recursion",
      subtopicId: "materials",
      href: "https://player.vimeo.com/video/162569408",
      timeEstimate: "00:20:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "materials"
        },
        online: {
          topicId: "recursion",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Recursion vs Iteration",
      href: "https://player.vimeo.com/video/162569439",
      type: types.video,
      id: "a702fc6f-6a36-40da-bff2-70702396dad0",
      topicId: "recursion",
      subtopicId: "materials",
      timeEstimate: "00:02:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "materials"
        },
        online: {
          topicId: "recursion",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Upcase and Reverse Demo",
      href: "https://player.vimeo.com/video/162569447",
      type: types.video,
      id: "a87510fb-ca92-451c-ace1-e40cee2b57ee",
      topicId: "recursion",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "materials"
        },
        online: {
          topicId: "recursion",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Quicksort Intro",
      href: "https://player.vimeo.com/video/162569453",
      type: types.video,
      id: "19a74395-7cb3-4f80-8550-2822e2a6bc13",
      topicId: "recursion",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "materials"
        },
        online: {
          topicId: "recursion",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Quicksort Demo",
      href: "https://player.vimeo.com/video/162569463",
      type: types.video,
      id: "d2a9e6c8-f900-49c7-aead-7c2f73ecd4dc",
      topicId: "recursion",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "materials"
        },
        online: {
          topicId: "recursion",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Stack Overflow Demo",
      href: "https://player.vimeo.com/video/162569490",
      type: types.video,
      id: "9bdcc4fd-7daf-406d-8718-c4d5c441f3be",
      topicId: "recursion",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "materials"
        },
        online: {
          topicId: "recursion",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "The Stack",
      href: "https://player.vimeo.com/video/162571286",
      type: types.video,
      id: "542862c9-4862-4ef7-b859-ac84d01314bc",
      topicId: "recursion",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "materials"
        },
        online: {
          topicId: "recursion",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Recursion",
      repo: "curriculum",
      path: "ruby/readings/recursion.md",
      type: types.reading,
      id: "d6b10ae2-4c97-43d6-9972-4a2bf1064c0c",
      topicId: "recursion",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "materials"
        },
        online: {
          topicId: "recursion",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Recursion Quiz",
      repo: "curriculum",
      path: "ruby/quizzes/recursion.md",
      type: types.quiz,
      id: "2635f4ac-5404-4096-afd7-fe1881c35f79",
      topicId: "recursion",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "recursion",
          subtopicId: "materials"
        },
        open: {
          topicId: "recursion",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "InDepth QuickSort Demo",
      type: types.video,
      id: "0a1ad481-9d47-4ab1-a8df-550faf03d142",
      topicId: "recursion",
      subtopicId: "additionalResources",
      href: "https://player.vimeo.com/video/337154374",
      timeEstimate: "00:15:00",
      change: {}
    },
    {
      name: "Recursion Homework",
      repo: "curriculum",
      path: "ruby/homeworks/recursion/README.md",
      type: types.project,
      id: "e85914ee-72ab-4cb6-a749-8129dd74e0df",
      topicId: "recursion",
      subtopicId: "homeworks",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/homeworks/recursion/solution.rb",
      timeEstimate: "00:50:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "recursion",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Memory Puzzle Solution",
      type: types.video,
      id: "14fe3802-079c-4ccd-8386-91ceb057f5e6",
      topicId: "recursion",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337147003",
      timeEstimate: "00:33:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Recursion Intro Lecture",
      type: types.video,
      id: "af54810f-1ab5-4078-83ec-bf061c165813",
      topicId: "recursion",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337152898",
      timeEstimate: "00:24:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Recursion exercises",
      repo: "curriculum",
      path: "ruby/projects/recursion/README.md",
      type: types.project,
      id: "d16af427-646b-4945-9494-7bc8fda90995",
      topicId: "recursion",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/recursion/solution.zip",
      timeEstimate: "05:00:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "projects"
        },
        online: {
          topicId: "recursion",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Word Chains",
      repo: "curriculum",
      path: "ruby/projects/word_chains/README.md",
      type: types.project,
      id: "3109c459-7665-41a0-b945-502b09fbabc8",
      topicId: "recursion",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/word_chains/solution.zip",
      timeEstimate: "04:00:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "projects"
        },
        online: {
          topicId: "recursion",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "More Recursion Questions (Bonus)",
      repo: "curriculum",
      path: "ruby/projects/more_recursion_exercises/README.md",
      type: types.project,
      id: "abbb78c5-82dd-4fa9-b6ee-a6a07a1845b1",
      topicId: "recursion",
      subtopicId: "bonus",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/more_recursion_exercises/solutions/recursion_problems.rb",
      timeEstimate: "04:00:00",
      change: {
        open: {
          topicId: "recursion",
          subtopicId: "bonus"
        },
        online: {
          topicId: "recursion",
          subtopicId: "bonus"
        }
      }
    },
    {
      name: "Git: Overview and Why We Use Git",
      href: "https://player.vimeo.com/video/171666454",
      type: types.video,
      id: "96a7c55b-6225-4380-8b1b-53a97c24d7fd",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Git: Mental Models",
      href: "https://player.vimeo.com/video/171666455",
      type: types.video,
      id: "2c5b06aa-9bf2-48a4-8cee-5d5537a96fe4",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:18:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Git: Useful Commands",
      href: "https://player.vimeo.com/video/171666453",
      type: types.video,
      id: "8104c6d4-7c94-40d6-9178-c9a5b6067fcb",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:04:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Git: Wrapup",
      href: "https://player.vimeo.com/video/171666456",
      type: types.video,
      id: "0ae0e7e2-fd6b-4141-b3bd-0c2418f37cc0",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:02:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Why Git",
      repo: "curriculum",
      path: "ruby/readings/why-git.md",
      type: types.reading,
      id: "3af0369b-86da-4c2f-812e-6ad105c203c1",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Git Summary",
      repo: "curriculum",
      path: "ruby/readings/git-summary.md",
      type: types.reading,
      id: "b069f983-506b-4be4-a256-b852aba97cb0",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Git Workflow",
      repo: "curriculum",
      path: "ruby/readings/git-workflow.md",
      type: types.reading,
      id: "5a800cfd-57bc-48a8-98ca-4b6663f913bf",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Gems and rbenv",
      repo: "curriculum",
      path: "ruby/readings/gems-and-rbenv.md",
      type: types.reading,
      id: "b65d519e-c065-4391-80b7-8fe3e9d19ea1",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Nontechnical Overview of Git",
      repo: "curriculum",
      path: "ruby/readings/git_nontech.md",
      type: types.reading,
      id: "8ba8759d-220a-44d1-b9b4-ad86d0c10d68",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Nontechnical Overview of Agile Development",
      repo: "curriculum",
      path: "ruby/readings/agile_nontech.md",
      type: types.reading,
      id: "ce2cd1e1-45c9-4cec-9a07-7755e9d46e49",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "materials"
        },
        online: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Git Quiz",
      repo: "curriculum",
      path: "ruby/quizzes/git.md",
      type: types.quiz,
      id: "86256a9f-f4cf-4cff-b0ee-fb5b056849ed",
      topicId: "git",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "git",
          subtopicId: "materials"
        },
        open: {
          topicId: "git",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Git Workflow Exercises",
      repo: "curriculum",
      path: "ruby/homeworks/git-workflow-exercises.md",
      type: types.reading,
      id: "58d4ecb9-09d5-464b-a3ff-6da1716a3ab9",
      topicId: "git",
      subtopicId: "homeworks",
      timeEstimate: "00:20:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "git",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Merge Sort Solution",
      type: types.video,
      id: "03c14cae-203b-42e3-bf1e-e2c2d467bc4f",
      topicId: "git",
      subtopicId: "additionalResources",
      href: "https://player.vimeo.com/video/337155330",
      timeEstimate: "00:26:00",
      change: {
        open: "exclude",
        online: "exclude"
      }
    },
    {
      name: "bSearch Solution",
      type: types.video,
      id: "173b1acc-3d75-4af2-8595-77d4a6d3980c",
      topicId: "git",
      subtopicId: "additionalResources",
      href: "https://player.vimeo.com/video/337165165",
      timeEstimate: "00:14:00",
      change: {
        open: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Serialization (JSON and YAML)",
      repo: "curriculum",
      path: "ruby/readings/serialization.md",
      type: types.reading,
      id: "02678b75-0086-470d-b492-a297d991c8a4",
      topicId: "git",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "git",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Git add",
      repo: "curriculum",
      path: "ruby/readings/git-add.md",
      type: types.reading,
      id: "e63917ed-b119-4538-a3a9-0cbefa540e26",
      topicId: "git",
      subtopicId: "additionalResources",
      timeEstimate: "00:06:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "git",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Git Repository Clean Up",
      repo: "curriculum",
      path: "ruby/readings/git-repository-cleanup.md",
      type: types.reading,
      id: "23d8398d-2c07-488c-b962-6711093ebb57",
      topicId: "git",
      subtopicId: "additionalResources",
      timeEstimate: "00:04:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "git",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Faster Git with aliases",
      repo: "curriculum",
      path: "ruby/readings/alias.md",
      type: types.reading,
      id: "da83e85c-b2b5-4e01-963d-c3f3ddec2096",
      topicId: "git",
      subtopicId: "additionalResources",
      timeEstimate: "00:07:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "git",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Fixing Git commit authorship",
      repo: "curriculum",
      path: "ruby/readings/git-fix-authorship.md",
      type: types.reading,
      id: "08acb81f-edb4-48ce-b42b-e80dbe6bea8b",
      topicId: "git",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "git",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Git Cheatsheet",
      href: "http://www.ndpsoftware.com/git-cheatsheet.html",
      type: types.externalResource,
      id: "6e98493f-014c-460f-8079-e38dc273307f",
      topicId: "git",
      subtopicId: "additionalResources",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "git",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Student Github Repo Example",
      href: "https://github.com/aa-repo-examples",
      type: types.externalResource,
      id: "40412010-eca5-45c4-8b03-f65a93d214e0",
      topicId: "git",
      subtopicId: "additionalResources",
      timeEstimate: "00:05:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "git",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Git Lecture",
      type: types.video,
      id: "9558580d-29ef-4079-b608-66e7f0d87598",
      topicId: "git",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337165903",
      timeEstimate: "00:33:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Screwedoku",
      repo: "curriculum",
      path: "ruby/projects/screwdoku/README.md",
      type: types.project,
      id: "9c955197-82d2-444b-8497-55e30f1ceac9",
      topicId: "git",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/sudoku/solution.zip",
      timeEstimate: "03:00:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "projects"
        },
        online: {
          topicId: "git",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Review Day",
      repo: "curriculum",
      path: "ruby/readings/review/review_i.md",
      type: types.reading,
      id: "aed5b7df-6913-4b30-9896-cd49ca4b19ba",
      topicId: "review_d1",
      subtopicId: "projects",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "White Boarding Problems",
      repo: "curriculum",
      path: "ruby/readings/review/white_boarding/day_one.md",
      type: types.reading,
      id: "b0a9318f-5818-4911-a26f-d5b7dce1a293",
      topicId: "review_d1",
      subtopicId: "projects",
      timeEstimate: "02:00:00",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Afternoon Project Review",
      repo: "curriculum",
      path: "ruby/readings/review/project_review_i.md",
      type: types.reading,
      id: "5a135196-db6d-4d49-ab62-354ed8643bd7",
      topicId: "review_d1",
      subtopicId: "projects",
      timeEstimate: "05:00:00",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "Minesweeper",
      repo: "curriculum",
      path: "ruby/projects/minesweeper/README.md",
      type: types.project,
      id: "5921d651-b107-45a1-b3b2-62d679733be1",
      topicId: "git",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/minesweeper/solution.zip",
      timeEstimate: "05:00:00",
      change: {
        open: {
          topicId: "git",
          subtopicId: "projects"
        },
        online: {
          topicId: "git",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "assessment-prep",
      path: "ruby_1.md",
      name: "Ruby 1 Practice Assessment",
      type: types.reading,
      id: "6ed8a800-14ac-4e06-a1e0-0ad2c27fc198",
      topicId: "git",
      subtopicId: "assessment",
      timeEstimate: "00:50:00",
      change: {
        open: "exclude",
        online: {
          topicId: "git",
          subtopicId: "assessment"
        }
      }
    },
    {
      name: "Data Structures",
      href: "https://player.vimeo.com/video/162763729",
      type: types.video,
      id: "7079ef1d-b34c-47bf-8fa0-6eef5034c684",
      topicId: "dataStructures",
      subtopicId: "materials",
      timeEstimate: "00:40:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "materials"
        },
        online: {
          topicId: "dataStructures",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "DFS",
      href: "https://player.vimeo.com/video/162763740",
      type: types.video,
      id: "9ab697cd-838d-40c9-9463-f9dd2b841d53",
      topicId: "dataStructures",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "materials"
        },
        online: {
          topicId: "dataStructures",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Intro to Algorithms and Data Structures",
      repo: "curriculum",
      path: "ruby/readings/intro-algorithms-and-data-structures.md",
      type: types.reading,
      id: "6f8258a5-9e4b-45b9-b0d1-ba9fb97a2eea",
      topicId: "dataStructures",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "materials"
        },
        online: {
          topicId: "dataStructures",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Inspecting Complex Elements",
      repo: "curriculum",
      path: "ruby/readings/overriding_inspect.md",
      type: types.reading,
      id: "d07ada7c-b527-48a1-b267-97050c5004f9",
      topicId: "dataStructures",
      subtopicId: "materials",
      timeEstimate: "00:15:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "materials"
        },
        online: {
          topicId: "dataStructures",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Data Structures Quiz",
      repo: "curriculum",
      path: "ruby/quizzes/data_structures.md",
      type: types.quiz,
      id: "617979e4-6adc-4d6e-b1eb-e7d8c5ac37fc",
      topicId: "dataStructures",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "dataStructures",
          subtopicId: "materials"
        },
        open: {
          topicId: "dataStructures",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Homeworks with Git",
      repo: "curriculum",
      path: "ruby/homeworks/git-homeworks.md",
      type: types.reading,
      id: "d3490d16-9e5a-4733-aeb1-95f4c958ccc3",
      topicId: "dataStructures",
      subtopicId: "homeworks",
      timeEstimate: "00:10:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "dataStructures",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "DIY ADTs",
      repo: "curriculum",
      path: "ruby/homeworks/abstract_data_types/README.md",
      type: types.project,
      id: "b19d9b11-96d1-45da-922f-dcd428001dfb",
      topicId: "dataStructures",
      subtopicId: "homeworks",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/homeworks/abstract_data_types/solution.rb",
      timeEstimate: "00:45:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "dataStructures",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "ADT - Stack & Queues Lecture",
      type: types.video,
      id: "79d57f1b-f754-41c5-ab11-c2e3f3d19109",
      topicId: "dataStructures",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337176180",
      timeEstimate: "00:09:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Binary Trees & DFS Lecture",
      type: types.video,
      id: "057d1855-8cde-4426-9c2e-dd43c035d1d4",
      topicId: "dataStructures",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337177768",
      timeEstimate: "00:14:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Binary Trees & BFS Lecture",
      type: types.video,
      id: "ed9a79fc-92c1-47ce-b54a-4cf616ecf91d",
      topicId: "dataStructures",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337181557",
      timeEstimate: "00:13:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Intro data structures: PolyTreeNode",
      repo: "curriculum",
      path: "ruby/projects/poly_tree_node/README.md",
      type: types.project,
      id: "6d130b94-1f9f-4128-b91b-aa53c2b8db0f",
      topicId: "dataStructures",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/poly_tree_node/solution.zip",
      timeEstimate: "01:30:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "projects"
        },
        online: {
          topicId: "dataStructures",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Ruby 1 Assessment",
      repo: "curriculum",
      path: "course/assessment-day.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "e3eb8653-8631-43a9-8a18-413216aedbf1",
      topicId: "dataStructures",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        inPerson: {
          topicId: "dataStructuresD2",
          subtopicId: "assessment"
        },
        inPersonNYC: {
          topicId: "dataStructuresD2",
          subtopicId: "assessment"
        },
        campusHybrid: {
          topicId: "dataStructuresD2",
          subtopicId: "assessment"
        },
        live: {
          topicId: "oop",
          subtopicId: "assessment"
        }
      }
    },
    {
      name: "Study Guide - Ruby 2",
      repo: "swe_assessments",
      path: "ruby_assessment_2/README.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "fa9a8ac8-3b87-41aa-8c37-1520ac56c3dc",
      topicId: "dataStructures",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        inPerson: {
          topicId: "dataStructuresD2",
          subtopicId: "assessment"
        },
        inPersonNYC: {
          topicId: "dataStructuresD2",
          subtopicId: "assessment"
        },
        campusHybrid: {
          topicId: "dataStructuresD2",
          subtopicId: "assessment"
        },
        online: {
          topicId: "dataStructuresD2",
          subtopicId: "assessment"
        },
        live: "exclude"
      }
    },
    {
      name: "Graph Intro",
      repo: "curriculum",
      path: "ruby/readings/graph_nodes_reading.md",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "63861d34-13f5-44c4-8cc2-0766753b34f1",
      topicId: "dataStructuresD2",
      subtopicId: "materials",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Graph Traversal",
      repo: "curriculum",
      path: "ruby/readings/graph_traversal_notes_reading.md",
      timeEstimate: "00:25:00",
      type: types.reading,
      id: "947d7ff3-741a-4ca4-8158-4cc44d39bc31",
      topicId: "dataStructuresD2",
      subtopicId: "materials",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Empathetic Communication Workshop",
      repo: "curriculum",
      path: "course/readings/giving_and_receiving_feedback_workshop.md",
      timeEstimate: "00:30:00",
      type: types.reading,
      id: "a853b3fa-7044-4dcb-9461-c3eb1ecf69e5",
      topicId: "dataStructuresD2",
      subtopicId: "culture",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude",
        campusHybrid: {
          topicId: "dataStructuresD2",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Graph Nodes and BFS",
      repo: "curriculum",
      path: "ruby/homeworks/graphs/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/homeworks/graphs/solution.rb",
      timeEstimate: "00:40:00",
      type: types.project,
      id: "5c18ede3-af96-45cc-b83e-1cfd0e4ebbb6",
      topicId: "dataStructuresD2",
      subtopicId: "homeworks",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Knights Travails",
      repo: "curriculum",
      path: "ruby/projects/knights_travails/README.md",
      type: types.project,
      id: "8bcd585c-3d67-4708-811d-a639aefd84a4",
      topicId: "dataStructures",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/knights_travails/solution.zip",
      timeEstimate: "04:00:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "projects"
        },
        online: {
          topicId: "dataStructures",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Knights Travails (Part Two)",
      repo: "curriculum",
      path: "ruby/projects/knights_travails/part_two.md",
      type: types.project,
      id: "7c6717b9-fe39-457d-84b0-2e74f7cd0cdd",
      topicId: "dataStructures",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/knights_travails/solution.zip",
      timeEstimate: "04:00:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "dataStructuresD2",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "dataStructuresD2",
          subtopicId: "projects"
        },
        online: {
          topicId: "dataStructuresD2",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Tic-Tac-Toe AI",
      repo: "curriculum",
      path: "ruby/projects/tic_tac_toe_ai/README.md",
      type: types.project,
      id: "7a786986-4591-41e0-81b7-476fd0b7744e",
      topicId: "dataStructures",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/tic_tac_toe_ai/solution.zip",
      timeEstimate: "05:00:00",
      change: {
        open: {
          topicId: "dataStructures",
          subtopicId: "projects"
        },
        online: {
          topicId: "dataStructuresD2",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "dataStructuresD2",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "dataStructuresD2",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Inheritance",
      repo: "curriculum",
      path: "ruby/readings/inheritance.md",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "c8d695da-3b3a-4f6f-a69a-bac2ff1bf051",
      topicId: "oop",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "materials"
        },
        online: {
          topicId: "oop",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Exceptions, error handling",
      repo: "curriculum",
      path: "ruby/readings/errors.md",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "cd127a8f-510c-4755-a47c-b6a3726bdac0",
      topicId: "oop",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "materials"
        },
        online: {
          topicId: "oop",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Decomposition into objects",
      repo: "curriculum",
      path: "ruby/readings/object-decomposition.md",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "d0ca67d6-8959-4cbb-b479-5204657c1d75",
      topicId: "oop",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "materials"
        },
        online: {
          topicId: "oop",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Inheritance and DRY",
      repo: "curriculum",
      path: "ruby/readings/inheritance-design.md",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "509c850d-1679-41a2-8686-2f04e7ecc716",
      topicId: "oop",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "materials"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Information hiding/encapsulation",
      repo: "curriculum",
      path: "ruby/readings/hiding.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "4399e8fd-37ae-4e13-904a-71cb3a1815bf",
      topicId: "oop",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "materials"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "UML",
      repo: "curriculum",
      path: "ruby/readings/uml.md",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "a630bfab-e0e5-46d4-aeab-bfe73198caaf",
      topicId: "oop",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "materials"
        },
        online: {
          topicId: "oop",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Singleton",
      href:
        "http://ruby-doc.org/stdlib-1.9.3/libdoc/singleton/rdoc/Singleton.html#module-Singleton-label-Usage",
      timeEstimate: "00:02:00",
      type: types.externalResource,
      id: "9f7f9d5e-a1d7-447f-a57d-b3716d90f5b3",
      topicId: "oop",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "materials"
        },
        online: {
          topicId: "oop",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "OOP Quiz 1",
      repo: "curriculum",
      path: "ruby/quizzes/oop_1.md",
      timeEstimate: "00:00:10",
      type: types.quiz,
      id: "8bfc3367-3706-42ff-b30c-b94fc7056d24",
      topicId: "oop",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "materials"
        },
        online: {
          topicId: "oop",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Simon",
      repo: "curriculum",
      path: "ruby/homeworks/simon/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/homeworks/simon/solution.zip",
      timeEstimate: "00:45:00",
      type: types.project,
      id: "c5f72c51-c03d-4558-9c4f-023948283e95",
      topicId: "oopD2",
      subtopicId: "homeworks",
      change: {
        open: {
          topicId: "oopD2",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "homeworks"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "homeworks"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Stereotype Threat",
      href:
        "https://www.nytimes.com/2012/10/07/opinion/sunday/intelligence-and-the-stereotype-threat.html",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "b63a9767-b7d5-404c-b15c-d61cc958fb12",
      topicId: "oop",
      subtopicId: "culture",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "culture"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "culture"
        }
      }
    },
    {
      name: "Unconscious Bias in Tech",
      href:
        "https://medium.com/@aldynchwelos/unconscious-bias-in-tech-why-women-leave-their-engineering-careers-f9653185d17b",
      timeEstimate: "00:08:00",
      type: types.externalResource,
      id: "31341787-12ea-445c-82bc-4ecda64049ae",
      topicId: "oop",
      subtopicId: "culture",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "culture"
        },
        online: {
          topicId: "dataStructuresD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "dataStructuresD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "dataStructuresD2",
          subtopicId: "culture"
        }
      }
    },
    {
      name: "When Algorithms Discriminate",
      href:
        "https://www.nytimes.com/2015/07/10/upshot/when-algorithms-discriminate.html",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "088637d2-2184-46c1-95df-e645c9b63d91",
      topicId: "oop",
      subtopicId: "culture",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "culture"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "culture"
        }
      }
    },
    {
      name: "Implicit Association Test",
      href: "https://implicit.harvard.edu/implicit/takeatest.html",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "ccfae0fe-3b9f-4231-8e9f-fe4c9d81f3d1",
      topicId: "oop",
      subtopicId: "culture",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "culture"
        },
        online: {
          topicId: "dataStructuresD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "dataStructuresD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "dataStructuresD2",
          subtopicId: "culture"
        },

      }
    },
    {
      name: "You're More Biased Than You Think",
      href:
        "https://www.fastcompany.com/3036627/youre-more-biased-than-you-think",
      timeEstimate: "00:07:00",
      type: types.externalResource,
      id: "c2f0fe78-b6f6-47eb-a1e9-5b482d54aeae",
      topicId: "oop",
      subtopicId: "culture",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "culture"
        },
        online: {
          topicId: "dataStructuresD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "dataStructuresD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "dataStructuresD2",
          subtopicId: "culture"
        }
      }
    },
    {
      name: "Seven Day Bias Cleanse",
      href: "http://www.lookdifferent.org/what-can-i-do/bias-cleanse",
      timeEstimate: "00:01:00",
      type: types.externalResource,
      id: "380a22dc-918b-4c2e-87cd-71a9f337b343",
      topicId: "oop",
      subtopicId: "culture",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "culture"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "culture"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "culture"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "culture"
        }
      }
    },
    {
      name: "Error Handling Funtime",
      repo: "curriculum",
      path: "ruby/homeworks/error_handling_funtime/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/homeworks/error_handling_funtime/solution.zip",
      timeEstimate: "00:45:00",
      type: types.project,
      id: "b9829436-83d2-479f-885c-15df655f2ed1",
      topicId: "oop",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "projects"
        },
        online: {
          topicId: "oop",
          subtopicId: "projects"
        },
        inPerson: {
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Class inheritance",
      repo: "curriculum",
      path: "ruby/projects/class_inheritance/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/class_inheritance/solution.zip",
      timeEstimate: "01:30:00",
      type: types.project,
      id: "fea7d7e0-9004-48d2-8dee-30b1c7b958e8",
      topicId: "oop",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "projects"
        },
        online: {
          topicId: "oop",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Chess (Part One)",
      repo: "curriculum",
      path: "ruby/projects/chess/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/chess/solution.zip",
      timeEstimate: "06:00:00",
      type: types.project,
      id: "e31b80b4-3ed5-43ec-94bf-e6c23eaaeabc",
      topicId: "oop",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "projects"
        },
        online: {
          topicId: "oop",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Chess (Part Two)",
      repo: "curriculum",
      path: "ruby/projects/chess/part_two.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/chess/solution.zip",
      timeEstimate: "06:00:00",
      type: types.project,
      id: "369a08ae-8392-48a8-ba77-aea18c3d651b",
      topicId: "oopD2",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "oopD2",
          subtopicId: "projects"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Chess (Part Three)",
      repo: "curriculum",
      path: "ruby/projects/chess/part_three.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/chess/solution.zip",
      timeEstimate: "06:00:00",
      type: types.project,
      id: "209d4fe2-e775-4473-b63e-cc4fac131fc5",
      topicId: "oopD2",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "oopD2",
          subtopicId: "projects"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "OOP Quiz 2",
      repo: "curriculum",
      path: "ruby/quizzes/oop_2.md",
      type: types.quiz,
      id: "6d24b873-5ef1-45f0-a4cc-7ea7a5484ccf",
      topicId: "oopD2",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        open: {
          topicId: "oopD2",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Mancala",
      repo: "curriculum",
      path: "ruby/homeworks/mancala/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/homeworks/mancala/solution.zip",
      timeEstimate: "01:00:00",
      type: types.project,
      id: "e12b31e8-9ff8-4e49-b292-3ce7883c05e6",
      topicId: "oop",
      subtopicId: "homeworks",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "oop",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Knight's Travails Solution",
      type: types.video,
      id: "73c99a80-ab7f-47b2-bed8-072d618c5609",
      topicId: "oop",
      subtopicId: "additionalResources",
      href: "https://player.vimeo.com/video/337182911",
      timeEstimate: "00:08:00",
      change: {
        open: "exclude",
        online: "exclude"
      }
    },
    {
      name: "TTT Solution",
      type: types.video,
      id: "0046a82b-5dc9-4559-b7c2-e6e6a01fa638",
      topicId: "oop",
      subtopicId: "additionalResources",
      href: "https://player.vimeo.com/video/337184604",
      timeEstimate: "00:33:00",
      change: {
        open: "exclude",
        online: "exclude"
      }
    },
    {
      name: "PolyTreeNode Solution",
      type: types.video,
      id: "480c05cf-2477-4fa5-a718-e5602d8d6230",
      topicId: "oop",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337176225",
      timeEstimate: "00:30:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Method Encapsulation Lecture",
      type: types.video,
      id: "67b4ee4f-f4df-4b3c-b59a-cac19864139a",
      topicId: "oop",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337191439",
      timeEstimate: "00:23:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Inheritance & Modules Lecture",
      type: types.video,
      id: "0309b191-bc61-451e-abac-81ea9733353b",
      topicId: "oop",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337194155",
      timeEstimate: "00:18:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Error Handling Lecture",
      type: types.video,
      id: "420b37e0-6fe5-4c4a-8c01-c76874627f75",
      topicId: "oop",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337195111",
      timeEstimate: "00:23:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "RSpec Syntax",
      repo: "curriculum",
      path: "ruby/readings/rspec-syntax.md",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "34a56358-2881-44e5-8df7-46e5fbfe2ef6",
      topicId: "tdd",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "materials"
        },
        online: {
          topicId: "tdd",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "subject and let",
      repo: "curriculum",
      path: "ruby/readings/subject-and-let.md",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "fb9ad442-c6f0-453e-8712-89a095510606",
      topicId: "tdd",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "materials"
        },
        online: {
          topicId: "tdd",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Order of RSpec methods",
      repo: "curriculum",
      path: "ruby/readings/rspec-order.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "85e62b10-194d-41c5-8e48-5f4e94a155aa",
      topicId: "tdd",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "materials"
        },
        online: {
          topicId: "tdd",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Test doubles",
      repo: "curriculum",
      path: "ruby/readings/test-doubles.md",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "386ba9c7-2b38-47e4-84a8-d0a8c6799870",
      topicId: "tdd",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "materials"
        },
        online: {
          topicId: "tdd",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Intro to RSpec",
      href: "https://player.vimeo.com/video/192497364",
      timeEstimate: "00:03:00",
      type: types.video,
      id: "b73d17d6-46db-4822-a733-0b1e146135d5",
      topicId: "tdd",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "materials"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Setup and Basic Syntax",
      href: "https://player.vimeo.com/video/192665133",
      timeEstimate: "00:07:00",
      type: types.video,
      id: "7dcc8910-20c9-44ee-972b-6bf23e4ef4de",
      topicId: "tdd",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "materials"
        },
        online: {
          topicId: "tdd",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Errors, Equality Matchers, Subject/Let, and Doubles",
      href: "https://player.vimeo.com/video/192662950",
      timeEstimate: "00:08:00",
      type: types.video,
      id: "b803245e-5502-4b5e-9d1b-8d3b672c8e12",
      topicId: "tdd",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "materials"
        },
        online: {
          topicId: "tdd",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Rspec: Code Demo",
      href: "https://player.vimeo.com/video/192666370",
      timeEstimate: "00:08:00",
      type: types.video,
      id: "0bd98e08-e53a-42af-af77-e39dd1dada4b",
      topicId: "tdd",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "materials"
        },
        online: {
          topicId: "tdd",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "RSpec and TDD Quiz",
      repo: "curriculum",
      path: "ruby/quizzes/rspec_tdd.md",
      type: types.quiz,
      id: "780ffaa9-e33d-4089-8c97-7dab286fc564",
      topicId: "tdd",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "tdd",
          subtopicId: "materials"
        },
        open: {
          topicId: "tdd",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "RSpec",
      repo: "curriculum",
      path: "ruby/homeworks/rspec/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/homeworks/rspec/solution.zip",
      timeEstimate: "00:40:00",
      type: types.project,
      id: "980ffa16-68f3-404e-acd1-468d197ba71e",
      topicId: "tdd",
      subtopicId: "homeworks",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "tdd",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Introduction to RSpec",
      repo: "curriculum",
      path: "ruby/readings/intro-rspec.md",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "e8f34ce0-1919-4ef5-a697-92ec36183bec",
      topicId: "tdd",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "TDD",
      repo: "curriculum",
      path: "ruby/readings/intro-tdd.md",
      timeEstimate: "00:07:00",
      type: types.reading,
      id: "6d4c8f76-8de6-4743-8524-47ad54e9074f",
      topicId: "tdd",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "guard-rspec",
      repo: "curriculum",
      path: "ruby/readings/guard-rspec.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "50ba8e59-3d21-4310-b268-5de378d720b1",
      topicId: "tdd",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "OO Robot RSpec Example",
      href:
        "https://assets.aaonline.io/fullstack/ruby/projects/first_tdd/robot_spec.rb",
      timeEstimate: "00:20:00",
      type: types.externalResource,
      id: "e5b93c87-6577-4ec0-a949-11c0556c8cd5",
      topicId: "tdd",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Chess Solutions Walkthrough",
      type: types.video,
      id: "a37427c6-de95-4e1e-abaa-8b00a0a378b1",
      topicId: "tdd",
      subtopicId: "additionalResources",
      href: "https://player.vimeo.com/video/317152522",
      timeEstimate: "00:26:00",
      change: {
        open: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Implicit Bias Workshop",
      repo: "curriculum",
      path: "course/readings/implicit_bias_workshop.md",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "2d361a25-123b-4769-8045-858c709ef49a",
      topicId: "tdd",
      subtopicId: "culture",
      change: {
        open: "exclude",
        online: "exclude",
        live: "exclude",
        campusHybrid: {
          topicId: "tdd",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "RSpec Lecture - Part One",
      type: types.video,
      id: "9daae21d-436e-49b7-b459-777de0cd9829",
      topicId: "tdd",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/317367140",
      timeEstimate: "00:24:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "RSpec Lecture - Part Two",
      type: types.video,
      id: "12c8736f-ef9b-465b-af86-c294bf232595",
      topicId: "tdd",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/317367563",
      timeEstimate: "00:31:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Hack Academy",
      repo: "curriculum",
      path: "html-css/micro-projects/css_intro/README.md",
      solution: "https://www.appacademy.io/",
      timeEstimate: "00:30:00",
      type: types.project,
      id: "86df12c2-4fd2-4c94-bb67-4941b394e5b4",
      topicId: "tdd",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "projects"
        },
        online: {
          topicId: "tdd",
          subtopicId: "projects"
        },
        inPerson: {
          topicId: "tdd",
          subtopicId: "projects"
        },
        inPersonNYC: {
          topicId: "tdd",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "First TDD Projects",
      repo: "curriculum",
      path: "ruby/projects/first_tdd/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/first_tdd/solution.zip",
      timeEstimate: "02:00:00",
      type: types.project,
      id: "93884263-a007-4e18-a886-e708d51bd88a",
      topicId: "tdd",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "projects"
        },
        online: {
          topicId: "tdd",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Poker",
      repo: "curriculum",
      path: "ruby/projects/poker/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/poker/solution.zip",
      timeEstimate: "06:00:00",
      type: types.project,
      id: "4c054aa0-c0b3-4c3e-ade9-d7793f5b25d3",
      topicId: "tdd",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "projects"
        },
        online: {
          topicId: "tdd",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Review Day 2",
      repo: "curriculum",
      path: "ruby/readings/review/review_ii.md",
      type: types.reading,
      id: "78fb5267-a824-4b79-9243-784e9d31e0a6",
      topicId: "review_d2",
      subtopicId: "projects",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        online: {
          topicId: "review_d2",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "White Boarding Problems 2",
      repo: "curriculum",
      path: "ruby/readings/review/white_boarding/day_two.md",
      type: types.reading,
      id: "8374f040-4da2-48d1-94fe-30f97861bd00",
      topicId: "review_d2",
      subtopicId: "projects",
      timeEstimate: "02:00:00",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        online: {
          topicId: "review_d2",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Afternoon Project Review 2",
      repo: "curriculum",
      path: "ruby/readings/review/project_review_ii.md",
      type: types.reading,
      id: "22d2472d-ad2e-41fb-8d0b-c9063299df0e",
      topicId: "review_d2",
      subtopicId: "projects",
      timeEstimate: "05:00:00",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        online: {
          topicId: "review_d2",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Motivations for Big-O",
      href: "https://player.vimeo.com/video/175565088",
      timeEstimate: "00:07:00",
      type: types.video,
      id: "7f040e5d-dc46-4923-bd14-0ac8ee187368",
      topicId: "bigO",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "materials"
        },
        online: {
          topicId: "bigO",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "RAM Model of Computation",
      href: "https://player.vimeo.com/video/175565090",
      timeEstimate: "00:05:00",
      type: types.video,
      id: "5d068bb8-05c3-441e-af28-98139473aeeb",
      topicId: "bigO",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "materials"
        },
        online: {
          topicId: "bigO",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Asymptotic Analysis",
      href: "https://player.vimeo.com/video/175565086",
      timeEstimate: "00:22:00",
      type: types.video,
      id: "03e7e618-58f7-443b-b6d4-e03d26098ebd",
      topicId: "bigO",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "materials"
        },
        online: {
          topicId: "bigO",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "The Worst Case",
      href: "https://player.vimeo.com/video/175565094",
      timeEstimate: "00:06:00",
      type: types.video,
      id: "4a5c26b3-37f0-4890-b2ec-4bb8a8851dd3",
      topicId: "bigO",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "materials"
        },
        online: {
          topicId: "bigO",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Common Classifications",
      href: "https://player.vimeo.com/video/175568501",
      timeEstimate: "00:11:00",
      type: types.video,
      id: "e83137fe-109a-4aa9-97ab-ac83f2d298da",
      topicId: "bigO",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "materials"
        },
        online: {
          topicId: "bigO",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Set Definition",
      href: "https://player.vimeo.com/video/175568481",
      timeEstimate: "00:08:00",
      type: types.video,
      id: "a050b823-e2db-410d-8827-2e77c5431ffd",
      topicId: "bigO",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "materials"
        },
        online: {
          topicId: "bigO",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Space Complexity",
      href: "https://player.vimeo.com/video/175565092",
      timeEstimate: "00:12:00",
      type: types.video,
      id: "55bf0bf7-4557-4372-be4b-39ee5357c13d",
      topicId: "bigO",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "materials"
        },
        online: {
          topicId: "bigO",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Big O Quiz",
      repo: "curriculum",
      path: "ruby/quizzes/big_o.md",
      type: types.quiz,
      id: "fde8096a-c02e-4fd2-9b32-52acc954960c",
      topicId: "bigO",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "bigO",
          subtopicId: "materials"
        },
        open: {
          topicId: "bigO",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Sorting Complexity",
      repo: "curriculum",
      path: "ruby/homeworks/sorting_demo/README.md",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "df2c162e-dd0a-47ab-a892-95d08503666c",
      topicId: "bigO",
      subtopicId: "homeworks",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "bigO",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Octopus Problems",
      repo: "curriculum",
      path: "ruby/homeworks/big_octopus/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/homeworks/big_octopus/solution.rb",
      timeEstimate: "00:25:00",
      type: types.project,
      id: "81365238-6e67-4650-b8d3-aaa6856dd95a",
      topicId: "bigO",
      subtopicId: "homeworks",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "bigO",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Plain English explanation of Big O",
      href:
        "http://stackoverflow.com/questions/487258/plain-english-explanation-of-big-o",
      timeEstimate: "00:15:00",
      type: types.externalResource,
      id: "64543286-3cc8-4bad-8015-042b8d00bef1",
      topicId: "bigO",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Big O Notation",
      href:
        "https://www.interviewcake.com/article/ruby/big-o-notation-time-and-space-complexity",
      timeEstimate: "00:25:00",
      type: types.externalResource,
      id: "8423942d-1e3c-4385-9df7-9683e5007cff",
      topicId: "bigO",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Merge Sort",
      href:
        "https://www.hackerearth.com/practice/algorithms/sorting/merge-sort/visualize/",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "a9e9f14c-fc19-4502-b6fe-755677564b75",
      topicId: "bigO",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Bubble Sort",
      href:
        "https://www.hackerearth.com/practice/algorithms/sorting/bubble-sort/visualize/",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "277a2a2f-32ea-4627-8a7c-c1d2840490a0",
      topicId: "bigO",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Big O Cheatsheet",
      href: "http://bigocheatsheet.com/",
      timeEstimate: "00:10:00",
      type: types.externalResource,
      id: "b2b496e9-93fd-422b-aa07-42606083d988",
      topicId: "bigO",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "bigO",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Big O Intro & Cat Matcher Lecture",
      type: types.video,
      id: "17ca3584-6f7c-4fd9-84a9-7d32c4c36fcc",
      topicId: "bigO",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337176296",
      timeEstimate: "00:22:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Binary Search and BigO Lecture",
      type: types.video,
      id: "7cf90851-4231-44f8-b625-2c5886be10c4",
      topicId: "bigO",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337181856",
      timeEstimate: "00:21:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Merge Sort and BigO Lecture",
      type: types.video,
      id: "21cd136e-dec1-46b0-b2d4-35ec582c2021",
      topicId: "bigO",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337186188",
      timeEstimate: "00:13:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Execution Time Differences/Algorithms",
      repo: "curriculum",
      path: "ruby/projects/execution_time_differences/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/execution_time_differences/solution.zip",
      timeEstimate: "02:00:00",
      type: types.project,
      id: "3a07fdba-3c8d-4777-9717-216ffd78e7c0",
      topicId: "bigO",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "projects"
        },
        online: {
          topicId: "bigO",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Anagrams",
      repo: "curriculum",
      path: "ruby/projects/anagrams/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/anagrams/solution.zip",
      timeEstimate: "02:30:00",
      type: types.project,
      id: "bc275775-69c6-4106-bbe3-6901a48f37c0",
      topicId: "bigO",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "projects"
        },
        online: {
          topicId: "bigO",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Two sum problem",
      repo: "curriculum",
      path: "ruby/projects/two_sum/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/two_sum/solution.zip",
      timeEstimate: "01:30:00",
      type: types.project,
      id: "0fa50da1-628e-4dc1-87c7-ba50334ba95b",
      topicId: "bigO",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "projects"
        },
        online: {
          topicId: "bigO",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Windowed Max Range",
      repo: "curriculum",
      path: "ruby/projects/max_windowed_range/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/max_windowed_range/solution.zip",
      timeEstimate: "03:30:00",
      type: types.project,
      id: "465e9a7c-fb42-43f9-8737-e581ff43178f",
      topicId: "bigO",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "projects"
        },
        online: {
          topicId: "bigO",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Benchmarking (Bonus)",
      repo: "curriculum",
      path: "ruby/projects/benchmarking/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/demos/sorting_demo/sorting_demo.rb#L58-L67",
      timeEstimate: "02:00:00",
      type: types.project,
      id: "74277b16-f5d9-4bf6-b24d-aa6a8d958279",
      topicId: "bigO",
      subtopicId: "bonus",
      change: {
        open: {
          topicId: "bigO",
          subtopicId: "bonus"
        },
        online: {
          topicId: "bigO",
          subtopicId: "bonus"
        }
      }
    },
    {
      repo: "curriculum",
      path: "ruby/assessments/ruby2_practice.md",
      name: "Ruby 2 Practice Assessment",
      type: "Project",
      id: "86a842c0-fad5-4394-93ca-ccf925dbc17b",
      topicId: "lruCache",
      subtopicId: "assessment",
      timeEstimate: "01:25:00",
      download:
        "https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/ruby/assessments/ruby_assessment_2_practice.zip",
      solution:
        "https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/ruby/assessments/ruby_assessment_2_practice_solution.zip",
      acceptSubmission: true,
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/359889857",
      name: "HackerRank - Inheritance",
      type: types.video,
      id: "aa34ca94-0d84-4b9d-8ec4-50330bdd6c2a",
      topicId: "lruCache",
      subtopicId: "assessment",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/359889873",
      name: "HackerRank - Big O Analysis",
      type: types.video,
      id: "88195214-6746-401b-9716-0854ff051058",
      topicId: "lruCache",
      subtopicId: "assessment",
      timeEstimate: "00:12:00",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/359889886",
      name: "HackerRank - CSS",
      type: types.video,
      id: "a9b131bb-50ce-4406-b20c-dfad19f7f5f1",
      topicId: "lruCache",
      subtopicId: "assessment",
      timeEstimate: "00:08:00",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/359889904",
      name: "HackerRank - Short Answer",
      type: types.video,
      id: "80e967b4-61f8-4940-b80a-007b14d16209",
      topicId: "lruCache",
      subtopicId: "assessment",
      timeEstimate: "00:13:00",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/359906907",
      name: "Coding - Efficient Anagrams",
      type: types.video,
      id: "9841d25c-47e0-45ef-b02d-4d6c9f1e61e3",
      topicId: "lruCache",
      subtopicId: "assessment",
      timeEstimate: "00:06:00",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/359906950",
      name: "Coding - Stack",
      type: types.video,
      id: "3ec12168-8390-4631-bc1f-c687a2103a07",
      topicId: "lruCache",
      subtopicId: "assessment",
      timeEstimate: "00:10:30",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/359906918",
      name: "Coding - SmartStack I",
      type: types.video,
      id: "dc3080f6-ca01-4e47-9f11-894103f9e361",
      topicId: "lruCache",
      subtopicId: "assessment",
      timeEstimate: "00:13:30",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/359906937",
      name: "Coding - SmartStack II",
      type: types.video,
      id: "81d66b9c-61b5-4ad9-a626-105c81f306ab",
      topicId: "lruCache",
      subtopicId: "assessment",
      timeEstimate: "00:11:00",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Ruby 2 Assessment",
      repo: "curriculum",
      path: "course/assessment-day.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "ab085651-42c7-42c4-935a-8521c25d6bc8",
      topicId: "lruCache",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Set and Int Set",
      href: "https://player.vimeo.com/video/159431377",
      timeEstimate: "00:20:00",
      type: types.video,
      id: "bea41d96-edd7-4deb-ac99-1d806a8affbf",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Resizing Int Set Part 1",
      href: "https://player.vimeo.com/video/159433039",
      timeEstimate: "00:10:00",
      type: types.video,
      id: "bc933967-970a-4c1f-a6e1-79ee5c16ef77",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Resizing Int Set Part 2",
      href: "https://player.vimeo.com/video/159437719",
      timeEstimate: "00:30:00",
      type: types.video,
      id: "a5c88e8d-8cbc-4d63-8bf3-9ab685f0a786",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Hashing",
      href: "https://player.vimeo.com/video/159435811",
      timeEstimate: "00:10:0",
      type: types.video,
      id: "985fd4c8-ff6c-443e-90d0-6daf463904f9",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Hash Set",
      href: "https://player.vimeo.com/video/159438691",
      timeEstimate: "00:15:00",
      type: types.video,
      id: "b4d30d05-3597-492f-a93a-7a2d0b01a41e",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Linked Lists and Hashmaps",
      href: "https://player.vimeo.com/video/159440267",
      timeEstimate: "00:20:00",
      type: types.video,
      id: "0c7091fa-a3c6-46d9-8837-6064173f142e",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Caches",
      href: "https://player.vimeo.com/video/159441490",
      timeEstimate: "00:20:00",
      type: types.video,
      id: "629eb212-5f23-478a-a3dd-43801f829f29",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "LRU Cache Video",
      href: "https://player.vimeo.com/video/159435146",
      timeEstimate: "00:10:00",
      type: types.video,
      id: "fcca9924-2c8a-4673-9862-4b8c3ecf89a3",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "How Hashes Work",
      href: "http://www.gotealeaf.com/blog/how-the-hash-works-in-ruby",
      timeEstimate: "00:20:00",
      type: types.externalResource,
      id: "af467004-64f2-4954-8be7-a71bfee64848",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "LRU Cache Reading",
      href:
        "https://web.archive.org/web/20150710185255/http://mcicpc.cs.atu.edu/archives/2012/mcpc2012/lru/lru.html",
      timeEstimate: "00:10:00",
      type: types.externalResource,
      id: "594b3c78-71fc-4c79-aea4-59eef469871d",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Dynamic Array (Wikipedia)",
      href: "https://en.wikipedia.org/wiki/Dynamic_array",
      timeEstimate: "00:30:00",
      type: types.externalResource,
      id: "76ca29e5-6c7f-44f9-9bfc-5a04c29e6584",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "XOR Reading",
      repo: "curriculum",
      path: "ruby/readings/xor.md",
      timeEstimate: "00:03:00",
      type: types.reading,
      id: "d0e5a63e-3aed-43cc-8eac-35926c55324a",
      topicId: "lruCache",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "LRU Cache Quiz",
      repo: "curriculum",
      path: "ruby/quizzes/lru_cache.md",
      type: types.quiz,
      id: "4589d61c-9a6f-4259-8065-3b2553bc1618",
      topicId: "lruCache",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        },
        open: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "LRU Cache",
      repo: "curriculum",
      path: "ruby/homeworks/lru_cache/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/homeworks/lru_cache/solution.rb",
      timeEstimate: "00:30:00",
      type: types.project,
      id: "1232126b-5ee8-4c23-8bf1-585f5bb55544",
      topicId: "lruCache",
      subtopicId: "homeworks",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "homeworks"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Hash Map & LRU Cache",
      repo: "curriculum",
      path: "ruby/projects/hash_map_lru_cache/README.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/hash_map_lru_cache/solution.zip",
      timeEstimate: "04:00:00",
      type: types.project,
      id: "b4a2b772-2a2d-4ef3-b30d-d35da7707e07",
      topicId: "lruCache",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "projects"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Hash Map & LRU Cache (Part Two)",
      repo: "curriculum",
      path: "ruby/projects/hash_map_lru_cache/part_two.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/hash_map_lru_cache/solution.zip",
      timeEstimate: "04:00:00",
      type: types.project,
      id: "d0c5341f-e574-4ca8-a9ba-20a5b57a4bdd",
      topicId: "lruCache",
      subtopicId: "projects",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "projects"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Dynamic Array (Bonus)",
      repo: "curriculum",
      path: "ruby/projects/hash_map_lru_cache/dynamic_array.md",
      solution:
        "https://assets.aaonline.io/fullstack/ruby/projects/hash_map_lru_cache/solution.zip",
      timeEstimate: "01:30:00",
      type: types.project,
      id: "e1bb3f48-2d41-41b9-a3a6-8d3d183d9602",
      topicId: "lruCache",
      subtopicId: "bonus",
      change: {
        open: {
          topicId: "lruCache",
          subtopicId: "bonus"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "bonus"
        }
      }
    },
    {
      name: "Basic cursor input",
      href: "https://github.com/rglassett/ruby-cursor-game",
      timeEstimate: "02:00:00",
      type: types.externalResource,
      id: "3e9896d8-e3dd-4710-b0ce-02b8aeb64a61",
      topicId: "oop",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "oop",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Modules",
      repo: "curriculum",
      path: "ruby/readings/modules.md",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "7018a3d1-cfc1-41b8-bcc7-eca31bf7c94c",
      topicId: "oop",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "load/require/require_relative",
      repo: "curriculum",
      path: "ruby/readings/require.md",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "28acb3c6-1d6b-412d-afb7-709c80aa92d9",
      topicId: "oop",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "public/private/protected",
      repo: "curriculum",
      path: "ruby/readings/privacy.md",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "4e4b577e-35f9-423b-8f99-3a3c36b41d22",
      topicId: "oop",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "oop",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPerson: {
          topicId: "oopD2",
          subtopicId: "materials"
        },
        inPersonNYC: {
          topicId: "oopD2",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "How RSpec works document",
      repo: "curriculum",
      path: "ruby/readings/how-rspec-works.md",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "58aae123-055b-4921-8ebc-32b5584fb62b",
      topicId: "tdd",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "tdd",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Hash and Equals",
      repo: "curriculum",
      path: "ruby/readings/hash-and-equals.md",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "05089341-6fa4-4a08-bb6e-b6cb81807a27",
      topicId: "reference",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "lruCache",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Swap",
      repo: "curriculum",
      path: "ruby/readings/swap.md",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "f2321fad-648c-477c-9ef2-99791127ede9",
      topicId: "reference",
      subtopicId: "additionalResources",
      change: {
        open: {
          topicId: "reference",
          subtopicId: "additionalResources"
        },
        online: {
          topicId: "reference",
          subtopicId: "additionalResources"
        }
      }
    }
  ]
};

module.exports = ruby;
