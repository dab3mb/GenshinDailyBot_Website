import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CharacterCheckBox from '../customComponents/CharacterCheckBox';
import { Button, FormGroup, Select, MenuItem, Grid, Typography, InputLabel, FormControl, Checkbox, FormControlLabel } from '@mui/material';
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
const weaponUpgradeImages = importAll(require.context('../weaponUpgradeMats', false, /\.(png|jpe?g|svg)$/));
console.log(weaponUpgradeImages)
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
const msgTimingOptions = ["Morning (8am)", "Noon (12pm)", "Afternoon (3pm)", "Evening (6pm)", "Night (9pm)", "Last second (11:59pm)"]


export default function SetupForm() {
  
  const [characterSortValue, setCharacterSortValue] = React.useState(characterSortables[0])
  const [charactersBySort, setCharactersBySort] = React.useState(null)  
  const [itemsSelected, setItemsSelected] = React.useState({})

  const defaultMsgPreferences = {
    upcoming: false,
    timePrefSelect: msgTimingOptions[0]
    
    
  }
  const [msgPreferences, setMsgPreferences] = React.useState(defaultMsgPreferences)

  const handleCheckboxChecked = (event) => {
    var name = event.target.name
    var val = event.target.checked
    setItemsSelected(values=> ({...values, [name]: val}))
  }

  const handleMsgPreferencesChange = (event) => {
    console.log("yaaa")
  }

  React.useEffect(() => { 
    console.log("itemsSelected:")
    console.log(itemsSelected)
  },[itemsSelected])


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
        <Grid item xs={4} sx={{display: "flex", flexDirection: 'column' , justifyContent: 'flex-end', px: '0.5em'}}>
          <Typography > Characters </Typography>
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
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'center', width: '60%', py: '1vh', backgroundColor:'#C4C4C4', borderRadius: '10px'}}>
          {
            (!R.isNil(charactersBySort)) ? Object.keys(charactersBySort).map((sortable) =>(
              <>
              <Typography sx={{mx: '1em', marginTop: '1em', width:'95%'}}>{sortable}</Typography>
              {
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'left', width: '95%', py: '1vh', flexWrap: 'wrap'}}>
                  {
                    charactersBySort[sortable].map((characterInfo) => (
                      <CharacterCheckBox name={characterInfo.Name} image={images[characterInfo.Name.replace(" ","_")+'.png']} updateMethod={handleCheckboxChecked} initialValue={itemsSelected[characterInfo.Name]}/>
                    ))
                  }
                </Box> 
              }
              </>
            ))
            : ''
          } 
      </Box>



      {/* Weapons */}
      <Grid container spacing={0} sx={{width: '60%'}}>
        <Grid item xs={4} sx={{display: "flex", flexDirection: 'column' , justifyContent: 'flex-end', px: '0.5em'}}>
          <Typography > Weapons </Typography>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'center', width: '60%', py: '1em', backgroundColor:'#C4C4C4', borderRadius: '10px', my: "1em"}}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'left', width: '95%', py: '1vh', flexWrap: 'wrap'}}>
          {
            Object.keys(weaponUpgradeImages).map((file) => (
              <CharacterCheckBox name={file.slice(0,-4)} image={weaponUpgradeImages[file]} updateMethod={handleCheckboxChecked} initialValue={itemsSelected[file.slice(0,-4)]}/>
            ))
          }
        </Box> 
      </Box>

      {/* Message Preferences */}
      <Grid container spacing={0} sx={{width: '60%'}}>
        <Grid item xs={4} sx={{display: "flex", flexDirection: 'column' , justifyContent: 'flex-end', px: '0.5em'}}>
          <Typography > Message Preferences </Typography>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'left', width: '60%', py: '1em', backgroundColor:'#C4C4C4', borderRadius: '10px', my: "1em",}}>
          <InputLabel id="timePrefSelectLabel"> When would you like to receive reminders? </InputLabel>
          <Select
            name="timePrefSelect"
            labelId="timePrefSelectLabel"
            id="timePrefSelect"
            label="Age"
            value={defaultMsgPreferences.timePrefSelect}
            // onChange={handleChange}
          >
            { msgTimingOptions.map(timing => (
              <MenuItem value={timing}>{timing}</MenuItem>
            ))}
          </Select>
          <FormControlLabel control={<Checkbox defaultChecked />} label="[BETA] Would you like to recieve information about upcoming ingame events?" />

      </Box>

      <Button variant="outlined">Submit</Button>






















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
