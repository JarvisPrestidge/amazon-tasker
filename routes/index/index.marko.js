// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    input_form_template = marko_loadTemplate(require.resolve("./components/input-form")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    input_form_tag = marko_loadTag(input_form_template),
    site_layout_template = marko_loadTemplate(require.resolve("../../components/site-layout")),
    site_layout_tag = marko_loadTag(site_layout_template);

function render(input, out) {
  var data = input;

  site_layout_tag({
      title: {
          renderBody: function renderBody(out) {
            out.w("Amazon Tasker");
          }
        },
      body: {
          renderBody: function renderBody(out) {
            out.w("<div id=\"content\"><div id=\"form-wrapper\"><h1 class=\"my-5\">Waiting for scan...</h1>");

            input_form_tag({}, out);

            out.w("</div></div>");
          }
        },
      [hasRenderBodyKey]: true
    }, out);
}

marko_template._ = render;

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: "#content {\n        background-color: #eceeef;\n        text-align: center;\n        height: 100vh;\n    }\n\n    #form-wrapper {\n        position: absolute;\n        width: 100vw;\n        top: 50%;\n    }",
          virtualPath: "./index.marko.css",
          path: "./index.marko"
        }
    ],
    tags: [
      "./components/input-form",
      "../../components/site-layout"
    ]
  };
