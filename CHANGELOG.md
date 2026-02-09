<a name="0.3.0"></a>
## 0.3.0 (2026-02-09)

### Breaking Changes

* **manifest:** Migrated from Manifest V2 to Manifest V3
* **chrome-apis:** Updated all deprecated Chrome Extension APIs to V3 equivalents
* **minimum-version:** Minimum Chrome version updated from 22 to 88

### Features

* **manifest:** Updated to Manifest V3 for continued Chrome Web Store support
* **background:** Converted background page to service worker
* **analytics:** Refactored Google Analytics to use Measurement Protocol (Manifest V3 compatible)
* **permissions:** Separated host permissions from regular permissions
* **csp:** Updated Content Security Policy to V3 format

### Bug Fixes

* **chrome-extension:** Replaced deprecated `chrome.extension` API calls with `chrome.runtime`
* **tabs:** Updated `chrome.tabs.sendRequest` to `chrome.tabs.sendMessage`

### Migration

See [MANIFEST_V3_MIGRATION.md](MANIFEST_V3_MIGRATION.md) for detailed migration information.

<a name="0.2.4"></a>
## 0.2.4 (2015-07-27)


### Bug Fixes

* ***:** fix "X" button on dialogue ([418130b](https://github.com/filso/ng-dependency-graph/commit/418130b))
* ***:** handle annotated reps properly ([13331dc](https://github.com/filso/ng-dependency-graph/commit/13331dc))

### Features

* ***:** change default ignore list ([9260fe3](https://github.com/filso/ng-dependency-graph/commit/9260fe3))
* ***:** get meta data on demand ([b6bd4b8](https://github.com/filso/ng-dependency-graph/commit/b6bd4b8))
* ***:** polling for inspected app ([d228676](https://github.com/filso/ng-dependency-graph/commit/d228676))



