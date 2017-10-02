// Compiled using marko@4.5.0-beta.4 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_component = ({
    onCreate: function () {
        this.state = { task: defaultTaskMessage };
    },
    onTask: function (task) {
        this.state.task = task;
        setTimeout(() => this.state.task = defaultTaskMessage, defaultTaskTimeout);
    }
}),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/amazon-tasker$1.0.0/routes/index/components/tasker-app/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    tasker_input_template = marko_loadTemplate(require.resolve("../tasker-input")),
    marko_loadTag = marko_helpers.t,
    tasker_input_tag = marko_loadTag(tasker_input_template);

const defaultTaskMessage = "Waiting for scan...";
const defaultTaskTimeout = 5000;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div id=\"content\"><h1 class=\"my-5\">" +
    marko_escapeXml(state.task) +
    "</h1>");

  tasker_input_tag({}, out, __component, "2", [
    [
      "task",
      "onTask"
    ]
  ]);

  out.w("</div>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: "#content {\n        background-color: #eceeef;\n        text-align: center;\n        height: 100vh;\n    }",
          virtualPath: "./index.marko.css",
          path: "./index.marko"
        },
      {
          type: "require",
          path: "./"
        }
    ],
    tags: [
      "../tasker-input"
    ]
  };
