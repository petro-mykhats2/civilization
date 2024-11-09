const combinations = [
  {
    materials: ["Дерево"],
    technologies: ["Забивання"],
    result: "Молоток 3",
    type: "інструмент", // Тип нового матеріалу
    createdByUser: true, // Вказує, що матеріал створено користувачем
  },

  {
    materials: ["Дерево", "Камінь"],
    technologies: ["Різання"],
    result: "Доска",
    type: "матеріал", // Додайте відповідний тип
    createdByUser: true,
  },
  {
    materials: ["Дерево", "Камінь"],
    result: "Asuyz",
    type: "матеріал", // Додайте відповідний тип
    createdByUser: true,
  },
  {
    materials: ["Дерево"],
    technologies: ["Різання", "Забивання"],
    tools: ["Сокира"],
    // workbenches: ["Верстат 1"],
    result: "Доска шліфована",
    type: "матеріал", // Додайте відповідний тип
    createdByUser: true,
  },
  {
    // materials: ["Дерево"],
    technologies: ["Різання", "Забивання"],
    result: "Доска шліфованаййййй",
    type: "матеріал", // Додайте відповідний тип
    createdByUser: true,
  },
  // Додати інші комбінації
]

export default combinations
