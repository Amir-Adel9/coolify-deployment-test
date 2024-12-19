export function showFormErrors(errors: any, formData: any) {
  if (errors) {
    Object.entries(errors).forEach(([field, messages]) => {
      formData.setError(field, {
        type: "manual",
        message: Array.isArray(messages)
          ? messages[0].replace(/\bar\./g, "").replace(/\ben\./g, "")
          : "Invalid value",
      })
    })
  }
}
