import unfluff from 'unfluff';
exports.handler = async (event, context) => {
    try {
        const data = JSON.parse(event.body); 
        const url = data.url;
        if (!url) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'URL is required in the JSON body' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }

        const response = await fetch(url);
        const htmlData = await response.text();
        const extractedData = unfluff(htmlData);

        return {
            statusCode: 200,
            body: JSON.stringify(extractedData),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
