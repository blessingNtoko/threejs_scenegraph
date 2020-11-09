import * as THREE from 'three';

class AxisGridHelper {
  constructor(node, units = 10) {
    const axes: any = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 2;
    node.add(axes);

    const grid: any = new THREE.GridHelper(units, units);

  }
}
