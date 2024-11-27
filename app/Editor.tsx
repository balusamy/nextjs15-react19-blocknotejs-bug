"use client";

import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultProps,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { createReactBlockSpec, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

// The types of alerts that users can choose from
const alertTypes = {
  warning: {
    icon: "⚠️",
    color: "#e69819",
    backgroundColor: "#fff6e6",
  },
  error: {
    icon: "⛔",
    color: "#d80d0d",
    backgroundColor: "#ffe6e6",
  },
  info: {
    icon: "ℹ️",
    color: "#507aff",
    backgroundColor: "#e6ebff",
  },
  success: {
    icon: "✅",
    color: "#0bc10b",
    backgroundColor: "#e6ffe6",
  },
};

export const alertBlock = createReactBlockSpec(
  {
    type: "alert",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "warning",
        values: ["warning", "error", "info", "success"],
      },
    },
    content: "inline",
  },
  {
    render: ({ block, editor, contentRef }) => (
      <div
        className="alert"
        style={{
          backgroundColor: alertTypes[block.props.type].backgroundColor,
        }}>
        <select
          contentEditable={false}
          value={block.props.type}
          onChange={(event) => {
            editor.updateBlock(block, {
              type: "alert",
              props: { type: event.target.value as keyof typeof alertTypes },
            });
          }}>
          <option value="warning">{alertTypes["warning"].icon}</option>
          <option value="error">{alertTypes["error"].icon}</option>
          <option value="info">{alertTypes["info"].icon}</option>
          <option value="success">{alertTypes["success"].icon}</option>
        </select>
        <div className="inline-content" ref={contentRef} />
      </div>
    ),
  }
);

const simpleImageBlock = createReactBlockSpec(
  {
    type: "simpleImage",
    propSchema: {
      src: {
        default:
          "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
      },
    },
    content: "none",
  },
  {
    render: ({ block }) => (
      <img className="simple-image" src={block.props.src} alt="placeholder" />
    ),
  }
);

export const bracketsParagraphBlock = createReactBlockSpec(
  {
    type: "bracketsParagraph",
    content: "inline",
    propSchema: {
      ...defaultProps,
    },
  },
  {
    render: ({ contentRef }) => (
      <div className="brackets-paragraph">
        <div contentEditable={false}>{"["}</div>
        <span contentEditable={false}>{"{"}</span>
        <div className="inline-content" ref={contentRef} />
        <span contentEditable={false}>{"}"}</span>
        <div contentEditable={false}>{"]"}</div>
      </div>
    ),
  }
);

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: alertBlock,
    simpleImage: simpleImageBlock,
    bracketsParagraph: bracketsParagraphBlock,
  },
});

export default function Editor() {
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "alert",
        props: {
          type: "success",
        },
        content: "Alert",
      },
      {
        type: "simpleImage",
        props: {
          src: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        },
      },
      {
        type: "bracketsParagraph",
        content: "Brackets Paragraph",
      },
      {
        type: "alert",
        props: {
          type: "success",
        },
        content: "Alert",
      },
      {
        type: "simpleImage",
        props: {
          src: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        },
      },
      {
        type: "bracketsParagraph",
        content: "Brackets Paragraph",
      },
    ],
  });

  return <BlockNoteView editor={editor} />;
}