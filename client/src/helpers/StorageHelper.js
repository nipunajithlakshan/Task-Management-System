import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}



export function setLocalStorageData(key, data) {
  let encryptData = encrypt(data);
  localStorage.setItem(key, encryptData);
}

export function getLocalStoragedata(key) {
  let data = localStorage.getItem(key);

  if (data !== null) {
    return decrypt(data);
  } else {
    return null;
  }
}
