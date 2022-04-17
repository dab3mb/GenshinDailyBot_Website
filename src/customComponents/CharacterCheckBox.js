import * as React from 'react';



export default function CharacterCheckBox(props) {
  var { image, name } = props
  return (
    <label
      for={name}
      style={{
        padding: '1em',
        margin: '0.5em',
        borderRadius: '5px',
        backgroundColor: '#E3E3E3',
        width: '5vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '10em'
      }}
    >
      <img src={image} alt={name} width={'100%'}/>
      <p style={{margin: '0px', overflowWrap: 'breakWord', height:'100%'}}> {name.replace("_"," ")} </p>
      <input id={name} type="checkbox" name="checkbox" value="value"/>
    </label>    
  );
}