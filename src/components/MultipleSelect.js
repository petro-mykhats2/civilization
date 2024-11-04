import * as React from "react"
import { useTheme } from "@mui/material/styles"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import { useDispatch, useSelector } from "react-redux"
import combinations from "../data/combinations"
import { addItem } from "../redux/actions"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function MultipleSelect() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [selectedMaterials, setSelectedMaterials] = React.useState([])
  const [selectedTechnology, setSelectedTechnology] = React.useState("")
  const [message, setMessage] = React.useState("")

  const availableMaterials = useSelector((state) => state.resources.resources)
  const availableTechnologies = ["Технологія 1", "Технологія 2"]

  const handleMaterialsChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedMaterials(typeof value === "string" ? value.split(",") : value)
  }

  const handleTechnologyChange = (event) => {
    setSelectedTechnology(event.target.value)
  }

  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const combination = combinations.find(
      (combo) =>
        combo.materials.length === selectedMaterials.length && // Перевірка точної відповідності кількості
        combo.materials.every((mat) => selectedMaterials.includes(mat))
    )

    if (combination) {
      const newItem = {
        id: generateUniqueId(),
        message: combination.type,
        resourceName: combination.result,
        type: combination.type,
        createdByUser: true, // Додаємо прапорець для створених користувачем елементів
      }
      dispatch(addItem(newItem))
      setMessage(`Успіх! Створено: ${combination.result} (${combination.type})`)
    } else {
      setMessage("Комбінація неможлива.")
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id="materials-label">Матеріали</InputLabel>
        <Select
          labelId="materials-label"
          id="materials-select"
          multiple
          value={selectedMaterials}
          onChange={handleMaterialsChange}
          input={<OutlinedInput label="Матеріали" />}
          MenuProps={MenuProps}
        >
          {availableMaterials.map((material) => (
            <MenuItem
              key={material.id}
              value={material.resourceName}
              style={{
                fontWeight: selectedMaterials.includes(material.resourceName)
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightRegular,
              }}
            >
              {material.resourceName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="technology-label">Технологія</InputLabel>
        <Select
          labelId="technology-label"
          id="technology-select"
          value={selectedTechnology}
          onChange={handleTechnologyChange}
          input={<OutlinedInput label="Технологія" />}
        >
          {availableTechnologies.map((tech) => (
            <MenuItem key={tech} value={tech}>
              {tech}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Створити
      </Button>

      {message && <p>{message}</p>}
    </div>
  )
}
