const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
const config = require('../config/config');

async function getKeyVaultValues(secretName) {
    const credential = new DefaultAzureCredential();
    const url = `https://${config.keyVaultName}.vault.azure.net`;
    const client = new SecretClient(url, credential);
    try {
        const secret = await client.getSecret(secretName);
        console.log(`Retrieved secret ${secretName}`);
        return secret;
    } catch (error) {
        console.error(`Error retrieving secret from Key Vault: ${error.message}`);
        // throw error;
    }
}

module.exports = { getKeyVaultValues };
