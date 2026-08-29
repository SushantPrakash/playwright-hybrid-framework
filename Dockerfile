# syntax=docker/dockerfile:1

# Playwright test framework image.
# The base image ships the browsers and OS dependencies that match the
# @playwright/test version below, so keep the tag in sync with package.json.
ARG PLAYWRIGHT_VERSION=1.62.1

FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble

WORKDIR /usr/src/app

# Install dependencies as a separate, cacheable layer.
# This is a test project, so devDependencies are required - do not omit them.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .

# Port used by `npx playwright show-report` to serve the HTML report.
EXPOSE 9323

# Run the test suite.
CMD ["npx", "playwright", "test"]
