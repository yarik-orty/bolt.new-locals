ARG BASE=node:20.18.0
FROM ${BASE} AS base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm && pnpm install

COPY . .

EXPOSE 5173

FROM base AS bolt-ai-prod

ARG OPENAI_API_KEY
ARG VITE_LOG_LEVEL=debug

ENV OPENAI_API_KEY=${OPENAI_API_KEY} \
    VITE_LOG_LEVEL=${VITE_LOG_LEVEL}

RUN mkdir -p /root/.config/.wrangler && \
    echo '{"enabled":false}' > /root/.config/.wrangler/metrics.json

RUN npm run build

CMD [ "pnpm", "run", "dockerstart"]

FROM base AS bolt-ai-dev

ARG OPENAI_API_KEY
ARG VITE_LOG_LEVEL=debug

ENV ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY} \
    VITE_LOG_LEVEL=${VITE_LOG_LEVEL}

RUN mkdir -p ${WORKDIR}/run
CMD pnpm run dev --host
