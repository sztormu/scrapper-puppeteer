const puppeteer = require("puppeteer")

async function scrapeUEK(url) {
    const browser = await puppeteer.launch()

    try {
        console.log("scrapping UEK...")
        const page = await browser.newPage()
        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        });

        const data = await page.evaluate(() => {
            const groups = document.getElementsByClassName('kategorie')[1]
            const trs = Array.from(groups.querySelectorAll('a'))
            return trs.map(tr => tr.innerText)
        })

        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
        }

    }
    catch (e) {
        console.error(e)

    }
    finally {
        await browser.close()
    }

}

async function scrapeTwitter(url) {
    const browser = await puppeteer.launch()

    try {
        console.log("scrapping Twitter...")
        const page = await browser.newPage()
        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        });

        await page.waitForXPath('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div[1]/a/div[1]/div[2]/div/img')
        const [el] = await page.$x('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div[1]/a/div[1]/div[2]/div/img')
        const src = await el.getProperty('src')
        const profile_picture = await src.jsonValue()


        await page.waitForXPath('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div[2]/div/div/div[1]/div/span[1]/span')
        const [el2] = await page.$x('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div[2]/div/div/div[1]/div/span[1]/span')
        const txt = await el2.getProperty('textContent')
        const profile_name = await txt.jsonValue()

        console.log({ profile_picture, profile_name })

    }
    catch (e) {
        console.error(e)

    }
    finally {
        await browser.close()
    }
}




scrapeUEK('http://planzajec.uek.krakow.pl/index.php')
scrapeTwitter('https://twitter.com/sodapoppintv')