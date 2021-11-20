const glob = require("glob");
const { Lazy } = require("@beardedtim/lazy");

module.exports = (path, fileType = "*") =>
  new Promise((res, rej) => {
    const requestPath = `${path}/**/*.${fileType}`;

    glob(`${path}/**/*.${fileType}`, (err, data) => {
      if (err) {
        return rej(err);
      }

      res(
        new Lazy(async function* () {
          for (const file of data) {
            yield file;
          }
        })
      );
    });
  });
