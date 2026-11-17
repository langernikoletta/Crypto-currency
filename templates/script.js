const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetId = 'tab-' + btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});

const amountFrom = document.getElementById('amount-from');
const amountTo = document.getElementById('amount-to');
const currencyFrom = document.getElementById('currency-from');
const currencyTo = document.getElementById('currency-to');
const swapBtn = document.getElementById('swap-btn');

const ratesToUSD = {
    USD: 1,
    EUR: 1.13,
    UAH: 0.0238,
    BTC: 118750
};

function calculateExchange() {
    const val = parseFloat(amountFrom.value) || 0;
    const from = currencyFrom.value;
    const to = currencyTo.value;

    const inUSD = val * ratesToUSD[from];
    const result = inUSD / ratesToUSD[to];

    amountTo.value = result.toFixed(2);
}

amountFrom.addEventListener('input', calculateExchange);
currencyFrom.addEventListener('change', calculateExchange);
currencyTo.addEventListener('change', calculateExchange);

swapBtn.addEventListener('click', () => {
    const temp = currencyFrom.value;
    currencyFrom.value = currencyTo.value;
    currencyTo.value = temp;
    calculateExchange();
});

function loadCryptoMarket() {
    const tbody = document.getElementById('crypto-market-body');
    const demoCrypto = [
        { name: 'Bitcoin (BTC)', price: '118,750', change: '+1.25%', isUp: true },
        { name: 'Ethereum (ETH)', price: '3,520', change: '+0.85%', isUp: true },
        { name: 'Solana (SOL)', price: '185', change: '-0.40%', isUp: false }
    ];

    tbody.innerHTML = demoCrypto.map(coin => `
        <tr>
            <td><strong>${coin.name}</strong></td>
            <td>$${coin.price}</td>
            <td class="${coin.isUp ? 'up' : 'down'}">${coin.change}</td>
        </tr>
    `).join('');
}
function loadFiatMarket() {
    const tbody = document.getElementById('fiat-market-body');
    const demoFiat = [
        { pair: 'USD / UAH', buy: '41.80', sell: '42.10' },
        { pair: 'EUR / UAH', buy: '47.20', sell: '47.70' },
        { pair: 'PLN / UAH', buy: '10.75', sell: '11.05' }
    ];

    tbody.innerHTML = demoFiat.map(item => `
        <tr>
            <td><strong>${item.pair}</strong></td>
            <td>${item.buy}</td>
            <td>${item.sell}</td>
        </tr>
    `).join('');
}

loadCryptoMarket();
loadFiatMarket();