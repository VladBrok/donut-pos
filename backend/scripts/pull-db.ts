import { exec } from "child_process";
import "dotenv/config";
import fs from "fs/promises";

exec(
  `npx drizzle-kit introspect:pg --driver=pg --out=migrations/ --connectionString=${process.env.DATABASE_URL}`,
  async (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    const fileContent = await fs.readFile("./migrations/schema.ts", {
      encoding: "utf-8",
    });
    const fixedTimestamps = fileContent.replace(
      /(timestamp\(.+?, { mode: ')string(' }\))/g,
      "$1date$2"
    );
    await fs.writeFile("./migrations/schema.ts", fixedTimestamps);
    console.log(stdout);
  }
);
