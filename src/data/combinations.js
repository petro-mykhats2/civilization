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
    result: "Доска",
    type: "матеріал", // Додайте відповідний тип
    createdByUser: true,
  },
  // Додати інші комбінації
]

export default combinations
