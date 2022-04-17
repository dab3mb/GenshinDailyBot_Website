import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CharacterCheckBox from '../customComponents/CharacterCheckBox';
import { Button, FormGroup, Select, MenuItem, Grid, Typography, InputLabel, FormControl } from '@mui/material';
import CharacterJson from '../characters.json';
const R = require('ramda');

// List of characters and attributes from https://genshin-impact.fandom.com/wiki/Characters/List

const styles = {
  sectionLabel: {
    backgroundColor:'#C4C4C4', 
    borderRadius: '10px', 
    fontSize: '14px', 
    padding: '0.25em 5em 0.25em 0.5em'
  }
}



// SOURCE: https://shaquillegalimba.medium.com/how-to-import-multiple-images-in-react-1936efeeae7b
function importAll(r) {
  let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images
  }
const images = importAll(require.context('../characterHeadshots', false, /\.(png|jpe?g|svg)$/));
const imagesKeys = Object.keys(images)
const imagesPerRow = 5
var imagesByRow = [];
// https://stackoverflow.com/questions/36318601/react-js-every-nth-item-add-opening-tag-or-closing-tag
for (var i = 0; i < imagesKeys.length; i += imagesPerRow) {
  imagesByRow.push(imagesKeys.slice(i, imagesPerRow + i));
}
var characterList = Object.keys(CharacterJson).map(key => {
  return CharacterJson[key];
})
const sortModeUniqueValues = {
  Element: [...new Set(characterList.map(item => item.Element))],
  Region: [...new Set(characterList.map(item => item.Region))],
  Weapon: [...new Set(characterList.map(item => item.Weapon))]
}
const characterNames = [...new Set(characterList.map(item => item.Name))]
const characterSortables = ["Element", "Region", "Weapon"]
console.log(images)

export default function SetupForm() {
  
  const [characterSortValue, setCharacterSortValue] = React.useState(characterSortables[0])
  const [charactersBySort, setCharactersBySort] = React.useState(null)  
  React.useEffect(() => {  
    // Create temp object
    var newObj = {}
    sortModeUniqueValues[characterSortValue].forEach((val) =>{
      newObj[val] = []
    })
    // Sort characters by characterSortValue
    characterList.forEach((char) => {
      newObj[char[characterSortValue]].push(char)
    })
    // Sort by Name alphabetically
    Object.keys(newObj).forEach(key =>{
      newObj[key].sort((a, b) => (a.Name > b.Name) ? 1 : -1)
    })
    console.log("Sorted by: ", characterSortValue)
    console.log(newObj)
    setCharactersBySort(newObj)
  }, [characterSortValue]);
 

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
      // sx={{
      //   '& .MuiTextField-root': { m: 1, width: '25ch' },
      // }}
      noValidate
      autoComplete="off"
    >
      {/* Header */}
      <h1>Genshin Daily Reminder Tool!</h1>
      <h2>Welcome! Let's perform some first time setup : )</h2>
      
      {/* Character select */}
      <Grid container spacing={0} sx={{width: '60%'}}>
        <Grid item xs={4}>
          <Typography style={styles.sectionLabel}>Characters</Typography>
        </Grid>
        <Grid item xs={6}>
          {/* Spacing */}
        </Grid>
        <Grid item sx={{display: 'flex', flexDirection: 'column', justifyContent: "flex-end"}} xs={2}>
          <FormControl  style={{minWidth: 120}}>
            <InputLabel id="characterSortLabel">Sort by</InputLabel>
            <Select 
              classes={{
                select:{
                  p:0
                }
              }}
              labelId="characterSortLabel"
              value={characterSortValue}
              label="Sort by"
              onChange={(event)=>{
                const { target: { value } } = event;
                setCharacterSortValue(value)}}
            >
              {characterSortables.map((val) => {
                  return(
                    <MenuItem value={val}>{val}</MenuItem>
                  )
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'left', width: '60%', py: '1vh', backgroundColor:'#C4C4C4', borderRadius: '10px'}}>
          {
            (!R.isNil(charactersBySort)) ? Object.keys(charactersBySort).map((sortable) =>(
              <>
              <Typography sx={{mx: '1em', marginTop: '1em'}}>{sortable}</Typography>
              {
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'left', width: '100%', py: '1vh', flexWrap: 'wrap'}}>
                  {
                    charactersBySort[sortable].map((characterInfo) => (
                      <CharacterCheckBox name={characterInfo.Name} image={images[characterInfo.Name.replace(" ","_")+'.png']}/>
                    ))
                  }
                </Box> 
              }
              </>
            ))
            : ''
          } 
          <Button variant="outlined">Submit</Button>
      </Box>





















      {/* <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Hello World"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div> */}
      
    </Box>
  );
}
