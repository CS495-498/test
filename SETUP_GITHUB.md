# GitHub Setup for the CI/CD Demo

## 1. Create an empty repository

Create a new empty GitHub repository. Do not add a README or `.gitignore` on GitHub because both already exist in this project.

## 2. Push the project with `Dev` as the integration branch

From the project folder:

```bash
git init
git add .
git commit -m "Initial CI/CD demo"
git branch -M Dev
git remote add origin YOUR_REPOSITORY_URL
git push -u origin Dev
```

Create and push the release branch:

```bash
git checkout -b Prod
git push -u origin Prod
git checkout Dev
```

The intended branch flow is:

```text
feature/* -> Dev -> Prod
```

## 3. Enable GitHub Pages

On GitHub:

1. Open **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

The provided `deploy.yml` runs when `Prod` receives a push.

## 4. Run CI once before configuring required checks

Create a small feature branch and pull request to `Dev`, or push a harmless change to `Dev`, so GitHub records the check names.

The workflow exposes these checks:

```text
CI - Tests
CI - Build
```

## 5. Protect `Dev`

Use a branch protection rule or repository ruleset for `Dev`.

Recommended classroom settings:

- Require a pull request before merging.
- Require status checks before merging.
- Require `CI - Tests`.
- Require `CI - Build`.
- Optionally require one approving review.
- Do not allow routine direct pushes.

## 6. Protect `Prod`

Apply the same CI checks to `Prod`.

Recommended:

- Require pull request before merging.
- Require `CI - Tests`.
- Require `CI - Build`.
- Treat `Prod` as release-only.

## 7. Confirm deployment

After merging `Dev` into `Prod`, open:

```text
Actions -> CD - Deploy to GitHub Pages
```

You should see:

```text
CD - Verify Tests
        -> CD - Build Release
        -> CD - Deploy
```

After deployment, GitHub displays the Pages URL in the deployment job and repository Pages settings.
