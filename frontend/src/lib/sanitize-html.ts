import xss, { whiteList } from "xss";

const customWhiteList = Object.keys(whiteList).reduce((acc, element) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  acc[element] = whiteList[element].concat(["style"]);
  return acc;
}, {});

export function sanitizeHtml(html: string): string {
  return xss(html, {
    whiteList: customWhiteList,
    css: {
      whiteList: {
        "text-align": /^start|end|left|right|center|justify|justify-all$/,
      },
    },
  });
}
