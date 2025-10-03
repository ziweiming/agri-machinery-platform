// 全局工具函数 - 权限管理模块

/**
 * 检查用户登录状态 - 开发阶段临时解除权限限制
 * 生产环境中可替换为真实的登录状态检查逻辑
 * @returns {Object} 包含登录状态信息的对象
 */
function checkLoginStatus() {
    // 开发阶段总是返回已登录状态，方便测试
    // 生产环境中可以修改为真实的登录状态检查逻辑
    // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // return { isLoggedIn };
    return { isLoggedIn: true };
}

/**
 * 检查用户权限
 * 目前所有用户拥有相同权限，后续可扩展为基于角色的权限管理
 * @param {string} permission - 要检查的权限名称
 * @returns {boolean} 总是返回true，表示用户拥有所有权限
 */
function checkPermission(permission) {
    // 简单实现，返回true表示所有权限都开放
    return true;
}

/**
 * 验证用户是否可以访问某个功能
 * @param {string} featureName - 功能名称
 * @returns {boolean} 总是返回true，表示所有功能均可访问
 */
function canAccessFeature(featureName) {
    // 功能访问检查，目前所有功能都可访问
    return true;
}

/**
 * 通用的权限检查和重定向
 * @param {Function} callback - 通过权限检查后要执行的回调函数
 * @returns {boolean} 权限检查结果
 */
function checkAccessAndRedirect(callback) {
    if (checkLoginStatus()) {
        if (typeof callback === 'function') {
            callback();
        }
        return true;
    } else {
        alert('请先登录后再继续操作');
        window.location.href = 'pages/login.html';
        return false;
    }
}

/**
 * 语言切换功能
 * 预留的国际化功能接口
 */
function toggleLanguageMenu() {
    alert('语言切换功能将在后续版本中完善');
}

// 导出函数以便模块化使用
if (typeof module !== 'undefined' && module.exports) {
    // Node.js环境
    module.exports = {
        checkLoginStatus,
        checkPermission,
        canAccessFeature,
        checkAccessAndRedirect,
        toggleLanguageMenu
    };
} else {
    // 浏览器环境 - 将函数挂载到window对象
    window.checkLoginStatus = checkLoginStatus;
    window.checkPermission = checkPermission;
    window.canAccessFeature = canAccessFeature;
    window.checkAccessAndRedirect = checkAccessAndRedirect;
    window.toggleLanguageMenu = toggleLanguageMenu;
}