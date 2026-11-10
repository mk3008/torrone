FROM mcr.microsoft.com/playwright:v1.65.0-noble AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends fonts-noto-cjk \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /opt/bench-tools
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
ENV NODE_PATH=/opt/bench-tools/node_modules
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV CI=1 STORYBOOK_DISABLE_TELEMETRY=1
WORKDIR /bench

FROM runtime AS storybook
WORKDIR /opt/storybook-tools
COPY storybook/package.json storybook/package-lock.json ./
RUN npm ci --no-audit --no-fund
ENV PATH=/opt/storybook-tools/node_modules/.bin:$PATH
WORKDIR /bench
