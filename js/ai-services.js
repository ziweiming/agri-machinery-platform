/**
 * AI服务相关的JavaScript功能
 * 包含AI智能选型助手的完整实现
 */

// 确保DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // AI智能选型助手功能初始化
    initAISelectionAssistant();
});

/**
 * 初始化AI智能选型助手功能
 */
function initAISelectionAssistant() {
    const selectionForm = document.getElementById('selection-form');
    const loadingContainer = document.getElementById('loading-container');
    const selectionResults = document.getElementById('selection-results');
    const resultsGrid = document.getElementById('results-grid');
    
    // 检查元素是否存在
    if (!selectionForm || !loadingContainer || !selectionResults || !resultsGrid) {
        console.warn('AI智能选型助手的必要元素未找到');
        return;
    }
    
    // 模拟农机数据 - 优化版本包含更多属性
    const mockMachineryData = [
        {
            id: 1,
            name: '东方红LX904拖拉机',
            image: 'https://via.placeholder.com/400x300?text=东方红LX904拖拉机',
            matchScore: 95,
            category: '拖拉机',
            suitableCrops: ['小麦', '玉米', '大豆'],
            suitableRegions: ['东北', '华北', '西北'],
            landAreaRange: '100-500亩',
            power: '90马力',
            fuelConsumption: '低油耗',
            userRating: '4.8分',
            price: '18-22万',
            keyFeatures: ['动力强劲', '油耗低', '可靠性高', '操作舒适'],
            detailedReasons: [
                '动力输出为90马力，完全满足100-500亩小麦和玉米种植需求',
                '采用德国技术发动机，燃油经济性比同类产品提高15%',
                '东北地区用户满意度达95%，特别适合该区域的土壤和气候条件',
                '液压系统稳定可靠，维护成本低，使用寿命长'
            ]
        },
        {
            id: 2,
            name: '久保田PRO888Q收割机',
            image: 'https://via.placeholder.com/400x300?text=久保田PRO888Q收割机',
            matchScore: 92,
            category: '收割机',
            suitableCrops: ['水稻', '小麦'],
            suitableRegions: ['华东', '华南', '西南'],
            landAreaRange: '50-300亩',
            efficiency: '15-20亩/小时',
            lossRate: '≤2%',
            userRating: '4.7分',
            price: '25-30万',
            keyFeatures: ['收割效率高', '损失率低', '操作简单', '维护方便'],
            detailedReasons: [
                '特别适合水稻和小麦收割，收割效率高达15-20亩/小时',
                '损失率控制在2%以内，比行业平均水平低30%',
                '华东地区用户首选，已累计销售超过10万台',
                '智能监控系统可实时监测机器状态，减少故障发生'
            ]
        },
        {
            id: 3,
            name: '约翰迪尔S660联合收割机',
            image: 'https://via.placeholder.com/400x300?text=约翰迪尔S660联合收割机',
            matchScore: 88,
            category: '联合收割机',
            suitableCrops: ['小麦', '玉米', '大豆', '水稻'],
            suitableRegions: ['全国'],
            landAreaRange: '300亩以上',
            capacity: '大型',
            automationLevel: '高度智能化',
            userRating: '4.9分',
            price: '80-100万',
            keyFeatures: ['智能化程度高', '作业范围广', '性能稳定', '售后完善'],
            detailedReasons: [
                '可收获多种作物，真正实现一机多用，适合大规模农场',
                '搭载智能导航系统，可减少20%的人工成本',
                '全液压驱动系统，操作精度高，作业质量稳定',
                '全国服务网络完善，4小时内响应维修需求'
            ]
        },
        {
            id: 4,
            name: '雷沃谷神GE80S-H收割机',
            image: 'https://via.placeholder.com/400x300?text=雷沃谷神GE80S-H收割机',
            matchScore: 85,
            category: '收割机',
            suitableCrops: ['小麦', '玉米'],
            suitableRegions: ['华北', '西北', '华东'],
            landAreaRange: '30-200亩',
            price: '15-18万',
            keyFeatures: ['性价比高', '适应性强', '操作便捷', '维修成本低'],
            detailedReasons: [
                '价格适中，性价比突出，特别适合中小规模农场',
                '适应性强，可在不同地形条件下稳定作业',
                '操作界面简洁明了，新手也能快速掌握',
                '配件通用性高，维修成本比同类产品低25%'
            ]
        },
        {
            id: 5,
            name: '洋马VP6水稻插秧机',
            image: 'https://via.placeholder.com/400x300?text=洋马VP6水稻插秧机',
            matchScore: 90,
            category: '插秧机',
            suitableCrops: ['水稻'],
            suitableRegions: ['华东', '华南', '西南'],
            landAreaRange: '20-150亩',
            plantingEfficiency: '8-10亩/小时',
            price: '8-12万',
            keyFeatures: ['高速插秧', '种植均匀', '节省秧苗', '水田通过性好'],
            detailedReasons: [
                '专门为水稻种植设计，插秧效率高达8-10亩/小时',
                '采用高速旋转插秧技术，秧苗成活率提高10%',
                '适合华东地区的水田环境，泥脚深度适应性强',
                '相比人工种植，可节省30%的秧苗用量'
            ]
        },
        {
            id: 6,
            name: '大疆T40植保无人机',
            image: 'https://via.placeholder.com/400x300?text=大疆T40植保无人机',
            matchScore: 87,
            category: '植保机械',
            suitableCrops: ['水稻', '小麦', '玉米', '果树', '蔬菜'],
            suitableRegions: ['全国'],
            landAreaRange: '不限',
            sprayingEfficiency: '200亩/小时',
            price: '5-8万',
            keyFeatures: ['高效喷洒', '精准控制', '智能避障', '省药节水'],
            detailedReasons: [
                '喷洒效率高达200亩/小时，是传统喷雾器的30倍',
                '搭载智能图像识别系统，可精准控制喷洒量',
                '相比传统方式，可节省30%农药和50%水资源',
                '适合各种作物和地形，特别适合丘陵地区作业'
            ]
        }
    ];
    
    // 表单提交处理
    selectionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const cropType = document.getElementById('crop-type').value;
        const landArea = document.getElementById('land-area').value;
        const budget = document.getElementById('budget').value;
        const region = document.getElementById('region').value;
        const machineType = document.getElementById('machine-type') ? document.getElementById('machine-type').value : 'all'; // 设备类型，如果没有则默认为全部
        
        // 表单验证
        if (!cropType || !landArea || !budget || !region) {
            alert('请填写所有选型信息');
            return;
        }
        
        // 显示加载动画
        selectionForm.closest('.selection-form-container').style.display = 'none';
        loadingContainer.style.display = 'block';
        
        // 模拟AI分析过程（3秒后显示结果）
        setTimeout(function() {
            // 隐藏加载动画
            loadingContainer.style.display = 'none';
            
            // 根据表单数据筛选推荐设备
            let recommendedMachines = filterMachineryByFormData(mockMachineryData, {
                cropType, 
                landArea, 
                budget, 
                region,
                machineType
            });
            
            // 清空结果网格
            resultsGrid.innerHTML = '';
            
            // 生成推荐结果卡片
            recommendedMachines.forEach(machine => {
                const resultCard = createResultCard(machine);
                resultsGrid.appendChild(resultCard);
            });
            
            // 显示结果
            selectionResults.style.display = 'block';
            
            // 添加结果卡片的渐入动画
            animateResultCards();
        }, 3000);
    });
    
    // 重新选型按钮事件
    document.getElementById('reset-selection').addEventListener('click', function() {
        // 显示表单，隐藏结果
        selectionForm.closest('.selection-form-container').style.display = 'block';
        selectionResults.style.display = 'none';
        
        // 重置表单
        selectionForm.reset();
    });
}

