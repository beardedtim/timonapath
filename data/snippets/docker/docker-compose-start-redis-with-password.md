---
title: Start Redis in Docker Compose with a password
summary: |
  A quick one-liner that will start redis in the docker-compose
  system with a password to simulate a hosted version locally and
  sort out any env vars/etc locally before pushing to a stg/prod
  environment

tags:
  - docker
---

```yaml
# source https://nickjanetakis.com/blog/docker-tip-27-setting-a-password-on-redis-without-a-custom-config
version: "3"
services:
  redis:
    image: "redis:4-alpine"
    command: redis-server --requirepass yourpassword
    ports:
      - "6379:6379"
```

You can also create one with an environment variable as the password

```yaml
version: "3"
services:
  redis:
    image: "redis:4-alpine"
    command: redis-server --requirepass $REDIS_PASSWORD
    ports:
      - "6379:6379"
```

```sh
REDIS_PASSWORD=password docker-compose up
```
