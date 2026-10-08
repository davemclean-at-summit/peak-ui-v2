document.addEventListener('DOMContentLoaded', function () {
  const menuContainer = document.querySelector('.detpage .title-container');
  const menuTopContainer = document.querySelector('.detpage .menu-top-container');
  const menuLinks = document.querySelector('.detpage .menu-action-links');
  const mainElement = document.querySelector('.detpage .main');

  // Read-only pages may omit the action menu, so initialize defensively.
  if (!menuContainer || !menuTopContainer || !menuLinks || !mainElement) {
    return;
  }

  const mobileMenu = window.matchMedia('(max-width: 61.875rem)');
  const menuId = menuLinks.id || 'peak-ui-action-menu';
  menuLinks.id = menuId;

  const menuToggle = document.createElement('button');
  menuToggle.type = 'button';
  menuToggle.className = 'background-image-overlay';
  menuToggle.setAttribute('aria-controls', menuId);
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Show page actions');
  menuContainer.insertBefore(menuToggle, menuContainer.firstChild);

  function setMenuState(isOpen) {
    menuLinks.classList.toggle('responsive', isOpen);
    menuTopContainer.classList.toggle('responsive', isOpen);
    mainElement.classList.toggle('responsive', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Hide page actions' : 'Show page actions');

    if (mobileMenu.matches) {
      menuTopContainer.hidden = !isOpen;
      menuLinks.setAttribute('aria-hidden', String(!isOpen));
    } else {
      menuTopContainer.hidden = false;
      menuLinks.removeAttribute('aria-hidden');
    }
  }

  menuToggle.addEventListener('click', function () {
    setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  function handleViewportChange() {
    setMenuState(false);
  }

  if (typeof mobileMenu.addEventListener === 'function') {
    mobileMenu.addEventListener('change', handleViewportChange);
  } else if (typeof mobileMenu.addListener === 'function') {
    // Compatibility with older WebViews used by some hosted Intelex environments.
    mobileMenu.addListener(handleViewportChange);
  }

  setMenuState(false);
});
