import * as handPoseDetection from '/node_modules/@tensorflow-models/hand-pose-detection';
import { drawHands, clearCanvas } from './renderer.js';
import { updateInteraction } from './interaction.js';
import { updateStatus, updateInteractionStatus } from './utils.js';

let detector;
let currentGesture = '未检测到手势';
let handPosition = { x: 0, y: 0 };

// 初始化检测器
async function initDetector() {
  detector = await handPoseDetection.createDetector(
    handPoseDetection.SupportedModels.MediaPipeHands, 
    {
      runtime: 'mediapipe',
      modelType: 'full',
      maxHands: 2,
      solutionPath: "node_modules/@mediapipe/hands/"
    }
  );
  return detector;
}

// 检测手部
function detectHands(video, canvas, detector) {
  let animationId;
  
  const ctx = canvas.getContext('2d');
  
  async function detect() {
    try {
      // 检测手部 水平翻转检测结果
      const hands = await detector.estimateHands(video, { flipHorizontal: true });
      // 清除画布
      clearCanvas(ctx, canvas);

      if (hands.length > 0) {
        // 绘制手部关键点
        drawHands(ctx, hands);

        // 分析手势
        analyzeGesture(hands[0]);

        // 更新交互
        updateInteraction(hands[0], canvas, currentGesture, handPosition);
      } else {
        currentGesture = '未检测到手势';
        updateInteractionStatus(currentGesture);
      }

      // 更新状态
      updateStatus(`检测到 ${hands.length} 只手`);
    } catch (error) {
      console.error('手部检测错误:', error);
    }

    // 继续检测
    animationId = requestAnimationFrame(detect);
  }
  
  // 开始检测循环
  detect();
  return animationId;
}

// 停止检测
function stopDetection(animationId) {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}

// 分析手势
function analyzeGesture(hand) {
  // 简化实现：根据拇指和食指指尖的距离判断手势
  const thumbTip = hand.keypoints.find(k => k.name === 'thumb_tip');
  const indexTip = hand.keypoints.find(k => k.name === 'index_finger_tip');

  if (thumbTip && indexTip) {
    // 计算两点之间的距离
    const distance = Math.sqrt(
      Math.pow(thumbTip.x - indexTip.x, 2) + 
      Math.pow(thumbTip.y - indexTip.y, 2)
    );

    // 根据距离判断手势
    if (distance < 40) {
      currentGesture = '抓取手势';
    } else {
      currentGesture = '张开手势';
    }

    // 更新手部位置（使用掌心位置）
    const wrist = hand.keypoints.find(k => k.name === 'index_finger_tip');
    if (wrist) {
      handPosition.x = wrist.x;
      handPosition.y = wrist.y;
    }
  }

  updateInteractionStatus(currentGesture);
}

export { 
  initDetector, 
  detectHands, 
  stopDetection, 
  currentGesture, 
  handPosition 
};