const { extname } = require('path')

const trace = require('../utils/trace')
const config = require('../config/static')


const findType = Types => trace((leafPath) => {
  console.log("Leaf: ", leafPath);

  for (const Type of Object.values(Types)) {
    if (leafPath.indexOf(Type.folder) === 0) {
      return Type;
    }
  }
}, "Finding Best Type for Leaf");

module.exports.findType = findType

const buildTypeMap = (getTypeByStr, parseLeafAsType) => trace(async (iterator) => {
  const types = new Map();
  for await (const str of iterator) {
    console.log("Leaf Path: ", str);
    const innerType = await getTypeByStr(str);

    if (!innerType) {
      console.warn(
        "We did not have a type associated with this leaf path. Add a new value to `types/index.js` with a new Type and try this command again."
      );
      continue;
    }

    const page = await parseLeafAsType(innerType, str);

    if (types.has(innerType)) {
      types.set(innerType, types.get(innerType).add(page));
    } else {
      types.set(innerType, new Set([page]));
    }
  }

  return types;
}, "Build Type Map");

module.exports.buildTypeMap = buildTypeMap


const parseLeafAsType = outputFileType => trace(async (type, leafPath) => {
  console.log("Type: ", type);
  console.log("leafPath: ", leafPath);
  const leafRelativePath = leafPath.replace(type.folder, "");

  const { template, metadata } = await type.templates.leaf(leafPath, {
    url: `${type.rootPath}${leafRelativePath.slice(
      0,
      -extname(leafPath).length
    )}`,
    webmentionURL: config.webmentionURL
  });

  const { url } = metadata;

  return {
    template,
    metadata,
    filePath: `${config.directories.output}/${url}.${outputFileType}`,
    url,
  };
}, "Parse Leaf at Type");

module.exports.parseLeafAsType = parseLeafAsType