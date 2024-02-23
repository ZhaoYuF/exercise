
uniform vec3 uColor;

void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float a = max(0.0, 0.5 - d);
    gl_FragColor = vec4(uColor, a);
}