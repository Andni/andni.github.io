in vec3 vColor;
in vec2 vUV;
uniform sampler2D uTexture;


void main() {
    float herp = 1.0;

    
    vec4 derp = texture2D(uTexture, vUV);

    if (derp.r >= 0.54) {
        herp = 0.0;
    }
    gl_FragColor = vec4(herp, herp, herp, 1.0);
}