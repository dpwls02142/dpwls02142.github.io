const ATTR_DISPLAY = 'sidebar-display';
const $sidebar = document.getElementById('sidebar');
const $trigger = document.getElementById('sidebar-trigger');
const $mask = document.getElementById('mask');

class SidebarUtil {
  static #isExpanded = false;

  static toggle() {
    this.#isExpanded = !this.#isExpanded;

    document.body.toggleAttribute(ATTR_DISPLAY, this.#isExpanded);

    if ($sidebar) {
      $sidebar.classList.toggle('z-2', this.#isExpanded);
    }

    if ($mask) {
      $mask.classList.toggle('d-none', !this.#isExpanded);
    }
  }
}

export function initSidebar() {
  if ($trigger && $mask) {
    $trigger.onclick = $mask.onclick = () => SidebarUtil.toggle();
  }
}