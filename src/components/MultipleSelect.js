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
import { addItem, addTechnology, addTool, addWorkbench } from "../redux/actions"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"

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
  const [selectedTechnologies, setSelectedTechnologies] = React.useState([])
  const [selectedTools, setSelectedTools] = React.useState([])
  const [selectedWorkbenches, setSelectedWorkbenches] = React.useState([])
  const [message, setMessage] = React.useState("")
  const [alertSeverity, setAlertSeverity] = React.useState("")

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

    console.log("Selected materials:", selectedMaterials)
    console.log("Selected technologies:", selectedTechnologies)
    console.log("Selected tools:", selectedTools)
    console.log("Selected workbenches:", selectedWorkbenches)
    console.log("Combinations:", combinations)

    const combination = combinations.find((combo) => {
      console.log("Checking combination:", combo)

      // Перевірки на існування масивів перед перевіркою довжини
      const materialsMatch =
        (combo.materials || []).length === (selectedMaterials || []).length &&
        (combo.materials || []).every((mat) => selectedMaterials.includes(mat))

      const technologiesMatch =
        (combo.technologies || []).length ===
          (selectedTechnologies || []).length &&
        (combo.technologies || []).every((tech) =>
          selectedTechnologies.includes(tech)
        )

      const toolsMatch =
        (combo.tools || []).length === (selectedTools || []).length &&
        (combo.tools || []).every((tool) => selectedTools.includes(tool))

      const workbenchesMatch =
        (combo.workbenches || []).length ===
          (selectedWorkbenches || []).length &&
        (combo.workbenches || []).every((workbench) =>
          selectedWorkbenches.includes(workbench)
        )

      return (
        materialsMatch && technologiesMatch && toolsMatch && workbenchesMatch
      )
    })

    if (!combination) {
      console.log("No matching combination found.")
    } else {
      console.log("Matching combination found:", combination)
    }

    if (combination) {
      const resultName = combination.result
      const resourceExists =
        availableMaterials.some(
          (material) => material.resourceName === resultName
        ) ||
        availableTechnologies.some((tech) => tech.name === resultName) ||
        availableTools.some((tool) => tool.name === resultName) ||
        availableWorkbenches.some((workbench) => workbench.name === resultName)

      if (resourceExists) {
        setAlertSeverity("warning")
        setMessage(`${resultName} вже існує у вашому списку.`)
      } else {
        const newItem = {
          id: generateUniqueId(),
          message: combination.type,
          resourceName: combination.result,
          type: combination.type,
          createdByUser: true,
          technology: selectedTechnologies,
          tool: selectedTools,
          workbench: selectedWorkbenches,
        }

        console.log("Dispatching new item:", newItem)

        switch (combination.type) {
          case "матеріал":
            dispatch(addItem(newItem))
            break
          case "технологія":
            dispatch(addTechnology(newItem))
            break
          case "інструмент":
            dispatch(addTool(newItem))
            break
          case "верстат":
            dispatch(addWorkbench(newItem))
            break
          default:
            break
        }

        setAlertSeverity("success")
        setMessage(
          `Успіх! Створено: ${combination.result} (${combination.type})`
        )
      }
    } else {
      setAlertSeverity("error")
      setMessage("Комбінація неможлива.")
    }

    setTimeout(() => {
      setMessage("")
    }, 4000)
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
          value={selectedTechnologies}
          onChange={handleTechnologyChange}
          input={<OutlinedInput label="Технологія" />}
          MenuProps={MenuProps}
        >
          {availableTechnologies.map((tech) => (
            <MenuItem
              key={tech.id}
              value={tech.name}
              style={{
                fontWeight: selectedTechnologies.includes(tech.name)
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightRegular,
              }}
            >
              {tech.name}
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
          value={selectedTools}
          onChange={handleToolChange}
          input={<OutlinedInput label="Інструмент" />}
          MenuProps={MenuProps}
        >
          {availableTools.map((tool) => (
            <MenuItem
              key={tool.id}
              value={tool.name}
              style={{
                fontWeight: selectedTools.includes(tool.name)
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightRegular,
              }}
            >
              {tool.name}
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
          value={selectedWorkbenches}
          onChange={handleWorkbenchChange}
          input={<OutlinedInput label="Верстат" />}
          MenuProps={MenuProps}
        >
          {availableWorkbenches.map((workbench) => (
            <MenuItem
              key={workbench.id}
              value={workbench.name}
              style={{
                fontWeight: selectedWorkbenches.includes(workbench.name)
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightRegular,
              }}
            >
              {workbench.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />
      {message && (
        <Alert severity={alertSeverity}>
          <AlertTitle>
            {alertSeverity === "success"
              ? "Успіх"
              : alertSeverity === "warning"
              ? "Увага"
              : "Помилка"}
          </AlertTitle>
          {message}
        </Alert>
      )}

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Створити
      </Button>
    </div>
  )
}
