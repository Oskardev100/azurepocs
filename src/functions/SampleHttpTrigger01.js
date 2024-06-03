const { app } = require('@azure/functions');
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
require('dotenv').config();



app.http('SampleHttpTrigger01', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        // 01. Get Config Keys
        const sampleKey = process.env.sampleKey;
        

        // 02. Get Key Vault Secrets
        const valueInKeyVault = await GetKeyVaultValues(sampleKey);

        // 02. Save data on blob storage
        const name = request.query.get('name') || await request.text() || 'world';

        //return { body: `Hello, ${name}!` };

        return { body: `sample value from keyvault, ${valueInKeyVault.value}!` };
    }
});


async function GetKeyVaultValues(secretName){

    try {
        // Authenticate to Azure
        const credential = new DefaultAzureCredential(); 

        // Create SecretClient
        //const keyVaultName =  process.env.keyvaultName; 
        const url = `https://${process.env.keyvaultName}.vault.azure.net`;  
        const client = new SecretClient(url, credential); 
        var secret = '';

        // Get secret
        try {
            secret = await client.getSecret(secretName);
            console.log(secret.value);
        } catch (error) {
            console.log(error);
            
        }
        return secret;
        
        
    } catch (error) {
        console.log(error);
    }

}
