module.exports =
  (fn, name) =>
  async (...args) => {
    console.log("");
    console.group(`${"*".repeat(4)}${name}${"*".repeat(4)}`);
    console.time(name);
    try {
      return await fn(...args);
    } catch (e) {
      throw e;
    } finally {
      console.groupEnd();
      console.timeEnd(name);
      console.log("");
    }
  };
