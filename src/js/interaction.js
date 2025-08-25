let grabbedObject = null;
import { initSpeechSynthesis } from './voice.js';
let voice = initSpeechSynthesis();

// 抓取时的偏移量（记录光标与物品抓取点的偏移）
let grabOffset = { x: 0, y: 0 };

// 更新交互
function updateInteraction(hand, canvas, currentGesture, handPosition) {
    // 将手部位置映射到交互区域
    const interactionArea = document.querySelector('.interaction-area');
    const rect = interactionArea.getBoundingClientRect();

    // 计算映射后的位置 1:1映射
    const mappedX = (handPosition.x / canvas.width) * rect.width;
    const mappedY = (handPosition.y / canvas.height) * rect.height;

    // 显示虚拟光标
    showCursor(interactionArea, mappedX, mappedY, currentGesture);

    // 处理抓取逻辑
    if (currentGesture === '抓取手势' && !grabbedObject) {
        // 尝试抓取物品
        tryGrabObject(mappedX, mappedY);
    } else if (currentGesture === '张开手势' && grabbedObject) {
        // 释放物品
        releaseObject();
    }

    // 移动已抓取的物品
    if (grabbedObject) {
        moveObject(mappedX, mappedY);
    }
}

// 显示虚拟光标
function showCursor(area, x, y, currentGesture) {
    // 移除旧的光标
    let cursor = document.getElementById('hand-cursor');

    if (!cursor) {
        // 创建新光标
        cursor = document.createElement('div');
        cursor.id = 'hand-cursor';
        cursor.style.position = 'absolute';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderRadius = '50%';
        cursor.style.background = currentGesture === '抓取手势' ? 'red' : 'green';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '10';
        cursor.style.transform = 'translate(-50%, -50%)';
        area.appendChild(cursor);
    }

    // 更新光标位置和颜色
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    cursor.style.background = currentGesture === '抓取手势' ? 'red' : 'green';
}

let timer = null;

// 尝试抓取物品
function tryGrabObject(cursorX, cursorY) {
    const objects = document.querySelectorAll('.object');
    const interactionArea = document.querySelector('.interaction-area');

    for (const obj of objects) {
        // 获取物品的当前位置（相对于交互区域）
        const objRect = obj.getBoundingClientRect();
        const areaRect = interactionArea.getBoundingClientRect();
        
        const objLeft = objRect.left - areaRect.left;
        const objTop = objRect.top - areaRect.top;
        const objCenterX = objLeft + objRect.width / 2;
        const objCenterY = objTop + objRect.height / 2;

        // 计算距离（从光标到物品中心）
        const distance = Math.sqrt(
            Math.pow(cursorX - objCenterX, 2) + 
            Math.pow(cursorY - objCenterY, 2)
        );

        // 如果距离足够近，则抓取物品
        if (distance < 50) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                voice.synthesizeSpeechSentenceBySentence(obj.innerHTML);
            }, 500);

            // 正确计算偏移量：光标位置 - 物品当前位置
            grabOffset = {
                x: cursorX - objLeft,
                y: cursorY - objTop
            };

            grabbedObject = obj;
            obj.classList.add('grabbing');
            break;
        }
    }
}

// 移动物品
function moveObject(cursorX, cursorY) {
    if (grabbedObject) {
        // 根据偏移量计算物品的新位置
        const newLeft = cursorX - grabOffset.x;
        const newTop = cursorY - grabOffset.y;
        
        // 确保物品不会移出交互区域
        const interactionArea = document.querySelector('.interaction-area');
        const maxX = interactionArea.offsetWidth - grabbedObject.offsetWidth;
        const maxY = interactionArea.offsetHeight - grabbedObject.offsetHeight;
        
        grabbedObject.style.left = Math.max(0, Math.min(newLeft, maxX)) + 'px';
        grabbedObject.style.top = Math.max(0, Math.min(newTop, maxY)) + 'px';
    }
}

// 释放物品
function releaseObject() {
    if (grabbedObject) {
        grabbedObject.classList.remove('grabbing');
        grabbedObject = null;
        // 重置偏移量
        grabOffset = { x: 0, y: 0 };
    }
}

export { updateInteraction, grabbedObject };