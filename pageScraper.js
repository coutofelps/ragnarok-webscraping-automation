const fs = require('fs')

const scraperObject = {
	page: 1,
	maxPages: 155,
	url: `https://playragnarokonlinebr.com/database/valhalla/monstros?page=`,

	async scraperMonsters(browser) {
		fs.readFile('monsters.json', (err, data) => {
			if(!err && data) {
				fs.unlinkSync('monsters.json')
			}
		})

		fs.writeFileSync('monsters.txt', '')

		for(this.page; this.page <= this.maxPages; this.page++)  {
			let currentPage = this.url + this.page

			let page = await browser.newPage()

			console.log(`Navigating to ${currentPage}... \n`)
	
			await page.goto(currentPage, {
				waitUntil: "domcontentloaded"
			})
	
			const monsters = await page.evaluate(() => {
				const monstersList = document.querySelectorAll("li.monstros")
			
				return Array.from(monstersList).map((monster) => {
					let labels = monster.querySelectorAll("label")
	
					let name = monster.querySelector("h5").innerText.trim()
					let level = labels[1].innerText.replace('Nível ', '').trim()
					let size = labels[2].innerText.trim()
					let race = labels[3].innerText.trim()
					let image = monster.querySelector('img').getAttribute('src')
					let url = 'https://playragnarokonlinebr.com/database/valhalla/' + monster.querySelector('a').getAttribute('href')
	
					return { name, level, size, race, image, url }
				})
			})

			let currentMonsterCollection = JSON.stringify(monsters)
			currentMonsterCollection = currentMonsterCollection.replace('[', '').replace(']', '')
			currentMonsterCollection = replaceLast(currentMonsterCollection, "}", "},")

			fs.appendFileSync('monsters.txt', currentMonsterCollection)
		}

		fs.readFile('monsters.txt', 'utf-8', (error, content) => {
			if(error) console.error('Error while reading the file:', error)

			content = `[${content}]`.replace('},]', '}]')

			fs.appendFileSync('monsters.json', content)
		})
		
		function replaceLast(x, y, z) {
			let a = x.split('')

			a[x.lastIndexOf(y)] = z

			return a.join('')
		}

		await browser.close()

		console.log(`Scraping completed. \n`)
	},

	async scraperMonsterDetails(browser) {}
}

module.exports = scraperObject