const fs = require('fs');
const path = require('path');

const textFileExtensions = ['.js', '.ts', '.tsx', '.vue', '.jsx', '.json', '.css', '.less', '.scss'];

// --- 获取命令行参数 ---
const targetName = process.argv[2];
if (!targetName) {
  console.error('❌ 请传入目标模块名，如：node copy-to-b.js userManage');
  process.exit(1);
}

// --- 路径定义 ---
const bRoot = process.cwd();
const sourceDir = path.resolve(bRoot, '../ali-lowcode-generated-sources/src/pages/$');
const targetDir = path.join(bRoot, 'src/pages', targetName);
const routeFile = path.join(bRoot, 'src/routes.js');

// --- 拷贝并替换路径函数 ---
function copyAndReplaceImport(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(item => {
    const srcPath = path.join(from, item);
    const destPath = path.join(to, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyAndReplaceImport(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, 'utf-8');

      if (textFileExtensions.includes(path.extname(item))) {
        // 通用替换所有 'xxx/srcindex.tsx' 为 'xxx'
        content = content.replace(/(['"])([^'"]+)\/srcindex\.tsx\1/g, (match, quote, pkg) => {
          return `${quote}${pkg}${quote}`;
        });
      }

      fs.writeFileSync(destPath, content, 'utf-8');
    }
  });
}

// --- 执行复制 ---
if (!fs.existsSync(sourceDir)) {
  console.error(`❌ 源目录不存在: ${sourceDir}`);
  process.exit(1);
}
copyAndReplaceImport(sourceDir, targetDir);
console.log(`✅ 模块已复制到：${targetDir}`);

// --- 修改 routes.js ---
if (!fs.existsSync(routeFile)) {
  console.error(`❌ 路由文件不存在: ${routeFile}`);
  process.exit(1);
}

let content = fs.readFileSync(routeFile, 'utf-8');

const importRegex = new RegExp(`import\\s+${targetName}\\s+from\\s+['"]@/pages/${targetName}['"];?`);
if (importRegex.test(content)) {
  console.log(`⚠️ 模块 '${targetName}' 已经import，跳过import插入`);
} else {
  const allImports = [...content.matchAll(/import .* from .*;/g)];
  if (allImports.length > 0) {
    const lastImport = allImports[allImports.length - 1];
    const insertPos = lastImport.index + lastImport[0].length;
    content = content.slice(0, insertPos) + `\nimport ${targetName} from '@/pages/${targetName}';` + content.slice(insertPos);
    console.log('✅ 成功插入import语句');
  } else {
    content = `import ${targetName} from '@/pages/${targetName}';\n` + content;
    console.log('✅ 文件头插入import语句');
  }
}

const childrenRegex = /(children:\s*\[)([\s\S]*?)(\])/m;
const match = content.match(childrenRegex);
if (match) {
  const childrenContent = match[2];
  if (childrenContent.includes(`path: '/${targetName}'`)) {
    console.log(`⚠️ 路由 '/${targetName}' 已存在，跳过插入`);
  } else {
    const newRoute = `\n      {\n        path: '/${targetName}',\n        name: '${targetName}',\n        component: ${targetName}\n      },`;
    const newChildrenContent = newRoute + childrenContent;
    content = content.replace(childrenRegex, `$1${newChildrenContent}$3`);
    console.log('✅ 路由配置已插入children数组');
  }
} else {
  console.error('❌ 未找到 routes.js 中的 children 数组，请检查格式');
  process.exit(1);
}

fs.writeFileSync(routeFile, content, 'utf-8');
console.log('✅ routes.js 文件更新完成');
