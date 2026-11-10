const { generateSite } = require('./services/build.service');

generateSite()
  .then((result) => {
    console.log(`Site generated: ${result.pages} pages in ${result.outputDirectory}`);
  })
  .catch((error) => {
    console.error('Site generation failed:', error);
    process.exitCode = 1;
  });
