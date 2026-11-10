# CS 495 CI/CD Demo Project

Project for demonstrating Continuous Integration and Continuous Deployment with GitHub Actions.

## What the project does

- `site/` contains a static sprint-status page.
- `site/logic.js` contains a small testable function.
- `test/` contains Node's built-in automated tests.
- `scripts/build.mjs` builds the deployable `dist/` directory.
- `.github/workflows/ci.yml` runs CI for pull requests to `Dev` and `Prod`.
- `.github/workflows/deploy.yml` deploys `Prod` to GitHub Pages after tests and build succeed.

No npm dependencies are required.

## Run locally

Requires Node.js 20+.

```bash
npm test
npm run build
```

After `npm run build`, the deployable site is in `dist/`.

## Repository branch model

```text
feature/* -> Dev -> Prod
              CI      CI + CD
```

- Feature branches contain individual work.
- `Dev` is the integration branch.
- `Prod` is the stable/release branch.
- Pull requests should be used for both feature -> Dev and Dev -> Prod.

## First-time GitHub setup

Create an empty repository on GitHub. From this project directory:

```bash
git init
git add .
git commit -m "Initial CI/CD demo"
git branch -M Dev
git remote add origin YOUR_REPOSITORY_URL
git push -u origin Dev

git checkout -b Prod
git push -u origin Prod
git checkout Dev
```

### Enable GitHub Pages

On GitHub:

1. Open **Settings -> Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

The `deploy.yml` workflow deploys the `dist/` directory when code is pushed to `Prod`.

### Recommended branch protection / rulesets

Protect both `Dev` and `Prod`.

For `Dev`:

- require a pull request before merging;
- require status checks;
- select `CI - Tests` and `CI - Build` after they have run at least once;
- optionally require one approving review.

For `Prod`:

- require a pull request before merging;
- require status checks;
- select `CI - Tests` and `CI - Build`;
- do not allow direct pushes for normal student work.
