function removeLastCurrency(inputString) {
    const currencies = ['BNB', 'INR', 'ETH', 'BTC', "USDT", "USDC"]; // List of currencies to check

    const regexPattern = new RegExp(currencies.map(currency => `${currency}$`).join('|'), 'g');
    const matches = inputString.match(regexPattern);

    if (matches && matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      const modifiedString = inputString.replace(lastMatch, '');
      return modifiedString;
    }

    return inputString;
  }