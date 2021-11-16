---
title: Creating Replies
summary: This goes over how you can link posts in the system as replies to one another
tags:
  - site docs
---

## Step 0: Create Replies MD File

```sh
cat &data/replies/my-new-reply.md <<EOL
---
title: Some Reply Title
target: https://target.url/we/are/replying/to
---


## My reply in markdown

EOL
```

## Step 1: [Send Webmention](/docs/sending-web-mention)