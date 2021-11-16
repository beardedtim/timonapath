---
title: Sending Tim on a Path a Webmention
summary: We go over how to send an HTTP request to this server for webmentions
tags:
  - site docs
---

## Step 0: Send Request To Store Webmention

```sh
curl -i \
  -d source=https://timonapath.com/replies/my-new-reply \
  -d target=https://target.url/we/are/replying/to \
  https://timonapath.com/api/webmentions
```

## Step 1 (optional): Send UPDATE or DELETE

```sh
curl -i \
  -d source=https://timonapath.com/replies/my-new-reply \
  -d target=https://target.url/we/are/replying/to \
  -d type=update \ # also -d type=delete
  https://timonapath.com/api/webmentions
```