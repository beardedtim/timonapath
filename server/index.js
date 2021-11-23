const express = require("express");
const db = require("./db");

const app = express();

const createMentionHTML = (mentions) =>
  mentions.length
    ? `
<ul class="h-cite p-mention">
  ${mentions
    .map(
      ({ source, type }) =>
        `<li><a href="${source}">TYPE: ${type} | ${source}</a></li>`
    )
    .join("\n")}
</ul>
`
    : "<em>No Webmentions yet...Send me one?</em>";

app
  .post(
    "/webmentions",
    express.urlencoded({ extended: true }),
    async (req, res) => {
      if (!req.body?.source) {
        return res.status(400).end("You did not send me a source!");
      }

      if (!req.body?.target) {
        return res.status(400).end("You did not send me a target!");
      }

      const type = req.body.type || "create";

      try {
        const result = await db
          .into("webmentions")
          .insert({
            source: req.body.source,
            target: req.body.target,
            type,
          })
          .returning("*");

        res.status(201).json({
          data: result,
        });
      } catch (e) {
        console.log("ERROR SAVING WEBMENTION");
        console.error(e);
        if (e.code === "23505") {
          res.status(400).json({
            error: {
              messgae:
                "We have already saved that specific version before. Maybe you are trying to tell me that you updated or deleted it instead of creating?",
            },
          });
        } else {
          res.status(400).json({
            error: {
              messgae:
                "We failed to save your webmention. Please try your request again later.",
            },
          });
        }
      }
    }
  )
  .get("/webmentions", async (req, res) => {
    const path = req.query.path;

    if (!path) {
      return res
        .status(400)
        .end(
          "You must give me a URL as a query agrument for me to tell you the webmentions it has"
        );
    }

    console.log('Looking for webmentions for "%s"', path);
    console.log('Setting target at "%s"', `https://timonapath.com${path}`);

    try {
      const mentions = await db
        .from("webmentions")
        .select("*")
        .where({
          target: `https://timonapath.com${path}`,
        });

      res.end(createMentionHTML(mentions));
    } catch (e) {
      console.log("ERROR READING WEBMENTION");
      console.error(e);

      res.status(400).json({
        error: {
          message:
            "There was some error reading the webmention. Try again later.",
        },
      });
    }
  });

db.migrate.latest().then(() => {
  app.listen(5000, () => {
    console.log("I have started again");
  });
});
