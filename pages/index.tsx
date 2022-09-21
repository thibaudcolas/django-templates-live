import { DOMAttributes }  from 'react';

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import styles from "../styles/Home.module.css";

import Demo, { delayAndIdle } from "../components/Demo";
import { useEffect, useRef, useState } from "react";

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['py-button']: CustomElement<any>;
    }
  }
}

const Home: NextPage = () => {
  const ref = useRef(null);
  const [loadPyScript, setLoadPyScript] = useState(false);
  useEffect(() => {
    const out = ref.current;

    out.innerHTML = `<py-env>
    - './Django-4.0.4-py3-none-any.whl'
    - './django_pattern_library-1.0.0-py3-none-any.whl'
    - './slippers-0.4.0-py3-none-any.whl'
    - paths:
      - /test_app/__init__.py
      - /test_app/templatetags/__init__.py
      - /test_app/templatetags/test_app.py
      - /test_app/templates/icon.html
      - /test_app/templates/button.html
      - /test_app/templates/help_block.html
      - /test_app/templates/heading_block.html
      - /test_app/templates/quote_block.html
      - /demo.py
          </py-env>
          <py-script output="out">
              from demo import render_pattern
              import json

              def render_input():
                  input = Element("text_input")
                  config = Element("config_input")
                  # ignore empty task
                  if not input.element.value:
                      return None
                  out = Element("out")
                  out.element.innerText = render_pattern(input.element.value, json.loads(config.element.value))
          </py-script>`;
  }, []);

  useEffect(() => {
    if (loadPyScript) {
      setInterval(() => {
        const loading = document.querySelector('py-loader');
        if (window.out && !window.out.innerText && !loading) {
          const evt = new CustomEvent("click");
          window.render.dispatchEvent(evt);
        }
      }, 500)
    }
  }, [loadPyScript]);

  return (
    <div className={styles.container}>
      <h1>
        <a href="https://github.com/thibaudcolas/django-templates-live">
          Django Templates ⚡ Live
        </a>
      </h1>
      <input id="text_input" type="hidden" value="Ready – change the template or configuration to the left to see the output here" />
      <textarea
        id="config_input"
        defaultValue={`{"context":{"name": "Test 4"}}`}
        className="hidden"
      ></textarea>
      {/* prettier-ignore */}
      <py-button id="render" label="Render" class="hidden">
        def on_click(evt):
            render_input()
      </py-button>

      <div className="flex gap-4 md:gap-10 pt-8">
        <Demo />

        <div>
          <h2 className="mt-8 mb-8">Output</h2>
          <pre className="whitespace-pre-wrap">
            <div className="relative">
              <div id="out" className="out"></div>
              {!loadPyScript ? (
                <button
                  type="button"
                  onClick={() => setLoadPyScript(true)}
                  className="border-2 rounded-sm p-2 border-gray-mid-dark bg-white ms-4"
                >
                  ⚡ Load Django (30MB)
                </button>
              ) : null}
            </div>
          </pre>
          <details>
            <summary>PyScript logs</summary>
            <div ref={ref}></div>
          </details>
        </div>
      </div>

      {loadPyScript ? <Script src="/pyscript.js"></Script> : null}
    </div>
  );
};

export default Home;
