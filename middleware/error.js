export default defineEventHandler(async (event) => {
  const urlObj = getRequestURL(event);

  if (
    urlObj.pathname.includes('/__nuxt_error') ||
    urlObj.pathname.includes('/__nuxt_island')
  ) {
    return;
  }

  if (urlObj.pathname === '/login/error') {
    await sendRedirect(event, '/login');
  }
});
