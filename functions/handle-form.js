// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  console.log(1, event.body)
  try {
    const data = JSON.parse(event.body);

    //const mutatedData = await postMemberData(data)
    //console.log(mutatedData)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Member updated!`, data:data }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}


async function postMemberData (data) {
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzUwNjg4NzgsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xkMXMwMmhsMGFhYTAxdGJleHo2MzJwaC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNThiYzk0M2EtNjZlZS00YmNmLTliNDYtNWIzNDAxZTFhMzIyIiwianRpIjoiY2xkaWtyZW9nMjRvZTAxdGUzdWUzMnY5aiJ9.2edEX6Si5Xj6DF6NldPq3SOLi7R46cjDF8E0RjK4sm2mOijccqLwOPHzRAparCR_M1CdrRTTJgD_VsqiTs74ihV1wo7nTXrkngToFy4AiqkErcI58NOukfgscfCjK9FTQ874KFmv35jYC6nBxp3tyJluFgL5BTKNTcoHKffVRUYPxOtt2w1I8REcgv742T3bpyf0K4eDmUkVjGwFIK913z5OPQ7AWD6leRDWHQfzzJX6fDaEYEzc_7rztIXDqifvD00M1H_keNgkbQOl56bMCALFQC0A72BJ7DIBId47O9EJJUBiGYzP5CHYGOrgQNLQGJ13b_LUr8tbR8PTMiizz51MPYNQ5YHIOT97QVzES1VCXdbDpza8vALX-BTU8oiL0UVHq31iFL7FnQ_iCIw99qRJqCLYR11zcZ1RlMLGy57sOzPXA6bGiIDMkGD2d-2JEqMrZHmg5EufBTVoGHVRtZPSO7JUzMEn6LIW-KWhlrwJKyXcd6POTEf3ah4nmhYGVkXF2JX-9iNmwMwJnPfD6E921IEgBXVv5-Y9LdSvcQznWZnO1e0xz5extWf6wPK6gEwobaoXDcGUFRx9SF3Bp8CKA0X4BthVHMwY3KVJr5t7W09JoTpIVyEool7tD7zP13QAWop7DFjd8SMnVXaKXDpJuOfOnfBaCurlGao_NFI'
  const query = `
  mutation {
      updateMember(
          where: {id: "cldcsnrpc0z9w0auooju1uj1g"}
          data: {nickname:"Faab"}
      ) {
          id
          name
          prefix
          surname
          nickname
          avatar
          bio {
              html
          }
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

  console.dir(tribeData)
}

module.exports = { handler }