/**
 * 根据表单数据筛选农机设备
 * @param {Array} machineryData - 农机数据数组
 * @param {Object} formData - 表单数据对象
 * @returns {Array} 筛选并排序后的农机数据
 */
function filterMachineryByFormData(machineryData, formData) {
    let filtered = [...machineryData];
    
    // 1. 根据设备类型筛选
    if (formData.machineType && formData.machineType !== 'all') {
        filtered = filtered.filter(machine => machine.category === formData.machineType);
    }
    
    // 2. 根据作物类型筛选
    if (formData.cropType && formData.cropType !== '其他') {
        filtered = filtered.filter(machine => 
            machine.suitableCrops && machine.suitableCrops.includes(formData.cropType)
        );
    }
    
    // 3. 根据预算范围筛选
    if (formData.budget) {
        filtered = filtered.filter(machine => {
            const priceRange = machine.price.split('-');
            const minPrice = parseInt(priceRange[0]);
            const maxPrice = priceRange.length > 1 ? parseInt(priceRange[1]) : minPrice;
            
            switch(formData.budget) {
                case '0-5':
                    return minPrice < 5;
                case '5-10':
                    return minPrice >= 5 && maxPrice < 10;
                case '10-20':
                    return minPrice >= 10 && maxPrice < 20;
                case '20-50':
                    return minPrice >= 20 && maxPrice < 50;
                case '50-100':
                    return minPrice >= 50 && maxPrice < 100;
                case '100+':
                    return minPrice >= 100;
                default:
                    return true;
            }
        });
    }
    
    // 4. 根据所在地区筛选
    if (formData.region && formData.region !== '其他') {
        filtered = filtered.filter(machine => 
            machine.suitableRegions && 
            (machine.suitableRegions.includes(formData.region) || machine.suitableRegions.includes('全国'))
        );
    }
    
    // 5. 根据土地面积筛选
    if (formData.landArea) {
        const landArea = parseInt(formData.landArea);
        filtered = filtered.filter(machine => {
            // 检查土地面积范围
            if (machine.landAreaRange === '不限') {
                return true;
            }
            
            const areaRange = machine.landAreaRange.split('-');
            const minArea = parseInt(areaRange[0]);
            
            // 处理不同的面积范围格式
            if (areaRange.length === 1) {
                return landArea >= minArea;
            } else {
                const maxArea = parseInt(areaRange[1].replace('亩', ''));
                return landArea >= minArea && landArea <= maxArea;
            }
        });
    }
    
    // 6. 计算并调整匹配度得分
    filtered = filtered.map(machine => {
        let score = machine.matchScore;
        
        // 根据多种因素调整匹配度
        if (formData.cropType && machine.suitableCrops && machine.suitableCrops.includes(formData.cropType)) {
            score += 3;
        }
        
        if (formData.region && machine.suitableRegions && 
            (machine.suitableRegions.includes(formData.region) || machine.suitableRegions.includes('全国'))) {
            score += 2;
        }
        
        // 限制最高分为100
        machine.adjustedMatchScore = Math.min(100, score);
        return machine;
    });
    
    // 7. 按调整后的匹配度排序
    filtered.sort((a, b) => b.adjustedMatchScore - a.adjustedMatchScore);
    
    return filtered;
}

