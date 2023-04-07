/**
 * Custom implementation of `aes-js`
 * AES-256 알고리즘
 * https://github.com/ricmoo/aes-js
 PBKDF2는 NIST(National Institute of Standards and Technology,
 미국표준기술연구소)에 의해서 승인된 알고리즘이고, 미국 정부 시스템에서도 사용자 패스워드의 암호화된 다이제스트를 생성할 때 사용
 */

import aesjs from 'aes-js';
import pbkdf2 from 'pbkdf2';

export default class {

    constructor () {
        this.salt = '8zff4q2352jh4jj4k6dm2ugdl4fgdgf4mlf45p1';
        this.encryptionKey = 'ejola_cto_wow';

        this.key_256 = pbkdf2.pbkdf2Sync(this.encryptionKey, this.salt, 1, 256 / 8, 'sha512');
    }

    /**
     * Encrypt given String
     * @param  {string} stringToEncrypt
     * @return {string}
     */
    encrypt (stringToEncrypt) {

        // Convert text to bytes
        let textBytes = aesjs.utils.utf8.toBytes(stringToEncrypt);

        // The counter is optional, and if omitted will begin at 1
        let aesCtr = new aesjs.ModeOfOperation.ctr(this.key_256, new aesjs.Counter(5));
        let encryptedBytes = aesCtr.encrypt(textBytes);

        // To print or store the binary data, you may convert it to hex
        return aesjs.utils.hex.fromBytes(encryptedBytes);
    }

    /**
     * Decrypt given String
     * @param  {string} stringToDecrypt
     * @return {string}
     */
    decrypt (stringToDecrypt) {

        // When ready to decrypt the hex string, convert it back to bytes
        let encryptedBytes = aesjs.utils.hex.toBytes(stringToDecrypt);

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        let aesCtr = new aesjs.ModeOfOperation.ctr(this.key_256, new aesjs.Counter(5));
        let decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        return aesjs.utils.utf8.fromBytes(decryptedBytes);
    }

}
