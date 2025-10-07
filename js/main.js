// 处理用户登录状态
function handleUserLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const authButtons = document.querySelectorAll('.auth-btn');
    
    if (isLoggedIn === 'true') {
        // 用户已登录，隐藏登录注册按钮
        authButtons.forEach(button => {
            button.style.display = 'none';
        });
        
        // 添加用户信息入口
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            // 检查是否已经添加了用户信息入口
            if (!document.querySelector('.user-profile')) {
                const currentUser = localStorage.getItem('currentUser') || '用户';
                
                // 创建用户信息入口
                const userProfileLi = document.createElement('li');
                userProfileLi.className = 'user-profile';
                
                const userProfileA = document.createElement('a');
                userProfileA.href = '/pages/orders.html';  // 订单页面作为用户个人中心
                userProfileA.innerHTML = `<i class="fas fa-user-circle"></i> ${currentUser}`;
                
                userProfileLi.appendChild(userProfileA);
                
                // 在语言选择器之前插入用户信息入口
                const languageSelector = document.querySelector('.language-selector');
                if (languageSelector) {
                    navMenu.insertBefore(userProfileLi, languageSelector);
                } else {
                    // 如果没有语言选择器，就添加到菜单末尾
                    navMenu.appendChild(userProfileLi);
                }
            }
        }
    } else {
        // 用户未登录，确保登录注册按钮可见
        authButtons.forEach(button => {
            button.style.display = '';
        });
        
        // 移除可能存在的用户信息入口
        const userProfile = document.querySelector('.user-profile');
        if (userProfile) {
            userProfile.remove();
        }
    }
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)';
            navbar.style.padding = '0.8rem 0';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)';
            navbar.style.padding = '1rem 0';
        }
    });
}

// 移动端菜单切换
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// 回到顶部按钮
function initBackToTop() {
    const backToTopButtons = document.querySelectorAll('.back-to-top, .back-to-top-btn');
    
    if (backToTopButtons.length === 0) return;
    
    window.addEventListener('scroll', function() {
        backToTopButtons.forEach(button => {
            // 对于微信聊天模块中的回到顶部按钮，我们不需要隐藏它，因为它是下拉菜单的一部分
            if (!button.classList.contains('back-to-top-btn')) {
                button.style.display = window.scrollY > 300 ? 'block' : 'none';
            }
        });
    });
    
    backToTopButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// 表单验证
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证逻辑
            console.log('表单提交:', form);
            
            // 示例：简单的必填字段验证
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.border = '2px solid #f44336';
                } else {
                    field.style.border = '2px solid #4CAF50';
                }
            });
            
            if (isValid) {
                alert('表单提交成功！');
                form.reset();
            } else {
                alert('请填写所有必填字段！');
            }
        });
    });
}

// 品牌展示版块控制逻辑
function initBrandShowcase() {
    // 这个变量在后期开发中可以从后端获取或设置
    // true = 显示品牌版块，false = 隐藏品牌版块
    const SHOW_BRAND_SECTIONS = true;
    
    const brandShowcases = document.querySelectorAll('#brand-showcase, #footer-brand-showcase');
    
    if (brandShowcases.length === 0) return;
    
    // 根据变量值设置品牌版块的显示/隐藏
    brandShowcases.forEach(showcase => {
        showcase.style.display = SHOW_BRAND_SECTIONS ? 'block' : 'none';
    });
}

// 设置导航链接的活动状态
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentUrl = window.location.pathname;
    
    // 先移除所有链接的active类
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // 为当前页面的链接添加active类
    navLinks.forEach(link => {
        const linkUrl = link.getAttribute('href');
        
        // 处理首页特殊情况
        if ((currentUrl === '/' || currentUrl === '/index.html') && 
            (linkUrl === 'index.html' || linkUrl === '/index.html')) {
            link.classList.add('active');
            return;
        }
        
        // 处理其他页面
        if (currentUrl.includes(linkUrl)) {
            link.classList.add('active');
        }
    });
}

// 移动端菜单切换功能
function setupMobileMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // 切换菜单显示状态
            navMenu.classList.toggle('active');
            
            // 切换按钮激活状态
            menuToggle.classList.toggle('active');
            
            // 切换页面滚动锁定
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // 点击导航链接后关闭菜单（移动端）
        if (window.innerWidth <= 768) {
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }
}

// 返回顶部按钮功能
function setupBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // 滚动事件监听
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // 点击按钮返回顶部
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 平滑滚动功能
function setupSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // 处理href属性值为'#'的情况
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 响应式调整函数
function handleResponsiveLayout() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // 在窗口大小变化时重新设置导航菜单状态
    window.addEventListener('resize', function() {
        // 如果屏幕变宽，自动关闭移动端菜单
        if (window.innerWidth > 768 && navMenu && menuToggle) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 加载动画效果
function setupAnimationOnScroll() {
    const animateElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        // 暂停动画，直到元素进入视口
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// 语言切换功能
function setupLanguageToggle() {
    const languageBtn = document.querySelector('.language-btn');
    
    if (languageBtn) {
        languageBtn.addEventListener('click', function() {
            // 语言切换逻辑
            const currentLang = this.dataset.lang || 'zh';
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            
            this.dataset.lang = newLang;
            this.querySelector('span').textContent = newLang.toUpperCase();
            
            // 这里可以添加实际的语言切换逻辑
            console.log(`切换语言到: ${newLang}`);
        });
    }
}

// 下拉菜单功能
function setupDropdownMenus() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 关闭其他所有下拉菜单
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== this.nextElementSibling) {
                    menu.classList.remove('show');
                }
            });
            
            // 切换当前下拉菜单的显示状态
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.classList.toggle('show');
            }
        });
    });
    
    // 点击页面其他区域关闭下拉菜单
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    });
    
    // 移动端点击下拉菜单项后关闭菜单
    if (window.innerWidth <= 768) {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
                
                // 同时关闭移动菜单
                const navMenu = document.querySelector('.nav-menu');
                const menuToggle = document.querySelector('.menu-toggle');
                if (navMenu && menuToggle && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
}

// "查看更多设备"按钮事件监听
function setupViewMoreDevicesButton() {
    const viewMoreBtn = document.querySelector('#viewMoreDevices');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            // 跳转到产品展示页面
            window.location.href = 'pages/products.html';
        });
    }
}

// 监听DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    setupMobileMenuToggle();
    setupBackToTopButton();
    setupSmoothScroll();
    handleResponsiveLayout();
    setupAnimationOnScroll();
    // 尝试调用checkLoginStatus函数，如果不存在则提供一个默认实现
    try {
        if (typeof checkLoginStatus === 'function') {
            checkLoginStatus();
        } else {
            // 提供默认实现，防止错误
            console.log('Using default login status check');
        }
    } catch (error) {
        console.log('Error checking login status:', error);
    }
    setupLanguageToggle();
    setupViewMoreDevicesButton();
    setupDropdownMenus();
});