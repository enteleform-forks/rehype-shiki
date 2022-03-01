import { select } from "hast-util-select";
import { raw } from "hast-util-raw";
import { toText } from "hast-util-to-text";
import { modifyChildren } from "unist-util-modify-children";
function highlightCode(node, highlighter) {
  const codeElement = select("code", node);
  if (codeElement) {
    let lang;
    if (Array.isArray(codeElement.properties.className))
      lang = codeElement.properties.className.find((c) => c.startsWith("language-")).split("language-")[1];
    else
      lang = "plaintext";
    if (lang === "null")
      lang = "plaintext";
    const code = toText(codeElement, { whitespace: "pre" });
    const highlighted = highlighter.codeToHtml(code, { lang });
    return raw({ type: "raw", value: highlighted });
  }
}
export default function shiki({ highlighter }) {
  return (tree) => {
    modifyChildren((node, index, parent) => {
      if (node.type === "element") {
        if (node.type === "element" && node.tagName === "pre") {
          const highlightedNode = highlightCode(node, highlighter);
          if (highlightedNode) {
            parent.children[index] = highlightedNode;
          }
        }
      }
      if (node.type === "raw") {
        const preNode = select("pre", raw(node));
        if (preNode) {
          const highlightedNode = highlightCode(preNode, highlighter);
          if (highlightedNode) {
            parent.children[index] = highlightedNode;
          }
        }
      }
      return index + 1;
    })(tree);
  };
}
