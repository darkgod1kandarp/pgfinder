import React ,{useEffect} from 'react'
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
export  const Budget = ({selectedFilter,setSelectedFilter}) => 
  {function valuetext(value) {
    return `${value}`;
  }

  const [value, setValue] = React.useState([20, 37]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedFilter({...selectedFilter,min_budget:value[0],max_budget:value[1]})
  };

  return (
    <div >
      <Typography id="range-slider" gutterBottom>
        BUDGET
      </Typography>
      <Slider
        value={selectedFilter.max_budget||selectedFilter.min_budget? [selectedFilter.min_budget,selectedFilter.max_budget]:value}
        max={1000000}
        step={5000}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );

}

 export const Area =({selectedFilter,setSelectedFilter})=>{
  function valuetext(value) {
      return `${value}sqft`;
    }


    const [value, setValue] = React.useState([0, 100]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      setSelectedFilter({...selectedFilter,min_area:value[0],max_area:value[1]})
  
    };

    return (
      <div >
        <Typography id="range-slider" gutterBottom>
          Area
        </Typography>
        <Slider
          value={selectedFilter.max_area? [selectedFilter.min_area,selectedFilter.max_area]:  value}
          max={10000}
          step={100}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
    );

}


export const AvailableFor =({selectedFilter,setSelectedFilter})=>{

  const[checkedItems,setCheckedItems] =  React.useState([])
  const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
     return (
       <input type={type} name={name} checked={checked} onChange={onChange} />
     );
   };
   const handleChange = (event) => {
     setCheckedItems({
       ...checkedItems,
       [event.target.name]: event.target.checked,
       

     });

     
   };
   
  
  const checkboxes = [
     {
       name: "for boys",
       key: 1,
       label: "aviability",
     },
     {
       name: "for girls",
       key: 2,
       label: "avaibility",

      },
     {
       name: "both",
       key: 3,
       label: "avaibility",
     }
    ]
return (
<div>
  {checkboxes.map((item) => (
      <label key={item.key}>
        {item.name}
        <Checkbox
          name={item.name}
          checked={checkedItems[item.name]}
          onChange={handleChange}
        />
      </label>
    ))}
</div>

)
}