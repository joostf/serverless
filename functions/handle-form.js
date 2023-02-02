// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const querystring = require('querystring')
const fetch = require('node-fetch')
require('dotenv').config()

const handler = async (event) => {
  try {
    const data = querystring.parse(event.body)
    const mutatedData = await postMemberData(data)

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({ message: "Member updated!", data:mutatedData }),
    // }

    return {
      statusCode: 302,
      headers: {
        Location: event.headers.referer,
      },
      body: JSON.stringify({ message: "Redirecting..." }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

async function postMemberData (data) {
  const endpoint = 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cld1s02hl0aaa01tbexz632ph/master'
  const token = process.env.HYGRAPH_TOKEN
  const query = `
  mutation {
      updateMember(
          where: {id:"${data.id}"}
          data: {
            name:"${data.name}", 
            prefix:"${data.prefix}", 
            surname:"${data.surname}", 
            gitHubHandle:"${data.gitHubHandle}", 
            avatar:"${data.avatar}", 
            nickname:"${data.nickname}", 
            website:"${data.website}",
          }
      ) {
          name
          prefix
          surname
          nickname
          avatar
          website
          role
      }
  }
  `

  const variables = {} 
  const headers = { Authorization: `Bearer ${token}` }
  const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ query, variables }), 
      headers: headers
  })
  const tribeData = await response.json()

  return tribeData
}

module.exports = { handler }
