require('dotenv').config();

const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`Environment variable ${key} not set.`);
    }
    return value;
};

module.exports = {
    containerName: getEnv('containerName'),
    azureStorageConnectionString: getEnv('azureStorage'),
    keyVaultName: getEnv('keyvaultName'),
};
