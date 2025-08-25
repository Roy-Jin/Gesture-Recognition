let isCameraOn = false;

// 设置摄像头
async function setupCamera(video, canvas) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480 }
  });

  video.srcObject = stream;

  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      // 设置canvas尺寸与视频相同
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      isCameraOn = true;
      resolve();
    };
  });
}

// 停止摄像头
function stopCamera(video) {
  if (video.srcObject) {
    const tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
  }
  
  isCameraOn = false;
}

export { setupCamera, stopCamera, isCameraOn };