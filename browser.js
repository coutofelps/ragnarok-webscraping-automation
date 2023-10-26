const puppeteer = require('puppeteer')

async function startBrowser() {
	let browser

	try {
	    console.log("Opening the browser... \n")

	    browser = await puppeteer.launch({
			// executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
	        headless: false,
	        args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true
	    })
	}
    
    catch(error) {
	    console.log(`Could not create a browser instance => ${error}.`)
	}

	return browser
}

module.exports = {
	startBrowser
}