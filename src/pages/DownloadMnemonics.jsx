import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';


async function encryptMnemonic(mnemonic, password) {
  const encryptedMnemonic = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(mnemonic),
    password
  ).toString();
  return encryptedMnemonic;
}


export const handleEncryptMnemonic = async (mnemonic, password) => {
  const encryptedMnemonic = await encryptMnemonic(mnemonic, password);
  const hashedPassword = await hashPassword(password);

  const fileContent = `DataHashedI: ${hashedPassword}\nDataHashedII: ${encryptedMnemonic}`;
  const fileName = 'keys.vuena';
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  link.click();
};


async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
