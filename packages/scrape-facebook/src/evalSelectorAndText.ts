export const $$evalSelectorAndText = (
  page,
  selector,
  text,
  cb,
  args?: any,
  multiple = true
) => {
  const cbString = cb.toString();
  return page.$$eval(
    selector,
    (els, { text, cbString, multiple, args }) => {
      const filtered = els.filter((el) => el.textContent.includes(text));
      const el = multiple ? filtered : filtered[0];

      if (!el) return false;

      // https://github.com/puppeteer/puppeteer/issues/1474#issuecomment-357324310
      const cb = new Function(
        " return (" + cbString + ").apply(null, arguments)"
      );
      return cb.call(null, el, args);
    },
    { text, cbString, multiple, args }
  );
};

export const $evalSelectorAndText = (page, selector, text, cb, args?: any) =>
  $$evalSelectorAndText(page, selector, text, cb, args, false);
