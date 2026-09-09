const fs = require('fs');

let dashboard = fs.readFileSync('components/dashboard.tsx', 'utf8');
const iconStart = dashboard.indexOf('export function Icon({ name }');
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
  
  const iconCode = dashboard.substring(iconStart, endIdx);
  const newIconFile = "import type { IconName } from '@/lib/dashboard-data';\n\n" + iconCode;
  fs.writeFileSync('components/ui-icon.tsx', newIconFile);
  
  dashboard = dashboard.substring(0, iconStart) + dashboard.substring(endIdx);
  dashboard = 'import { Icon } from "@/components/ui-icon";\n' + dashboard;
  fs.writeFileSync('components/dashboard.tsx', dashboard);
  console.log('Extracted Icon to ui-icon.tsx');
  
  const filesToUpdate = [
    'components/company-detail-page.tsx',
    'components/mentorship-detail-page.tsx',
    'components/company-location-map.tsx',
    'components/product-detail-page.tsx',
    'components/spin-wheel-hub.tsx',
    'components/supplier-list-detail-page.tsx'
  ];
  
  filesToUpdate.forEach(f => {
    if (fs.existsSync(f)) {
      let content = fs.readFileSync(f, 'utf8');
      if (content.includes('import { Icon } from "@/components/dashboard"')) {
        content = content.replace('import { Icon } from "@/components/dashboard"', 'import { Icon } from "@/components/ui-icon"');
        fs.writeFileSync(f, content);
      } else if (content.includes('import { Icon } from "./dashboard"')) {
        content = content.replace('import { Icon } from "./dashboard"', 'import { Icon } from "@/components/ui-icon"');
        fs.writeFileSync(f, content);
      }
    }
  });
}
