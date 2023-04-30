import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Context } from ".."
import LabGroupItem from "./Items/LabGroupItem"

const LabGroupList = observer(() => {
  const { laboratoryGroup } = useContext(Context)

  return (
    <>
      {laboratoryGroup.labGroups.map((labGroup) => (
        <LabGroupItem key={labGroup.id} laboratoryGroup={labGroup} />
      ))}
    </>
  )
})

export default LabGroupList
