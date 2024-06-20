export default class OptionRule { 
  Sort(macAddress: string) { 
    const newList = [] 
    if (macAddress.length === 8) { 
      newList.push(macAddress[7]) 
      newList.push(macAddress[5])
      newList.push(macAddress[2])
      newList.push(macAddress[4])
      newList.push(macAddress[0])
      newList.push(macAddress[1])
      newList.push(macAddress[3])
      newList.push(macAddress[6]) 
      return newList.join('') 
    } else { 
      return '' 
    } 
  } 
  
  BackSort(macAddress: string) { 
    const newList = [] 
    if (macAddress.length == 8) { 
      newList.push(macAddress[4]) 
      newList.push(macAddress[5])
      newList.push(macAddress[2])
      newList.push(macAddress[6])
      newList.push(macAddress[3])
      newList.push(macAddress[1])
      newList.push(macAddress[7])
      newList.push(macAddress[0])
      return newList.join('') 
    } 
    return '' 
  } 
  
  XOR(text: string, macAddress: string) { 
    const number1 = BigInt(`0x${text}`)
    const number2 = BigInt(`0x${macAddress}`)
    const result = number1 ^ number2
    return result.toString(16).padStart(8, '0'); // 將數字轉為十六進制並轉為大寫
  } 
  
  Shift(text: string) { 
    // 隨機生成一個 0 到 7 之間的數字 
    const num = Math.floor(Math.random() * 8);
    let shiftedText = '';
  
    // 移位字符串
    for (let i = 0; i < text.length; i++) {
        shiftedText += text[(num + i) % 8];
    }

    // 返回 num 和移位後的字符串 
    return num + shiftedText; 
  }
  
  BackShift(key: string) { 
    const result = parseInt(key[0], 10);
    const shift = 8 - result;
    key = key.substring(1);
    let text = '';
    for (let i = 0; i < key.length; i++) {
        text += key[(shift + i) % 8];
    }
    return text;
  }
  
  Intro(text: string, macadrs: string) { 
    if (text.length === 8 && macadrs.length === 8) { 
      const xorText =  this.XOR(text, macadrs) 
      text = this.Shift(xorText).toUpperCase(); 
      return text; 
    } 
    return ''; 
  }
  
  IntroList(textList: string[], macadrs: string) { 
    for (let i = 0; i < textList.length; i++) { 
      let text = textList[i]; 
      if (text.length === 8 && macadrs.length === 8 && this.XOR(text, macadrs)) { 
        text = this.Shift(text).toUpperCase(); 
        textList[i] = text; 
      } else { 
        return false; 
      } 
    } 
    return true; 
  }
  
  Outro(key: string, macadrs: string) { 
    if (key.length === 9 && macadrs.length === 8) { 
      const result = parseInt(key[0], 10); 
      if (!isNaN(result) && result < 8) { 
        key = this.BackShift(key); 
        if (this.XOR(key, macadrs) && parseInt(key.substring(1, 5), 16) && parseInt(key.substring(5))) { 
          key = key.toUpperCase(); 
          return key; 
        } 
      } 
    } 
    return ''; 
  }
  
  OutroList(keyList: string[], macadrs: string) { 
    for (let i = 0; i < keyList.length; i++) { 
      let key = keyList[i]; 
      if (key.length === 9 && macadrs.length === 8) { 
        const result = parseInt(key[0], 10); 
        if (!isNaN(result) && result < 8) { 
          key = this.BackShift(key); 
          if (this.XOR(key, macadrs) && parseInt(key.substring(1, 5), 16) && parseInt(key.substring(5))) { 
            keyList[i] = key.toUpperCase(); 
          } else { 
            return false; 
          } 
        } else { 
          return false; 
        } 
      } else { 
        return false; 
      } 
    }

    return true;
  }
}