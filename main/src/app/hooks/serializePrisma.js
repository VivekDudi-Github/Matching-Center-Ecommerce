export function serializePrisma(data) {
  if(data === undefined) return data;
  
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? value.toString()
        : value
    )
  );
}