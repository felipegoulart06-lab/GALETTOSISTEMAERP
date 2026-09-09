const fs = require('fs');
let dashboard = fs.readFileSync('components/dashboard.tsx', 'utf8');

const iconStart = dashboard.indexOf('function Icon({ name }: { name: IconName }) {');
if (iconStart !== -1) {
  let endIdx = iconStart;
  let braces = 0;
  for (let i = iconStart; i < dashboard.length; i++) {
    if (dashboard[i] === '{') braces++;
    if (dashboard[i] === '}') {
      braces--;
      if (braces === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }
  
  let iconCode = dashboard.substring(iconStart, endIdx);
  iconCode = iconCode.replace('function Icon', 'export function Icon');
  
  const searchStart = dashboard.indexOf('function SearchIcon() {');
  let searchEnd = searchStart;
  if (searchStart !== -1) {
    braces = 0;
    for (let i = searchStart; i < dashboard.length; i++) {
      if (dashboard[i] === '{') braces++;
      if (dashboard[i] === '}') {
        braces--;
        if (braces === 0) {
          searchEnd = i + 1;
          break;
        }
      }
    }
    let searchCode = dashboard.substring(searchStart, searchEnd);
    searchCode = searchCode.replace('function SearchIcon', 'export function SearchIcon');
    iconCode += '\n\n' + searchCode;
    dashboard = dashboard.substring(0, searchStart) + dashboard.substring(searchEnd);
  }
  
  const newIconFile = "import type { IconName } from '@/lib/dashboard-data';\n\n" + iconCode;
  fs.writeFileSync('components/ui-icon.tsx', newIconFile);
  
  // Need to re-find Icon start because dashboard string changed (removed searchIcon)
  const iconStart2 = dashboard.indexOf('function Icon({ name }: { name: IconName }) {');
  if (iconStart2 !== -1) {
    let endIdx2 = iconStart2;
    braces = 0;
    for (let i = iconStart2; i < dashboard.length; i++) {
      if (dashboard[i] === '{') braces++;
      if (dashboard[i] === '}') {
        braces--;
        if (braces === 0) {
          endIdx2 = i + 1;
          break;
        }
      }
    }
    dashboard = dashboard.substring(0, iconStart2) + dashboard.substring(endIdx2);
  }
  
  dashboard = 'import { Icon, SearchIcon } from "@/components/ui-icon";\n' + dashboard;
  fs.writeFileSync('components/dashboard.tsx', dashboard);
}
