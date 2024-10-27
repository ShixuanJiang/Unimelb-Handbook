import {
    Checkbox,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
  } from "@material-tailwind/react";
  import React from 'react';
   
  export function CheckboxVerticalListGroup() {
    return (
      <Card>
        <List>
          <ListItem className="p-0">
            <label
              htmlFor="vertical-list-react"
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id="vertical-list-react"
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                React.js
              </Typography>
            </label>
          </ListItem>
          <ListItem className="p-0">
            <label
              htmlFor="vertical-list-vue"
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id="vertical-list-vue"
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                Vue.js
              </Typography>
            </label>
          </ListItem>
          <ListItem className="p-0">
            <label
              htmlFor="vertical-list-svelte"
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id="vertical-list-svelte"
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                Svelte.js
              </Typography>
            </label>
          </ListItem>
        </List>
      </Card>
    );
  }
  import React, { useState, useEffect } from 'react';
  
  const Checklist = ({ selectedMajor }) => {
    const [openSubjectId, setOpenSubjectId] = useState(null); // State to track which checklist is open
  
    const isOpen = openSubjectId === subject.id;
  
    const handleToggleChecklist = () => {
      setOpenSubjectId(isOpen ? null : subject.id); // Toggle between open and closed
    };
  
    const [checklist, setChecklist] = useState([]); 
  
    return(
      <div className='container container-md mx-auto'>
        <h1 className='text-5xl text-center font-bold my-20'>Plan Checklist</h1>
        <button>x</button>
        <ul className='container container-sm'>
          {!checklist.length <=0 ? (checklist.map((subject) => <div>{subject}</div>) ) : (checklist.map((coursePre) => <div>{coursePre}</div>)))}
          
        </ul>
      
      </div>
    );
  
  }
  
  export default Checklist;