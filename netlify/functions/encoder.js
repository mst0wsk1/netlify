const { encode } = require('@nem035/gpt-3-encoder')

exports.handler = async (event, context) => {

    if (event.httpMethod === 'POST') {

        try {
            const payload = JSON.parse(event.body);
            const text = payload.text;
            return {
                statusCode: 200,
                body: JSON.stringify({
                    tokens: encode(text).length
                }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message }),
            };
        }
    } else {
        return {
            statusCode: 501,
            body: JSON.stringify({ message: "Not Implemented" }),
            headers: { 'content-type': 'application/json' }
        }
    }
};
