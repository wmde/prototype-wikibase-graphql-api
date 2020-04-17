module.exports = {
  Item: {
    sitelinks: ({ sitelinks }, { sites }) => {
      if (sites) {
        return Object.values(sitelinks).filter(({ site }) => sites.includes(site));
      }
      return Object.values(sitelinks);
    }
  }
}
