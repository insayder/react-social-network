export const createTask = (newItem) => async (dispatch, getState) => {
    const {task: {items}} = getState()
    const newItems = [...items, newItem]

    dispatch({
      type: "CREATE_TASK",
      payload: newItems,
    });
  };
  
  export const deleteTask = (id) => async (dispatch, getState) => {
    const {task: {items}} = getState()
    const idx = items.findIndex((item) => item.id === id);
    const newItems = [
      ...items.slice(0, idx),
      ...items.slice(idx + 1)
    ];

    dispatch({
      type: "DELETE_TASK",
      payload: newItems,
    });
  };

  export const toggleTask = (id, propName) => async (dispatch, getState) => {
    const {task: {items}} = getState()
    const idx = items.findIndex((item) => item.id === id);
    const oldItem = items[idx];
    const value = !oldItem[propName];

    const item = { ...items[idx], [propName]: value } ;
    const newItems = [
      ...items.slice(0, idx),
      item,
      ...items.slice(idx + 1)
    ];

    dispatch({
      type: "TOGGLE_TASK",
      payload: newItems,
    });
  };
  