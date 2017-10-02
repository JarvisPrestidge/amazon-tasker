// Compiled using marko@4.5.0-beta.4 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_component = ({
    onMount: function () {
        console.log(this.el);
        this.el.focus();
        this.el.style.opacity = 0;
        console.log('onMount fired');
    },
    keydown: function (event) {
        if (event.keyCode === 13) {
            console.log('Enter pressed');
            const scanCode = event.target.value;
            event.target.value = '';
            console.log(scanCode);
            this.fetchTask(scanCode);
        }
    },
    fetchTask: async function (scanCode) {
        console.log('fetchTask fired');
        const response = await fetch('/badgeid', {
            method: 'POST',
            body: scanCode
        });
        const task = await response.text();
        console.log(task);
        this.emit('task', task);
    }
}),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/amazon-tasker$1.0.0/routes/index/components/tasker-input/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<input id=\"mask-input\" type=\"text\"" +
    marko_attr("data-marko", {
      onkeydown: __component.d("keydown")
    }, false) +
    ">");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "require",
          path: "./"
        }
    ]
  };
