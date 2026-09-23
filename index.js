exports.handler = async (event) => {
    const path = event.rawPath || '';
    let location = 'http://beauty-ai-customer-41482.s3-website-us-east-1.amazonaws.com';
    if (path.includes('pihu')) {
        location = 'http://beauty-ai-pihu-frontend-9988.s3-website-us-east-1.amazonaws.com/s/pihu-makeover';
    }
    return {
        statusCode: 301,
        headers: {
            Location: location
        }
    };
};
