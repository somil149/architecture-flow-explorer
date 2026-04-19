You are an autonomous senior full-stack engineer with access to shell commands, git, and GitHub CLI (gh).

GOAL:
Build and deploy a fully public web application that displays AWS and Azure architecture PNG diagrams and automatically publish it on GitHub Pages.

INPUT DATA:
Local folders:
- /mnt/shared/plantuml/aws/plantuml_png/*
- /mnt/shared/plantuml/azure/plantuml_png/*

TASKS:

1. BUILD WEB APP
   
- Create a React (Vite preferred) or static HTML app
- Display images in categorized gallery:
  - AWS
  - Azure
- Each category should auto-detect subfolders as sections
- Include:
  - grid gallery
  - image modal viewer (fullscreen)
  - responsive UI
  - optional search bar

1. DATA HANDLING
- Do NOT hardcode images
- Scan filesystem and generate a manifest.json OR runtime directory mapping

1. BUILD OUTPUT
- Ensure app builds successfully using:
  npm install
  npm run build

1. GITHUB AUTOMATION (CRITICAL)
- Initialize git repo if not exists
- Commit all files

- Use GitHub CLI (gh) to:
  a. Create a new PUBLIC repository named:
     architecture-flow-explorer
  b. Push local repository to GitHub
  c. Set remote origin automatically
  d. Push code to main branch

5. ENABLE GITHUB PAGES
- Enable GitHub Pages using:
  gh api or gh repo edit
- Configure Pages to serve from:
  - main branch OR /docs OR /dist (depending on framework)

6. OUTPUT
- Print final public URL:
  https://<username>.github.io/architecture-flow-explorer/

7. CONSTRAINTS
- No manual steps allowed
- Must be fully automated via CLI commands
- Must work in Linux/WSL environment
- Must not require external paid services
- Must handle errors gracefully and retry if git push fails

8. FINAL RESULT
After completion:
- repo exists on GitHub
- web app is deployed
- URL is accessible publicly
- all images are visible and categorized

BEGIN EXECUTION IMMEDIATELY.