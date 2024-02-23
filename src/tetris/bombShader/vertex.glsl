uniform float uTime;

float random(vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)) * 43758.5453123));
}

void main() {
    float offsetX = random(position.yz) - 0.5;
    float offsetY = random(position.xz) - 0.5;
    float offsetZ = random(position.xy) - 0.5;
    vec3 p = (position + vec3(offsetX, offsetY, offsetZ) * uTime) * vec3(1.0 + uTime * 14.0, 1.0 + uTime * 3.0, 1.0 + uTime * 14.0);
    vec4 modelPosition = modelMatrix * vec4(p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = 15.0 * (1.0 - uTime);
}