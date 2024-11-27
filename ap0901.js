//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G384702023 西原樹
//
// "use strict"; // 厳格モード

// // ライブラリをモジュールとして読み込む
// import * as THREE from "three";
// import { GUI } from "ili-gui";

// // ３Ｄページ作成関数の定義
// function init() {
//   // 制御変数の定義
//   const param = {
//     axes: true, // 座標軸
//   };

//   // GUIコントローラの設定
//   const gui = new GUI();
//   gui.add(param, "axes").name("座標軸");

//   // シーン作成
//   const scene = new THREE.Scene();

//   // 座標軸の設定
//   const axes = new THREE.AxesHelper(18);
//   scene.add(axes);

//   // カメラの作成
//   const camera = new THREE.PerspectiveCamera(
//     50, window.innerWidth/window.innerHeight, 0.1, 1000);
//   camera.position.set(1,2,3);
//   camera.lookAt(0,0,0);

//   // レンダラの設定
//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, innerHeight);
//     document.getElementById("output").appendChild(renderer.domElement);

//   // 描画処理

//   // 描画関数
//   function render() {
//     // 座標軸の表示
//     axes.visible = param.axes;
//     // 描画
//     renderer.render(scene, camera);
//     // 次のフレームでの描画要請
//     requestAnimationFrame(render);
//   }

//   // 描画開始
//   render();
// }

// init();
"use strict"; // 厳格モード

import * as THREE from 'three';
import GUI from 'ili-gui';
import { MeshPhongMaterial } from 'three';

