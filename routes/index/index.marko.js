// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_layout_template = marko_loadTemplate(require.resolve("../../components/site-layout")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
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
            out.w("<div id=\"content\"><div id=\"form-wrapper\"><h1 class=\"my-5\">Waiting for scan...</h1><form id=\"maskForm\" action=\"/badgeid\" method=\"POST\"><input type=\"text\" name=\"scan_code\"><style {\n\n    #content {\n        background-color: #eceeef;\n        text-align: center;\n        height: 100vh;\n    }\n\n    #form-wrapper {\n        position: absolute;\n        width: 100vw;\n        top: 50%;\n    }\n}></style></form></div></div>");
          }
        },
      [hasRenderBodyKey]: true
    }, out);
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "../../components/site-layout"
    ]
  };
