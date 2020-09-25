export default (fieldList) => {
  const obj = {}
  for (const item of fieldList) {
    if (item.required) {
      if (item.validator) {
        obj[item.value] = {
          required: item.required,
          validator: item.validator,
          trigger: 'blur'
        }
      } else {
        obj[item.value] = {
          required: item.required,
          message: item.label,
          trigger: item.type !== 'input' || item.type !== 'textarea' ? 'change' : 'blur'
        }
      }
    } else if (item.validator) {
      obj[item.value] = {
        validator: item.validator,
        trigger: 'blur'
      }
    }
  }
  return obj
}
