function combineBalances(data) {
    const balanceMap = {}; 
    data.forEach(item => {
      const [address, amountStr] = item.split(' '); 
      const amount = parseFloat(amountStr); 
  
      if (!isNaN(amount)) {
        if (balanceMap[address]) {
          
          balanceMap[address] += amount;
        } else {
          balanceMap[address] = amount;
        }
      }
    });
    const combinedData = Object.entries(balanceMap).map(([address, balance]) => `${address} ${balance}`);
    console.log(combinedData, 'combineBalance');
  
    return combinedData;
  }
  

  export default combineBalances;