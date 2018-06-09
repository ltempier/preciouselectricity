import cheerio from 'cheerio';


export const edfRate = [
    {
        power: 3000,
        price: 0.1555
    },
    {
        power: 6000,
        price: 0.1467,
        priceHP: 0.1593,
        priceHC: 0.1244,
    },
    {
        power: 9000,
        price: 0.1483,
        priceHP: 0.1593,
        priceHC: 0.1244,
    },
    {
        power: 12000,
        price: 0.1483,
        priceHP: 0.1593,
        priceHC: 0.1244,
    },
    {
        power: 15000,
        price: 0.1483,
        priceHP: 0.1593,
        priceHC: 0.1244,
    }
];


export function getPrice(callback) {

    fetch('http://www.epexspot.com/en/market-data/dayaheadauction')

        .then(function (response) {
            return (response.text());
        })
        .then(function (html) {
            const $ = cheerio.load(html);
            // console.log($('#tab_fr').find('table.hours').html());
            let prices = [];
            $('#tab_fr').find('table.hours').find('tr').each(function (i) {

                if (i === 0)
                    $(this).find('th').each(function (j) {
                        if (j > 1)
                            prices.push({
                                date: $(this).text(),
                                value: []
                            })
                    });
                else if (i % 2 === 0) { // MWh

                } else {// €/MWh
                    $(this).find('td').each(function (j) {
                        try {
                            if (j > 1)
                                prices[j - 2].value.push(parseFloat($(this).text()))
                        } catch (e) {
                            console.error(e)
                        }
                    });
                }
            })
            return prices
        })

        .then(function (prices) {
            callback(null, prices);
        })
        .catch(callback);
}