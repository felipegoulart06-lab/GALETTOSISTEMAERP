const fs = require('fs');
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
      console.log('Fixed ' + f);
    } else if (content.includes('import { Icon } from "./dashboard"')) {
      content = content.replace('import { Icon } from "./dashboard"', 'import { Icon } from "@/components/ui-icon"');
      fs.writeFileSync(f, content);
      console.log('Fixed ' + f);
    } else if (content.includes('import { Icon } from "@/components/dashboard";')) {
      content = content.replace('import { Icon } from "@/components/dashboard";', 'import { Icon } from "@/components/ui-icon";');
      fs.writeFileSync(f, content);
      console.log('Fixed ' + f);
    }
  }
});
