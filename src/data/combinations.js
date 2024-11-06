const combinations = [
  {
    materials: ["Дерево", "Метал"],
    result: "Молоток",
    type: "інструмент", // Тип нового матеріалу
    createdByUser: true, // Вказує, що матеріал створено користувачем
  },
  {
    materials: ["Дерево", "Камінь"],
    result: "Сокира",
    type: "інструмент",
    createdByUser: true,
  },
  {
    materials: ["Дерево", "Сокира"],
    technologies: ["Технологія 2"],
    result: "Доска",
    type: "матеріал", // Додайте відповідний тип
    createdByUser: true,
  },
  {
    materials: ["Дерево", "Сокира"],
    technologies: ["Технологія 1"],
    tools: ["Інструмент 1"],
    workbenches: ["Верстат 1"],
    result: "Доска шліфована",
    type: "матеріал", // Додайте відповідний тип
    createdByUser: true,
  },
  // Додати інші комбінації
]

export default combinations
