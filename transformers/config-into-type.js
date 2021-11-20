module.exports = (typeConfig) =>
  Object.assign(typeConfig, {
    toString: () => `[Type:${typeConfig.name}]`,
    toJSON: (pretty = false) =>
      JSON.stringify(typeConfig, null, pretty ? 2 : 0),
  });
