import React from "react"
import faker from "faker"
import { FixedSizeList } from "react-window"

function List( { data=[], renderItem, renderEmpty } ) {
  if ( !data.length ) return renderEmpty
  return <ul style={{listStyleType:"none", paddingLeft: "0"}}>{ data.map( ( item, i) => <li key={ i }>{ renderItem(item) }</li> ) }</ul>
}

const users = 
  [...Array(5000)].
    map( () => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
    }) )

export default function App() {
  // const renderItem = item => 
  //   <div style={{ display: "flex", alignItems: "center", height: "50px" }}>
  //     <img src={ item.avatar } alt={ item.name } style={{ width: "50px", height: "50px"}} />
  //     <p>{ item.name } - { item.email }</p>
  //   </div>
  // return (
  //   <List
  //     data={ users }
  //     renderItem={ renderItem }
  //   />
  // )

  const renderRow = ( {index, style} ) =>
    <div style={{...style, ...{display: "flex", width:"80%", margin:"10px 10%", alignItems:"center", textAlign:"center"}}}>
      <img
        src={ users[index].avatar }
        alt={ users[index].name }
        width={ 50 }
        style={{clipPath:"circle(25px)"}} />
      <p style={{width:"100%"}}>{ users[index].name } - { users[index].email }</p>
    </div>

  return (
    <FixedSizeList
      height={ 650 }
      width={ 650 }
      itemCount={ users.length }
      itemSize={ 70 }
      style={{borderRadius:".5rem", boxShadow:"0 0 1.5rem 0.5rem #eee"}}
    >
      {renderRow}
    </FixedSizeList>
  )
}
