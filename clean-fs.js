const fs = require('fs');
const files = [
  'components/dashboard.tsx', 
  'lib/platform-store.ts', 
  'lib/platform-content.ts', 
  'app/global-error.tsx', 
  'app/error.tsx', 
  'app/page.tsx', 
  'app/[section]/page.tsx', 
  'app/detalhes/[section]/page.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    const orig = content;
    
    content = content.replace(/\/\/\s*#region debug-point[\s\S]*?\/\/\s*#endregion debug-point\r?\n?/g, '');
    const requireFsRegex = /let __dbgServerUrl =[\s\S]*?require\("fs"\)[\s\S]*?\} catch \{\}\r?\n\} catch \{\}\r?\n/g;
    content = content.replace(requireFsRegex, '');
    const debugEmitRegex = /const __debugEmit = \(.*?\) => \{\r?\n[\s\S]*?\} catch \{\}\r?\n\}\r?\n/g;
    content = content.replace(debugEmitRegex, '');
    const debugEmitAsyncRegex = /const __debugEmit = async \(.*?\) => \{\r?\n[\s\S]*?\} catch \{\}\r?\n\};\r?\n/g;
    content = content.replace(debugEmitAsyncRegex, '');
    const debugEnvRegex = /\/\/ #region debug-point.*[\s\S]*?const __debugEnv = \(\(\) => \{[\s\S]*?\}\)\(\);\r?\n/g;
    content = content.replace(debugEnvRegex, '');
    const debugEnvRegex2 = /const __debugEnv = \(\(\) => \{[\s\S]*?\}\)\(\);\r?\n/g;
    content = content.replace(debugEnvRegex2, '');
    
    if (orig !== content) {
      fs.writeFileSync(f, content);
      console.log('Cleaned ' + f);
    }
  }
});
