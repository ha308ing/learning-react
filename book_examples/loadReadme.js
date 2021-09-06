export const loadReadme = async ( login, repo) => {
  const uri = `https://github.com/${login}/${repo}/readme`
  const { download_url } = await fetch(uri).then( res => res.json() )
  const markdown = await fetch( download_url ).then( res => res.text() )
  console.log( `Markdown for ${ repo }\n\n${ markdown }` )
}
