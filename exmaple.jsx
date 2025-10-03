# Goal:

# You want your project on GitHub to 
automatically trigger GitLab CI/CD and 
optionally sync changes back to GitHub.


# .
# ├── .gitlab-ci.yml
# ├── simple-js-project
# │   └── js.js


🟢 Option 1 — Run on multiple branches (e.g. main and dev)
stages:
  - run

run_js:
  stage: run
  image: node:18
  script:
    - node simple-js-project/js.js
  only:
    - main
    - dev


🟡 Option 2 — Run on all branches
stages:
  - run

run_js:
  stage: run
  image: node:18
  script:
    - node simple-js-project/js.js
  only:
    - branches



    🟠 Option 3 — Run on branches + tags
stages:
  - run

run_js:
  stage: run
  image: node:18
  script:
    - node simple-js-project/js.js
  only:
    - branches
    - tags



    🔵 Option 4 — Run on merge requests too
stages:
  - run

run_js:
  stage: run
  image: node:18
  script:
    - node simple-js-project/js.js
  only:
    - main
    - merge_requests



    ✅ Summary

Use - branchname to target specific branches.

Use - branches to target all branches.

Use - tags to target all tags.

Use - merge_requests to run on merge requests.

🔥 Recommended for a simple JS project:

only:
  - branches
  - tags