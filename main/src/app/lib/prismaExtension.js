import { encrypt, decrypt } from "@/app/helpers/crypto";

const ENCRYPTED_FIELDS = {
  customer: ["number", "name"],
  address: ["address", "area", "landmark", "city", "state", "pincode"],
  payment: ["number"],
};

function getEncryptedFieldsForModel(modelName) {
  return ENCRYPTED_FIELDS[modelName.toLowerCase()] || [];
}

function encryptObject(obj, encryptedFields) {
  if (!obj || typeof obj !== "object") return obj;

  const result = { ...obj };

  for (const field of encryptedFields) {
    if (result[field] !== undefined && result[field] !== null) {
      result[field] = encrypt(result[field]);
    }
  }

  return result;
}

function decryptObject(obj, encryptedFields) {
  if (!obj || typeof obj !== "object") return obj;

  const result = { ...obj };

  for (const field of encryptedFields) {
    if (result[field] !== undefined && result[field] !== null) {
      result[field] = decrypt(result[field]);
    }
  }

  return result;
}

function encryptData(data, modelName) {
  if (!data || typeof data !== "object") return data;

  const encryptedFields = getEncryptedFieldsForModel(modelName);

  if (encryptedFields.length === 0) return data;

  const result = { ...data };

  for (const key in result) {
    if (key === "create" || key === "update" || key === "upsert") {
      if (Array.isArray(result[key])) {
        result[key] = result[key].map((item) => encryptData(item, modelName));
      } else if (typeof result[key] === "object") {
        result[key] = encryptData(result[key], modelName);
      }
    } else if (key === "connect" || key === "connectOrCreate") {
      if (Array.isArray(result[key])) {
        result[key] = result[key].map((item) => encryptData(item, modelName));
      } else if (typeof result[key] === "object") {
        result[key] = encryptData(result[key], modelName);
      }
    } else if (typeof result[key] === "object" && result[key] !== null) {
      result[key] = encryptObject(result[key], encryptedFields);
    }
  }

  return encryptObject(result, encryptedFields);
}

function decryptResult(result, modelName) {
  if (result === null || result === undefined) return result;

  const encryptedFields = getEncryptedFieldsForModel(modelName);

  if (Array.isArray(result)) {
    return result.map((item) => decryptResult(item, modelName));
  }

  let decrypted = result;

  if (encryptedFields.length > 0) {
    decrypted = decryptObject(result, encryptedFields);
  }

  for (const key in decrypted) {
    if (decrypted[key] !== null && typeof decrypted[key] === "object") {
      const relationModel = key.charAt(0).toLowerCase() + key.slice(1);
      decrypted[key] = decryptResult(decrypted[key], relationModel);
    }
  }

  return decrypted;
}

export const prismaExtension = {
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const modelName = model.charAt(0).toLowerCase() + model.slice(1);
        const encryptedFields = getEncryptedFieldsForModel(modelName);

        if (encryptedFields.length === 0) {
          const result = await query(args);
          return decryptResult(result, modelName);
        }
        if (operation === "upsert") {
          if (args.create) {
            args.create = encryptData(args.create, modelName);
          }
          if (args.update) {
            args.update = encryptData(args.update, modelName);
          }
        } else if (args.data) {
          args.data = encryptData(args.data, modelName);
        }

        const result = await query(args);

        return decryptResult(result, modelName);
      },
    },
  }, 
};
