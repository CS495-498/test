# CS 498 CI/CD Demo Repo (Node.js)

This repository is a **mock Node.js (Express) application** designed for a live classroom demo of:

- Branching model: `feature/*` → `dev` → `prod`
- Branch protections on `dev` and `prod`
- GitHub Actions CI on PRs
- Optional CD using deploy hooks (Render/Railway/etc.)

## 1) Run locally

```bash
npm install
npm test
npm start
# open http://localhost:3000/health
```

## 2) Repo contents

- `src/` Express app with `/health`
- `test/` Mocha + Supertest test suite
- `.github/workflows/ci.yml` runs tests on PRs into `dev` or `prod`
- `.github/workflows/cd-dev.yml` triggers deploy hook on push to `dev`
- `.github/workflows/cd-prod.yml` triggers deploy hook on push to `prod`
- `Dockerfile` shows how to package the app as an artifact

---

# README Demo Script

This script assumes you created a new GitHub repository named **test** and have this code locally.

## Part A — Create repo and push initial commit

1. Create GitHub repo: `test`
2. In this folder:

```bash
npm install
npm test
git init
git branch -M main
git add .
git commit -m "Initial mock Node.js app with tests and GitHub Actions CI/CD"
git remote add origin https://github.com/<ORG_OR_USER>/test.git
git push -u origin main
```

## Part B — Rename `main` → `dev` (recommended approach)

**GitHub UI (recommended for demo):**
1. Repo → **Settings → Branches**
2. Rename branch: `main` → `dev`
3. Set default branch to `dev`

**Sync locally:**
```bash
git fetch origin
git branch -m main dev
git branch -u origin/dev dev
git remote set-head origin -a
git pull
```

## Part C — Create `prod` branch

```bash
git checkout dev
git checkout -b prod
git push -u origin prod
git checkout dev
```

## Part D — Branch protections (GitHub UI)

Go to **Settings → Branches → Add branch protection rule**.

### Protect `dev`
- Require a pull request before merging
- Require status checks to pass before merging
  - Select check: **CI**
- Require branches to be up to date before merging
- (Optional) Require 1 approval

### Protect `prod`
- Require a pull request before merging
- Require status checks to pass before merging
  - Select check: **CI**
- Require branches to be up to date before merging
- (Recommended) Require 1–2 approvals
- (Optional) Restrict who can push

## Part E — Optional: CD deploy hooks

If you are using Render/Railway/Fly.io deploy hooks:
- Add GitHub Action secrets:
  - `DEV_DEPLOY_HOOK`
  - `PROD_DEPLOY_HOOK`

(If you do not want to deploy today, you can leave these unset; CI will still work. CD workflows will fail if triggered without secrets.)

---

# Live Demo Flow (What to show students)

## 1) Successful PR into `dev`

```bash
git checkout dev
git pull
git checkout -b feature/add-message
# Edit src/app.js and change the "/" message text
git add .
git commit -m "Update home route message"
git push -u origin feature/add-message
```

On GitHub:
- Open PR: `feature/add-message` → `dev`
- Show CI runs and passes
- Merge PR (merge should be allowed)

## 2) Unsuccessful PR into `dev` (CI fails)

```bash
git checkout dev
git pull
git checkout -b feature/break-tests
# Edit test/health.test.js and change expect(200) to expect(404)
git add .
git commit -m "Intentionally break tests for demo"
git push -u origin feature/break-tests
```

On GitHub:
- Open PR: `feature/break-tests` → `dev`
- Show CI fails
- Show merge is blocked by required checks

**Fix within same PR (optional):**
```bash
# Revert to expect(200)
git add .
git commit -m "Fix tests"
git push
```

## 3) Successful PR from `dev` → `prod`

On GitHub:
- Open PR: `dev` → `prod`
- Show CI passes
- Merge PR
- Show CD-prod workflow triggers (if hooks configured)

## 4) Unsuccessful PR into `prod` (blocked)

```bash
git checkout dev
git pull
git checkout -b feature/break-prod-demo
# Break tests again or introduce a syntax error
git add .
git commit -m "Break build for prod demo"
git push -u origin feature/break-prod-demo
```

On GitHub:
- Open PR: `feature/break-prod-demo` → `prod`
- Show CI fails
- Show merge blocked

---

# Talking Points (keep it simple)

- Humans push code to feature branches.
- GitHub branch protection blocks direct pushes to `dev` and `prod`.
- CI runs tests automatically and blocks merges when tests fail.
- CD deploys automatically after merges (when configured).

---

## Troubleshooting (common)

- CI not running? Check Actions tab and workflow file path: `.github/workflows/ci.yml`
- Status check not selectable in branch protection? Run the workflow once (push to `dev`) so GitHub registers it.
- CD failing? Either set deploy hook secrets or disable CD workflows for the demo.

