/**
 * Frieren 共享模板系统
 * 提供统一的 HTML 布局模板，供各子项目使用
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://viviclaw.github.io/folian';

// 读取共享样式文件
const SHARED_STYLES_PATH = path.join(__dirname, 'styles.css');
let sharedStyles = '';
try {
  sharedStyles = fs.readFileSync(SHARED_STYLES_PATH, 'utf-8');
} catch (e) {
  console.warn('⚠️ 无法读取 shared/styles.css');
}

// 导航链接配置
const navLinks = [
  { name: '首页', url: '/', icon: '🏠' },
  { name: '资讯', url: '/cate/', icon: '📰' },
  { name: '记账', url: '/accounting.html', icon: '💰' },
];

/**
 * 生成统一的 HTML 头部
 */
function generateHead(title, extraCss = '') {
  // 合并共享样式和额外样式
  const allStyles = sharedStyles + (extraCss ? '\n' + extraCss : '');
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Frieren</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
  <style>${allStyles}</style>
</head>
<body>`;
}

/**
 * 生成导航栏
 */
function generateNav(currentPage = '') {
  const links = navLinks.map(link => {
    const isActive = currentPage === link.url || 
      (currentPage === '/' && link.url === '/') ||
      (currentPage.startsWith(link.url) && link.url !== '/');
    return `<a href="${BASE_URL}${link.url}" class="nav-link ${isActive ? 'active' : ''}">${link.icon} ${link.name}</a>`;
  }).join('');

  return `<nav class="frieren-nav">
    <div class="brand">
      <div class="brand-icon">✦</div>
      <span class="brand-name">Frieren</span>
    </div>
    <div class="nav-links">
      ${links}
    </div>
  </nav>`;
}

/**
 * 生成面包屑导航
 */
function generateBreadcrumb(crumbs) {
  const items = crumbs.map((crumb, index) => {
    const isLast = index === crumbs.length - 1;
    if (isLast) {
      return `<span class="current">${crumb.name}</span>`;
    }
    return `<a href="${crumb.url}">${crumb.name}</a> > `;
  }).join('');
  
  return `<div class="frieren-breadcrumb">
    <a href="${BASE_URL}/">🏠 首页</a> > ${items}
  </div>`;
}

/**
 * 生成页面头部
 */
function generateHeader(title, subtitle = '') {
  return `<header class="frieren-header">
    <h1>${title}</h1>
    ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
  </header>`;
}

/**
 * 生成底部
 */
function generateFooter() {
  return `<footer class="frieren-footer">
    <p>与芙莉莲一同探索数据的魔法世界</p>
    <p class="made-with">Made with ✨ & 🍙</p>
  </footer>`;
}

/**
 * 生成统一的 HTML 尾部
 */
function generateTail() {
  return `</body>
</html>`;
}

/**
 * 生成完整页面（简化版）
 */
function generatePage({ title, content, nav = true, header = '', footer = true, currentPage = '', extraCss = '' }) {
  let html = generateHead(title, extraCss);
  
  html += '<div class="frieren-container">';
  
  // 导航
  if (nav) {
    html += generateNav(currentPage);
  }
  
  // 页面头部
  if (header) {
    html += header;
  }
  
  // 内容
  html += content;
  
  // 底部
  if (footer) {
    html += generateFooter();
  }
  
  html += '</div>';
  html += generateTail();
  
  return html;
}

/**
 * URL 工具函数
 */
function makeUrl(relativePath) {
  return BASE_URL + '/' + relativePath.replace(/^\//, '');
}

module.exports = {
  BASE_URL,
  navLinks,
  generateHead,
  generateNav,
  generateHeader,
  generateFooter,
  generateTail,
  generatePage,
  makeUrl
};
