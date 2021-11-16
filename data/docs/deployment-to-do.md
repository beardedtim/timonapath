---
title: Deploy Website
summary: How we currently update the site
url: /docs/internal/deploy-this-website
tags:
  - site docs
---

# How to Deploy this Website

This assumes you have built the assets via `yarn create::static`
already

## Step 0: Make changes and commit to git `main`

```sh
git add . && git commit -m "My Message"
```

## Step 1: Update Origin

```sh
git push
```

## Step 2: SSH into DO Droplet

```sh
ssh username@ip
```

## Step 3: Go to directory

```sh
cd my/directory/place
```

## Step 4: Pull Origin

```sh
git pull
```

## Step 6 (optional): Restart Docker-Compose

```sh
docker-compose up --build -d
```

_**Note**_: This is only needed when you need to restart or otherwise modify
the running NGINX 