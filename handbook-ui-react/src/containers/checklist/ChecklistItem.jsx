import React from 'react'

const ChecklistItem = ({item}) => {
    const checkedStyle = "hover: bg-gray-300"
    const notCheckedStyle = "hover: bg-gray-300"
  return (
    <li className={'${subject.checked ? checkedStyle : notCheckStyle}'}>{subject}</li>
  )
}

export default ChecklistItem

