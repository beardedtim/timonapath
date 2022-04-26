---
title: |
  Bigi Docs: Data and Functions

summary: |
  Following the initial release, we are adding the ability for the
  lexer to understand how to parse data definitions and function calls
tags:
  - bigi
  - programming
  - programming language
---

## Data Defintions

```bigi
--
-- a Datum is a _Thing_. By creating one, you are saying to
-- the system "Hey, I want to store some state and offer CRUD"
-- Another way to say it is that when we create a Data, we are
-- creating a new Domain inside of our system, with APIs, DataBase,
-- Caches, etc all created behind the scenes.
--
data Foo {
  name: Text::Max50::Markdown,
  age: Int
}
```

## Function Calls

```bigi
--
-- If you have a function followed by <,
-- we will parse it as calling or invoking
-- the function with the arguments supplied,
-- separated by a comma, until the closing >
--
-- We are calling these CAROT_BRACKETS internally
-- until I do research and find out what they are
-- actually called.
--
functionName<functionArg1, functionArg2>
```
