//const FORMATER_CURRENCY = new Intl.NumberFormat(undefined, {
  //  currency: 'USD',
   // style: 'currency',
    //currencyDisplay: 'symbol',
//});

//export function formatterCurrency(number: number) {
  //  return FORMATER_CURRENCY.format(number);
//}
export function formatterCurrency(number: number) {
    const formattedCurrency = number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formattedCurrency.replace('US$', '$'); // Заменяем 'US$' на '$'
}