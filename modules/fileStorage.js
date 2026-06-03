import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function readJsonFile(filePath, defaultValue = []) {
  try {
    const content = await readFile(filePath, "utf8");

    if (!content.trim()) {
      return defaultValue;
    }

    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeJsonFile(filePath, defaultValue);
      return defaultValue;
    }

    throw error;
  }
}

export async function writeJsonFile(filePath, data) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function createFileStorage(filePath, defaultValue = []) {
  return {
    read() {
      return readJsonFile(filePath, defaultValue);
    },
    write(data) {
      return writeJsonFile(filePath, data);
    },
  };
}
