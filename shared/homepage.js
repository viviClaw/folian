/**
 * Frieren 博客首页
 * 
 * 设计风格：魔法主题 - Folian 风格
 * 概念映射：
 * - 首页 → 魔法世界入口
 * - 功能卡片 → 魔法传送门
 * - 统计 → 魔法成就
 * - 最新文章 → 最新卷轴
 */

const { generatePage, generateNav, generateFooter, BASE_URL } = require('./template');
const { generateDynamicEffects, particleConfig } = require('./effects');

/**
 * 生成首页 HTML
 * @param {Object} options 配置选项
 * @param {string} options.siteName 站点名称
 * @param {Array} options.features 功能卡片列表
 * @param {Object} options.stats 统计数据
 * @param {Array} options.recentPosts 最新文章列表
 * @param {Object} options.categories 分类信息
 * @returns {string} HTML 字符串
 */
function generateHomepage(options = {}) {
  const {
    siteName = 'Frieren',
    features = [],
    stats = {},
    recentPosts = [],
    categories = []
  } = options;
  
  // 默认功能卡片 - 魔法传送门
  const defaultFeatures = [
    {
      tag: '热门',
      tagNew: false,
      icon: '✨',
      title: '每日资讯',
      desc: '探索 AI 科技与商业财经的最新动态，记录世界的每一次变迁',
      href: './cate/aiNews/',
      color: '#8b5cf6'
    },
    {
      tag: '推荐',
      tagNew: true,
      icon: '💎',
      title: '魔法记账',
      desc: '管理你的魔法资源消耗，掌握每一笔魔法开支',
      href: './accounting.html',
      color: '#ec4899'
    },
    {
      tag: '精选',
      tagNew: false,
      icon: '📚',
      title: '智慧书阁',
      desc: '深度解读经典书籍，汲取知识的魔法力量',
      href: './cate/books/',
      color: '#06b6d4'
    },
    {
      tag: '热门',
      tagNew: false,
      icon: '🎙️',
      title: '回声殿堂',
      desc: '聆听播客的声音魔法，在声音中寻找灵感',
      href: './cate/podcasts/',
      color: '#f59e0b'
    }
  ];
  
  // 默认统计数据
  const defaultStats = {
    totalPosts: 365,
    totalCategories: 12,
    totalDays: 365,
    satisfaction: 98
  };
  
  const featureList = features.length > 0 ? features : defaultFeatures;
  const statsData = { ...defaultStats, ...stats };
  
  // 功能卡片 HTML
  const featuresHtml = featureList.map((f, index) => `
    <a href="${f.href}" class="feature-card" style="animation-delay: ${index * 0.1}s">
      <div class="feature-glow" style="background: radial-gradient(circle, ${f.color || '#8b5cf6'}33, transparent 70%)"></div>
      <div class="feature-header">
        <span class="feature-tag${f.tagNew ? ' new' : ''}">${f.tag}</span>
        <span class="feature-icon">${f.icon}</span>
      </div>
      <h2 class="feature-title">${f.title}</h2>
      <p class="feature-desc">${f.desc}</p>
      <div class="feature-footer">
        <span class="feature-action">立即探索</span>
        <span class="feature-arrow">→</span>
      </div>
    </a>
  `).join('');
  
  // 统计卡片 HTML
  const statsHtml = `
    <div class="stat-card">
      <div class="stat-icon">✨</div>
      <div class="stat-content">
        <div class="stat-number" data-count="${statsData.totalPosts}">0</div>
        <div class="stat-label">魔法卷轴</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🌌</div>
      <div class="stat-content">
        <div class="stat-number" data-count="${statsData.totalCategories}">0</div>
        <div class="stat-label">探索领域</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📅</div>
      <div class="stat-content">
        <div class="stat-number" data-count="${statsData.totalDays}">0</div>
        <div class="stat-label">连续记录</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">⭐</div>
      <div class="stat-content">
        <div class="stat-number" data-count="${statsData.satisfaction}">0</div>
        <div class="stat-label">满意度</div>
      </div>
    </div>
  `;
  
  // 首页特定样式 - 魔法主题
  const homepageStyles = `
    /* ========== 魔法世界入口样式 ========== */
    .home-container {
      position: relative;
      z-index: 10;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 24px;
    }
    
    /* ========== 魔法欢迎区 ========== */
    .welcome-section {
      text-align: center;
      padding: 50px 30px;
      margin-bottom: 48px;
      position: relative;
      background: linear-gradient(145deg, 
        rgba(139, 92, 246, 0.12), 
        rgba(236, 72, 153, 0.08)
      );
      border-radius: 32px;
      border: 1px solid rgba(139, 92, 246, 0.2);
      overflow: hidden;
    }
    
    .welcome-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, 
        transparent, 
        #8b5cf6, 
        #ec4899, 
        #8b5cf6, 
        transparent
      );
    }
    
    /* 魔法光环 */
    .avatar-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
      margin: 0 auto 28px;
    }
    
    .avatar-glow {
      position: absolute;
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
      background: radial-gradient(circle, 
        rgba(139, 92, 246, 0.4), 
        rgba(236, 72, 153, 0.2), 
        transparent 70%
      );
      border-radius: 50%;
      animation: avatarGlow 3s ease-in-out infinite;
    }
    
    @keyframes avatarGlow {
      0%, 100% { 
        transform: scale(1); 
        opacity: 0.6;
      }
      50% { 
        transform: scale(1.2); 
        opacity: 0.3;
      }
    }
    
    .avatar-ring {
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      border: 2px solid rgba(139, 92, 246, 0.3);
      border-radius: 50%;
      animation: ringRotate 10s linear infinite;
    }
    
    @keyframes ringRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .avatar {
      position: relative;
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      box-shadow: 
        0 8px 32px rgba(139, 92, 246, 0.3),
        inset 0 2px 4px rgba(255, 255, 255, 0.2);
      animation: avatarFloat 3s ease-in-out infinite;
    }
    
    @keyframes avatarFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    
    /* 星星装饰 */
    .welcome-sparkles {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;
    }
    
    .sparkle {
      position: absolute;
      font-size: 1.2rem;
      color: #a78bfa;
      animation: sparkleFloat 4s ease-in-out infinite;
    }
    
    .sparkle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
    .sparkle:nth-child(2) { top: 20%; right: 15%; animation-delay: 0.8s; }
    .sparkle:nth-child(3) { bottom: 15%; left: 20%; animation-delay: 1.6s; }
    .sparkle:nth-child(4) { bottom: 25%; right: 10%; animation-delay: 2.4s; }
    .sparkle:nth-child(5) { top: 40%; left: 5%; animation-delay: 3.2s; }
    .sparkle:nth-child(6) { top: 50%; right: 8%; animation-delay: 4s; }
    
    @keyframes sparkleFloat {
      0%, 100% { 
        opacity: 0.3;
        transform: translateY(0) scale(0.8);
      }
      50% { 
        opacity: 1;
        transform: translateY(-20px) scale(1.2);
      }
    }
    
    .welcome-title {
      font-size: 3rem;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #fff, #c4b5fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
      letter-spacing: 2px;
    }
    
    .welcome-subtitle {
      font-size: 1.2rem;
      color: #a78bfa;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    
    .welcome-subtitle::before,
    .welcome-subtitle::after {
      content: '✦';
      font-size: 0.9rem;
      opacity: 0.6;
    }
    
    .welcome-desc {
      font-size: 1rem;
      color: #94a3b8;
      line-height: 1.8;
      max-width: 600px;
      margin: 0 auto;
    }
    
    /* ========== 统计面板 ========== */
    .stats-section {
      margin-bottom: 48px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    
    .stat-card {
      position: relative;
      background: linear-gradient(145deg, #1e1e2e, #16213e);
      border-radius: 20px;
      padding: 24px;
      border: 1px solid rgba(139, 92, 246, 0.15);
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, 
        rgba(139, 92, 246, 0.3), 
        rgba(236, 72, 153, 0.3)
      );
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      border-color: rgba(139, 92, 246, 0.3);
      box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
    }
    
    .stat-icon {
      font-size: 2rem;
      margin-bottom: 12px;
      display: block;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #fff, #c4b5fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 0.9rem;
      color: #a78bfa;
    }
    
    /* ========== 魔法传送门 ========== */
    .features-section {
      margin-bottom: 48px;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      padding: 16px 20px;
      background: linear-gradient(135deg, 
        rgba(139, 92, 246, 0.1), 
        rgba(236, 72, 153, 0.05)
      );
      border-radius: 16px;
      border-left: 3px solid #8b5cf6;
    }
    
    .section-icon {
      font-size: 1.5rem;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }
    
    .section-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #fff;
      margin: 0;
      flex: 1;
    }
    
    .section-badge {
      padding: 4px 12px;
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      color: #fff;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    
    .feature-card {
      position: relative;
      background: linear-gradient(145deg, #1e1e2e, #16213e);
      border-radius: 24px;
      padding: 28px;
      text-decoration: none;
      color: inherit;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(139, 92, 246, 0.15);
      overflow: hidden;
      animation: fadeInUp 0.6s ease-out backwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .feature-glow {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    
    .feature-card:hover .feature-glow {
      opacity: 1;
    }
    
    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6);
      opacity: 0.6;
    }
    
    .feature-card:hover {
      transform: translateY(-8px);
      border-color: rgba(139, 92, 246, 0.3);
      box-shadow: 
        0 16px 48px rgba(139, 92, 246, 0.25),
        0 0 0 1px rgba(139, 92, 246, 0.3);
    }
    
    .feature-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .feature-tag {
      display: inline-block;
      font-size: 0.75rem;
      padding: 6px 14px;
      border-radius: 12px;
      background: rgba(139, 92, 246, 0.2);
      color: #a78bfa;
      font-weight: 500;
    }
    
    .feature-tag.new {
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      color: #fff;
    }
    
    .feature-icon {
      font-size: 2.5rem;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
      transition: transform 0.3s ease;
    }
    
    .feature-card:hover .feature-icon {
      transform: scale(1.15) rotate(5deg);
    }
    
    .feature-title {
      font-size: 1.4rem;
      margin-bottom: 12px;
      color: #fff;
      font-weight: 600;
    }
    
    .feature-desc {
      font-size: 0.95rem;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .feature-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid rgba(139, 92, 246, 0.15);
    }
    
    .feature-action {
      font-size: 0.9rem;
      color: #a78bfa;
      font-weight: 500;
    }
    
    .feature-arrow {
      color: #a78bfa;
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }
    
    .feature-card:hover .feature-arrow {
      transform: translateX(8px);
    }
    
    /* ========== 快捷操作 ========== */
    .actions-section {
      margin-bottom: 40px;
    }
    
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .action-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 24px;
      border-radius: 16px;
      text-decoration: none;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .action-btn-primary {
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      color: #fff;
      box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
      border: none;
    }
    
    .action-btn-primary:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
    }
    
    .action-btn-secondary {
      background: linear-gradient(145deg, #1e1e2e, #16213e);
      color: #e0e7ff;
      border: 1px solid rgba(139, 92, 246, 0.2);
    }
    
    .action-btn-secondary:hover {
      transform: translateY(-4px);
      border-color: rgba(139, 92, 246, 0.4);
      background: linear-gradient(145deg, #252538, #1a2540);
    }
    
    .action-icon {
      font-size: 1.5rem;
    }
    
    .action-text {
      flex: 1;
      font-size: 1rem;
    }
    
    /* ========== 响应式设计 ========== */
    @media (max-width: 768px) {
      .welcome-section {
        padding: 40px 24px;
        margin-bottom: 32px;
        border-radius: 24px;
      }
      
      .welcome-title {
        font-size: 2.2rem;
      }
      
      .welcome-subtitle {
        font-size: 1rem;
      }
      
      .welcome-desc {
        font-size: 0.9rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      
      .stat-card {
        padding: 20px;
      }
      
      .stat-number {
        font-size: 2rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .actions-grid {
        grid-template-columns: 1fr;
      }
      
      .section-header {
        padding: 12px 16px;
      }
      
      .section-title {
        font-size: 1.1rem;
      }
    }
    
    @media (max-width: 480px) {
      .home-container {
        padding: 24px 16px;
      }
      
      .welcome-section {
        padding: 32px 20px;
      }
      
      .avatar-wrapper {
        width: 80px;
        height: 80px;
      }
      
      .avatar {
        width: 80px;
        height: 80px;
        font-size: 40px;
      }
      
      .welcome-title {
        font-size: 1.8rem;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .stat-card {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      
      .stat-icon {
        font-size: 1.8rem;
        margin-bottom: 0;
      }
      
      .stat-number {
        font-size: 1.8rem;
      }
    }
  `;
  
  // 内容 HTML
  const content = `
    <div class="home-container">
      <!-- 魔法欢迎区 -->
      <div class="welcome-section">
        <div class="welcome-sparkles">
          <span class="sparkle">✦</span>
          <span class="sparkle">✧</span>
          <span class="sparkle">✦</span>
          <span class="sparkle">✧</span>
          <span class="sparkle">✦</span>
          <span class="sparkle">✧</span>
        </div>
        
        <div class="avatar-wrapper">
          <div class="avatar-glow"></div>
          <div class="avatar-ring"></div>
          <div class="avatar">🔮</div>
        </div>
        
        <h1 class="welcome-title">${siteName}</h1>
        <p class="welcome-subtitle">✨ 魔法旅程开始 ✨</p>
        <p class="welcome-desc">探索知识的魔法世界，记录每一次灵感迸发的瞬间，在阅读与写作中不断成长</p>
      </div>
      
      <!-- 统计面板 -->
      <div class="stats-section">
        <div class="section-header">
          <span class="section-icon">📊</span>
          <h2 class="section-title">魔法成就</h2>
          <span class="section-badge">实时统计</span>
        </div>
        <div class="stats-grid">
          ${statsHtml}
        </div>
      </div>
      
      <!-- 魔法传送门 -->
      <div class="features-section">
        <div class="section-header">
          <span class="section-icon">🌌</span>
          <h2 class="section-title">探索领域</h2>
          <span class="section-badge">${featureList.length} 个入口</span>
        </div>
        <div class="features-grid">
          ${featuresHtml}
        </div>
      </div>
      
      <!-- 快捷操作 -->
      <div class="actions-section">
        <div class="actions-grid">
          <a href="./accounting.html" class="action-btn action-btn-primary">
            <span class="action-icon">💰</span>
            <span class="action-text">快速记账</span>
          </a>
          <a href="./cate/" class="action-btn action-btn-secondary">
            <span class="action-icon">📖</span>
            <span class="action-text">查看日报</span>
          </a>
          <a href="./cate/books/" class="action-btn action-btn-secondary">
            <span class="action-icon">📚</span>
            <span class="action-text">智慧书阁</span>
          </a>
          <a href="./cate/tutorials/" class="action-btn action-btn-secondary">
            <span class="action-icon">📜</span>
            <span class="action-text">修炼指南</span>
          </a>
        </div>
      </div>
    </div>
    
    <script>
      // 数字增长动画
      function animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number[data-count]');
        numbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-count'));
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();
          
          function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            if (target >= 100) {
              num.textContent = current.toLocaleString();
            } else {
              num.textContent = current + (num.closest('.stat-card').querySelector('.stat-label').textContent.includes('满意度') ? '%' : '');
            }
            
            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }
          
          requestAnimationFrame(update);
        });
      }
      
      // 页面加载后执行动画
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateNumbers);
      } else {
        animateNumbers();
      }
    </script>
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
