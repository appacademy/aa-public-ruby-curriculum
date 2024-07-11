const openTopics = [
  { id: "one", name: "Getting Started" },
  { id: "sqlFundamentals", name: "SQL Fundamentals" },
  { id: "objectRelationalModel", name: "Object Relational Model" },
  { id: "activeRecord", name: "Active Record" },
  { id: "activeRecordIi", name: "Active Record II" },
  { id: "activeRecordUnderTheHood", name: "Active Record under-the-hood" }
];

const liveTopics = [
  { id: "one", name: "Getting Started" },
  { id: "sqlFundamentals", name: "SQL Fundamentals (W3D1)" },
  { id: "objectRelationalModel", name: "Object Relational Model (W3D2)" },
  { id: "activeRecord", name: "Active Record (W3D3)" },
  { id: "activeRecordIi", name: "Active Record II (W3D4)" },
  {
    id: "activeRecordUnderTheHood",
    name: "Active Record under-the-hood (W3D5)"
  }
];

const SWEInPersonTopics = [
  { id: "one", name: "Getting Started" },
  { id: "sqlFundamentals", name: "SQL Fundamentals (W5D2)" },
  { id: "objectRelationalModel", name: "Object Relational Model (W5D3)" },
  { id: "activeRecord", name: "Active Record (W5D4)" },
  { id: "activeRecordIi", name: "Active Record II (W5D5)" },
  { id: "reviewDay", name: "Review Day (W6D1)" },
  {
    id: "activeRecordUnderTheHood",
    name: "Active Record under-the-hood (W6D2)"
  }
];

