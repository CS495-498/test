# Quick Ways to Demonstrate a Failed Pipeline

Use one of these during class.

## Failure A: Logic regression

In `site/logic.js`, replace:

```js
return Math.round((completed / total) * 100);
```

with:

```js
return completed / total;
```

The automated percentage tests fail.

## Failure B: Syntax error

Temporarily remove a closing brace from `site/logic.js`.

The test job fails before tests can complete.

## Failure C: Break the build script

In `package.json`, change:

```json
"build": "node scripts/build.mjs"
```

to:

```json
"build": "node scripts/does-not-exist.mjs"
```

Tests pass, but `CI - Build` fails. This is useful for explaining that passing tests do not guarantee a releasable build.
