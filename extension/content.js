(() => {
  "use strict";

  const NAME = "anonim";
  const BLACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath fill='black' d='M0 0h64v64H0z'/%3E%3C/svg%3E";
  const PROFILE_NAME_SELECTOR = ".author-header .user-info > h1.user-name";
  const NAME_SELECTOR = `.stream-top a.author, .comment-body > a.comment-heading, ${PROFILE_NAME_SELECTOR}`;
  const AVATAR_LINK_SELECTOR = ".stream-top > a[data-action='user_info']:not(.author), .comment-list .comment > a.uye";
  const AVATAR_SELECTOR = ".stream-top > a[data-action='user_info'] img.avatar, .comment-list .comment > a.uye img.avatar, .author-header .user-avatar img.avatar, .widget .wp-post-image img.avatar";
  const TARGET_SELECTOR = `${NAME_SELECTOR}, ${AVATAR_LINK_SELECTOR}, ${AVATAR_SELECTOR}`;
  const STRUCTURE_SELECTOR = ".stream-top, .comment-body, .comment-list, .comment, a.author, a.comment-heading, a.uye, a[data-action='user_info'], img.avatar, .author-header, .user-info, .user-avatar, h1.user-name, .widget, .wp-post-image";
  const pending = new Set();
  let scheduled = false;

  function setAttribute(element, name, value) {
    if (element.getAttribute(name) !== value) element.setAttribute(name, value);
  }

  function maskLabels(element) {
    setAttribute(element, "title", NAME);
    setAttribute(element, "aria-label", NAME);
    element.removeAttribute("aria-labelledby");
    for (const attribute of ["data-original-title", "data-bs-original-title"]) {
      if (element.hasAttribute(attribute)) setAttribute(element, attribute, NAME);
    }
  }

  function mask(element) {
    if (element.matches(PROFILE_NAME_SELECTOR)) {
      // Profile headings also contain badges and account controls. Keep those
      // elements and their event handlers while replacing only the name text.
      let foundName = false;
      for (const child of element.childNodes) {
        if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) continue;
        const replacement = foundName ? "" : NAME;
        if (child.textContent !== replacement) child.textContent = replacement;
        foundName = true;
      }
      if (!foundName) element.prepend(document.createTextNode(NAME));
      maskLabels(element);
      setAttribute(element, "data-ts-anonymous-name", "");
    } else if (element.matches(NAME_SELECTOR)) {
      // The display name and @username share one author link on TeknoSeyir.
      if (element.textContent !== NAME || element.childElementCount !== 0) {
        element.textContent = NAME;
      }
      maskLabels(element);
      setAttribute(element, "data-ts-anonymous-name", "");
    } else if (element.matches(AVATAR_SELECTOR)) {
      for (const attribute of ["srcset", "sizes", "data-src", "data-srcset", "data-lazy-src", "data-lazy-srcset"]) {
        element.removeAttribute(attribute);
      }
      setAttribute(element, "src", BLACK_AVATAR);
      setAttribute(element, "alt", NAME);
      maskLabels(element);
    } else if (element.matches(AVATAR_LINK_SELECTOR)) {
      maskLabels(element);
    }
  }

  function scan(root) {
    if (root.nodeType === Node.ELEMENT_NODE) {
      if (!root.isConnected) return;
      mask(root);
    }
    for (const element of root.querySelectorAll(TARGET_SELECTOR)) mask(element);
  }

  function flush() {
    scheduled = false;
    const roots = [...pending];
    pending.clear();
    for (const root of roots) {
      // A parent added in the same batch already covers all its children.
      if (!roots.some(other => other !== root && other.contains(root))) scan(root);
    }
  }

  function enqueue(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    pending.add(element);
    if (!scheduled) {
      scheduled = true;
      queueMicrotask(flush);
    }
  }

  const observer = new MutationObserver(records => {
    for (const record of records) {
      const element = record.target.nodeType === Node.ELEMENT_NODE
        ? record.target
        : record.target.parentElement;
      if (!element) continue;
      if (record.type === "childList") {
        enqueue(element.closest(TARGET_SELECTOR));
        for (const added of record.addedNodes) {
          if (added.nodeType === Node.ELEMENT_NODE) enqueue(added);
        }
      } else if (record.type === "characterData") {
        enqueue(element.closest(NAME_SELECTOR));
      } else if (record.attributeName === "class" || record.attributeName === "data-action") {
        if (element.matches(STRUCTURE_SELECTOR)) enqueue(element);
      } else {
        enqueue(element.closest(TARGET_SELECTOR));
      }
    }
  });

  // Observe first so parsing and asynchronous page updates cannot fall between
  // the initial pass and observer registration. Later passes scan only changes.
  observer.observe(document, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [
      "class", "data-action", "src", "srcset", "sizes", "alt", "title",
      "aria-label", "aria-labelledby", "data-original-title", "data-bs-original-title",
      "data-src", "data-srcset", "data-lazy-src", "data-lazy-srcset"
    ]
  });
  scan(document);
})();
