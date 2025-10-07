/**
 * 通用响应式功能脚本
 * 处理返回顶部按钮、移动端菜单等响应式交互功能
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化返回顶部按钮功能
    initBackToTop();
    
    // 初始化移动端菜单功能（如果页面包含菜单）
    initMobileMenu();
    
    // 初始化下拉菜单功能
    initDropdownMenus();
});

/**
 * 初始化返回顶部按钮功能
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // 监听滚动事件，控制按钮显示/隐藏
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // 点击按钮平滑滚动到顶部
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 初始化移动端菜单功能
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击菜单项后关闭菜单（移动端）
        const menuItems = navMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // 窗口大小改变时检查菜单状态
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * 初始化下拉菜单功能
 */
function initDropdownMenus() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            dropdown.classList.toggle('active');
            
            // 关闭其他下拉菜单
            document.querySelectorAll('.dropdown').forEach(drop => {
                if (drop !== dropdown) {
                    drop.classList.remove('active');
                }
            });
        });
    });
    
    // 点击其他区域关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(drop => {
                drop.classList.remove('active');
            });
        }
    });
}

/**
 * 添加动画效果到页面元素
 * 在元素进入视口时触发
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * 平滑滚动到锚点
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 处理表单提交
 */
function handleFormSubmission(formId, successMessage) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 这里可以添加表单验证逻辑
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                // 可以添加错误提示
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // 模拟表单提交
            setTimeout(() => {
                alert(successMessage || '提交成功！');
                form.reset();
            }, 500);
        }
    });
}

/**
 * 调整图片大小以适应容器
 */
function adjustImages() {
    const images = document.querySelectorAll('img.img-fluid');
    
    images.forEach(img => {
        if (img.complete) {
            adjustImageSize(img);
        } else {
            img.addEventListener('load', function() {
                adjustImageSize(this);
            });
        }
    });
}

function adjustImageSize(img) {
    const parent = img.parentElement;
    const maxWidth = parent.clientWidth;
    const maxHeight = parent.clientHeight;
    
    if (img.naturalWidth > maxWidth || img.naturalHeight > maxHeight) {
        const ratio = Math.min(maxWidth / img.naturalWidth, maxHeight / img.naturalHeight);
        img.style.maxWidth = `${ratio * img.naturalWidth}px`;
        img.style.maxHeight = `${ratio * img.naturalHeight}px`;
    }
}