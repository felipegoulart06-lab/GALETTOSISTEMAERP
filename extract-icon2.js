const fs = require('fs');

let dashboard = fs.readFileSync('components/dashboard.tsx', 'utf8');
const iconStart = dashboard.indexOf('function Icon({ name }: { name: IconName }) {');
if (iconStart !== -1) {
  let endIdx = iconStart;
  let bracketCount = 0;
  let started = false;
  for (let i = iconStart; i < dashboard.length; i++) {
    if (dashboard[i] === '{') {
      bracketCount++;
      started = true;
    } else if (dashboard[i] === '}') {
      bracketCount--;
    }
    if (started && bracketCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
  
  let iconCode = dashboard.substring(iconStart, endIdx);
  iconCode = iconCode.replace('function Icon', 'export function Icon');
  const newIconFile = "import type { IconName } from '@/lib/dashboard-data';\n\n" + iconCode;
  fs.writeFileSync('components/ui-icon.tsx', newIconFile);
  
  dashboard = dashboard.substring(0, iconStart) + dashboard.substring(endIdx);
  dashboard = 'import { Icon } from "@/components/ui-icon";\n' + dashboard;
  fs.writeFileSync('components/dashboard.tsx', dashboard);
  console.log('Extracted Icon to ui-icon.tsx');
}