const onlineTopics = [
  { id: "one", name: "Getting Started" },
  { id: "sqlFundamentals", name: "SQL Fundamentals (W7D4)" },
  { id: "sqlFundamentalsD2", name: "SQL Fundamentals II (D7D5)" },
  { id: "objectRelationalModel", name: "Object Relational Model (W8D1)" },
  { id: "activeRecord", name: "Active Record (W8D2)" },
  { id: "activeRecordIi", name: "Active Record II (W8D3)" },
  {
    id: "activeRecordUnderTheHood",
    name: "Active Record under-the-hood (W8D4)"
  },
  { id: "activeRecordUnderTheHoodD2", name: "Metaprogramming II (W8D5)" }
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

const sql = {
  courses: {
    campusHybrid: {
      taskGroupId: "0bbd07f8-bdf7-4a9a-8765-afb94a683f5b",
      name: "SQL",
      track: "SWE Campus Hybrid",
      urls: ["campus-hybrid-sql"],
      description: "All about sql!",
      tags: ["sql"],
      catalog: false,
      topics: SWEInPersonTopics,
      subtopics: subtopics,
      order: 5
    },
    live: {
      taskGroupId: "37f0101a-41f7-4e2d-ac6c-dfe9b4c90417",
      name: "SQL",
      track: "Full Stack In Person",
      urls: ["full-stack-in-person-sql"],
      description: "All about sql!",
      tags: ["sql"],
      catalog: false,
      topics: liveTopics,
      subtopics: subtopics,
      order: 5
    },
    inPerson: {
      taskGroupId: "8edd6e28-7be3-4cd5-9314-1c414208fcd3",
      name: "SQL",
      track: "SWE In Person",
      urls: ["swe-in-person-sql"],
      description: "All about sql!",
      tags: ["sql"],
      catalog: false,
      topics: SWEInPersonTopics,
      subtopics: subtopics,
      order: 5
    },
    inPersonNYC: {
      taskGroupId: "cacad63e-dfe3-492c-bc84-2d10ff8223e0",
      name: "SQL",
      track: "SWE In Person NYC",
      urls: ["swe-in-person-sql"],
      description: "All about sql!",
      tags: ["sql"],
      catalog: false,
      topics: SWEInPersonTopics,
      subtopics: subtopics,
      order: 5
    },
    open: {
      taskGroupId: "5fa01940-80ca-4e14-92e7-19692fda1897",
      name: "SQL",
      track: "Full Stack Online",
      urls: ["full-stack-online-sql"],
      description: "All about sql!",
      tags: ["sql"],
      catalog: false,
      order: 5,
      topics: openTopics,
      subtopics: subtopics
    },
    online: {
      taskGroupId: "059e035e-7715-41e6-8da1-a23161f4a926",
      name: "SQL",
      track: "SWE Online",
      urls: ["swe-online-sql"],
      description: "All about sql!",
      tags: ["sql"],
      catalog: false,
      order: 5,
      topics: onlineTopics, // use the default topics
      subtopics: subtopics
    }
  },
  tasks: [
    {
      name: "SQL Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "260880a8-9638-4949-a811-efa1a704a631",
      topicId: "one",
      subtopicId: "none",
      repo: "curriculum",
      path: "sql/SQL_Overview.md",
      change: {
        online: "exclude",
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "SQL Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "9ce3f69b-9cbe-4b69-a742-abf375b1d9f6",
      topicId: "one",
      subtopicId: "none",
      repo: "curriculum",
      path: "sql/Online_SQL_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "SQL Module Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "4ffac528-2c05-4982-818b-8debd2f36293",
      topicId: "one",
      subtopicId: "none",
      repo: "curriculum",
      path: "sql/InPerson_SQL_Overview.md",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Setting up a Development Environment (Phase 2)",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "16716d87-f285-4d82-9f38-a294f48703e8",
      topicId: "one",
      subtopicId: "none",
      repo: "curriculum",
      path: "course/readings/dev-setup.md",
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
      name: "Ruby 2 Assessment",
      repo: "curriculum",
      path: "course/assessment-day.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "564d1dd8-f530-475b-bf32-0dd1f90ecb3a",
      topicId: "sqlFundamentals",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude",
        campusHybrid: "exclude",
        online: "exclude"
      }
    },
    {
      repo: "swe_assessments",
      path: "rails/rails_assessment_1/study_guide.md",
      name: "Study Guide - Rails 1 Assessment",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "ca3d2198-6341-4c79-b8b2-f0bec39d8cf8",
      topicId: "sqlFundamentals",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/sql_nontech.md",
      name: "Nontechnical Overview of SQL",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "39a4ccef-034b-4052-a7cd-7eaf4828f396",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/paradigms.md",
      name: "Programming Paradigms",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "a60d126d-a260-44c3-90e1-04652172339b",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/sql-intro.md",
      name: "SQL For The Impatient",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "811246ec-da34-4caf-ab1b-876d3cb4ce0e",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {}
    },
    {
      href: "https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/",
      name: "A Visual Explanation of Joins",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "0df5d510-2b2c-4365-bb78-21581d060911",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/self-joins.md",
      name: "Self Joins",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "ed94ca00-b1bc-4bcd-8e80-60e3d7eea831",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/formatting.md",
      name: "Formatting SQL Code",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "fd1297f9-d0e8-46ac-80df-26ead07af0a6",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://sqlbolt.com/topic/subqueries",
      name: "Subqueries",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "4111604e-ebd6-4f74-9875-d3d03f4572f2",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/null.md",
      name: "NULL",
      timeEstimate: "00:02:00",
      type: types.reading,
      id: "1be3525b-5ea8-4dbe-baf7-93f68d0f28ac",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "http://www.postgresqltutorial.com/postgresql-case/",
      name: "CASE",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "f322c773-588e-41e7-92b7-1d4b25d9fedf",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "http://www.postgresqltutorial.com/postgresql-coalesce/",
      name: "COALESCE",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "9c261164-d855-48e5-a111-eb58190ba7f4",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/setup.md",
      name: "PostgreSQL Setup",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "872d7bc6-c10d-4671-9a9f-28cee897e14c",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "SQL Fundamentals Quiz",
      repo: "curriculum",
      path: "sql/quizzes/sql_i.md",
      type: types.quiz,
      id: "a163c14f-3a6d-4e15-add6-a3f454c68786",
      topicId: "sqlFundamentals",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {}
    },
    {
      href: "https://sqlbolt.com/",
      name: "SQL Bolt Tutorial; sections 1 - 12",
      timeEstimate: "01:20:00",
      type: types.externalResource,
      id: "1ef0bc11-cf2b-4a66-9d3f-2b830a90d18e",
      topicId: "sqlFundamentals",
      subtopicId: "homeworks",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "homeworks"
        }
      }
    },
    {
      href: "https://www.sqlite.org/queryplanner.html",
      name: "Indexing Queries(Read Sections 1.3 - 1.5)",
      timeEstimate: "00:20:00",
      type: types.externalResource,
      id: "169b9caf-3d27-4dd1-91bb-902e850a6f78",
      topicId: "sqlFundamentalsD2",
      subtopicId: "materials",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/321636797",
      name: "Breaking Down a SQL Query Plan",
      id: "61a321f1-8587-432b-b7e7-05f28d80881f",
      topicId: "sqlFundamentalsD2",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      type: types.video,
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      href: "https://www.postgresql.org/docs/current/using-explain.html",
      name: "Postgres EXPLAIN documentation",
      timeEstimate: "00:10:00",
      type: types.externalResource,
      id: "4578aebb-b653-4dfa-863b-fac94038501b",
      topicId: "sqlFundamentalsD2",
      subtopicId: "additionalResources",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      href:
        "https://www.vertabelo.com/blog/technical-articles/understanding-execution-plans-in-postgresql",
      name: "Understanding Execution Plans in PostgreSQL",
      timeEstimate: "00:15:00",
      type: types.externalResource,
      id: "3fde9d65-4130-463f-824f-324745cb2cf3",
      topicId: "sqlFundamentalsD2",
      subtopicId: "materials",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      href: "https://www.w3schools.com/sql/sql_create_index.asp",
      name: "Creating an Index using SQL",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "fc4917dc-8d74-49d6-9692-f938db48e210",
      topicId: "sqlFundamentalsD2",
      subtopicId: "materials",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/creating_postgres_database.md",
      name: "Creating a SQL Database in PostgreSQL",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "ae8ae8e0-e67f-4239-870d-90d96a247f8a",
      topicId: "sqlFundamentalsD2",
      subtopicId: "materials",
      change: {
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        live: {
          topicId: "sqlFundamentals",
          subtopicId: "materials"
        },
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      href:
        "https://www.compose.com/articles/faster-operations-with-the-jsonb-data-type-in-postgresql/",
      name: "Using JSONB in PostgreSQL",
      timeEstimate: "00:10:00",
      type: types.externalResource,
      id: "174985fe-2dec-4372-b216-43917981a786",
      topicId: "sqlFundamentalsD2",
      subtopicId: "additionalResources",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      name: "HashSet Solution Walkthrough",
      type: types.video,
      id: "18b59cc7-529e-4989-a9de-22c0dd579d1f",
      topicId: "sqlFundamentals",
      subtopicId: "additionalResources",
      href: "https://player.vimeo.com/video/337176350",
      timeEstimate: "00:13:00",
      change: {
        open: "exclude",
        online: "exclude"
      }
    },
    {
      href: "https://www.buzzfeed.com/nicolaharvey/what-is-privilege",
      name: "What is Privilege?",
      timeEstimate: "00:06:00",
      type: types.externalResource,
      id: "1ae58edf-51e3-436b-ba23-b52ac8b3c8d4",
      topicId: "sqlFundamentals",
      subtopicId: "culture",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "culture"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "culture"
        }
      }
    },
    {
      href: "https://time.com/5560575/intersectionality-theory/",
      name: "What is Intersectionality?",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "d70625d3-bb65-40a9-967c-ac3d9e40b986",
      topicId: "sqlFundamentals",
      subtopicId: "culture",
      change: {
        online: {
          topicId: "sqlFundamentalsD2",
          subtopicId: "culture"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://blog.techinclusion.co/tech-diversity-12-things-an-ally-can-do-ca5c93435d26",
      name: "12 Things Allies Can Do",
      timeEstimate: "00:05:00",
      type: types.externalResource,
      id: "14da9a8c-e5c2-4ad8-af85-172a15ad618e",
      topicId: "sqlFundamentals",
      subtopicId: "culture",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "culture"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://medium.com/@hadrad1000/how-do-i-ally-being-an-ally-to-women-in-technology-73b70fb86a98",
      name: "How Do I Ally?",
      timeEstimate: "00:07:00",
      type: types.externalResource,
      id: "f966b04e-f7e3-4895-9637-b6ae513f7559",
      topicId: "sqlFundamentals",
      subtopicId: "culture",
      change: {
        online: {
          topicId: "sqlFundamentalsD2",
          subtopicId: "culture"
        }
      }
    },
    {
      href:
        "https://modelviewculture.com/pieces/getting-started-in-techs-social-justice-movement",
      name: "Getting Started in Social Justice",
      timeEstimate: "00:08:00",
      type: types.externalResource,
      id: "f10a64ec-32cb-48ef-a08e-ec191df0408c",
      topicId: "sqlFundamentals",
      subtopicId: "culture",
      change: {
        online: {
          topicId: "sqlFundamentalsD2",
          subtopicId: "culture"
        }
      }
    },
    {
      name: "SQL Introduction Lecture",
      type: types.video,
      id: "75b7c120-662b-4a53-a5ba-d7dc75ab901e",
      topicId: "sqlFundamentals",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337179947",
      timeEstimate: "00:26:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Case, Coalesce, & Sub Queries Lecture",
      type: types.video,
      id: "18fad8ca-082d-4bcf-a8e3-35cafa93143c",
      topicId: "sqlFundamentals",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337185831",
      timeEstimate: "00:15:00",
      change: {
        open: "exclude",
        inPerson: "exclude",
        campusHybrid: "exclude",
        live: "exclude"
      }
    },
    {
      name: "GROUP BY & HAVING Lecture",
      type: types.video,
      id: "27f17562-cc46-4bac-b323-7bc7218936df",
      topicId: "sqlFundamentals",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337188790",
      timeEstimate: "00:12:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "LEFT OUTER JOIN & Join Tables",
      type: types.video,
      id: "f9269ace-fa7c-488a-bd16-5268043a68af",
      topicId: "sqlFundamentals",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337190994",
      timeEstimate: "00:21:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "sql/projects/sqlzoo/README.md",
      name: "SQL Zoo",
      timeEstimate: "08:00:00",
      type: types.project,
      id: "865c7a1e-b2ec-48cf-b858-25c15bdb6689",
      topicId: "sqlFundamentals",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/sql/projects/sqlzoo/solution.zip",
      change: {
        online: {
          topicId: "sqlFundamentals",
          subtopicId: "projects"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/projects/sql_cats/README.md",
      name: "Optimized SQL: SQL Cats",
      timeEstimate: "08:00:00",
      type: types.project,
      id: "dbfe059b-7cd3-4333-8d10-93a8f22604b7",
      topicId: "sqlFundamentalsD2",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/sql/projects/sql_cats/solution.zip",
      change: {
        open: "exclude",
        live: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        inPersonNYC: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/184539804",
      name: "Video solution to Julie Andrews query",
      timeEstimate: "00:03:00",
      type: types.video,
      id: "b8e78831-4d89-44df-9a4a-678713d1b765",
      topicId: "sqlFundamentals",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "sqlFundamentalsD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "Joins Video solution to Julie Andrews Query",
      type: types.video,
      id: "2f671100-9a60-4d4f-9e79-2edbe1b27e2e",
      topicId: "sqlFundamentals",
      subtopicId: "additionalResources",
      href: "https://player.vimeo.com/video/337176404",
      timeEstimate: "00:25:00",
      change: {
        open: "exclude",
        online: "exclude"
      }
    },
    {
      href: "https://player.vimeo.com/video/184539167",
      name: "Video solution to Craiglockhart to Sighthill query",
      timeEstimate: "00:06:00",
      type: types.video,
      id: "e7415503-3908-443b-9031-4e8cd55f2345",
      topicId: "sqlFundamentals",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "sqlFundamentalsD2",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "sqlFundamentals",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/167596295",
      name: "RDBMS Intro",
      timeEstimate: "00:10:00",
      type: types.video,
      id: "10bd0ce8-2817-4145-93a0-ef1b71eab391",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/167593816",
      name: "Building a Database",
      timeEstimate: "00:25:00",
      type: types.video,
      id: "b1a814dd-acee-4f39-998f-b312bb047c5a",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/167805228",
      name: "ORM Intro",
      timeEstimate: "00:05:00",
      type: types.video,
      id: "ba0da6ae-714b-4788-987e-5be940c46cdf",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/167672029",
      name: "ORM Demo",
      timeEstimate: "00:25:00",
      type: types.video,
      id: "5f798506-d43c-4207-88cc-b51f00312d55",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/sqlite3.md",
      name: "SQLite3",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "6795ef4a-abb2-4933-8928-58ed90ab7b76",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/heredocs.md",
      name: "Heredocs",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "7a74b7f9-3820-4e08-a0e0-a878012ad5de",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "http://xkcd.com/327/",
      name: "Little Bobby Tables",
      timeEstimate: "00:02:00",
      type: types.externalResource,
      id: "e0ecc841-124c-47f5-b958-558f8ee7d3b7",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "CSS Box Model Reading",
      repo: "curriculum",
      path: "html-css/readings/box_model.md",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "4963731e-7638-41af-b005-4731d9d86cdb",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "CSS Display Property Reading",
      path: "html-css/readings/display.md",
      repo: "curriculum",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "dd421c72-8580-43d7-b564-767d7d780b8a",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/151190179",
      name: "CSS Inherits",
      timeEstimate: "00:04:00",
      type: types.video,
      id: "c72afe63-7401-4a86-830e-5940b71b5c6c",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/151190181",
      name: "CSS Reset",
      timeEstimate: "00:16:00",
      type: types.video,
      id: "dc8fbc42-2ed2-4fe9-9939-1e87dec33fb4",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/readings/positioning.md",
      name: "CSS Positioning",
      type: types.reading,
      id: "63e2ec0b-3f97-4469-8710-78a3f47567f8",
      topicId: "objectRelationalModel",
      subtopicId: "additionalResources",
      timeEstimate: "00:20:00",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/151190182",
      name: "CSS Float and Clearfix",
      timeEstimate: "00:18:00",
      type: types.video,
      id: "eed3166c-b4d2-49af-ad1c-04e216e140a3",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/readings/floats_clear_fix.md",
      name: "CSS Float and Clearfix Reading",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "f381d3a4-9b75-4f6f-9c89-446fae096208",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/170512344",
      name: "CSS Flexbox",
      timeEstimate: "00:19:00",
      type: types.video,
      id: "a287c600-3784-4d96-9ba6-bc9eed3c1e0d",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://flexboxfroggy.com/",
      name: "Flexbox Froggy",
      timeEstimate: "00:30:00",
      type: types.externalResource,
      id: "d4fe7734-832f-4397-be21-939a308604a2",
      topicId: "objectRelationalModel",
      subtopicId: "homeworks",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "homeworks"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/170320160",
      name: "CSS Grid System",
      timeEstimate: "00:15:00",
      type: types.video,
      id: "d58dfdaa-fe20-427f-a92c-6c124df584a1",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "materials"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "http://cssgridgarden.com/",
      name: "CSS Grid Garden",
      timeEstimate: "01:00:00",
      type: types.externalResource,
      id: "54a93e52-5091-4d9b-8175-f39f0534ff6f",
      topicId: "objectRelationalModel",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "additionalResources"
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "ORM Quiz",
      repo: "curriculum",
      path: "sql/quizzes/sql_ii.md",
      type: types.quiz,
      id: "3012af5f-d005-44c2-8b94-d6b2be312b7e",
      topicId: "objectRelationalModel",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "sql/homeworks/plays/README.md",
      name: "Plays-Playwrights ORM",
      timeEstimate: "00:35:00",
      type: types.project,
      id: "e10ceb19-3bad-461b-bca1-99590d0dc040",
      topicId: "objectRelationalModel",
      subtopicId: "homeworks",
      solution:
        "https://assets.aaonline.io/fullstack/sql/homeworks/plays/solution.zip",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "html-css/micro-projects/shakshuka/README.md",
      name: "Shakshuka Part 2",
      timeEstimate: "02:00:00",
      type: types.project,
      id: "1160f4be-c48e-41cd-8bbe-aa7900446542",
      topicId: "objectRelationalModel",
      subtopicId: "projects",
      solution: "https://assets.aaonline.io/fullstack/html-css/micro-projects/flex/solution.zip",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "projects",
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "projects",
        },
        campusHybrid: {
          topicId: "reviewDay",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/projects/aa_questions/README.md",
      name: "AA Questions",
      timeEstimate: "06:00:00",
      type: types.project,
      id: "aa86e8db-d0df-4d12-90a3-fd782a2da66e",
      topicId: "objectRelationalModel",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/sql/projects/aa_questions/solution.zip",
      change: {
        online: {
          topicId: "objectRelationalModel",
          subtopicId: "projects"
        },
        open: {
          topicId: "objectRelationalModel",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "rails/readings/rails_nontech.md",
      name: "Nontechnical Overview of Rails",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "5f36812b-1cc9-4f17-9709-6285f51f26fd",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/331844969",
      name: "Starting a new Rails Project",
      timeEstimate: "00:05:00",
      type: types.video,
      id: "4cd14c35-5a88-4152-969f-4edeb032cdc4",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "/sql/readings/migrations-overview.md",
      name: "Migrations Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "3ada6aa2-b477-4d3a-8baa-266bdd872d6a",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/332280097",
      name: "Migrations Intro",
      timeEstimate: "00:02:00",
      type: types.video,
      id: "0a10b151-a206-4193-be41-1c2aba4eccc6",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/334352149",
      name: "Making Migrations",
      timeEstimate: "00:05:00",
      type: types.video,
      id: "6a396775-97fd-42a8-853d-c341d97f6e7f",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/334402682",
      name: "Changing Migrations",
      timeEstimate: "00:05:30",
      type: types.video,
      id: "a9640a58-9536-4f8f-8835-3f427dae45de",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/rails-rollbacks.md",
      name: "Rollbacks",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "08beb809-cc84-4077-b1d2-a3d6fd0c3635",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/orm-overview.md",
      name: "ORM Overview",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "5364d8da-5847-4e11-9a33-cf5dbe179ba3",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/334409696",
      name: "Models",
      timeEstimate: "00:06:00",
      type: types.video,
      id: "d3600ab1-c55e-4142-8f8c-9e367e73a794",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/334438467",
      name: "Validations",
      timeEstimate: "00:09:00",
      type: types.video,
      id: "3b04e5af-c5e7-4de8-8b4a-b1d692536121",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/337298102",
      name: "Basic Associations (belongs_to, has_many)",
      timeEstimate: "00:07:00",
      type: types.video,
      id: "32074e38-6157-43c3-a1a4-579cfff6d542",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/338893305",
      name: "More Associations (has_many through:...)",
      timeEstimate: "00:08:00",
      type: types.video,
      id: "c54f54d1-ebac-4270-b13a-45918388dbb8",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/validations-overview.md",
      name: "Validations Overview",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "27f35135-9008-4e7e-94bd-1749acdd5e83",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/indexing-overview.md",
      name: "Indices Overview",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "ff4fec4e-51e0-4fd0-85d9-bf8ce116495d",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      href: "https://player.vimeo.com/video/338922220",
      name: "Indices",
      timeEstimate: "00:07:00",
      type: types.video,
      id: "cb865423-cd49-4ee1-853e-9f4fab95c7ed",
      topicId: "activeRecord",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Introduction Rails Quiz",
      repo: "curriculum",
      path: "sql/quizzes/intro_rails.md",
      type: types.quiz,
      id: "db45a14e-67a7-4cbf-9726-97c6e1e3cad3",
      topicId: "activeRecord",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "sql/homeworks/intro_rails/README.md",
      name: "Intro to Rails",
      timeEstimate: "00:45:00",
      type: types.project,
      id: "1b2b54a8-4912-4d59-83a5-1ad4857a0f7e",
      topicId: "activeRecord",
      subtopicId: "homeworks",
      solution:
        "https://assets.aaonline.io/fullstack/sql/homeworks/intro_rails/solution.zip",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/association-flowchart.md",
      name: "Association Flowchart",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "adcd8067-08e6-465e-8ea2-019136141fc1",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
    },
    {
      repo: "curriculum",
      path: "sql/readings/rails-5-updates.md",
      name: "Rails 4 vs Rails 5",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "0a068447-ab0b-46f9-b947-d8ff33d8c0c7",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/first-rails-project.md",
      name: "Creating a new Rails project",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "2e3b96e0-937c-4740-9619-ed842b88ec0b",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/migrations.md",
      name: "Migrations Reading",
      timeEstimate: "00:30:00",
      type: types.reading,
      id: "41aadc1f-e94a-45c6-a2d3-6ae7b353eb6d",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/orm.md",
      name: "ORM Review and Intro to Active Record",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "93728f73-6115-489d-bc49-09260ea67a3c",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/belongs-to-has-many.md",
      name: "Associations: belongs_to and has_many",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "df06a03f-f69e-45d0-b21e-df30d7ed020c",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/has-many-through.md",
      name: "Associations: has_many :through",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "999893fb-d2eb-4059-a9a6-68986e883430",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/has-one.md",
      name: "Associations: has_one",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "860966e5-25cc-43b4-a087-fe85b23676ca",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/unconventional-associations.md",
      name: "Unconventional Associations",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "383f7118-beb6-4aac-97a6-c0547cf5285e",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/validations.md",
      name: "Basic Validations",
      timeEstimate: "00:35:00",
      type: types.reading,
      id: "676991ae-e311-4917-b5f6-6c3f786520de",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/custom-validations.md",
      name: "Custom Validations",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "b4e3ee07-f9ab-4a2e-bab4-189154ed6872",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/validations-misc.md",
      name: "Miscellaneous Validations",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "115dbe7d-d479-46fb-b968-67b7ec366788",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/indexing.md",
      name: "ActiveRecord Indexes and Uniqueness",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "216e3058-c096-4008-8034-5e23b31abdb0",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      name: "a/A Questions Solutions",
      type: types.video,
      id: "26d5316a-99d0-47e6-b57d-f2a085558184",
      topicId: "activeRecord",
      subtopicId: "additionalResources",
      href: "https://player.vimeo.com/video/337186431",
      timeEstimate: "00:15:00",
      change: {
        open: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Intro to Rails & Migrations Lecture",
      type: types.video,
      id: "9e734cb5-f8d4-465e-9a7a-c69b31f10635",
      topicId: "activeRecord",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337190478",
      timeEstimate: "00:49:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Intro to Rails Models Lecture",
      type: types.video,
      id: "cb572505-3814-4744-aaa0-4d242ce6ecab",
      topicId: "activeRecord",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337195514",
      timeEstimate: "00:17:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Associations Lecture",
      type: types.video,
      id: "6afa483e-c6dd-4884-bc1b-9b11138e69e7",
      topicId: "activeRecord",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337196481",
      timeEstimate: "00:22:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Validations Lecture",
      type: types.video,
      id: "5620e18d-91bd-4a40-b047-88bc92b3ee60",
      topicId: "activeRecord",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337197006",
      timeEstimate: "00:30:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "sql/projects/associations_exercise/README.md",
      name: "Associations Exercise",
      timeEstimate: "01:30:00",
      type: types.project,
      id: "2624f5c0-1ec3-443f-bfcd-01d31df4da5a",
      topicId: "activeRecord",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/sql/projects/associations_exercise/solution.zip",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "projects"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/projects/url_shortener/README.md",
      name: "URL Shortener",
      timeEstimate: "07:00:00",
      type: types.project,
      id: "60353147-39e3-44d3-baf7-38622f014d1d",
      topicId: "activeRecord",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/sql/projects/url_shortener/solution.zip",
      change: {
        online: {
          topicId: "activeRecord",
          subtopicId: "projects"
        },
        open: {
          topicId: "activeRecord",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Review Day",
      repo: "curriculum",
      path: "sql/readings/review/review_instructions.md",
      type: types.reading,
      id: "6d06d519-c49f-4523-a2db-64b27b35173c",
      topicId: "reviewDay",
      subtopicId: "projects",
      timeEstimate: "00:05:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      name: "White Boarding Problems",
      repo: "curriculum",
      path: "sql/readings/review/white_boarding.md",
      type: types.reading,
      id: "ea827ff3-2375-4a88-ac69-76ae5949899a",
      topicId: "reviewDay",
      subtopicId: "projects",
      timeEstimate: "02:00:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Afternoon Project Review",
      repo: "curriculum",
      path: "sql/readings/review/project_review.md",
      type: types.reading,
      id: "e2fdfecb-b9a7-49dd-9eb9-bb13670fc92f",
      topicId: "reviewDay",
      subtopicId: "projects",
      timeEstimate: "05:00:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/relation.md",
      name: "ActiveRecord::Relation",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "fdd6d369-3c35-4c68-950a-4915dee2e735",
      topicId: "activeRecordIi",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/joins.md",
      name: "ActiveRecord and Joins",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "3678c130-bca7-4b5e-8540-f9029b9e0180",
      topicId: "activeRecordIi",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/n_plus_one.md",
      name: "N Plus One",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "1e67e694-a848-4412-a3db-8d928e59a40f",
      topicId: "activeRecordIi",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/scopes.md",
      name: "Scopes",
      timeEstimate: "00:10:00",
      type: types.reading,
      id: "c673deaa-3c1f-4bed-9449-1c491696c10d",
      topicId: "activeRecordIi",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/querying-ii.md",
      name: "More on Querying",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "134a58bb-ca43-4739-b361-f8c9c1c9945f",
      topicId: "activeRecordIi",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Active Record Quiz",
      repo: "curriculum",
      path: "sql/quizzes/active_record.md",
      type: types.quiz,
      id: "aa9502f7-43c5-4d81-90be-ac4da1914c9d",
      topicId: "activeRecordIi",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "sql/homeworks/active_record_warmup/README.md",
      name: "Movie Buff in Training",
      timeEstimate: "00:30:00",
      type: types.project,
      id: "e3331d6c-1d44-4467-af8e-33793e7d12ff",
      topicId: "activeRecordIi",
      subtopicId: "homeworks",
      solution:
        "https://assets.aaonline.io/fullstack/sql/homeworks/active_record_warmup/solution.zip",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "homeworks"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/homeworks/n_1_buster/README.md",
      name: "N+1 Buster",
      timeEstimate: "00:30:00",
      type: types.project,
      id: "7d639812-b934-44fc-a188-0bfe9f49e456",
      topicId: "activeRecordIi",
      subtopicId: "homeworks",
      solution:
        "https://assets.aaonline.io/fullstack/sql/homeworks/n_1_buster/solution.zip",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "homeworks"
        }
      }
    },
    {
      href:
        "http://tomdallimore.com/blog/includes-vs-joins-in-rails-when-and-where/",
      name: "Includes vs Joins: Whats the difference?",
      timeEstimate: "00:15:00",
      type: types.externalResource,
      id: "82887904-6e56-45df-b978-2170888c08bc",
      topicId: "activeRecordIi",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecordIi",
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
      id: "80267fcb-c13c-45cd-a519-bb033185f07a",
      topicId: "activeRecordIi",
      subtopicId: "additionalResources",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "additionalResources"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "additionalResources"
        }
      }
    },
    {
      repo: "assessment-prep",
      path: "rails_1.md",
      name: "Rails 1 Practice",
      type: types.project,
      id: "78deac05-7165-4731-a1f9-32c3b90b61c1",
      topicId: "activeRecordIi",
      subtopicId: "assessment",
      download:
        "https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/rails1-practice.zip",
      solution:
        "https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/rails1-practice-solution.zip",
      timeEstimate: "01:40:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: {
          topicId: "activeRecordIi",
          subtopicId: "assessment"
        }
      }
    },
    {
      name: "Rails 1 Practice - Initial Setup",
      type: types.video,
      id: "db30929a-028d-4572-ac5f-ad059e503634",
      topicId: "activeRecordIi",
      subtopicId: "assessment",
      href: "https://player.vimeo.com/video/428154587",
      timeEstimate: "00:08:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Rails 1 Practice - Associations",
      type: types.video,
      id: "743630a8-5a69-4718-bee8-b44852fefa74",
      topicId: "activeRecordIi",
      subtopicId: "assessment",
      href: "https://player.vimeo.com/video/428157631",
      timeEstimate: "00:24:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Rails 1 Practice - Migrations",
      type: types.video,
      id: "7ed3f6ff-2524-4ad6-b69b-d452ac3031f4",
      topicId: "activeRecordIi",
      subtopicId: "assessment",
      href: "https://player.vimeo.com/video/428158038",
      timeEstimate: "00:14:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Rails 1 Practice - Active Record",
      type: types.video,
      id: "9e46ad92-a10b-4b25-ac53-930abfb6915d",
      topicId: "activeRecordIi",
      subtopicId: "assessment",
      href: "https://player.vimeo.com/video/428156379",
      timeEstimate: "00:13:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Rails 1 Practice - SQL",
      type: types.video,
      id: "cc0c6c40-c8fd-4645-a94d-83d473d55598",
      topicId: "activeRecordIi",
      subtopicId: "assessment",
      href: "https://player.vimeo.com/video/428158396",
      timeEstimate: "00:15:00",
      change: {
        open: "exclude",
        live: "exclude",
        online: "exclude"
      }
    },
    {
      name: "Association Methods Lecture",
      type: types.video,
      id: "ab44b70b-222e-475b-a397-e89ea014e271",
      topicId: "activeRecordIi",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337176449",
      timeEstimate: "00:22:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Association Methods Lecture - Part Two",
      type: types.video,
      id: "22b201d0-16e2-43e0-9784-17dc667ec85e",
      topicId: "activeRecordIi",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337183331",
      timeEstimate: "00:18:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Association Methods Lecture - Part Three",
      type: types.video,
      id: "920e3218-5c4b-4593-95cd-129e8fa2dc74",
      topicId: "activeRecordIi",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337188109",
      timeEstimate: "00:20:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "sql/projects/movie_buff/README.md",
      name: "Movie Buff",
      timeEstimate: "04:00:00",
      type: types.project,
      id: "7a071f1d-06c7-4f47-8f01-a5921750eb46",
      topicId: "activeRecordIi",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/sql/projects/movie_buff/solution.zip",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "projects"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/projects/polls_app/README.md",
      name: "Polls",
      timeEstimate: "06:00:00",
      type: types.project,
      id: "ab9baf2f-94f0-462f-b885-cfe69fa6f181",
      topicId: "activeRecordIi",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/sql/projects/polls_app/solution.zip",
      change: {
        online: {
          topicId: "activeRecordIi",
          subtopicId: "projects"
        },
        open: {
          topicId: "activeRecordIi",
          subtopicId: "projects"
        }
      }
    },
    {
      name: "Rails 1 Assessment",
      repo: "curriculum",
      path: "course/assessment-day.md",
      timeEstimate: "01:40:00",
      type: types.reading,
      id: "69af21c3-ce66-4c71-a165-785d242e2c07",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        online: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "swe_assessments",
      path: "rails/rails_olympics_evaluation/study_guide.md",
      name: "Study Guide - Rails Olympics",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "488fc667-0b84-4c62-a120-0577345cc16f",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "assessment",
      change: {
        open: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/metaprogramming.md",
      name: "Metaprogramming",
      timeEstimate: "00:20:00",
      type: types.reading,
      id: "bd16466a-d392-47ba-a283-1491c8951c6a",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/readings/class-instance-variables.md",
      name: "Class Instance Variables",
      timeEstimate: "00:15:00",
      type: types.reading,
      id: "34a8a3df-52dc-426c-897d-14b4faf4ba6d",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/demos/send.md",
      name: "Demo: send",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "1772c8e8-b2d0-4eba-9d66-27258920ee8e",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "materials"
        }
      }
    },
    {
      repo: "curriculum",
      path: "sql/demos/macros.md",
      name: "Demo: macros",
      timeEstimate: "00:05:00",
      type: types.reading,
      id: "14c67b5d-69ab-4330-ae37-2d0c7a00fc76",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "materials",
      change: {
        online: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "materials"
        },
        open: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "materials"
        }
      }
    },
    {
      name: "Metaprogramming Quiz",
      repo: "curriculum",
      path: "sql/quizzes/meta.md",
      type: types.quiz,
      id: "992576c0-bc1f-4a05-b815-2f2ac25f7052",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "materials",
      timeEstimate: "00:10:00",
      change: {}
    },
    {
      repo: "curriculum",
      path: "sql/homeworks/meta_corgis/README.md",
      name: "Metacorgis",
      timeEstimate: "00:30:00",
      type: types.project,
      id: "d5afedfc-668c-41d6-9817-9d524e2863cb",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "homeworks",
      solution:
        "https://assets.aaonline.io/fullstack/sql/homeworks/meta_corgis/solution.rb",
      change: {
        online: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "homeworks"
        },
        open: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "homeworks"
        }
      }
    },
    {
      name: "Polls App Solutions",
      type: types.video,
      id: "d88d6c22-3633-4732-be8e-471296a9bf36",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337176520",
      timeEstimate: "00:35:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Metaprogramming Intro Lecture",
      type: types.video,
      id: "008587b0-cfa6-4bfb-b67a-a52bb9450b02",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337185643",
      timeEstimate: "00:11:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Metaprogramming Class Variables Lecture",
      type: types.video,
      id: "de2c0b66-b2fc-4754-89a0-cf8954fef482",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337187609",
      timeEstimate: "00:07:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "Metaprogramming Instance Variables Lecture",
      type: types.video,
      id: "b6da6c20-7e03-40fb-a381-1825f76ce73b",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337188930",
      timeEstimate: "00:10:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      name: "define_method & method_missing Lecture",
      type: types.video,
      id: "dfc29d02-05f2-4d02-ae82-2a2280160e78",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "lecture",
      href: "https://player.vimeo.com/video/337190496",
      timeEstimate: "00:28:00",
      change: {
        open: "exclude",
        campusHybrid: "exclude",
        inPerson: "exclude",
        live: "exclude"
      }
    },
    {
      repo: "curriculum",
      path:
        "sql/projects/active_record_lite/instructions/active-record-lite-i.md",
      name: "Build Your Own ActiveRecord Part 1",
      timeEstimate: "05:00:00",
      type: types.project,
      id: "6c1e1574-2ebd-4d16-b9e7-4c8879136661",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/sql/projects/active_record_lite/solution.zip",
      change: {
        online: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "projects"
        },
        open: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "projects"
        }
      }
    },
    {
      repo: "curriculum",
      path:
        "sql/projects/active_record_lite/instructions/active-record-lite-ii.md",
      name: "Build Your Own ActiveRecord Part 2",
      timeEstimate: "04:00:00",
      type: types.project,
      id: "bdceff36-c1ec-431a-a75b-5d6747ec7c00",
      topicId: "activeRecordUnderTheHood",
      subtopicId: "projects",
      solution:
        "https://assets.aaonline.io/fullstack/sql/projects/active_record_lite/solution.zip",
      change: {
        online: {
          topicId: "activeRecordUnderTheHoodD2",
          subtopicId: "projects"
        },
        open: {
          topicId: "activeRecordUnderTheHood",
          subtopicId: "projects"
        }
      }
    }
  ]
};

module.exports = sql;
