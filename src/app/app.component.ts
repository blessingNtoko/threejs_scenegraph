import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, .1, 1000);
  public renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  public light = new THREE.PointLight(0xffffff, 3);
  public controls = new OrbitControls(this.camera, this.renderer.domElement);
  public gui = new dat.GUI();

  public sphereGeometry = new THREE.SphereBufferGeometry(1, 10, 10);
  public solarSystem = new THREE.Object3D();
  public earthOrbit = new THREE.Object3D();
  public moonOrbit = new THREE.Object3D();

  public sunMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xffff00,
    // wireframe: true
  });
  public sunMesh = new THREE.Mesh(this.sphereGeometry, this.sunMaterial);

  public earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244
  });
  public earthMesh = new THREE.Mesh(this.sphereGeometry, this.earthMaterial);

  public moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888,
    emissive: 0x222
  });
  public moonMesh = new THREE.Mesh(this.sphereGeometry, this.moonMaterial);

  public objects = [];

  ngOnInit() {
    this.init();
  }

  private init() {
    try {

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
      this.scene.background = new THREE.Color(0x000);
      this.camera.position.set(0, 50, 0);
      this.camera.up.set(0, 0, 1);
      this.camera.lookAt(0, 0, 0);
      this.controls.update();
      // this.light.position.set(-1, 2, 4);
      this.scene.add(this.light);
      this.scene.add(this.solarSystem);
      this.objects.push(this.solarSystem);

      this.sunMesh.scale.set(5, 5, 5);
      this.solarSystem.add(this.sunMesh);
      this.objects.push(this.sunMesh);

      this.earthOrbit.position.x = 10;
      this.solarSystem.add(this.earthOrbit);
      this.objects.push(this.earthOrbit);

      this.earthOrbit.add(this.earthMesh);
      this.objects.push(this.earthMesh);

      this.moonOrbit.position.x = 2;
      this.earthOrbit.add(this.moonOrbit);

      this.moonMesh.scale.set(.5, .5, .5);
      this.moonOrbit.add(this.moonMesh);
      this.objects.push(this.moonMesh);

      window.addEventListener('resize', () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      }, false);

      // this.doIt();

      const animate = () => {
        this.objects.forEach(obj => {
          obj.rotation.y += .02;
        });

        this.controls.update();


        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(animate);
      }
      animate();
    } catch (error) {
      console.error('Error in init() -> ', error);
    }
  }

  private makeAxisFrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
  }
}
