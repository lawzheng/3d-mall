import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 导入控制器，轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入模型解析器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface Fn {
  (): void
}

interface ProgressFn {
  (e: ProgressEvent): void
}

interface FinishFn {
  (res: string): void
}

interface MouseWheelFn {
  (e: WheelEvent): void
}

// 解决不识别mousewheel事件，为什么识别不了，挺奇怪的
// https://www.learnfk.com/question/typescript/47166369.html
declare global {
  interface WindowEventMap {
    mousewheel: WheelEvent
  }
}

class Base3d {
  public container: HTMLElement
  // 非空断言 !
  public camera!: THREE.PerspectiveCamera
  public scene!: THREE.Scene
  public renderer!: THREE.WebGLRenderer
  public model!: THREE.Object3D
  public panzi!: THREE.Object3D
  public clock: THREE.Clock
  public onFinish: FinishFn | undefined
  public progressFn!: ProgressFn
  public controls!: OrbitControls
  public onWindowResizeFn!: Fn
  public onMouseWheelFn!: MouseWheelFn
  public mixer!: THREE.AnimationMixer
  public animateAction!: THREE.AnimationAction
  public timeoutid!: number
  constructor(selector: string, onFinish?: FinishFn) {
    if (selector) {
      this.container = document.querySelector(selector) as HTMLElement
      this.clock = new THREE.Clock()
      this.onFinish = onFinish
      this.init()
      this.animate()
    }
  }
  public onProgress(fn: ProgressFn) {
    this.progressFn = fn
  }
  init() {
    //   初始化场景
    this.initScene()
    // 初始化相机
    this.initCamera()

    // 初始化渲染器
    this.initRenderer()
    // 控制器
    // this.initControls()
    // 添加物体
    this.addMesh()

    this.initEvent()
  }
  initScene() {
    this.scene = new THREE.Scene()
    this.setEnvMap('000')
  }
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      200
    )
    this.camera.position.set(-1.8, 0.6, 2.7)
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    // 设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // 渲染的尺寸大小
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // 色调映射
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 3
    this.container.appendChild(this.renderer.domElement)
  }
  setEnvMap(hdr: string) {
    new RGBELoader().setPath('./files/hdr/').load(hdr + '.hdr', (texture) => {
      // 球形映射
      texture.mapping = THREE.EquirectangularReflectionMapping
      this.scene.background = texture
      this.scene.environment = texture
    })
  }
  render() {
    const delta = this.clock.getDelta()
    this.mixer && this.mixer.update(delta)
    this.renderer.render(this.scene, this.camera)
  }
  animate() {
    this.renderer.setAnimationLoop(this.render.bind(this))
  }
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }
  setModel(modelName: string): Promise<string> {
    return new Promise((resolve) => {
      const loader = new GLTFLoader().setPath('files/gltf/')
      loader.load(
        modelName,
        (gltf) => {
          console.log(gltf)
          this.model && this.model.removeFromParent()
          this.model = gltf.scene.children[0]
          if ('bag2.glb' == modelName && !this.panzi) {
            this.panzi = gltf.scene.children[5]
            //   this.scene.add(this.panzi);

            // 修改摄像头为模型摄像头
            this.camera = gltf.cameras[0] as THREE.PerspectiveCamera
            //   调用动画
            this.mixer = new THREE.AnimationMixer(gltf.scene.children[1])
            this.animateAction = this.mixer.clipAction(gltf.animations[0])
            //   设置动画播放时长
            this.animateAction.setDuration(20).setLoop(THREE.LoopOnce, 1)
            //   设置播放完成之后停止
            this.animateAction.clampWhenFinished = true
            //   播放动画
            // this.animateAction.play()

            //   设置灯光
            const spotlight1 = gltf.scene.children[2]
              .children[0] as THREE.PointLight
            spotlight1.intensity = 1
            const spotlight2 = gltf.scene.children[3]
              .children[0] as THREE.PointLight
            spotlight2.intensity = 1
            const spotlight3 = gltf.scene.children[4]
              .children[0] as THREE.PointLight
            spotlight3.intensity = 1
          }
          this.scene.add(gltf.scene)
          // this.scene.add(this.model)
          resolve(modelName + '模型添加成功')
        },
        (e) => {
          //   console.log("模型加载进度");
          //   console.log(e);
          this.progressFn && this.progressFn(e)
        }
      )
    })
  }
  async addMesh() {
    const res = await this.setModel('bag2.glb')
    this.onFinish && this.onFinish(res)
  }

  initEvent() {
    this.onWindowResizeFn = this.onWindowResize.bind(this)
    this.onMouseWheelFn = this.onMouseWheel.bind(this)
    // 监听场景大小改变，调整渲染尺寸
    window.addEventListener('resize', this.onWindowResizeFn)

    // 监听滚轮事件
    window.addEventListener('mousewheel', this.onMouseWheelFn)
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.render();
  }
  onMouseWheel(e: WheelEvent) {
    // console.log(this.animateAction);
    const timeScale = e.deltaY > 0 ? 1 : -1
    this.animateAction.setEffectiveTimeScale(timeScale)
    this.animateAction.paused = false
    this.animateAction.play()
    if (this.timeoutid) {
      clearTimeout(this.timeoutid)
    }
    this.timeoutid = setTimeout(() => {
      this.animateAction.halt(0.5)
    }, 300)
  }

  onDestroy() {
    window.removeEventListener('resize', this.onWindowResizeFn)
    // 监听滚轮事件
    window.removeEventListener('mousewheel', this.onMouseWheelFn)
  }
}

export default Base3d
