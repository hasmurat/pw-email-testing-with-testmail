const GraphQLClient = require("@testmail.app/graphql-request").GraphQLClient;

const testmailClient = new GraphQLClient(process.env.TESTMAIL_API_URL, {
  headers: { Authorization: `Bearer ${process.env.TESTMAIL_API_KEY}` },
});

export async function getLatestEmail(tag) {
  const query = `{
      inbox (
        namespace:"${process.env.TESTMAIL_YOUR_NAMESPACE}",,
        tag:"${tag}"
        livequery:true
      ) {
        result
        message
        count
        emails {
          html
        }
      }
    }`;
  const response = await testmailClient.request(query);
  return response.inbox.emails[0].html;
}
