1::git init 

2::git add .

3::commint 

4::
// glpat-bG47bxTpz0Ib1VlWAxztoW86MQp1OmlhazkxCw.01.1216yzyux
You push project to GitLab
        ↓
GitLab CI/CD triggers
        ↓
sync_to_github job runs
        ↓
Your project is pushed to GitHub automatically



Step 1: Create a Simple JavaScript Project

Project structure:

simple-js-project/
│
├── js.js
└── .gitlab-ci.yml


js.js:

// simple test function
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Test the function
console.log(greet("Jugal"));


This is a simple function that we can check when the pipeline runs.

Step 2: Create .gitlab-ci.yml

This will automatically push your project to GitHub every time you push to GitLab.

stages:
  - test
  - sync

# -----------------------------
# 1️⃣ Run JS test
# -----------------------------
test_js:
  stage: test
  image: node:18
  script:
    - node js.js

# -----------------------------
# 2️⃣ Sync GitLab to GitHub
# -----------------------------
sync_to_github:
  stage: sync
  image: alpine:latest
  before_script:
    - apk add --no-cache git
  script:
    - git config --global user.email "you@example.com"
    - git config --global user.name "Your Name"
    - git remote add github https://$GITHUB_TOKEN@github.com/<username>/<repo>.git
    - git fetch github || true
    - git push github HEAD:$CI_COMMIT_REF_NAME --force
  only:
    - branches


Replace:

<username> → your GitHub username

<repo> → your GitHub repository name

you@example.com → your Git email

Your Name → your Git username

Step 3: Add GitHub Token in GitLab

Go to GitLab → Settings → CI/CD → Variables

Add a variable:

Key: GITHUB_TOKEN

Value: Your GitHub Personal Access Token (PAT)

Step 4: Push to GitLab
git init
git add .
git commit -m "Initial commit with simple JS project"
git branch -M main
git remote add origin <your-gitlab-repo-url>
git push -u origin main


GitLab pipeline will start automatically.

Step 5: Check Pipeline

Go to GitLab → CI/CD → Pipelines

You will see two stages:

test_js → Runs node js.js and prints Hello, Jugal!

sync_to_github → Pushes code to GitHub automatically

Go to GitHub → You will see your project mirrored there automatically.

✅ Result:

Any new commits you push to GitLab will run the JS test and sync the project to GitHub automatically.

This works for all branches if your pipeline uses only: branches.