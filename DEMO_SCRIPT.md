# Instructor Demo Script: GitHub CI/CD

## Goal

Demonstrate the entire engineering path:

```text
change -> feature branch -> pull request -> CI -> merge to Dev
       -> pull request -> CI -> merge to Prod -> CD -> deployed site
```

## Part 1: Show that tests work locally

```bash
npm test
npm run build
```

Open `dist/index.html` if desired.

## Part 2: Create a feature branch and intentionally break the code

Start from `Dev`:

```bash
git checkout Dev
git pull
git checkout -b feature/progress-calculation
```

Open `site/logic.js`.

Change:

```js
return Math.round((completed / total) * 100);
```

to the intentionally incorrect version:

```js
return completed / total;
```

Commit and push:

```bash
git add site/logic.js
git commit -m "Change progress calculation"
git push -u origin feature/progress-calculation
```

## Part 3: Open a pull request to Dev

On GitHub:

- base: `Dev`
- compare: `feature/progress-calculation`

Open the PR.

Go to the checks / Actions run. `CI - Tests` should fail because the tests expect percentages such as `75`, not `0.75`.

Ask students:

> Should the code be merged because it looks reasonable, or should the failing automated evidence block integration?

## Part 4: Fix the failure

Restore:

```js
return Math.round((completed / total) * 100);
```

Then:

```bash
git add site/logic.js
git commit -m "Fix progress calculation"
git push
```

The same PR should automatically receive a new CI run.

Show:

- `CI - Tests` -> pass
- `CI - Build` -> pass

Merge the PR to `Dev`.

## Part 5: Release Dev to Prod

Open another pull request:

- base: `Prod`
- compare: `Dev`

CI runs again. When the checks pass, merge to `Prod`.

## Part 6: Observe Continuous Deployment

Merging to `Prod` triggers:

```text
CD - Verify Tests
        |
        v
CD - Build Release
        |
        v
CD - Deploy
        |
        v
GitHub Pages
```

Open **Actions -> CD - Deploy to GitHub Pages** and inspect each job.

When deployment finishes, open the deployment URL displayed by GitHub.

## Part 7: Show the relationship between CI and CD

CI protected `Dev` and `Prod` from a known regression.

CD did not deploy until:

1. code reached `Prod`;
2. automated tests passed;
3. the deployable site built successfully.

## Optional visible-release change

On a new feature branch, change the heading in `site/index.html` from:

```html
<h1>Capstone Sprint Status</h1>
```

to:

```html
<h1>Capstone Sprint Dashboard</h1>
```

Repeat feature -> Dev -> Prod. Refresh the GitHub Pages site after deployment and show that the new release is live.