/**
 * 创建农机推荐结果卡片
 * @param {Object} machine - 农机数据
 * @returns {HTMLElement} DOM元素
 */
function createResultCard(machine) {
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';
    resultCard.style.cssText = `
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    `;
    
    // 添加悬停效果
    resultCard.addEventListener('mouseenter', function() {
        resultCard.style.transform = 'translateY(-5px)';
        resultCard.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
        // 图片放大效果
        const img = resultCard.querySelector('img');
        img.style.transform = 'scale(1.05)';
    });
    
    resultCard.addEventListener('mouseleave', function() {
        resultCard.style.transform = 'translateY(0)';
        resultCard.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        // 图片恢复原状
        const img = resultCard.querySelector('img');
        img.style.transform = 'scale(1)';
    });
    
    // 构建详细的卡片内容
    resultCard.innerHTML = `
        <div class="result-image" style="height: 200px; overflow: hidden;">
            <img src="${machine.image}" alt="${machine.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
        </div>
        <div class="result-content" style="padding: 1.5rem;">
            <div class="result-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 class="result-title" style="font-size: 1.2rem; color: #2E7D32; margin: 0;">${machine.name}</h4>
                <div class="match-score" style="background: #4CAF50; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: bold;">
                    匹配度: ${machine.adjustedMatchScore || machine.matchScore}%
                </div>
            </div>
            
            <!-- 基本信息标签 -->
            <div class="machine-tags" style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <span class="tag" style="background: #E8F5E9; color: #2E7D32; padding: 0.2rem 0.6rem; border-radius: 15px; font-size: 0.85rem;">${machine.category}</span>
                ${machine.power ? `<span class="tag" style="background: #E3F2FD; color: #1565C0; padding: 0.2rem 0.6rem; border-radius: 15px; font-size: 0.85rem;">${machine.power}</span>` : ''}
                <span class="tag" style="background: #FFF3E0; color: #E65100; padding: 0.2rem 0.6rem; border-radius: 15px; font-size: 0.85rem;">适合: ${machine.landAreaRange}</span>
                ${machine.userRating ? `<span class="tag" style="background: #F3E5F5; color: #7B1FA2; padding: 0.2rem 0.6rem; border-radius: 15px; font-size: 0.85rem;">${machine.userRating}</span>` : ''}
            </div>
            
            <p class="result-price" style="color: #FF5722; font-size: 1rem; margin-bottom: 1rem;">价格区间: ${machine.price}</p>
            
            <!-- 详细推荐理由 -->
            <div class="detailed-reasons" style="margin-bottom: 1.5rem;">
                <h5 style="color: #424242; margin-bottom: 0.5rem; font-size: 1rem;">推荐理由:</h5>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${machine.detailedReasons.map(reason => `
                        <li style="color: #666; line-height: 1.6; padding: 0.3rem 0; display: flex; align-items: flex-start;">
                            <span style="color: #4CAF50; margin-right: 0.5rem;">•</span>
                            <span>${reason}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- 关键特性 -->
            <div class="key-features" style="margin-bottom: 1.5rem;">
                <h5 style="color: #424242; margin-bottom: 0.5rem; font-size: 1rem;">关键特性:</h5>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${machine.keyFeatures.map(feature => `
                        <span class="feature-badge" style="background: #FAFAFA; border: 1px solid #E0E0E0; padding: 0.2rem 0.8rem; border-radius: 15px; font-size: 0.85rem; color: #666;">
                            ${feature}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <button class="view-details-btn btn" style="background: #2E7D32; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 5px; cursor: pointer; transition: background 0.3s ease;">
                查看详情
            </button>
        </div>
    `;
    
    // 为"查看详情"按钮添加点击事件
    const viewDetailsBtn = resultCard.querySelector('.view-details-btn');
    viewDetailsBtn.addEventListener('click', function() {
        // 在实际应用中，这里应该跳转到设备详情页面
        alert(`您点击了查看${machine.name}的详情`);
    });
    
    return resultCard;
}

/**
 * 为结果卡片添加动画效果
 */
function animateResultCards() {
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

/**
 * 为AI视觉评估系统添加交互效果
 */
function initAIVisualAssessment() {
    const useNowButtons = document.querySelectorAll('.feature-card button');
    
    useNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const featureTitle = this.closest('.feature-card').querySelector('.feature-title').textContent;
            alert(`即将打开${featureTitle}功能`);
            // 在实际应用中，这里应该跳转到相应的功能页面
        });
    });
}

// 如果页面包含AI视觉评估系统，则初始化相关功能
if (document.querySelector('.ai-visual-assessment-section')) {
    document.addEventListener('DOMContentLoaded', initAIVisualAssessment);
}