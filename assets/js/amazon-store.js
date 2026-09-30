/* Amazon "Where to buy" links.
   The first click asks the reader to choose their Amazon store, which is then
   remembered for the whole site; later clicks go straight there. The stores come
   from the dialog's buttons (data/amazon.yaml). Without JavaScript, links go to
   the default store. */

(() => {
  const storageKey = "pandapustories.amazonStore";
  const picker = document.getElementById("amazon-store-picker");
  if (!picker || typeof picker.showModal !== "function") return;

  const storeButtons = [...picker.querySelectorAll("button[name='store']")];
  const domains = new Set(storeButtons.map((button) => button.value));
  const links = [...document.querySelectorAll(".amazon-link")];

  let saved = null;
  try {
    const value = localStorage.getItem(storageKey);
    if (domains.has(value)) saved = value;
  } catch {}

  let pendingLink = null; // the link clicked to open the picker, if any

  const productUrl = (link, domain) =>
    `https://www.${domain}/dp/${encodeURIComponent(link.dataset.asin)}`;

  function showSavedStore() {
    if (!saved) return;
    for (const link of links) {
      link.href = productUrl(link, saved);
      const note = link.nextElementSibling;
      if (note && note.classList.contains("amazon-store")) {
        note.querySelector(".amazon-store-name").textContent = saved;
        note.hidden = false;
      }
    }
  }

  function openPicker(link) {
    pendingLink = link;
    picker.returnValue = "";
    for (const button of storeButtons) {
      if (button.value === saved) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    }
    picker.showModal();
    (storeButtons.find((button) => button.value === saved) || storeButtons[0]).focus();
  }

  for (const link of links) {
    link.addEventListener("click", (event) => {
      // Once a store is chosen, the link already points to it. Let modified
      // clicks (new tab, etc.) follow the link as usual.
      if (saved || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openPicker(link);
    });
  }

  for (const button of document.querySelectorAll(".amazon-store-change")) {
    button.addEventListener("click", () => openPicker(null));
  }

  // A click on the backdrop (outside the form) closes the picker, as Escape does.
  picker.addEventListener("click", (event) => {
    if (event.target === picker) picker.close();
  });

  picker.addEventListener("close", () => {
    const link = pendingLink;
    pendingLink = null;
    if (!domains.has(picker.returnValue)) return; // cancelled
    saved = picker.returnValue;
    try { localStorage.setItem(storageKey, saved); } catch {}
    showSavedStore();
    if (link) window.location.assign(link.href);
  });

  showSavedStore();
})();
