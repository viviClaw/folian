/**
 * Frieren 博客首页
 * 
 * 设计风格：魔法主题 - 简约优雅版（含粒子动画）
 * 主要用途：美食/账目/运动/深度报告/日记等生活记录
 * 特点：
 * - 克制的动画效果
 * - 柔和的粒子背景
 * - 简洁优雅的设计
 * - 实用的功能导向
 * - 温暖的视觉氛围
 */

const { generatePage, generateNav, generateFooter, BASE_URL } = require('./template');

/**
 * 生成首页 HTML
 */
function generateHomepage(options = {}) {
  const {
    siteName = 'Frieren',
    features = [],
    stats = {}
  } = options;
  
  // 默认功能卡片 - 生活记录主题
  const defaultFeatures = [
    {
      tag: '美食',
      tagNew: false,
      icon: '🍽️',
      title: '美食记录',
      desc: '记录每一次味蕾的旅行，分享美食的温暖时刻',
      href: './food/',
      color: '#f59e0b'
    },
    {
      tag: '账目',
      tagNew: true,
      icon: '💰',
      title: '智能记账',
      desc: '收支记录与可视化分析，让每一笔开支清晰可见',
      href: './accounting.html',
      color: '#10b981'
    },
    {
      tag: '运动',
      tagNew: false,
      icon: '🏃',
      title: '运动打卡',
      desc: '记录每一次挥汗如雨，见证健康的点滴进步',
      href: './sports/',
      color: '#8b5cf6'
    },
    {
      tag: '阅读',
      tagNew: false,
      icon: '📚',
      title: '读书笔记',
      desc: '书香满溢的时光，记录阅读的思考与感悟',
      href: './cate/',
      color: '#06b6d4'
    }
  ];
  
  const featureList = features.length > 0 ? features : defaultFeatures;
  
  // 统计数据
  const defaultStats = {
    totalPosts: 365,
    totalCategories: 6,
    totalDays: 365,
    satisfaction: 98
  };
  const statsData = { ...defaultStats, ...stats };
  
  // 首页特定样式 - 简约优雅版（含粒子动画）
  const homepageStyles = `
/* ========== 简约优雅首页样式（含粒子动画） ========== */

/* 粒子背景容器 */
#particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

/* 温暖渐变背景 */
body {
  background: linear-gradient(135deg, 
    #1a1a2e 0%, 
    #16213e 50%, 
    #1e1e2e 100%
  ) !important;
}

.home-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 30px;
}

/* ========== 简约欢迎区 ========== */
.welcome-section {
  text-align: center;
  padding: 60px 30px 50px;
  margin-bottom: 50px;
  position: relative;
}

/* 温和的光晕装饰 */
.welcome-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, 
    rgba(139, 92, 246, 0.08) 0%, 
    rgba(236, 72, 153, 0.05) 30%, 
    transparent 70%
  );
  filter: blur(40px);
  pointer-events: none;
}

/* 头像 */
.welcome-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
}

.avatar-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, 
    rgba(139, 92, 246, 0.3), 
    rgba(236, 72, 153, 0.2)
  );
  border-radius: 50%;
  filter: blur(15px);
  animation: gentleGlow 4s ease-in-out infinite;
}

@keyframes gentleGlow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.avatar-core {
  position: relative;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  box-shadow: 
    0 10px 30px rgba(139, 92, 246, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

/* 标题 */
.welcome-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #fff, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #a78bfa;
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.welcome-subtitle::before,
.welcome-subtitle::after {
  content: '✦';
  margin: 0 12px;
  opacity: 0.6;
}

.welcome-desc {
  font-size: 1rem;
  color: #94a3b8;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
}

/* ========== 统计面板 - 简约风格 ========== */
.stats-section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px 20px;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.08), 
    rgba(236, 72, 153, 0.05)
  );
  border-radius: 16px;
  border-left: 3px solid #8b5cf6;
}

.section-icon {
  font-size: 1.5rem;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 28px 24px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
}

.stat-icon {
  font-size: 2.2rem;
  margin-bottom: 14px;
  display: block;
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
  letter-spacing: 1px;
}

/* ========== 功能卡片 - 温馨风格 ========== */
.features-section {
  margin-bottom: 50px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 28px;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  display: block;
  overflow: hidden;
}

/* 左侧彩色边条 */
.feature-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--card-color, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  transform: translateY(-6px);
  border-color: rgba(139, 92, 246, 0.2);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
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
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 12px;
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  letter-spacing: 1px;
}

.feature-tag.new {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: #fff;
}

.feature-icon {
  font-size: 2.5rem;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #fff;
  font-weight: 600;
}

.feature-desc {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 20px;
}

.feature-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.feature-action {
  font-size: 0.85rem;
  color: #a78bfa;
  font-weight: 500;
}

.feature-arrow {
  font-size: 1.2rem;
  color: #a78bfa;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-arrow {
  transform: translateX(6px);
}

/* ========== 快捷操作 ========== */
.actions-section {
  margin-bottom: 50px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.action-btn-primary {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: #fff;
  border: none;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
}

.action-btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}

.action-btn-secondary {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #e0e7ff;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.action-btn-secondary:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(139, 92, 246, 0.3);
}

.action-icon {
  font-size: 1.8rem;
}

.action-text {
  font-size: 0.95rem;
  flex: 1;
}

/* ========== 响应式设计 ========== */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 40px 20px;
  }
  
  .welcome-section {
    padding: 40px 20px 40px;
  }
  
  .welcome-avatar {
    width: 100px;
    height: 100px;
    margin-bottom: 24px;
  }
  
  .avatar-core {
    width: 100px;
    height: 100px;
    font-size: 50px;
  }
  
  .welcome-title {
    font-size: 2.2rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
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
  
  .feature-card {
    padding: 24px;
  }
  
  .feature-title {
    font-size: 1.2rem;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .section-header {
    padding: 14px 16px;
  }
  
  .section-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-title {
    font-size: 1.8rem;
  }
}
`;

  // 功能卡片 HTML
  const featuresHtml = featureList.map((f, index) => `
    <a href="${f.href}" 
       class="feature-card" 
       style="--card-color: ${f.color}; animation-delay: ${index * 0.08}s">
      <div class="feature-header">
        <span class="feature-tag${f.tagNew ? ' new' : ''}">${f.tag}</span>
        <span class="feature-icon">${f.icon}</span>
      </div>
      <h2 class="feature-title">${f.title}</h2>
      <p class="feature-desc">${f.desc}</p>
      <div class="feature-footer">
        <span class="feature-action">开始记录</span>
        <span class="feature-arrow">→</span>
      </div>
    </a>
  `).join('');

  // 统计卡片 HTML
  const statsHtml = `
    <div class="stat-card">
      <span class="stat-icon">✨</span>
      <div class="stat-number" data-count="${statsData.totalPosts}">0</div>
      <div class="stat-label">记录条数</div>
    </div>
    <div class="stat-card">
      <span class="stat-icon">📂</span>
      <div class="stat-number" data-count="${statsData.totalCategories}">0</div>
      <div class="stat-label">记录类别</div>
    </div>
    <div class="stat-card">
      <span class="stat-icon">📅</span>
      <div class="stat-number" data-count="${statsData.totalDays}">0</div>
      <div class="stat-label">连续记录</div>
    </div>
    <div class="stat-card">
      <span class="stat-icon">⭐</span>
      <div class="stat-number" data-count="${statsData.satisfaction}">0</div>
      <div class="stat-label">满意度</div>
    </div>
  `;

  // 内容 HTML
  const content = `
<div class="home-container">
  <!-- 欢迎区域 -->
  <section class="welcome-section">
    <div class="welcome-avatar">
      <div class="avatar-glow"></div>
      <div class="avatar-core">📝</div>
    </div>
    
    <h1 class="welcome-title">${siteName}</h1>
    <p class="welcome-subtitle">记录生活，留住美好</p>
    <p class="welcome-desc">
      在这里记录美食、运动、账目和思考<br/>
      让每一刻都留下温暖的印记
    </p>
  </section>
  
  <!-- 统计面板 -->
  <section class="stats-section">
    <div class="section-header">
      <span class="section-icon">📊</span>
      <h2 class="section-title">记录统计</h2>
      <span class="section-badge">实时更新</span>
    </div>
    <div class="stats-grid">
      ${statsHtml}
    </div>
  </section>
  
  <!-- 功能卡片区 -->
  <section class="features-section">
    <div class="section-header">
      <span class="section-icon">🎯</span>
      <h2 class="section-title">开始记录</h2>
      <span class="section-badge">${featureList.length} 个分类</span>
    </div>
    <div class="features-grid">
      ${featuresHtml}
    </div>
  </section>
  
  <!-- 快捷操作 -->
  <section class="actions-section">
    <div class="section-header">
      <span class="section-icon">⚡</span>
      <h2 class="section-title">快速操作</h2>
      <span class="section-badge">常用功能</span>
    </div>
    <div class="actions-grid">
      <a href="./accounting.html" class="action-btn action-btn-primary">
        <span class="action-icon">💰</span>
        <span class="action-text">快速记账</span>
      </a>
      <a href="./cate/food/" class="action-btn action-btn-secondary">
        <span class="action-icon">🍽️</span>
        <span class="action-text">记录美食</span>
      </a>
      <a href="./cate/diary/" class="action-btn action-btn-secondary">
        <span class="action-icon">📝</span>
        <span class="action-text">写日记</span>
      </a>
    </div>
  </section>
</div>

<!-- 粒子背景 -->
<div id="particles-container"></div>

<script>
  // 粒子效果 - 柔和版本
  (function() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    // 粒子数量适中
    const particleCount = 35;
    
    // 创建样式
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes particleFloat {
        0% {
          transform: translateY(100vh) translateX(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.6;
        }
        90% {
          opacity: 0.6;
        }
        100% {
          transform: translateY(-10vh) translateX(\${Math.random() * 100 - 50}px) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes particleTwinkle {
        0%, 100% {
          opacity: 0.3;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.3);
        }
      }
    \`;
    document.head.appendChild(style);
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1.5;
      const isRound = Math.random() > 0.3;
      
      // 随机颜色（柔和的紫色和粉色系）
      const colors = [
        'rgba(139, 92, 246, 0.6)',  // 紫色
        'rgba(236, 72, 153, 0.5)',  // 粉色
        'rgba(96, 165, 250, 0.4)',  // 蓝色
        'rgba(167, 139, 250, 0.5)', // 浅紫
        'rgba(244, 114, 182, 0.4)'  // 浅粉
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.cssText = \`
        position: absolute;
        width: \${size}px;
        height: \${size}px;
        background: \${color};
        border-radius: \${isRound ? '50%' : '2px'};
        left: \${Math.random() * 100}%;
        top: \${Math.random() * 100}%;
        opacity: 0;
        animation: 
          particleFloat \${Math.random() * 15 + 20}s linear infinite,
          particleTwinkle \${Math.random() * 3 + 2}s ease-in-out infinite;
        animation-delay: \${Math.random() * 20}s, \${Math.random() * 3}s;
        pointer-events: none;
        box-shadow: 0 0 \${size * 2}px \${color};
      \`;
      
      container.appendChild(particle);
    }
  })();
  
  // 数字增长动画
  function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number[data-count]');
    numbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-count'));
      const duration = 2000;
      const startTime = performance.now();
      const label = num.nextElementSibling?.textContent || '';
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);
        
        if (label.includes('满意度')) {
          num.textContent = current + '%';
        } else {
          num.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      
      requestAnimationFrame(update);
    });
  }
  
  // 滚动触发动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
</script>
`;

  // 使用共享模板生成页面
  return generatePage({
    title: siteName,
    content,
    nav: false,
    footer: true,
    currentPage: '/',
    extraCss: homepageStyles
  });
}

module.exports = {
  generateHomepage
};
