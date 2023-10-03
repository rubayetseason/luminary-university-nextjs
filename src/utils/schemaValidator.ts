export const getErrorMessageByPropertyName = (
  obj: Record<string, any>,
  propertyPath: string
) => {
  //let propertyPath(name) = 'admin.name.firstName'
  //spliting creates array ['admin', 'name', 'firstName']
  const properties = propertyPath.split(".");
  let value = obj;
  for (const prop of properties) {
    if (value[prop]) {
      value = value[prop];
    } else {
      return undefined;
    }
  }
  return value.message;
};
