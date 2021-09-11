export default function renderStars( stars ) {
  const length = ( stars + "" ).length
  if ( !stars || length < 1 ) return null 
  let letter = "";
  const word = ( stars === 1 ) ? "star" : "stars"
  const letters = [ "k", "m", "b", "t", "o"]
  const number = length > 3 ? ( stars / Math.pow( 10, length - 1 ) ).toPrecision( 2 ) : stars
  if (length > 3)
    if ( length > 18 )
      letter = "O_o"
    else
      letter = letters[ Math.floor( ( length - 1 ) / 3 ) - 1 ]
  return `${ number }${ letter } ${ word }`
}
