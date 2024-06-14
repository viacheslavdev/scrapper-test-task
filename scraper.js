const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios')

async function scrapeCatalog() {
    const url = 'https://www.tus.si/';
    const dataDir = './catalogs';
    const downloadDir = './downloads'

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    // init puppeteer

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.setViewport({ width: 1080, height: 1024 });


    // function will wait for the promise to resolve and return its value
    const catalogs = await page.evaluate(() => {
        const catalogElements = document.querySelectorAll('.card-catalogue')

        // create an array from card-catalogue
        // take the each element from catalogElements
        const catalogList = Array.from(catalogElements).map((element) => {
            const name = element.querySelector('h3 a').textContent
            const link = element.querySelector('a.link-icon.pdf').href
            const dateElements = element.querySelectorAll('time')
            const date = `${dateElements[0].textContent.trim()} - ${dateElements[1].textContent.trim()}`
            return { name, link, date }
        })
        return catalogList

    })

    // Сreate the catalogs.json
    const filePath = path.join(dataDir, 'catalogs.json');
    fs.writeFileSync(filePath, JSON.stringify(catalogs, null, 2))
    
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir)
    }

    //  Downloads PDF files from the given URLs in the catalogs array and saves them to the specified directory.
    await Promise.all(catalogs.map(async (catalog, index) => {
        const pdfUrl = catalog.link
        const pdfPath = path.join(downloadDir, `${catalog.name}.pdf`)
        const response = await axios({
            url: pdfUrl,
            method: 'GET',
            responseType: 'stream'
        })

        response.data.pipe(fs.createWriteStream(pdfPath))
    }))


    await browser.close();

    return catalogs
}

scrapeCatalog()