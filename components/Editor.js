import React, { Component } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-nunjucks";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-monokai";

export default class Editor extends Component {
  render() {
    const { readOnly, mode, theme, value, onChange, annotations } = this.props;
    let name = readOnly ? "readonly" : "editor";
    return (
      <AceEditor
        mode={mode || "nunjucks"}
        theme={theme}
        className="w-full 2xl:col-span-2"
        width={800}
        height={mode === "json" ? 200 : 350}
        fontSize={24}
        name={name}
        // readOnly={this.props.readOnly}
        value={value}
        onChange={onChange}
        // editorProps={{ $blockScrolling: true }}
        annotations={annotations.map(({ column, line, code, message }) => ({
          row: line - 1,
          column,
          text: `${code}: ${message}`,
          type: "error",
        }))}
      />
    );
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

Editor.defaultProps = {
  value: "",
  readOnly: false,
  onChange: null,
};
