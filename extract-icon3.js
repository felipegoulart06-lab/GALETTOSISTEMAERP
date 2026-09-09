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
  
  const searchIconStart = dashboard.indexOf('function SearchIcon() {');
  let searchEndIdx = searchIconStart;
  if (searchIconStart !== -1) {
    bracketCount = 0;
    started = false;
    for (let i = searchIconStart; i < dashboard.length; i++) {
      if (dashboard[i] === '{') {
        bracketCount++;
        started = true;
      } else if (dashboard[i] === '}') {
        bracketCount--;
      }
      if (started && bracketCount === 0) {
        searchEndIdx = i + 1;
        break;
      }
    }
    
    let searchIconCode = dashboard.substring(searchIconStart, searchEndIdx);
    searchIconCode = searchIconCode.replace('function SearchIcon', 'export function SearchIcon');
    
    iconCode += '\n\n' + searchIconCode;
    dashboard = dashboard.substring(0, searchIconStart) + dashboard.substring(searchEndIdx);
  }

  const newIconFile = "import type { IconName } from '@/lib/dashboard-data';\n\n" + iconCode;
  fs.writeFileSync('components/ui-icon.tsx', newIconFile);
  
  const iconStart2 = dashboard.indexOf('function Icon({ name }: { name: IconName }) {');
  if (iconStart2 !== -1) {
    endIdx = iconStart2;
    bracketCount = 0;
    started = false;
    for (let i = iconStart2; i < dashboard.length; i++) {
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
    dashboard = dashboard.substring(0, iconStart2) + dashboard.substring(endIdx);
  }
  
  dashboard = 'import { Icon, SearchIcon } from "@/components/ui-icon";\n' + dashboard;
  fs.writeFileSync('components/dashboard.tsx', dashboard);
  console.log('Extracted Icon to ui-icon.tsx');
}
