// scripts/fix-vite.js

import { execSync } from "child_process";
import { platform } from "os";

if (platform() !== "win32") {
  try {
    execSync("chmod +x node_modules/.bin/vite");
    console.log("✅ Vite is now executable");
  } catch (error) {
    console.error("❌ Failed to set Vite permissions:", error);
  }
} else {
  console.log("⏭️ Skipping chmod on Windows");
}
