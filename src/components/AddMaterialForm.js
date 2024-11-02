import React, { useState } from "react"

import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

const AddMaterialForm = ({ onAdd, materials }) => {
  const [materialName, setMaterialName] = useState("")
  const [materialProperties, setMaterialProperties] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMaterial = {
      name: materialName,
      properties: materialProperties.split(","), // Розділити властивості через кому
    }
    onAdd(newMaterial)
    setMaterialName("")
    setMaterialProperties("")
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Назва матеріалу"
        value={materialName}
        onChange={(e) => setMaterialName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Властивості (через кому)"
        value={materialProperties}
        onChange={(e) => setMaterialProperties(e.target.value)}
        required
      />
      <button type="submit">Додати матеріал</button>
      <hr />
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={materials}
        getOptionLabel={(option) => option.name}
        // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
        renderInput={(params) => (
          <TextField {...params} label="limitTags" placeholder="Favorites" />
        )}
        sx={{ width: "500px" }}
      />
    </form>
  )
}

export default AddMaterialForm

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
