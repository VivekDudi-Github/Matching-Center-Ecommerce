export function serializePrisma(data) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? value.toString()
        : value
    )
  );
}