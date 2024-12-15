import { getErrorMessage } from './get-error-message'
import { prettySiteName } from './utils'

const generateJSONResponse = (obj: any) => {
  return new Response(JSON.stringify(obj), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

const generateErrorJSONResponse = (error: unknown, url?: string) => {
  const errorMessage = getErrorMessage(error)
  if(!url){
    //If we don't have a URL let's return the error message
    return generateJSONResponse({
      error: errorMessage,
      url,
    })
}

  const pretty_site_name = prettySiteName(url) 
  const errorResp={
    favicon:[`https://logo.clearbit.com/${pretty_site_name.toLocaleLowerCase()}`],
    title:pretty_site_name,
    url,
    image:[`https://logo.clearbit.com/${pretty_site_name.toLocaleLowerCase()}`],
  }
  return generateJSONResponse({
    error: errorMessage,
    ...errorResp
  })
  //If we have an error let's return better Data so the consumer don't have to deal with default shit

}

export { generateJSONResponse, generateErrorJSONResponse }
