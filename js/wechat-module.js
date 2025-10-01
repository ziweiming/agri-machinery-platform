// 微信聊天模块 - 完全内联版本
// 避免外部HTML文件依赖，解决路径问题

// 定义全局微信模块对象
window.WechatModule = {
    version: '1.0.0',
    isInitialized: false,
    createModule: createWechatModule
};

document.addEventListener('DOMContentLoaded', function() {
    // 直接创建微信模块HTML结构，不依赖外部文件
    createWechatModule();
});

// 创建微信聊天模块
function createWechatModule() {
    console.log('创建微信聊天模块');
    
    // 创建微信模块容器
    const wechatModule = document.createElement('div');
    wechatModule.className = 'wechat-module';
    
    // 设置基础样式
    wechatModule.style.position = 'fixed';
    wechatModule.style.bottom = '20px';
    wechatModule.style.right = '20px';
    wechatModule.style.zIndex = '1000';
    
    // 创建微信图标
    const wechatIcon = document.createElement('div');
    wechatIcon.className = 'wechat-icon';
    wechatIcon.innerHTML = '<i class="fab fa-weixin" style="font-size: 32px; color: #2DC100;"></i>';
    
    // 设置图标样式
    wechatIcon.style.width = '60px';
    wechatIcon.style.height = '60px';
    wechatIcon.style.borderRadius = '50%';
    wechatIcon.style.background = 'white';
    wechatIcon.style.display = 'flex';
    wechatIcon.style.alignItems = 'center';
    wechatIcon.style.justifyContent = 'center';
    wechatIcon.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    wechatIcon.style.cursor = 'pointer';
    wechatIcon.style.transition = 'all 0.3s ease';
    
    // 创建下拉菜单
    const wechatDropdown = document.createElement('div');
    wechatDropdown.className = 'wechat-dropdown';
    wechatDropdown.style.position = 'absolute';
    wechatDropdown.style.bottom = '70px';
    wechatDropdown.style.right = '0';
    wechatDropdown.style.background = 'white';
    wechatDropdown.style.borderRadius = '8px';
    wechatDropdown.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    wechatDropdown.style.padding = '10px 0';
    wechatDropdown.style.minWidth = '160px';
    wechatDropdown.style.display = 'none';
    
    // 创建下拉菜单项
    const menuItems = [
        {
            icon: 'fas fa-download',
            text: 'APP下载',
            hasQRCode: true
        },
        {
            icon: 'fab fa-weixin',
            text: '公众号',
            hasQRCode: true
        },
        {
            icon: 'fas fa-mobile-alt',
            text: '小程序',
            hasQRCode: true
        },
        {
            icon: 'fas fa-headset',
            text: '在线客服',
            hasQRCode: false
        }
    ];
    
    // 添加菜单项到下拉菜单
    menuItems.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'wechat-item';
        menuItem.style.display = 'flex';
        menuItem.style.alignItems = 'center';
        menuItem.style.padding = '10px 20px';
        menuItem.style.cursor = 'pointer';
        menuItem.style.transition = 'background-color 0.2s ease';
        
        // 添加悬停效果
        menuItem.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f5f5f5';
        });
        
        menuItem.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        // 添加图标和文本
        menuItem.innerHTML = `
            <i class="${item.icon}" style="margin-right: 10px; color: #333;"></i>
            <span>${item.text}</span>
        `;
        
        // 如果需要二维码，添加二维码弹出层
        if (item.hasQRCode) {
            const qrcodePopup = document.createElement('div');
            qrcodePopup.className = 'qrcode-popup';
            qrcodePopup.style.position = 'absolute';
            qrcodePopup.style.top = '0';
            qrcodePopup.style.right = '100%';
            qrcodePopup.style.marginRight = '10px';
            qrcodePopup.style.background = 'white';
            qrcodePopup.style.borderRadius = '8px';
            qrcodePopup.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
            qrcodePopup.style.padding = '15px';
            qrcodePopup.style.display = 'none';
            
            // 创建二维码容器
            const qrcodeContainer = document.createElement('div');
            qrcodeContainer.className = 'qrcode-container';
            
            // 创建二维码图片
            const qrcodeImage = document.createElement('div');
            qrcodeImage.className = 'qrcode-image';
            
            // 使用logo.png作为占位图
            qrcodeImage.innerHTML = `
                <img src="/images/logo.png" alt="${item.text}" style="width: 120px; height: 120px;">
                <p style="text-align: center; margin-top: 8px; font-size: 12px; color: #666;">${item.text}</p>
            `;
            
            qrcodeContainer.appendChild(qrcodeImage);
            qrcodePopup.appendChild(qrcodeContainer);
            menuItem.appendChild(qrcodePopup);
            
            // 添加显示/隐藏二维码的事件
            menuItem.addEventListener('mouseenter', function() {
                qrcodePopup.style.display = 'block';
            });
            
            menuItem.addEventListener('mouseleave', function() {
                qrcodePopup.style.display = 'none';
            });
        }
        
        // 为在线客服项添加点击事件
        if (index === 3) { // 在线客服项
            menuItem.addEventListener('click', function() {
                alert('正在连接在线客服...');
            });
        }
        
        wechatDropdown.appendChild(menuItem);
    });
    
    // 将图标和下拉菜单添加到模块容器
    wechatModule.appendChild(wechatIcon);
    wechatModule.appendChild(wechatDropdown);
    
    // 将模块添加到body
    document.body.appendChild(wechatModule);
    
    // 添加交互效果
    initWechatModuleInteractions(wechatIcon, wechatDropdown);
    
    // 添加拖动功能
    initWechatModuleDrag(wechatModule, wechatIcon, wechatDropdown);
    
        // 标记模块已初始化
    window.WechatModule.isInitialized = true;
    console.log('微信聊天模块创建完成');
}

