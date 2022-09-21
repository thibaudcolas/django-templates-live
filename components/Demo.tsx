import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

import Select from "./Select";
import CheckboxField from "./CheckboxField";

const Editor = dynamic(import("./Editor"), { ssr: false });

declare global {
  interface Window {
    requestIdleCallback: (
      callback: () => void,
      config: { timeout: number }
    ) => void;
  }
}

/**
 * Delays an operation by 1-2x the given timeout, then requests
 * idle time so the operation doesn’t affect app performance.
 */
export const delayAndIdle = (
  callback: () => void,
  timeoutHandle: number,
  timeout: number
) => {
  if (timeoutHandle) {
    window.clearTimeout(timeoutHandle);
  }

  return window.setTimeout(() => {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback, { timeout });
    } else {
      callback();
    }
  }, timeout);
};

const fixtures = {
  hello_world: {
    label: "Hello, World!",
    config: JSON.stringify(
      {
        context: {
          name: "Porto",
        },
        tags: {},
      },
      null,
      2
    ),
    source: `Hello, {{ name|upper }}!




`,
    output: [],
  },
  button_component: {
    label: "button component",
    config: JSON.stringify({
      context: {
        name: "Porto",
      },
    }),
    source: `{% load i18n %}

{% translate 'Visit our shop' as button_label %}

{% include "button.html" with label=button_label target_url="https://www.example.com/" %}
`,
    output: [],
  },
};

const editorThemes = [
  { value: "monokai", label: "Dark" },
  { value: "xcode", label: "Light" },
];

const fixturesOptions = Object.entries(fixtures).map(([value, fixture]) => ({
  value,
  label: fixture.label,
}));

const getDefaultTheme = () => {
  try {
    if (window.localStorage) {
      return window.localStorage.getItem("theme") || "monokai";
    }
  } catch {}
  return "monokai";
};

const Demo = () => {
  const [theme, setTheme] = useState(getDefaultTheme());
  const [example, setExample] = useState("hello_world");
  const [parse_only, set_parse_only] = useState(false);
  const [aria_role, set_aria_role] = useState(true);
  const [django_forms_rendering, set_django_forms_rendering] = useState(true);
  const [html_has_lang, set_html_has_lang] = useState(true);
  const [image_alt, set_image_alt] = useState(true);
  const [meta_viewport, set_meta_viewport] = useState(true);
  const [no_autofocus, set_no_autofocus] = useState(true);
  const [tabindex_no_positive, set_tabindex_no_positive] = useState(true);
  const [template_source, set_template_source] = useState(
    fixtures.hello_world.source
  );
  const [template_config, set_template_config] = useState(
    fixtures.hello_world.config
  );
  const [annotations, setAnnotations] = useState(fixtures.hello_world.output);
  const handle = useRef(null);

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);
  useEffect(() => {
    window.text_input.value = template_source;
    window.config_input.value = template_config;
  }, []);
  return (
    <div className="gap-4">
      <div>
        <div className="block flex gap-2">
          <label htmlFor="curlylint_example" className="inline-block mb-8 me-4">
            Demo
            <Select
              id="curlylint_example"
              value={example}
              className="border-2 rounded-sm p-2 border-gray-mid-dark ms-4"
              options={fixturesOptions}
              onChange={(value) => {
                setExample(value);
                set_template_source(fixtures[value].source);
                set_template_config(fixtures[value].config);
                window.text_input.value = fixtures[value].source;
                window.config_input.value = fixtures[value].config;
                delayAndIdle(
                  () => {
                    const evt = new CustomEvent("click");
                    window.render.dispatchEvent(evt);
                  },
                  5,
                  300
                );
                setAnnotations(fixtures[value].output);
              }}
            ></Select>
          </label>
          <label htmlFor="curlylint_theme" className="inline-block mb-8">
            Theme
            <Select
              id="curlylint_theme"
              value={theme}
              className="border-2 rounded-sm p-2 border-gray-mid-dark ms-4"
              options={editorThemes}
              onChange={setTheme}
            ></Select>
          </label>
        </div>
      </div>
      <Editor
        key={example}
        theme={theme}
        value={template_source}
        annotations={annotations}
        onChange={(val) => {
          window.text_input.value = val;
          delayAndIdle(
            () => {
              const evt = new CustomEvent("click");
              window.render.dispatchEvent(evt);
            },
            5,
            300
          );
          set_template_source(val);
        }}
      />
      <h2>Template context and tags overrides</h2>
      <div className="block">
        <Editor
          key={`${example}-config`}
          mode="json"
          theme={theme}
          value={template_config}
          annotations={[]}
          onChange={(val) => {
            window.config_input.value = val;
            delayAndIdle(
              () => {
                const evt = new CustomEvent("click");
                window.render.dispatchEvent(evt);
              },
              5,
              300
            );
            set_template_config(val);
          }}
        />
      </div>
    </div>
  );
};

export default Demo;
