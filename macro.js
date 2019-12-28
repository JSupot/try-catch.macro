const { createMacro } = require('babel-plugin-macros');

function macro({ babel, references, state }) {
  const { types, template } = babel;
  const wrapFunctionWithTryCatch = template(`{
    try {
      BODY
    } catch(e) {
      console.error(e);
    }
  }`);

  references.TryCatch.forEach(reference => {
    const parentFunction = reference.getFunctionParent();

    if (!parentFunction) {
      return;
    }

    const body = parentFunction.node.body.body;

    if (!body || !body.length) {
      return;
    }

    if (body.length === 1 && types.isTryStatement(body[0])) {
      return;
    }

    parentFunction.get('body').replaceWith(wrapFunctionWithTryCatch({
      BODY: body,
    }));

  });
}

module.exports = createMacro(macro)
