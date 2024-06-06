const { app } = require('@azure/functions');
const { getKeyVaultValues } = require('../services/keyVault');
const { saveFileIntoBlobStorage } = require('../services/blobStorage');

app.http('SampleHttpTrigger01', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        console.log(`Http function processed request for url "${request.url}"`);
        try {
            const secretName = process.env.sampleKey;
            const valueInKeyVault = await getKeyVaultValues(secretName);
            const fileName = 'samplefile01.csv'
            await saveFileIntoBlobStorage(fileName);

            return { body: `Sample value from keyvault: ${valueInKeyVault?.value}!` };
        } catch (error) {
            console.error(`Error in handling HTTP request: ${error.message}`);
            return { status: 500, body: `Error: ${error.message}` };
        }
    }
});
