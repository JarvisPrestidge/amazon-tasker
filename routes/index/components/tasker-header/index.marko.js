// Compiled using marko@4.5.0-beta.4 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/amazon-tasker$1.0.0/routes/index/components/tasker-header/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"jumbotron-fluid\" id=\"header\"><h1 class=\"display-1 font-weight-bold\">Amazon Tasker</h1><p class=\"my-3\">Automatic task delegation</p></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: "#header {\n        background-color: #444;\n        text-align: center;\n        color: #fff;\n        margin: 0px;\n    }",
          virtualPath: "./index.marko.css",
          path: "./index.marko"
        }
    ]
  };
