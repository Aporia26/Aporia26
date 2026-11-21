export const FRAG_SOURCE = `precision highp float;
uniform vec2  u_res;
uniform float u_time;

// value-noise + fractal brownian motion
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p  = uv * 3.0;
  // domain warp: distort the sample coords by another fbm field
  vec2 q  = vec2(fbm(p + u_time*0.05), fbm(p + vec2(5.2, 1.3)));
  float f = fbm(p + q*2.0 + u_time*0.06);

  vec3 vd = vec3(0.04, 0.04, 0.05);
  vec3 cr = vec3(0.88, 0.16, 0.23);
  vec3 og = vec3(1.00, 0.48, 0.10);
  vec3 tl = vec3(0.14, 0.77, 0.72);

  vec3 col = mix(vd, cr, smoothstep(0.2, 0.55, f));
  col = mix(col, og, smoothstep(0.5, 0.8, f));
  col = mix(col, tl, smoothstep(0.82, 1.0, f) * 0.7);
  gl_FragColor = vec4(col, 1.0);
}`

export const VERT_SOURCE = `attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`
