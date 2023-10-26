const pageScraper = require('./pageScraper')

async function scrapeAll(browserInstance) {
	let browser

	try {
		browser = await browserInstance
		await pageScraper.scraperMonsters(browser)
		// await pageScraper.scraperMonsterDetails(browser)
	}

	catch(error) {
		console.log(`Could not create a browser instance => ${error}.`)
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)