// ３Ｄページ作成関数の定義
function init() {
  const param = { // カメラの設定値
    fov: 60, // 視野角
    x: 0,
    y: 25,
    z: 10,
    nRow: 6, /* ブロックの行数 */
    nCol: 9, /* ブロックの列数 */
    axes: true,
  };

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // ブロック数のカウント
  let nBrick = 0
  

  // スコア表示
  let score = 0;
  // let life = 3;
  function setScore(score) {
    document.getElementById("score").innerText
    =String(Math.round(score)).padStart(8, "0");
    // document.getElementById("life").innerText
    // = (life>0)? "○○○".substring(0, life) : "--- Game Over ---";
  }

  // Geometry の分割数
  const nSeg = 24;
  const pi = Math.PI;

  // ボール ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // ボールの作成
  const ballR = 0.3;
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(ballR, nSeg, nSeg),
    new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100, specular: 0xa0a0a0 })
  );
  ball.geometry.computeBoundingSphere();
  scene.add(ball);
  


  const ballRR = 0.3;
  const balll = new THREE.Mesh(
    new THREE.SphereGeometry(ballRR, nSeg, nSeg),
    new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100, specular: 0xa0a0a0 })
  );
  balll.geometry.computeBoundingSphere();
  scene.add(balll);

  const ballRRR = 0.3;
  const ballll = new THREE.Mesh(
    new THREE.SphereGeometry(ballRRR, nSeg, nSeg),
    new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100, specular: 0xa0a0a0 })
  );
  ballll.geometry.computeBoundingSphere();
  scene.add(ballll);
  



  // ボールの移動
  const vBall = new THREE.Vector3();
  let vx = Math.sin(pi / 4);
  let vz = -Math.cos(pi / 4);
  let vvx = Math.sin(pi / 7);
  let vvz = -Math.cos(pi / 7);
  let vvvx = Math.sin(pi / 10);
  let vvvz = -Math.cos(pi / 10);

  function moveBall(delta) {
    if(ballLive){
    vBall.set(vx, 0, vz)
    ball.position.addScaledVector(vBall, delta * speed);
    }else{
      ball.position.x = paddle.position.x;
      ball.position.z = paddle.position.z+(-2*ballR);
    }


    // if(ballLive){
    //   vBall.set(vx, 0, vz)
    //   balll.position.addScaledVector(vBall, delta * speed);
  
    // }else{
    //     balll.position.x = -paddle.position.x;
    //     balll.position.z = -paddle.position.z+(-2*ballR);
    // }
  }
  function moveBalll(delta) {
    if(ballLive){
      vBall.set(vvx, 0, vvz)
      balll.position.addScaledVector(vBall, delta * speed);
  
    }else{
        balll.position.x = paddle.position.x;
        balll.position.z = paddle.position.z+(-2*ballRR);
    }
  }


  function moveBallll(delta) {
    if(ballLive){
      vBall.set(vvvx, 0, vvvz)
      ballll.position.addScaledVector(vBall, delta * speed);
  
    }else{
        ballll.position.x = paddle.position.x;
        ballll.position.z = paddle.position.z+(-2*ballRRR);
    }
  }

  // ボールの死活
  let ballLive = false;
  let speed = 0;

  // ボールを停止する
  function stopBall() {
    speed = 0;
    ballLive = false;
    life--;
  }

  // ボールを動かす
  function startBall() {
    ballLive = true;
    speed = 10;
    // if(){
    //   speed = 100;
    // }
  }

  // マウスクリックでスタートする
  window.addEventListener("mousedown", () => {
    if (!ballLive) { startBall(); }
  }, false);

  // 外枠 ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // 枠の作成
  //   大きさの定義
  const hFrameW = 13;  const hFrameH = 2;  const hFrameD = 1;
  const vFrameW = 0.5;  const vFrameH = 1.2;  const vFrameD = 22;
  {
    //   上の枠
    const tFrame = new THREE.Mesh(
      new THREE.BoxGeometry(hFrameW, hFrameH, hFrameD/2),
      new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    tFrame.position.z = -(vFrameD + hFrameD) /4;
    scene.add(tFrame);
    //   下の枠
    const bFrame = tFrame.clone();
    bFrame.position.z = (vFrameD + hFrameD) / 4;
    scene.add(bFrame);
    
    //   左の枠
    const lFrame = new THREE.Mesh(
      new THREE.BoxGeometry(vFrameW, vFrameH, vFrameD/2),
      new MeshPhongMaterial({ color: 0x333333 })
    );
    lFrame.position.x=(vFrameD)/3.5;
    scene.add(lFrame);

    //   右の枠
    const rFrame = new THREE.Mesh(
      new THREE.BoxGeometry(vFrameW, vFrameH, vFrameD/2),
      new MeshPhongMaterial({ color: 0x333333 })
    );
      rFrame.position.x = -(vFrameD)/3.5;
      scene.add(rFrame);

  }

  // 壁で反射させる
  const hLimit = hFrameW / 2 - vFrameW;
  const vLimit = 5.5;
  const hhLimit = hFrameW / 2 - vFrameW;
  const vvLimit = 5.5;
  const hhhLimit = hFrameW / 2 - vFrameW;
  const vvvLimit = 5.5;
  function frameCheck() {
    // 右
    if(ball.position.x + ballR > hLimit) {
      ball.position.x = hLimit - ballR;
      vx = -Math.abs(vx);
    }
    // 左
    if(ball.position.x < -hLimit) {
      ball.position.x = -hLimit+ballR;
      vx = Math.abs(vx);
    }

    // 上
    if(ball.position.z  < -vLimit){
      ball.position.z = -vLimit;
      vz = Math.abs(vz);
    }

    // 下
    if(ball.position.z +ballR > vLimit){
      ball.position.z = vLimit+(-ballR);
      vz = -Math.abs(-vz);
      // stopBall();
    }
  }






  function fframeCheck() {
    if(balll.position.x + ballRR > hhLimit) {
      balll.position.x = hhLimit - ballRR;
      vvx = -Math.abs(vvx);
    }
    // 左
    if(balll.position.x < -hhLimit) {
      balll.position.x = -hhLimit+ballRR;
      vvx = Math.abs(vvx);
    }

    // 上
    if(balll.position.z  < -vvLimit){
      balll.position.z = -vvLimit;
      vvz = Math.abs(vvz);
    }

    // 下
    if(balll.position.z +ballRR > vvLimit){
      balll.position.z = vvLimit+(-ballRR);
      vvz = -Math.abs(-vvz);
      // stopBall();
    }

  
  
  }




  function ffframeCheck() {
    if(ballll.position.x + ballRRR > hhhLimit) {
      ballll.position.x = hhhLimit - ballRRR;
      vvvx = -Math.abs(vvvx);
    }
    // 左
    if(ballll.position.x < -hhhLimit) {
      ballll.position.x = -hhhLimit+ballRRR;
      vvvx = Math.abs(vvvx);
    }

    // 上
    if(ballll.position.z  < -vvvLimit){
      ballll.position.z = -vvvLimit;
      vvvz = Math.abs(vvvz);
    }

    // 下
    if(ballll.position.z +ballRRR > vvvLimit){
      ballll.position.z = vvvLimit+(-ballRRR);
      vvvz = -Math.abs(-vvvz);
      // stopBall();
    }

  
  
  }
  // パドル ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // パドルの作成
  const paddleR = 0.3;
  const paddleL = 0.3;
  const paddle = new THREE.Group(); // パドルグループ
  {
    // パドル中央
    const center = new THREE.Mesh(
      new THREE.CylinderGeometry(paddleR, paddleR, paddleL, nSeg),
      new THREE.MeshPhongMaterial({ color: 0xFF0000, shininess: 100, specular: 0x404040 })
    );
    center.rotation.z=1/2*Math.PI;
    paddle.add(center);


    // パドル端
    const sideGeometry
      = new THREE.SphereGeometry(paddleR, nSeg, nSeg, Math.PI / 2, Math.PI);
    const sideMaterial
      = new THREE.MeshPhongMaterial({ color: 0xFF0000, shininess: 100, specular: 0xa0a0a0 })
    // パドル端(右)
    const right=new THREE.Mesh(sideGeometry,sideMaterial)
    right.position.x=paddleL/2;
    paddle.add(right);

    // パドル端(左)
    const left = right.clone();
    left.rotation.z = Math.PI;
    left.position.x = -(paddleL/2);
    paddle.add(left);


    // パドルの配置
    // paddle.position.z = 0.4 * vFrameD;
    scene.add(paddle)

  }
  

  // パドル操作
  {
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const intersects = new THREE.Vector3();
    function paddleMove(event) {
      mouse.x = (event.clientX / window.innerWidth)*2-1;
      raycaster.setFromCamera(mouse,camera);
      raycaster.ray.intersectPlane(plane, intersects);
      const offset = hFrameW /2 -vFrameW - paddleL /2 -paddleR;
      if(intersects.x < -offset){
        intersects.x = -offset;
      }
      else if(intersects.x > offset){
        intersects.x = offset;
      }
      paddle.position.x = intersects.x;


  
    }
    window.addEventListener("mousemove", paddleMove, false);
  }

  // パドルの衝突検出
  function paddleCheck() {
    if(Math.abs(ball.position.z - paddle.position.z)<paddleR+ballR&&
    Math.abs(ball.position.x - paddle.position.x)<paddleL/2+ballR){
    //中央
      if(ball.position.z < paddle.position.z){
      vz = -Math.abs(vz);
    }
    if(ball.position.z > paddle.position.z){
      vz = Math.abs(vz);
    }
    //右
    if(ball.position.x>paddle.position.x+paddleL/2){
      vx = Math.abs(vx);
    }
    //左
    else if(ball.position.x < paddle.position.x -paddleL/2){
      vx = -Math.abs(vx);
    }
    // if(nBrick<=0){
    //   resetBrick();
    // }
  }
  }



  function ppaddleCheck() {
    if(Math.abs(balll.position.z - paddle.position.z)<paddleR+ballRR&&
    Math.abs(balll.position.x - paddle.position.x)<paddleL/2+ballRR){
    //中央
      if(balll.position.z < paddle.position.z){
      vvz = -Math.abs(vvz);
    }
    if(balll.position.z > paddle.position.z){
      vvz = Math.abs(vvz);
    }
    //右
    if(balll.position.x>paddle.position.x+paddleL/2){
      vvx = Math.abs(vvx);
    }
    //左
    else if(balll.position.x < paddle.position.x -paddleL/2){
      vvx = -Math.abs(vvx);
    }
    // if(nBrick<=0){
    //   resetBrick();
    // }
  }
  }




  function pppaddleCheck() {
    if(Math.abs(ballll.position.z - paddle.position.z)<paddleR+ballRRR&&
    Math.abs(ballll.position.x - paddle.position.x)<paddleL/2+ballRRR){
    //中央
      if(balll.position.z < paddle.position.z){
      vvvz = -Math.abs(vvvz);
    }
    if(ballll.position.z > paddle.position.z){
      vvvz = Math.abs(vvvz);
    }
    //右
    if(ballll.position.x>paddle.position.x+paddleL/2){
      vvvx = Math.abs(vvvx);
    }
    //左
    else if(ballll.position.x < paddle.position.x -paddleL/2){
      vvvx = -Math.abs(vvvx);
    }
    // if(nBrick<=0){
    //   resetBrick();
    // }
  }
  }

  // // ブロック ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // ブロックの生成
  const bricks = new THREE.Group();
  function makeBricks(){
    const color = ["white", "red", "yellow", "blue", "purple", "green"];
    const h = 0.8; /* ブロックの高さ */
    const d = 0.4; /* ブロックの奥行 */
    const gapX = 0.1; /* 横方向の隙間 */
    const gapZ = 0.3; /* 縦方向の隙間 */

    // ブロックの幅
    const w = (hFrameW - 2 * vFrameW - (param.nCol + 1) * gapX) / param.nCol;
    // ブロックを並べる
    // for(let r = 0;r < param.nRow;r++){
    //   for(let c=0;c<param.nCol;c++){
    //     const brick = new THREE.Mesh(
    //       new THREE.BoxGeometry(w,h,d),
    //       new THREE.MeshLambertMaterial({color: color[r % color.length]})
    //     );
    //     brick.position.set(
    //       (w + gapX)*(c-((param.nCol-1)/2)),
    //       0,
    //       -(d+gapZ)*r
    //     )
    //     brick.geometry.computeBoundingBox();
    //     bricks.add(brick);
    //     nBrick++;
    //   }

    // }
   

    // ブロック全体を奥に移動する
    bricks.position.z = -4;
    scene.add(bricks);

  }
  makeBricks();
   

  // ブロックの衝突検出
  function brickCheck() {
    let hit = false;
    const sphere = ball.geometry.boundingSphere.clone();
    sphere.translate(ball.position);

    bricks.children.forEach((brick) => {
   
    if(!hit && brick.visible){
      let box = brick.geometry.boundingBox.clone();
      box.translate(bricks.position);
      box.translate(brick.position);
      if(box.intersectsSphere(sphere)){
        hit = true;
        brick.visible = false;
        nBrick--;
        score += ((-brick.position.z)/0.7)+1 * 100;
        vz = -vz;
        if(nBrick<=0){
          score=score+100000;
        }
      }
    }
  });
  }
//ブロックの作り直し
function remakeBricks(){
  stopBall();
  scene.remove(bricks);
  bricks.clear();
  nBrick = 0;
  makeBricks();
  scene.add(bricks);
}

  // ブロックの再表示
  function resetBrick() {
    nBrick = 0
    bricks.children.forEach((brick)=>{
      brick.visible=true;
      nBrick++;
    });

  }

  // 光源の設定
  const light = new THREE.SpotLight(0xffffff, 1000);
  light.position.set(0, 15, -10);
  scene.add(light);

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    param.fov, window.innerWidth / window.innerHeight, 0.1, 1000);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x305070);
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // 描画更新
  const clock = new THREE.Clock(); // 時間の管理
  function render(time) {
    // カメラの再設定
    camera.fov = param.fov;
    camera.position.x = param.x;
    camera.position.y = param.y;
    camera.position.z = param.z;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    // 座標軸の表示
    axes.visible = param.axes;
    // ゲーム画面の更新
    let delta = clock.getDelta(); // 経過時間の取得
    frameCheck(); // 枠の衝突判定
    fframeCheck();
    ffframeCheck();
    paddleCheck(); // パドルの衝突判定
    ppaddleCheck();
    pppaddleCheck();
    brickCheck(); // ブロックの衝突判定
    moveBall(delta); // ボールの移動
    moveBalll(delta);
    moveBallll(delta);
    setScore(score); // スコア更新
    // 再描画
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  // GUIコントローラ
  const gui = new GUI();
  gui.add(param, "fov", 10, 100);
  gui.add(param, "x", -40, 80);
  gui.add(param, "y", -40, 80);
  gui.add(param, "z", -40, 80);
  gui.add(param, "axes");
  // gui.add(param, "nRow", 1, 10, 1).onChange(remakeBricks);
  // gui.add(param, "nCol", 1, 10, 1).onChange(remakeBricks);
  gui.close();
  // 描画
  render();
}

// 3Dページ作成関数の呼び出し
init();
