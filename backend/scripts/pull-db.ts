import { exec } from "child_process";
import "dotenv/config";

exec(
  `npx drizzle-kit introspect:pg --driver=pg --out=migrations/ --connectionString=${process.env.DATABASE_URL}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
);
