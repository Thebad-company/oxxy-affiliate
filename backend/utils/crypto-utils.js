const crypto = require('node:crypto');

/**
 * Decrypts data using AES-256-GCM
 * @param {string} encryptedData - The format expected is "iv:authTag:encryptedContent"
 * @param {string} masterKey - 32-character hex string
 */
function decrypt(encryptedData, masterKey) {
  try {
    const [ivHex, authTagHex, encryptedHex] = encryptedData.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    
    // Use master key as string (32 chars = 32 bytes for AES-256)
    const key = Buffer.from(masterKey);
    const algorithm = 'aes-256-gcm';
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'binary', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

module.exports = { decrypt };
