/**
 * Frieren 首页生成器
 * 复用共享模板系统，生成统一的首页
 */

const { generatePage, generateNav, generateFooter, BASE_URL } = require('./template');
const { generateDynamicEffects, particleConfig } = require('./effects');

/**
 * 生成首页 HTML
 * @param {Object} options 配置选项
 * @param {string} options.siteName 站点名称
 * @param {Array} options.features 功能卡片列表
 * @param {Object} options.stats 统计数据
 * @returns {string} HTML 字符串
 */
function generateHomepage(options = {}) {
  const {
    siteName = 'Frieren',
    features = [],
    stats = {}
  } = options;
  
  // 默认功能卡片
  const defaultFeatures = [
    {
      tag: '热门',
      tagNew: false,
      icon: '📰',
      title: '每日资讯',
      desc: '每日新闻播报与深度分析，带你了解世界变迁，记录每一个精彩瞬间',
      href: './cate/'
    },
    {
      tag: '核心',
      tagNew: false,
      icon: '💰',
      title: '智能记账',
      desc: '收支记录与可视化分析，魔法般的账目管理，让每一笔开支都清晰可见',
      href: './accounting.html'
    },
    {
      tag: '新功能',
      tagNew: true,
      icon: '📊',
      title: '数据分析',
      desc: '深度洞察消费习惯，智能推荐优化方案，为你的理财之路点亮明灯',
      href: './cate/'
    },
    {
      tag: '管理',
      tagNew: false,
      icon: '⚙️',
      title: '个人中心',
      desc: '自定义设置与偏好管理，打造专属于你的数字空间，个性化体验触手可及',
      href: '#'
    }
  ];
  
  // 默认统计数据
  const defaultStats = [
    { value: '365', label: '连续记录天数' },
    { value: '2,847', label: '资讯文章' },
    { value: '12.5K', label: '账目记录' },
    { value: '98%', label: '用户满意度' }
  ];
  
  const featureList = features.length > 0 ? features : defaultFeatures;
  const statList = Object.keys(stats).length > 0 ? [
    { value: stats.days || '365', label: '连续记录天数' },
    { value: stats.articles || '2,847', label: '资讯文章' },
    { value: stats.records || '12.5K', label: '账目记录' },
    { value: stats.satisfaction || '98%', label: '用户满意度' }
  ] : defaultStats;
  
  // 功能卡片 HTML
  const featuresHtml = featureList.map(f => `
    <a href="${f.href}" class="feature-card">
      <span class="tag${f.tagNew ? ' new' : ''}">${f.tag}</span>
      <h2>${f.icon} ${f.title}</h2>
      <p>${f.desc}</p>
    </a>
  `).join('');
  
  // 统计数据 HTML
  const statsHtml = statList.map(s => `
    <div class="stat-item">
      <div class="number">${s.value}</div>
      <div class="label">${s.label}</div>
    </div>
  `).join('');
  
  // 首页特定样式
  const homepageStyles = `
    /* ========== 首页样式 ========== */
    .home-container {
      position: relative;
      z-index: 10;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    /* Header Banner */
    .home-header {
      text-align: center;
      padding: 40px 20px;
      margin-bottom: 40px;
    }
    
    .avatar-container {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
    }
    
    .avatar-glow {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: var(--primary-gradient, linear-gradient(135deg, #9B7EBD, #00d9ff));
      border-radius: 50%;
      filter: blur(20px);
      opacity: 0.5;
      animation: avatarPulse 3s ease-in-out infinite;
    }
    
    @keyframes avatarPulse {
      0%, transform: scale( 100% {1); opacity: 0.5; }
      50% { transform: scale(1.15); opacity: 0.3; }
    }
    
    .avatar {
      position: relative;
      width: 80px;
      height: 80px;
      background: var(--primary-gradient, linear-gradient(135deg, #9B7EBD, #00d9ff));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    .home-header h1 { 
      font-size: 2.5rem;
      margin-bottom: 10px;
      background: linear-gradient(135deg, var(--primary, #9B7EBD), var(--accent, #e056fd));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .home-header .subtitle {
      font-size: 1.1rem;
      opacity: 0.8;
    }
    
    /* 功能卡片区 */
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 40px;
    }
    
    .feature-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 24px;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: block;
      position: relative;
      overflow: hidden;
    }
    
    .feature-card:hover {
      transform: translateY(-4px);
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(155, 126, 189, 0.3);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 40px rgba(155, 126, 189, 0.1);
    }
    
    .feature-card .tag {
      display: inline-block;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 20px;
      margin-bottom: 12px;
      background: rgba(155, 126, 189, 0.2);
      color: #9B7EBD;
    }
    
    .feature-card .tag.new { 
      background: rgba(34, 197, 94, 0.2); 
      color: #22c55e; 
    }
    
    .feature-card h2 { 
      font-size: 1.25rem; 
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .feature-card p { 
      font-size: 0.9rem;
      opacity: 0.7; 
      line-height: 1.5;
    }
    
    /* 统计数据 */
    .home-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 40px;
    }
    
    .stat-item {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    
    .stat-item:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }
    
    .stat-item .number {
      font-size: 1.8rem;
      font-weight: bold;
      background: linear-gradient(135deg, var(--primary, #9B7EBD), var(--accent-cyan, #00d9ff));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .stat-item .label {
      font-size: 0.8rem;
      opacity: 0.6;
      margin-top: 4px;
    }
    
    /* 快捷操作 */
    .home-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 50px;
      flex-wrap: wrap;
    }
    
    .home-btn {
      padding: 14px 28px;
      border-radius: 14px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: none;
    }
    
    .home-btn-primary {
      background: linear-gradient(135deg, var(--primary, #9B7EBD), var(--primary-dark, #7c5ce0));
      color: white;
      box-shadow: 0 4px 16px rgba(155, 126, 189, 0.3);
    }
    
    .home-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(155, 126, 189, 0.4);
    }
    
    .home-btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .home-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }
    
    /* 响应式 */
    @media (max-width: 768px) {
      .home-stats { grid-template-columns: repeat(2, 1fr); }
      .home-header h1 { font-size: 2rem; }
      .features { grid-template-columns: 1fr; }
    }
    
    @media (max-width: 480px) {
      .home-container { padding: 30px 16px; }
      .home-actions { flex-direction: column; }
      .home-btn { width: 100%; justify-content: center; }
      .home-header { padding: 30px 16px; }
      .avatar-container { width: 60px; height: 60px; }
      .avatar { width: 60px; height: 60px; font-size: 28px; }
    }
  `;
  
  // 内容 HTML
  const content = `
    <div class="home-container">
      <!-- Header -->
      <div class="home-header">
        <div class="avatar-container">
          <div class="avatar-glow"></div>
          <div class="avatar">✦</div>
        </div>
        <h1>${siteName}</h1>
        <p class="subtitle">✨ 资讯与记账 · 魔法旅程开始 ✨</p>
      </div>
      
      <!-- 功能卡片 -->
      <div class="features">
        ${featuresHtml}
      </div>
      
      <!-- 统计数据 -->
      <div class="home-stats">
        ${statsHtml}
      </div>
      
      <!-- 快捷操作 -->
      <div class="home-actions">
        <a href="./accounting.html" class="home-btn home-btn-primary">🚀 快速记账</a>
        <a href="./cate/" class="home-btn home-btn-secondary">📖 查看日报</a>
      </div>
    </div>
  `;
  
  // 使用共享模板生成页面
  return generatePage({
    title: siteName,
    content,
    nav: false,  // 首页不使用导航
    footer: true,
    currentPage: '/',
    extraCss: homepageStyles
  });
}

module.exports = {
  generateHomepage
};
