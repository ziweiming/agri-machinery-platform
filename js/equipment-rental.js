/**
 * 设备租赁相关的JavaScript功能
 */

// 设备租赁数据（模拟数据）
const equipmentData = [
    {
        id: 1,
        name: "约翰迪尔 8R 系列拖拉机",
        type: "tractor",
        brand: "john-deere",
        price: 4500,
        description: "高性能拖拉机，适用于各种耕作场景，动力强劲，操作舒适。",
        image: "../images/equipment/tractor1.jpg",
        specs: "发动机功率：220-300马力，四驱，液压悬挂系统"
    },
    {
        id: 2,
        name: "纽荷兰 CR10.90 联合收割机",
        type: "harvester",
        brand: "new-holland",
        price: 5800,
        description: "高效联合收割机，配备先进的切割和脱粒系统，适用于小麦、玉米等多种作物收获。",
        image: "../images/equipment/harvester1.jpg",
        specs: "切割宽度：12米，喂入量：10公斤/秒，脱粒滚筒直径：610mm"
    },
    {
        id: 3,
        name: "凯斯 Puma 220 拖拉机",
        type: "tractor",
        brand: "case",
        price: 4200,
        description: "中型拖拉机，兼顾动力和经济性，适用于中等规模农场的各种作业。",
        image: "../images/equipment/tractor2.jpg",
        specs: "发动机功率：220马力，液压系统流量：160升/分钟，轴距：3.05米"
    },
    {
        id: 4,
        name: "久保田 M954K 拖拉机",
        type: "tractor",
        brand: "kubota",
        price: 2800,
        description: "紧凑型拖拉机，适合小面积农田作业，转弯半径小，操作灵活。",
        image: "../images/equipment/tractor3.jpg",
        specs: "发动机功率：95马力，四驱，液压输出：2组"
    },
    {
        id: 5,
        name: "约翰迪尔 S780 联合收割机",
        type: "harvester",
        brand: "john-deere",
        price: 6200,
        description: "高端联合收割机，配备智能收获系统，自动化程度高，收获效率提升30%。",
        image: "../images/equipment/harvester2.jpg",
        specs: "切割宽度：13.7米，粮箱容量：16.2立方米，发动机功率：460马力"
    },
    {
        id: 6,
        name: "纽荷兰 2100 播种机",
        type: "seeder",
        brand: "new-holland",
        price: 1800,
        description: "精密播种机，支持多种作物播种，行距和株距可精确调整，提高种子利用率。",
        image: "../images/equipment/seeder1.jpg",
        specs: "行数：24行，行距：15-75厘米可调，播种深度：1-10厘米可调"
    }
];

/**
 * 初始化设备租赁页面
 */
function initEquipmentRental() {
    // 初始化筛选功能
    initEquipmentFilters();
    
    // 渲染设备列表
    renderEquipmentList(equipmentData);
}

/**
 * 初始化设备筛选功能
 */
function initEquipmentFilters() {
    const filterBtn = document.querySelector('.equipment-list .filter-btn');
    const resetBtn = document.querySelector('.equipment-list .reset-btn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', applyEquipmentFilters);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetEquipmentFilters);
    }
}

/**
 * 应用设备筛选条件
 */
function applyEquipmentFilters() {
    const typeFilter = document.getElementById('equipment-type').value;
    const brandFilter = document.getElementById('equipment-brand').value;
    const priceFilter = document.getElementById('equipment-price').value;
    
    // 根据筛选条件过滤数据
    const filteredData = equipmentData.filter(equipment => {
        // 类型筛选
        if (typeFilter !== 'all' && equipment.type !== typeFilter) {
            return false;
        }
        
        // 品牌筛选
        if (brandFilter !== 'all' && equipment.brand !== brandFilter) {
            return false;
        }
        
        // 价格筛选
        if (priceFilter !== 'all') {
            const [min, max] = priceFilter.split('-');
            if (max) {
                if (equipment.price < parseInt(min) || equipment.price > parseInt(max)) {
                    return false;
                }
            } else {
                if (equipment.price < parseInt(min.slice(0, -1))) {
                    return false;
                }
            }
        }
        
        return true;
    });
    
    // 渲染筛选后的列表
    renderEquipmentList(filteredData);
}

/**
 * 重置设备筛选条件
 */
function resetEquipmentFilters() {
    document.getElementById('equipment-type').value = 'all';
    document.getElementById('equipment-brand').value = 'all';
    document.getElementById('equipment-price').value = 'all';
    
    // 渲染完整列表
    renderEquipmentList(equipmentData);
}

/**
 * 渲染设备列表
 * @param {Array} equipmentList - 设备列表数据
 */
function renderEquipmentList(equipmentList) {
    const equipmentGrid = document.querySelector('.equipment-grid');
    
    if (!equipmentGrid) {
        return;
    }
    
    // 清空现有内容
    equipmentGrid.innerHTML = '';
    
    if (equipmentList.length === 0) {
        // 显示无数据提示
        equipmentGrid.innerHTML = `
            <div class="no-data">
                <i class="fas fa-search"></i>
                <p>没有找到符合条件的设备</p>
                <p>请尝试调整筛选条件</p>
            </div>
        `;
        return;
    }
    
    // 渲染设备卡片
    equipmentList.forEach(equipment => {
        const equipmentCard = document.createElement('div');
        equipmentCard.className = 'equipment-card';
        
        // 构建设备卡片HTML
        let cardHtml = '';
        cardHtml += '<div class="equipment-image">';
        // 使用Font Awesome图标代替图片，避免依赖外部图片文件
        let iconClass = 'fa-tractor'; // 默认使用拖拉机图标
        if (equipment.type === 'harvester') iconClass = 'fa-wheat-awn';
        if (equipment.type === 'seeder') iconClass = 'fa-seedling';
        if (equipment.type === 'plow') iconClass = 'fa-plow';
        cardHtml += '<div class="equipment-icon">';
        cardHtml += '<i class="fas ' + iconClass + ' fa-5x"></i>';
        cardHtml += '</div>';
        cardHtml += '</div>';
        cardHtml += '<div class="equipment-info">';
        cardHtml += '<h3 class="equipment-name">' + equipment.name + '</h3>';
        cardHtml += '<p class="equipment-description">' + equipment.description + '</p>';
        cardHtml += '<p class="equipment-specs"><strong>规格：</strong>' + equipment.specs + '</p>';
        cardHtml += '<div class="equipment-price">¥' + equipment.price + '/天</div>';
        cardHtml += '<a href="equipment-detail.html?id=' + equipment.id + '" class="btn rent-btn">查看详情</a>';
        cardHtml += '</div>';
        
        equipmentCard.innerHTML = cardHtml;
        equipmentGrid.appendChild(equipmentCard);
    });
}