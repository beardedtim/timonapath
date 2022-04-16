---
title: |
  Bigi Docs: Basic Types

summary: |
  As I build Bigi, I want to document what choices I made, why,
  and how to use the things I build. This Bigi Doc expresses the
  basic types or Primitives of the Bigi language

tags:
  - bigi
  - programming
  - programming language
---

## Comments

```bigi
--
-- a line that starts with -- will be parsed as
-- a comment until an End of Line character is
-- reached.
--
-- It is convention to put an empty comment line at
-- the top and bottom of a comment block.
--
```

## Numbers

```bigi
12
-12
-12.34
```

## Strings

```bigi
'this is a valid string'
'' -- so is this
'you can even escape things inside of the string\'s body'
```

---

The current implementation and test suite of Bigi can be found
at the [GitHub Repo](https://github.com/mck-p/bigi).
