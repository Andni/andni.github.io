in vec3 vColor;
in vec2 vUV;
uniform sampler2D uTexture;


void main() {
    float value = 1.0;
    float alpha = 1.0;

    
    vec4 derp = texture2D(uTexture, vUV);

    if (derp.r >= 0.54) {
        value = 0.0;
    } else {
        alpha = derp.r - 1.0;
    }
    gl_FragColor = vec4(value, value, value, alpha);
}