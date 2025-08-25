import { setupCamera, stopCamera, isCameraOn } from './js/camera.js';
import { initDetector, detectHands, stopDetection } from './js/detector.js';
import { updateStatus } from './js/utils.js';
import { initSpeechSynthesis } from './js/voice.js';
let voice = initSpeechSynthesis();
// 全局变量
let video;
let canvas;
let detector;
let animationId;

// 初始化函数
async function init() {
  video = document.getElementById('video');
  canvas = document.getElementById('output');
  // 设置按钮事件监听
  document.getElementById('startBtn').addEventListener('click', toggleCamera);
  // 初始化手部检测模型
  try {
    detector = await initDetector();
    updateStatus('神经网络模型加载成功！');
    voice.synthesizeSpeechSentenceBySentence("神经网络模型加载成功！")
    
  } catch (error) {
    console.error('模型加载失败:', error);
    updateStatus('模型加载失败: ' + error.message);
  }
}
// 切换摄像头状态
async function toggleCamera() {
  if (isCameraOn) {
    voice.synthesizeSpeechSentenceBySentence("摄像头已关闭")

    // 关闭摄像头
    stopCamera();
    stopDetection(animationId);
    document.getElementById('startBtn').textContent = '启动摄像头';
    updateStatus('摄像头已关闭');
  } else {
    // 启动摄像头
    try {
      await voice.synthesizeSpeechSentenceBySentence("摄像头启动中")
      await setupCamera(video, canvas);
      document.getElementById('startBtn').textContent = '关闭摄像头';
      updateStatus('摄像头启动中...');

      // 开始检测
      animationId = detectHands(video, canvas, detector);
    
    } catch (error) {
      console.error('摄像头启动失败:', error);
      updateStatus('摄像头启动失败: ' + error.message);
    }
  }
}

// 页面加载完成后初始化
window.addEventListener('load', init);

// 导出供其他模块使用
export { video, canvas, animationId };