# Full Stack Project Setup

This project will take you through the steps for setting up your Full Stack
Project repository.

## Phase 1: Create the project repository

1. Create a new Rails project:

   ```sh
   rails new <project_name> --database=postgresql -T --api
   ```

   * `--database=postgresql` to use PostgreSQL
   * `-T` to skip setting up Rails's internal Test::Unit files
   * `--api` to set up Rails as an API only

   **Note:** You have used the `--minimal` option throughout this course when
   creating Rails apps. For your Full Stack Project, however, **you should not
   use the `--minimal` option** because you will probably end up needing one of
   the packages that it skips: Action Cable (for live chat / real-time updates),
   Active Storage (for storing files/images/etc. on Amazon S3), Action Mailer
   (for sending emails), Action Text (for rich text editing), or one of the
   others.

2. The Rails skeleton includes a __.gitignore__ file. In addition to what is
   already there, add the following:

   ```rb
   # .gitignore

   # ... (a bunch of preloaded ignores)

   # To add:
   .byebug_history
   .DS_Store
   ```

3. On GitHub, create a new repository and follow the instructions for linking
   your local repo.

   ![Screenshot: naming repo][name_repo]

4. Commit your files and push to your remote.

## Phase 2: Create your design document files

Your Full Stack Project design docs are a documentation of your planning
process in the form of a GitHub Wiki. Reference the readings for each piece and
take a look at the [sample design docs][sample].

In your new full stack repo, create a wiki.

![Screenshot: create wiki][create_wiki]

Create these pages:

* MVP List
* Database Schema
* Sample State
* Frontend Routes and Components
* Backend Routes

On the home page, create links to each of these pages.

![Screenshot: add page in wiki][design-docs-wiki]

## Phase 3: Add your project advisor as a collaborator

Add your project advisor as a collaborator to your repo. To do this, go
the `Settings` tab and click `Collaborators`.

![Add Collaborators][add_project_manager]

## Phase 4: Complete your design docs (ongoing...)

For your homework assignments throughout this week, you will be adding content
to the corresponding wiki page for the homework assignment. Make sure to use the
layout menu to give the appropriate styling to your documents (e.g., code should
be in code blocks).

Your project advisor will review your design docs and give you feedback on any
major issues.

[sample]: https://www.github.com/appacademy/bluebird/wiki
[name_repo]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/name_repo.png
[create_wiki]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/create_wiki.png
[design-docs-wiki]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/proposal_wiki.png
[add_project_manager]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/add_project_manager.png