// 初始化微信聊天模块的交互效果
function initWechatModuleInteractions(wechatIcon, wechatDropdown) {
    let hideTimeout;
    
    // 当鼠标离开下拉菜单时，延迟隐藏下拉菜单
    wechatDropdown.addEventListener('mouseleave', function() {
        hideTimeout = setTimeout(function() {
            wechatDropdown.style.display = 'none';
        }, 300);
    });
    
    // 当鼠标进入下拉菜单时，清除隐藏定时器
    wechatDropdown.addEventListener('mouseenter', function() {
        clearTimeout(hideTimeout);
    });
    
    // 当鼠标进入图标时，显示下拉菜单
    wechatIcon.addEventListener('mouseenter', function() {
        clearTimeout(hideTimeout);
        wechatDropdown.style.display = 'block';
    });
    
    // 当鼠标离开图标时，延迟隐藏下拉菜单
    wechatIcon.addEventListener('mouseleave', function() {
        hideTimeout = setTimeout(function() {
            wechatDropdown.style.display = 'none';
        }, 300);
    });
}

// 初始化微信聊天模块的拖动功能
function initWechatModuleDrag(wechatModule, wechatIcon, wechatDropdown) {
    let isDragging = false;
    let offsetX, offsetY;
    
    // 鼠标按下开始拖动
    wechatIcon.addEventListener('mousedown', function(e) {
        isDragging = true;
        
        // 隐藏下拉菜单
        if (wechatDropdown) {
            wechatDropdown.style.display = 'none';
        }
        
        // 计算鼠标相对于元素的偏移量
        const rect = wechatModule.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        // 添加拖动时的样式
        wechatIcon.style.transform = 'scale(1.1)';
        wechatIcon.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
        
        // 防止文本选择
        document.body.style.userSelect = 'none';
        
        // 阻止默认行为
        e.preventDefault();
    });
    
    // 鼠标移动更新位置
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        // 计算新位置
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;
        
        // 限制在可视区域内
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const moduleWidth = wechatModule.offsetWidth;
        const moduleHeight = wechatModule.offsetHeight;
        
        newLeft = Math.max(0, Math.min(newLeft, windowWidth - moduleWidth));
        newTop = Math.max(0, Math.min(newTop, windowHeight - moduleHeight));
        
        // 更新位置
        wechatModule.style.left = newLeft + 'px';
        wechatModule.style.top = newTop + 'px';
        wechatModule.style.right = 'auto';
        wechatModule.style.bottom = 'auto';
        
        // 阻止默认行为
        e.preventDefault();
    });
    
    // 鼠标释放结束拖动
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            
            // 恢复样式
            wechatIcon.style.transform = '';
            wechatIcon.style.boxShadow = '';
            
            // 恢复文本选择
            document.body.style.userSelect = '';
        }
    });
    
    // 鼠标离开浏览器窗口结束拖动
    document.addEventListener('mouseleave', function() {
        if (isDragging) {
            isDragging = false;
            
            // 恢复样式
            wechatIcon.style.transform = '';
            wechatIcon.style.boxShadow = '';
            
            // 恢复文本选择
            document.body.style.userSelect = '';
        }
    });
}

// 确保当页面上的main.js加载完成后，重新初始化回到顶部功能
if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
    if (typeof initBackToTop === 'function') {
        initBackToTop();
    }
} else {
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof initBackToTop === 'function') {
            initBackToTop();
        }
    });
}