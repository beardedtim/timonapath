---
title: |
  Bigi Docs: Example Usage

summary: |
  This is what Bigi will allow me to do eventually. This is
  to be used as a reference on how to write my vision of a
  language, not specifically what Bigi implements today.

tags:
  - bigi
  - programming
  - programming language
---

```bigi
--
-- Comments are how we build our documentation
-- with the code itself, hopefully, being much
-- smaller units that get added in codeblocks.
--
-- While Bigi is not a Literate Language, whatever
-- that may mean, it does want to be a lanugage where
-- I as the author am actively speaking to the computer
-- mostly in my native tongue and only creating objects
-- in code that I need to.
--
-- Put it another way, the _act of writing these comments_
-- is what I am after because they will help me understand
-- not only what to write in the codeblocks but also what
-- I have already written.
--
-- Bigi is a language that will do what _I want it to do_
-- which means that the closer I can get it to being english
-- the better for me. And there is nothing better to that
-- goal than actively creating every program with as much
-- english describing Bigi blocks as possible.
--
-- I think.
--

--
-- ---
--

--
-- a Datum is a Thing
-- and we describe what they
-- are via the below schema
--
-- We can reference other Things
-- in our Schema and we can reference
-- our Own Thing
--
-- data <Name> {
--  attr AttrType::Filters
-- }
--

--
-- We are creating this Thing called a User
--

data User {
  --
  -- This Thing has a Property of email and
  -- that Property is of type Text with an Email
  -- filter applied, meaning that only Text that
  -- pass some Email filter will be allowed and
  -- all others will throw
  --
  email Text::Email
  --
  -- This Thing also has a username. The username
  -- is a max of 50 characters and one of the allowed
  -- regexp/characters
  --
  username Text::Max50::OneOf<A-Z|a-z|0-9|\_|\->
}

--
-- Next we create a Thing called a Post
--

data Post {
  --
  -- A Post has a title that is Text
  -- and max 50 characters
  --
  title Text::Max50
  --
  -- It has a description that is Text
  -- and this Text can be Markdown and
  -- will be parsed as such.
  --
  -- It will still be stored as Text
  --
  description Text::Markdown
  --
  -- A Post also has a Property of tags
  -- which are a list of References to
  -- a Tag Thing
  --
  tags [Tag]
  --
  -- A Post has an author which is a
  -- Reference to a User Thing
  --
  author User
  --
  -- A Post has comments that are a
  -- list of References to a Comment Thing
  --
  comments [Comments]
}


--
-- The Comment Thing that we reference
-- above is defined here
--

data Comment {
  post Post
  author User
  text Text::Max280::Markdown
}

--
-- And likewise the tag
--

data Tag {
  name Text::Max50::OneOf<A-Z|a-z|0-9|\_|\-|\s>
}

--
-- We can describe a Datum as one of
-- a subset of other Datums
--
-- This says that a ReactionSubject is either
-- a Post, or a Comment
--

data ReactionSubject
  | Post
  | Comment

--
-- We can also have Enums, which would
-- mean that a ReactionAction is one of
-- the things described
--
-- The functional difference between Enums
-- and the above is that an Enum type are
-- not other Things while the above are other Things
--
-- Ex:
--    data Foo { name Text }
--    data Bar { super Bool }
--
--    -- This would mean that OneOf is either data Foo
--    -- or Data Bar
--    data OneOf
--          | Foo
--          | Bar
--
--    -- This would mean that OneOfEnum is either the
--    -- Symbol Foo or the Symbol Bar
--    enum OneOfEnum
--          | Foo
--          | Bar
--

enum ReactionAction
  | Like
  | Love
  | Frown
  | Laugh

data Reaction {
  subject ReactionSubject
  action ReactionAction
  actor User
}

--
-- We describe our Datums but if we can't
-- do anything with them, then what is this
-- for?
--
-- Each Datum comes with methods that can
-- be used to perform Business Logic
--

--
-- I can create a user
--
let tim = User<{email: 'tim@mck-p.com', username: 'tim'}>


--
-- I can create a post
--
let post = Post<{
  --
  -- and I can attach an author to it
  -- by reference
  --
  author: tim,
  title: 'My First Post',
  description: '#markdown\n\nAccepted\n-here',
  tags: [Tag<{name 'demo'}>]
}>

--
-- I can create a Comment, referencing
-- both User and Post above
--
let comment = Comment<{post, author: tim, text: 'Something cool here!'}>

--
-- And finally, let's add reactions!
--
Reaction<{ subject: post, action: Like, actor: tim }>
Reaction<{ subject: comment, action: Frown, actor: tim }>

--
-- At the end of the above, we would have some User created,
-- with the usernmae and email given. That user would be
-- associated with a Post created, along with the Comment,
-- with the Comment being associated with the Post.
--
-- Note how there is no discussion of _where_ these values
-- are created. I do not think that it matters at this point.
--
-- We _could_ store this all in memory, we _could_ have written
-- it to a file, or even a _database_. The storage unit is not
-- important to the _language_ itself.
--
-- All values are lazy until they are needed to be read from State.
--
-- If we have multiple instances of Bigi running, if we want them to
-- share State, they must point their runtime at the correct State
-- instance they are sharing.
--
-- This may come as ENV VARs, Config Files, etc.
--
let userId = 'some-user-id'

--
-- I can Read a User by their ID
--
let readUser = User.readById<userId>

--
-- I can Update a User by their ID
--
let updatedUser = User.updateById<userId, { email: 'some-new@email.com' }>

--
-- I can Delete a User by their ID
--
let deletedUser = User.deleteById<userId>

--
-- That gets CRUD out of the way. Let's now see how we might offer
-- the programmer a way to query or scan or list the different Datums
--
let gmailUsers = User.where<{ email: { contains: '@gmail.com'} }>

--
-- And basic iteration works
--
for <user of gmailUsers> {
  User.updateById<user.id, {
    email user.email.replace('gmail', 'feemail')
  }>
}
```
