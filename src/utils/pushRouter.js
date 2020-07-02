export default function pushRouter(pathName, router) {
  window.history.pushState(
    {},
    pathName,
    window.location.origin + pathName
  )
  router.init();
}
