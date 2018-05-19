import numeral from 'numeral';

numeral.register('locale', 'precious', {
    delimiters: {
        thousands: ' ',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'M',
        billion: 'G',
        trillion: 'T'
    },
    ordinal: function (number) {
        return number === 1 ? 'er' : 'e';
    },
    currency: {
        symbol: '€'
    }
});

numeral.locale('precious');
