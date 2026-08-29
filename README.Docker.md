### Running the tests in Docker

Build the image and run the full Playwright suite:

`docker compose up --build`

The container uses `mcr.microsoft.com/playwright:v1.62.1-noble`, which bundles the
browsers and OS libraries matching `@playwright/test` in `package.json`. Keep the
`PLAYWRIGHT_VERSION` arg (Dockerfile / compose.yaml) in sync whenever you bump that
dependency.

Test output is written back to the host via bind mounts:

* `./playwright-report` – HTML report
* `./test-results`      – traces, screenshots, videos

Run a subset of tests:

`docker compose run --rm e2e npx playwright test loginTests`

Browse the last HTML report at http://localhost:9323:

`docker compose run --rm --service-ports report`

### Deploying / sharing the image

`docker build -t myregistry.com/eshop-e2e .`
`docker push myregistry.com/eshop-e2e`

If your target runs a different CPU architecture, build with
`docker build --platform=linux/amd64 -t myregistry.com/eshop-e2e .`.

### References
* [Playwright Docker guide](https://playwright.dev/docs/docker)
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
