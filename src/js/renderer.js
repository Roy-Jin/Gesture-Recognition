// 清除画布
function clearCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 手部关键点连接定义
const HAND_CONNECTIONS = [
  // 手腕到拇指
  ['wrist', 'thumb_cmc'],
  ['thumb_cmc', 'thumb_mcp'],
  ['thumb_mcp', 'thumb_ip'],
  ['thumb_ip', 'thumb_tip'],
  
  // 手腕到食指
  ['wrist', 'index_finger_mcp'],
  ['index_finger_mcp', 'index_finger_pip'],
  ['index_finger_pip', 'index_finger_dip'],
  ['index_finger_dip', 'index_finger_tip'],
  
  // 手腕到中指
  ['wrist', 'middle_finger_mcp'],
  ['middle_finger_mcp', 'middle_finger_pip'],
  ['middle_finger_pip', 'middle_finger_dip'],
  ['middle_finger_dip', 'middle_finger_tip'],
  
  // 手腕到无名指
  ['wrist', 'ring_finger_mcp'],
  ['ring_finger_mcp', 'ring_finger_pip'],
  ['ring_finger_pip', 'ring_finger_dip'],
  ['ring_finger_dip', 'ring_finger_tip'],
  
  // 手腕到小指
  ['wrist', 'pinky_mcp'],
  ['pinky_mcp', 'pinky_pip'],
  ['pinky_pip', 'pinky_dip'],
  ['pinky_dip', 'pinky_tip'],
  
  // 手指之间的连接（手掌）
  ['thumb_cmc', 'index_finger_mcp'],
  ['index_finger_mcp', 'middle_finger_mcp'],
  ['middle_finger_mcp', 'ring_finger_mcp'],
  ['ring_finger_mcp', 'pinky_mcp']
];

// 绘制手部关键点
function drawHands(ctx, hands) {
  for (const hand of hands) {
    // 绘制连接线（先绘制线，再绘制点，这样点会在线上面）
    drawConnections(ctx, hand.keypoints);
    
    // 绘制关键点
    for (const keypoint of hand.keypoints) {
      const { x, y } = keypoint;

      // 绘制点
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      
      // 根据关键点类型设置不同颜色
      if (keypoint.name === 'wrist') {
        ctx.fillStyle = 'purple'; // 手腕紫色
      } else if (keypoint.name.includes('thumb')) {
        ctx.fillStyle = 'red'; // 拇指红色
      } else if (keypoint.name.includes('index')) {
        ctx.fillStyle = 'blue'; // 食指蓝色
      } else if (keypoint.name.includes('middle')) {
        ctx.fillStyle = 'green'; // 中指绿色
      } else if (keypoint.name.includes('ring')) {
        ctx.fillStyle = 'orange'; // 无名指橙色
      } else if (keypoint.name.includes('pinky')) {
        ctx.fillStyle = 'yellow'; // 小指黄色
      } else {
        ctx.fillStyle = 'white'; // 其他白色
      }
      
      ctx.fill();
      
      // 绘制关键点边框
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 可选：绘制关键点名称（调试用）
      // if (process.env.NODE_ENV === 'development') {
      //   ctx.font = '10px Arial';
      //   ctx.fillStyle = 'white';
      //   ctx.fillText(keypoint.name, x + 8, y - 8);
      // }
    }
    
    // 可选：绘制手部信息
    // if (hand.handedness && hand.score) {
    //   ctx.font = '14px Arial';
    //   ctx.fillStyle = 'white';
    //   ctx.fillText(`${hand.handedness}手 - 置信度: ${hand.score.toFixed(2)}`, 10, 20);
    // }
  }
}

// 绘制连接线
function drawConnections(ctx, keypoints) {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  
  // 创建关键点名称到坐标的映射
  const keypointMap = {};
  for (const kp of keypoints) {
    keypointMap[kp.name] = kp;
  }
  
  // 绘制所有连接线
  for (const [startName, endName] of HAND_CONNECTIONS) {
    const startPoint = keypointMap[startName];
    const endPoint = keypointMap[endName];
    
    if (startPoint && endPoint) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    }
  }
}

// 绘制特定手指的连接线（可选功能）
function drawFingerConnections(ctx, keypoints, fingerType) {
  const fingerConnections = {
    thumb: [
      ['wrist', 'thumb_cmc'],
      ['thumb_cmc', 'thumb_mcp'],
      ['thumb_mcp', 'thumb_ip'],
      ['thumb_ip', 'thumb_tip']
    ],
    index: [
      ['wrist', 'index_finger_mcp'],
      ['index_finger_mcp', 'index_finger_pip'],
      ['index_finger_pip', 'index_finger_dip'],
      ['index_finger_dip', 'index_finger_tip']
    ],
    middle: [
      ['wrist', 'middle_finger_mcp'],
      ['middle_finger_mcp', 'middle_finger_pip'],
      ['middle_finger_pip', 'middle_finger_dip'],
      ['middle_finger_dip', 'middle_finger_tip']
    ],
    ring: [
      ['wrist', 'ring_finger_mcp'],
      ['ring_finger_mcp', 'ring_finger_pip'],
      ['ring_finger_pip', 'ring_finger_dip'],
      ['ring_finger_dip', 'ring_finger_tip']
    ],
    pinky: [
      ['wrist', 'pinky_mcp'],
      ['pinky_mcp', 'pinky_pip'],
      ['pinky_pip', 'pinky_dip'],
      ['pinky_dip', 'pinky_tip']
    ]
  };
  
  ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
  ctx.lineWidth = 4;
  
  const keypointMap = {};
  for (const kp of keypoints) {
    keypointMap[kp.name] = kp;
  }
  
  const connections = fingerConnections[fingerType] || [];
  for (const [startName, endName] of connections) {
    const startPoint = keypointMap[startName];
    const endPoint = keypointMap[endName];
    
    if (startPoint && endPoint) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    }
  }
}

// 绘制手部轮廓（简化版）
function drawHandOutline(ctx, keypoints) {
  const outlinePoints = [
    'wrist',
    'thumb_cmc',
    'thumb_mcp',
    'thumb_ip',
    'thumb_tip',
    'index_finger_tip',
    'index_finger_dip',
    'index_finger_pip',
    'index_finger_mcp',
    'middle_finger_mcp',
    'middle_finger_pip',
    'middle_finger_dip',
    'middle_finger_tip',
    'ring_finger_tip',
    'ring_finger_dip',
    'ring_finger_pip',
    'ring_finger_mcp',
    'pinky_mcp',
    'pinky_pip',
    'pinky_dip',
    'pinky_tip',
    'pinky_mcp',
    'wrist'
  ];
  
  ctx.strokeStyle = 'rgba(255, 0, 255, 0.5)';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(255, 0, 255, 0.1)';
  
  const keypointMap = {};
  for (const kp of keypoints) {
    keypointMap[kp.name] = kp;
  }
  
  ctx.beginPath();
  let firstPoint = true;
  
  for (const pointName of outlinePoints) {
    const point = keypointMap[pointName];
    if (point) {
      if (firstPoint) {
        ctx.moveTo(point.x, point.y);
        firstPoint = false;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
  }
  
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export { 
  clearCanvas, 
  drawHands, 
  drawConnections, 
  drawFingerConnections, 
  drawHandOutline,
  HAND_CONNECTIONS 
};