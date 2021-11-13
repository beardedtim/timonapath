---
title: Create New Type
summary: Doc on how to create a new type within the current system
url: /docs/internal/create-new-type
---

# How to Create a New Domain

## Overview

This will walk us through how to create a new top-level
path or `domain` for the system.

## Step 0: Create Folder Structure

```sh
mkdir data/my-new-path
```

## Step 1: Create First Entry

```sh
cat >data/my-new-path <<EOL
---
title: My Title
summary: Some Summary
---
EOL
```