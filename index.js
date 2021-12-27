const puppeteer = require('puppeteer');
const fs = require('fs');
async function start() {
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const url = 'https://www.allthingsbabynames.com/category/';
    const browser = await puppeteer.launch({
        headless: false
    });  
    names = [];
    for(var k = 0; k < 26; k++){
        var page = await browser.newPage();
        await page.waitFor(1000);
        for(var o = 1; o < 3; o++){
            try{
                await page.goto(url+letters[k]+'-girl-names/');
                break;
            }
            catch{
                console.log("jeff");
            }
        }
        await page.waitFor(10000);
        for(var l = 1; l < 100; l++){
            try{
                var xman = await page.$x('/html/body/div[1]/div/div/div/div/div/div[2]/div/div[1]/div/div/div[3]/div/article['+l+']/h2/a');
                await page.waitFor(1000);
                var msg = await page.evaluate(el => el.textContent, xman[0]);
                console.log(names);
                names.push('\n'+msg);
            }
            catch{
                break;
            }
        }
        await page.close();
    }
    var writeStream = fs.createWriteStream('girlnames.csv');

    writeStream.write(`names \n`);
    names = names.toString();
    names.replace("[", "");
    names.replace("]", "");
    names.replace(",", "");
    writeStream.write(names);
    names = [];
    for(var k = 0; k < 26; k++){
        var page = await browser.newPage();
        await page.waitFor(1000);
        for(var o = 1; o < 3; o++){
            try{
                await page.goto(url+letters[k]+'-boy-names/');
                break;
            }
            catch{
                console.log("jeff");
            }
        }
        await page.waitFor(10000);
        for(var l = 1; l < 100; l++){
            try{
                var xman = await page.$x('/html/body/div[1]/div/div/div/div/div/div[2]/div/div[1]/div/div/div[3]/div/article['+l+']/h2/a');
                await page.waitFor(1000);
                var msg = await page.evaluate(el => el.textContent, xman[0]);
                console.log(names);
                names.push('\n'+msg);
            }
            catch{
                break;
            }
        }
        await page.close();
    }
    var writeStream = fs.createWriteStream('boynames.csv');

    writeStream.write(`names \n`);
    names = names.toString();
    names.replace("[", "");
    names.replace("]", "");
    names.replace(",", "");
    writeStream.write(names);
}
start();
