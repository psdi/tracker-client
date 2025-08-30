window['routerLinkSetup'] = (queryTarget) => {
  queryTarget.querySelectorAll('[data-route]').forEach((routerLink) => {
    routerLink.addEventListener('click', (event) => {
      event.preventDefault();
      const path = event.target.dataset.route;
      const params = event.target.dataset.routeparams;
      const pushState = params ? `${path}?${params}` : path;
      window.history.pushState({}, '', pushState);
      route(path);
    });
  });
}

routerLinkSetup(document);

window.addEventListener('popstate', (event) => {
  event.preventDefault();
  route(window.location.pathname);
});

window['route'] = (page) => {
  switch (page) {
    case '/tea':
      import('./src/tea-form/tea-form').then(() => {
        document.querySelector('#route-outlet').innerHTML = '<tea-form></tea-form>';
      });
      break;
    default:
      import('./src/tea-viewer/tea-viewer').then(() => {
        document.querySelector('#router-outlet').innerHTML = '<tea-viewer></tea-viewer>';
      });
      break;
  }
};

window.onload = () => {
  route(window.location.pathname);
};
