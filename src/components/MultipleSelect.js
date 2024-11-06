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
  const [selectedTechnology, setSelectedTechnologies] = React.useState([])
  const [selectedTool, setSelectedTools] = React.useState([])
  const [selectedWorkbench, setSelectedWorkbenches] = React.useState([])
  const [message, setMessage] = React.useState("")

  const availableMaterials = useSelector((state) => state.resources.resources)
  const availableTechnologies = useSelector(
    (state) => state.resources.technologies
  )
  const availableTools = useSelector((state) => state.resources.tools)
  const availableWorkbenches = useSelector(
    (state) => state.resources.workbenches
  )

  const handleMaterialsChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedMaterials(typeof value === "string" ? value.split(",") : value)
  }

  const handleTechnologyChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedTechnologies(
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handleToolChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedTools(typeof value === "string" ? value.split(",") : value)
  }

  const handleWorkbenchChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedWorkbenches(typeof value === "string" ? value.split(",") : value)
  }

  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const combination = combinations.find((combo) => {
      const materialsMatch =
        combo.materials.length === selectedMaterials.length &&
        combo.materials.every((mat) => selectedMaterials.includes(mat))

      const technologiesMatch = combo.technologies
        ? combo.technologies.length === selectedTechnology.length &&
          combo.technologies.every((tech) => selectedTechnology.includes(tech))
        : true

      const toolsMatch = combo.tools
        ? combo.tools.length === selectedTool.length &&
          combo.tools.every((tool) => selectedTool.includes(tool))
        : true

      const workbenchesMatch = combo.workbenches
        ? combo.workbenches.length === selectedWorkbench.length &&
          combo.workbenches.every((workbench) =>
            selectedWorkbench.includes(workbench)
          )
        : true

      return (
        materialsMatch && technologiesMatch && toolsMatch && workbenchesMatch
      )
    })

    if (combination) {
      const resultName = combination.result
      const resourceExists =
        availableMaterials.some(
          (material) => material.resourceName === resultName
        ) ||
        availableTools.some((tool) => tool === resultName) ||
        availableWorkbenches.some((workbench) => workbench === resultName)

      if (resourceExists) {
        setMessage(`${resultName} вже існує у вашому списку.`)
      } else {
        const newItem = {
          id: generateUniqueId(),
          message: combination.type,
          resourceName: combination.result,
          type: combination.type,
          createdByUser: true,
          technology: selectedTechnology,
          tool: selectedTool,
          workbench: selectedWorkbench,
        }
        dispatch(addItem(newItem))
        setMessage(
          `Успіх! Створено: ${combination.result} (${combination.type})`
        )
      }
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

      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id="technology-label">Технологія</InputLabel>
        <Select
          labelId="technology-label"
          id="technology-select"
          multiple
          value={selectedTechnology}
          onChange={handleTechnologyChange}
          input={<OutlinedInput label="Технологія" />}
          MenuProps={MenuProps}
        >
          {availableTechnologies.map((tech) => (
            <MenuItem
              key={tech}
              value={tech}
              style={{
                fontWeight: selectedTechnology.includes(tech)
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightRegular,
              }}
            >
              {tech}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id="tool-label">Інструмент</InputLabel>
        <Select
          labelId="tool-label"
          id="tool-select"
          multiple
          value={selectedTool}
          onChange={handleToolChange}
          input={<OutlinedInput label="Інструмент" />}
          MenuProps={MenuProps}
        >
          {availableTools.map((tool) => (
            <MenuItem
              key={tool}
              value={tool}
              style={{
                fontWeight: selectedTool.includes(tool)
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightRegular,
              }}
            >
              {tool}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id="workbench-label">Верстат</InputLabel>
        <Select
          labelId="workbench-label"
          id="workbench-select"
          multiple
          value={selectedWorkbench}
          onChange={handleWorkbenchChange}
          input={<OutlinedInput label="Верстат" />}
          MenuProps={MenuProps}
        >
          {availableWorkbenches.map((workbench) => (
            <MenuItem
              key={workbench}
              value={workbench}
              style={{
                fontWeight: selectedWorkbench.includes(workbench)
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightRegular,
              }}
            >
              {workbench}
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
