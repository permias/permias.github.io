module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy({
    "src/assets/img": "static/img"
  });
  // eleventyConfig.addPassthroughCopy({
  //   "node_modules/@fortawesome/fontawesome-free/scss/fontawesome": "static/img"
  // });

  // Returning something from the configuration function is optional
  return {
    dir: {
      output: 'public',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    }
  };
};
