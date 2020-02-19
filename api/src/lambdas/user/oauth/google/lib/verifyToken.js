const { OAuth2Client } = require('google-auth-library')
const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const partitionKey = process.env.TABLE_PARTITION_KEY
const rangeKey = process.env.TABLE_RANGE_KEY

const client = new OAuth2Client(CLIENT_ID);

const verify = async idToken =>  {
	try {
		const ticket = await client.verifyIdToken({
				idToken,
				audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
		});
		const { email, sub, given_name, family_name, picture, locale } = ticket.getPayload();
		const relevantInfo = {
			[partitionKey]: sub,
			[rangeKey]: 'google-oauth',
			email,
			givenName: given_name,
			familyName: family_name,
			pictureUrl: picture,
			locale
		}
		return relevantInfo
	} catch(error){
		throw new CustomError({
			message: error.message,
			statusCode: error.statusCode || 500
		})
	}
}

module.exports = verify
