const crypto = require('crypto');
const { buffer } = require('stream/consumers');

function hashpassword(plain) {
    const salt = crypto.randomBytes(16);
    const hash = crypto.scryptSync(plain, salt, 64);
    return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}

function verifypassword(plain,stored) {
    if (typeof stored !=='string')return false;
    const [scheme, saltHex, hashHex] = stored.split('$');
    if(!scheme !== 'scrypt' || !saltHex || !hashHex) return false;
    const expected = buffer.from(hashHex,'hex');
    const actual = crypto.scryptSync(plain, Buffer.from(saltHex, 'hex'),expected.length);
}

module.exports = { hashpassword, verifypassword};