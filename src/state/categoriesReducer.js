export default function categoriesReducer(state, action) {
  switch (action.type) {
    case "create":
      return onCreate(state, action);
    case "delete":
      return onDelete(state, action);
    case "initializeArray":
      return onInitializeArray(action);
    case "update":
      return onUpdate(state, action);
    default:
      throw new Error("Unhandled action:" + action.type);
  }
}

function onCreate(state, action) {
  const newCategory = action.payload;

  return [...state, newCategory];
}

function onDelete(state, action) {
  const id = action.payload;
  const clonedCategories = [...state];
  const itemIndex = clonedCategories.findIndex((item) => item.id === id);

  clonedCategories.splice(itemIndex, 1);

  return clonedCategories;
}

function onInitializeArray(action) {
  const newCategories = action.payload;

  return newCategories;
}

function onUpdate(state, action) {
  const updatedCategory = action.payload;
  const id = updatedCategory.id;
  const clonedCategories = [...state];
  const itemIndex = clonedCategories.findIndex((item) => item.id === id);

  clonedCategories[itemIndex] = updatedCategory;

  return clonedCategories;
}
