export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const checkValidity = (value, state, fieldName) => {
  const validationConfig = state.fields[fieldName].validation
  if (!validationConfig || !validationConfig.enabled) {
    return true
  }
  let isValid = true

  if (validationConfig.rules.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (state.fields[fieldName].type === '') {
    isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && isValid
  }

  if (validationConfig.rules.minLength) {
    isValid = value.length >= validationConfig.rules.minLength && isValid
  }

  if (validationConfig.rules.confirmationField) {
    isValid = value === state.fields[validationConfig.rules.confirmationField].value && isValid
  }

  return isValid
}
