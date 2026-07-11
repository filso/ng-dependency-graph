<a name="0.4.0"></a>

## 0.4.0 (2026-07-11)

### Features

- **graph:** auto-fit the graph to the viewport once the initial layout settles
- **graph:** wider zoom range (0.1x - 3x)
- **icons:** proper 16/48/128 px extension icons

### Bug Fixes

- **graph:** graph no longer starts off-screen — the force layout was initialised with a 0x0
  viewport when the panel had not been laid out yet
- **inject:** replaced the removed `DOMNodeInserted` mutation event (gone since Chrome 127)
  with polling, fixing detection of apps bootstrapped asynchronously
- **styles:** compiled CSS is now checked in — the extension works straight from a checkout
  (previously `app.css` was gitignored and required a gulp build)

### Refactor

- Modernised the whole codebase to ES2015+ (classes, const/let, arrow functions)
- Removed lodash, angular-animate and jshint; removed dead code (unused modules, empty
  controllers, `dev` service, Google Analytics calls to the long-dead Universal Analytics)
- Replaced gulp 3 / karma / phantomjs with vitest, ESLint 9 and Prettier; added GitHub
  Actions CI
- SCSS replaced by a single plain CSS file with custom properties; no build step at all

<a name="0.3.0"></a>

## 0.3.0 (2026-02-09)

### Breaking Changes

- **manifest:** Migrated from Manifest V2 to Manifest V3
- **chrome-apis:** Updated all deprecated Chrome Extension APIs to V3 equivalents
- **minimum-version:** Minimum Chrome version updated from 22 to 88

### Features

- **manifest:** Updated to Manifest V3 for continued Chrome Web Store support
- **background:** Converted background page to service worker
- **analytics:** Refactored Google Analytics to use Measurement Protocol (Manifest V3 compatible)
- **permissions:** Separated host permissions from regular permissions
- **csp:** Updated Content Security Policy to V3 format

### Bug Fixes

- **chrome-extension:** Replaced deprecated `chrome.extension` API calls with `chrome.runtime`
- **tabs:** Updated `chrome.tabs.sendRequest` to `chrome.tabs.sendMessage`

<a name="0.2.4"></a>

## 0.2.4 (2015-07-27)

### Bug Fixes

- ***:** fix "X" button on dialogue ([418130b](https://github.com/filso/ng-dependency-graph/commit/418130b))
- ***:** handle annotated reps properly ([13331dc](https://github.com/filso/ng-dependency-graph/commit/13331dc))

### Features

- ***:** change default ignore list ([9260fe3](https://github.com/filso/ng-dependency-graph/commit/9260fe3))
- ***:** get meta data on demand ([b6bd4b8](https://github.com/filso/ng-dependency-graph/commit/b6bd4b8))
- ***:** polling for inspected app ([d228676](https://github.com/filso/ng-dependency-graph/commit/d228676))
