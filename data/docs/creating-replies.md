---
title: Creating Replies
summary: This goes over how you can link posts in the system as replies to one another
---

## Step 0: Create Replies MD File

```sh
cat &data/replies/my-new-reply.md <<EOL
---
title: Some Reply Title
traget: https://target.url/we/are/replying/to
---


## My reply in markdown

EOL
```

## Step 1: Send Request To Store Webmention

```sh
curl -i \
  -d source=https://timonapath.com/replies/my-new-reply \
  -d target=https://target.url/we/are/replying/to \
  https://timonapath.com/api/webmentions
```

## Step 2 (optional): Send UPDATE or DELETE

```sh
curl -i \
  -d source=https://timonapath.com/replies/my-new-reply \
  -d target=https://target.url/we/are/replying/to \
  -d type=update \ # also -d type=delete
  https://timonapath.com/api/webmentions
```