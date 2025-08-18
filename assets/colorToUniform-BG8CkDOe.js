import{g as O,u as tt,d as et,G as rt,c as V,f as A,w as it,h as nt,i as ot,j as at,S as st,E as ut}from"./index-A8yzzRrX.js";class G{constructor(t){typeof t=="number"?this.rawBinaryData=new ArrayBuffer(t):t instanceof Uint8Array?this.rawBinaryData=t.buffer:this.rawBinaryData=t,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(t){return this[`${t}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(t){switch(t){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${t} isn't a valid view type`)}}}function R(r,t){const e=r.byteLength/8|0,i=new Float64Array(r,0,e);new Float64Array(t,0,e).set(i);const a=r.byteLength-e*8;if(a>0){const u=new Uint8Array(r,e*8,a);new Uint8Array(t,e*8,a).set(u)}}const ct={normal:"normal-npm",add:"add-npm",screen:"screen-npm"};var lt=(r=>(r[r.DISABLED=0]="DISABLED",r[r.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",r[r.MASK_ACTIVE=2]="MASK_ACTIVE",r[r.INVERSE_MASK_ACTIVE=3]="INVERSE_MASK_ACTIVE",r[r.RENDERING_MASK_REMOVE=4]="RENDERING_MASK_REMOVE",r[r.NONE=5]="NONE",r))(lt||{});function D(r,t){return t.alphaMode==="no-premultiply-alpha"&&ct[r]||r}const ht=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join(`
`);function ft(r){let t="";for(let e=0;e<r;++e)e>0&&(t+=`
else `),e<r-1&&(t+=`if(test == ${e}.0){}`);return t}function dt(r,t){if(r===0)throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");const e=t.createShader(t.FRAGMENT_SHADER);try{for(;;){const i=ht.replace(/%forloop%/gi,ft(r));if(t.shaderSource(e,i),t.compileShader(e),!t.getShaderParameter(e,t.COMPILE_STATUS))r=r/2|0;else break}}finally{t.deleteShader(e)}return r}let y=null;function mt(){if(y)return y;const r=O();return y=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),y=dt(y,r),r.getExtension("WEBGL_lose_context")?.loseContext(),y}class xt{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let t=0;t<this.count;t++){const e=this.textures[t];this.textures[t]=null,this.ids[e.uid]=null}this.count=0}}class pt{constructor(){this.renderPipeId="batch",this.action="startBatch",this.start=0,this.size=0,this.textures=new xt,this.blendMode="normal",this.topology="triangle-strip",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}const W=[];let T=0;function E(){return T>0?W[--T]:new pt}function k(r){W[T++]=r}let w=0;const X=class Y{constructor(t){this.uid=tt("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._elements=[],t={...Y.defaultOptions,...t},t.maxTextures||(et("v8.8.0","maxTextures is a required option for Batcher now, please pass it in the options"),t.maxTextures=mt());const{maxTextures:e,attributesInitialSize:i,indicesInitialSize:n}=t;this.attributeBuffer=new G(i*4),this.indexBuffer=new Uint16Array(n),this.maxTextures=e}begin(){this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0;for(let t=0;t<this.batchIndex;t++)k(this.batches[t]);this.batchIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(t){this._elements[this.elementSize++]=t,t._indexStart=this.indexSize,t._attributeStart=this.attributeSize,t._batcher=this,this.indexSize+=t.indexSize,this.attributeSize+=t.attributeSize*this.vertexSize}checkAndUpdateTexture(t,e){const i=t._batch.textures.ids[e._source.uid];return!i&&i!==0?!1:(t._textureId=i,t.texture=e,!0)}updateElement(t){this.dirty=!0;const e=this.attributeBuffer;t.packAsQuad?this.packQuadAttributes(t,e.float32View,e.uint32View,t._attributeStart,t._textureId):this.packAttributes(t,e.float32View,e.uint32View,t._attributeStart,t._textureId)}break(t){const e=this._elements;if(!e[this.elementStart])return;let i=E(),n=i.textures;n.clear();const a=e[this.elementStart];let u=D(a.blendMode,a.texture._source),s=a.topology;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const c=this.attributeBuffer.float32View,l=this.attributeBuffer.uint32View,v=this.indexBuffer;let f=this._batchIndexSize,d=this._batchIndexStart,g="startBatch";const b=this.maxTextures;for(let x=this.elementStart;x<this.elementSize;++x){const o=e[x];e[x]=null;const m=o.texture._source,h=D(o.blendMode,m),p=u!==h||s!==o.topology;if(m._batchTick===w&&!p){o._textureId=m._textureBindLocation,f+=o.indexSize,o.packAsQuad?(this.packQuadAttributes(o,c,l,o._attributeStart,o._textureId),this.packQuadIndex(v,o._indexStart,o._attributeStart/this.vertexSize)):(this.packAttributes(o,c,l,o._attributeStart,o._textureId),this.packIndex(o,v,o._indexStart,o._attributeStart/this.vertexSize)),o._batch=i;continue}m._batchTick=w,(n.count>=b||p)&&(this._finishBatch(i,d,f-d,n,u,s,t,g),g="renderBatch",d=f,u=h,s=o.topology,i=E(),n=i.textures,n.clear(),++w),o._textureId=m._textureBindLocation=n.count,n.ids[m.uid]=n.count,n.textures[n.count++]=m,o._batch=i,f+=o.indexSize,o.packAsQuad?(this.packQuadAttributes(o,c,l,o._attributeStart,o._textureId),this.packQuadIndex(v,o._indexStart,o._attributeStart/this.vertexSize)):(this.packAttributes(o,c,l,o._attributeStart,o._textureId),this.packIndex(o,v,o._indexStart,o._attributeStart/this.vertexSize))}n.count>0&&(this._finishBatch(i,d,f-d,n,u,s,t,g),d=f,++w),this.elementStart=this.elementSize,this._batchIndexStart=d,this._batchIndexSize=f}_finishBatch(t,e,i,n,a,u,s,c){t.gpuBindGroup=null,t.bindGroup=null,t.action=c,t.batcher=this,t.textures=n,t.blendMode=a,t.topology=u,t.start=e,t.size=i,++w,this.batches[this.batchIndex++]=t,s.add(t)}finish(t){this.break(t)}ensureAttributeBuffer(t){t*4<=this.attributeBuffer.size||this._resizeAttributeBuffer(t*4)}ensureIndexBuffer(t){t<=this.indexBuffer.length||this._resizeIndexBuffer(t)}_resizeAttributeBuffer(t){const e=Math.max(t,this.attributeBuffer.size*2),i=new G(e);R(this.attributeBuffer.rawBinaryData,i.rawBinaryData),this.attributeBuffer=i}_resizeIndexBuffer(t){const e=this.indexBuffer;let i=Math.max(t,e.length*1.5);i+=i%2;const n=i>65535?new Uint32Array(i):new Uint16Array(i);if(n.BYTES_PER_ELEMENT!==e.BYTES_PER_ELEMENT)for(let a=0;a<e.length;a++)n[a]=e[a];else R(e.buffer,n.buffer);this.indexBuffer=n}packQuadIndex(t,e,i){t[e]=i+0,t[e+1]=i+1,t[e+2]=i+2,t[e+3]=i+0,t[e+4]=i+2,t[e+5]=i+3}packIndex(t,e,i,n){const a=t.indices,u=t.indexSize,s=t.indexOffset,c=t.attributeOffset;for(let l=0;l<u;l++)e[i++]=n+a[l+s]-c}destroy(){for(let t=0;t<this.batches.length;t++)k(this.batches[t]);this.batches=null;for(let t=0;t<this._elements.length;t++)this._elements[t]._batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}};X.defaultOptions={maxTextures:null,attributesInitialSize:4,indicesInitialSize:6};let vt=X;const gt=new Float32Array(1),bt=new Uint32Array(1);class St extends rt{constructor(){const e=new V({data:gt,label:"attribute-batch-buffer",usage:A.VERTEX|A.COPY_DST,shrinkToFit:!1}),i=new V({data:bt,label:"index-batch-buffer",usage:A.INDEX|A.COPY_DST,shrinkToFit:!1}),n=6*4;super({attributes:{aPosition:{buffer:e,format:"float32x2",stride:n,offset:0},aUV:{buffer:e,format:"float32x2",stride:n,offset:2*4},aColor:{buffer:e,format:"unorm8x4",stride:n,offset:4*4},aTextureIdAndRound:{buffer:e,format:"uint16x2",stride:n,offset:5*4}},indexBuffer:i})}}function $(r,t,e){if(r)for(const i in r){const n=i.toLocaleLowerCase(),a=t[n];if(a){let u=r[i];i==="header"&&(u=u.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),e&&a.push(`//----${e}----//`),a.push(u)}else it(`${i} placement hook does not exist in shader`)}}const _t=/\{\{(.*?)\}\}/g;function j(r){const t={};return(r.match(_t)?.map(i=>i.replace(/[{()}]/g,""))??[]).forEach(i=>{t[i]=[]}),t}function F(r,t){let e;const i=/@in\s+([^;]+);/g;for(;(e=i.exec(r))!==null;)t.push(e[1])}function H(r,t,e=!1){const i=[];F(t,i),r.forEach(s=>{s.header&&F(s.header,i)});const n=i;e&&n.sort();const a=n.map((s,c)=>`       @location(${c}) ${s},`).join(`
`);let u=t.replace(/@in\s+[^;]+;\s*/g,"");return u=u.replace("{{in}}",`
${a}
`),u}function N(r,t){let e;const i=/@out\s+([^;]+);/g;for(;(e=i.exec(r))!==null;)t.push(e[1])}function Bt(r){const e=/\b(\w+)\s*:/g.exec(r);return e?e[1]:""}function yt(r){const t=/@.*?\s+/g;return r.replace(t,"")}function wt(r,t){const e=[];N(t,e),r.forEach(c=>{c.header&&N(c.header,e)});let i=0;const n=e.sort().map(c=>c.indexOf("builtin")>-1?c:`@location(${i++}) ${c}`).join(`,
`),a=e.sort().map(c=>`       var ${yt(c)};`).join(`
`),u=`return VSOutput(
            ${e.sort().map(c=>` ${Bt(c)}`).join(`,
`)});`;let s=t.replace(/@out\s+[^;]+;\s*/g,"");return s=s.replace("{{struct}}",`
${n}
`),s=s.replace("{{start}}",`
${a}
`),s=s.replace("{{return}}",`
${u}
`),s}function Q(r,t){let e=r;for(const i in t){const n=t[i];n.join(`
`).length?e=e.replace(`{{${i}}}`,`//-----${i} START-----//
${n.join(`
`)}
//----${i} FINISH----//`):e=e.replace(`{{${i}}}`,"")}return e}const _=Object.create(null),I=new Map;let At=0;function It({template:r,bits:t}){const e=L(r,t);if(_[e])return _[e];const{vertex:i,fragment:n}=Pt(r,t);return _[e]=q(i,n,t),_[e]}function Ut({template:r,bits:t}){const e=L(r,t);return _[e]||(_[e]=q(r.vertex,r.fragment,t)),_[e]}function Pt(r,t){const e=t.map(u=>u.vertex).filter(u=>!!u),i=t.map(u=>u.fragment).filter(u=>!!u);let n=H(e,r.vertex,!0);n=wt(e,n);const a=H(i,r.fragment,!0);return{vertex:n,fragment:a}}function L(r,t){return t.map(e=>(I.has(e)||I.set(e,At++),I.get(e))).sort((e,i)=>e-i).join("-")+r.vertex+r.fragment}function q(r,t,e){const i=j(r),n=j(t);return e.forEach(a=>{$(a.vertex,i,a.name),$(a.fragment,n,a.name)}),{vertex:Q(r,i),fragment:Q(t,n)}}const zt=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}

        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);

        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,Ct=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;

    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {

        {{start}}

        var outColor:vec4<f32>;

        {{main}}

        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`,Tt=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;

        {{start}}

        vColor = vec4(1.);

        {{main}}

        vUV = uv;

        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,Mt=`

    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {

        {{start}}

        vec4 outColor;

        {{main}}

        finalColor = outColor * vColor;

        {{end}}
    }
`,Vt={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},Gt={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function Rt({bits:r,name:t}){const e=It({template:{fragment:Ct,vertex:zt},bits:[Vt,...r]});return ot.from({name:t,vertex:{source:e.vertex,entryPoint:"main"},fragment:{source:e.fragment,entryPoint:"main"}})}function Dt({bits:r,name:t}){return new nt({name:t,...Ut({template:{vertex:Tt,fragment:Mt},bits:[Gt,...r]})})}const Et={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},kt={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},U={};function $t(r){const t=[];if(r===1)t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),t.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let e=0;for(let i=0;i<r;i++)t.push(`@group(1) @binding(${e++}) var textureSource${i+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${i+1}: sampler;`)}return t.join(`
`)}function jt(r){const t=[];if(r===1)t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{t.push("switch vTextureId {");for(let e=0;e<r;e++)e===r-1?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");t.push("}")}return t.join(`
`)}function Ft(r){return U[r]||(U[r]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${$t(r)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${jt(r)}
            `}}),U[r]}const P={};function Ht(r){const t=[];for(let e=0;e<r;e++)e>0&&t.push("else"),e<r-1&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join(`
`)}function Nt(r){return P[r]||(P[r]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${r}];

            `,main:`

                ${Ht(r)}
            `}}),P[r]}const Qt={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},Kt={name:"round-pixels-bit",vertex:{header:`
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},K={};function Wt(r){let t=K[r];if(t)return t;const e=new Int32Array(r);for(let i=0;i<r;i++)e[i]=i;return t=K[r]=new at({uTextures:{value:e,type:"i32",size:r}},{isStatic:!0}),t}class Xt extends st{constructor(t){const e=Dt({name:"batch",bits:[kt,Nt(t),Kt]}),i=Rt({name:"batch",bits:[Et,Ft(t),Qt]});super({glProgram:e,gpuProgram:i,resources:{batchSamplers:Wt(t)}})}}let z=null;const J=class Z extends vt{constructor(t){super(t),this.geometry=new St,this.name=Z.extension.name,this.vertexSize=6,z??(z=new Xt(t.maxTextures)),this.shader=z}packAttributes(t,e,i,n,a){const u=a<<16|t.roundPixels&65535,s=t.transform,c=s.a,l=s.b,v=s.c,f=s.d,d=s.tx,g=s.ty,{positions:b,uvs:x}=t,o=t.color,S=t.attributeOffset,m=S+t.attributeSize;for(let h=S;h<m;h++){const p=h*2,B=b[p],M=b[p+1];e[n++]=c*B+v*M+d,e[n++]=f*M+l*B+g,e[n++]=x[p],e[n++]=x[p+1],i[n++]=o,i[n++]=u}}packQuadAttributes(t,e,i,n,a){const u=t.texture,s=t.transform,c=s.a,l=s.b,v=s.c,f=s.d,d=s.tx,g=s.ty,b=t.bounds,x=b.maxX,o=b.minX,S=b.maxY,m=b.minY,h=u.uvs,p=t.color,B=a<<16|t.roundPixels&65535;e[n+0]=c*o+v*m+d,e[n+1]=f*m+l*o+g,e[n+2]=h.x0,e[n+3]=h.y0,i[n+4]=p,i[n+5]=B,e[n+6]=c*x+v*m+d,e[n+7]=f*m+l*x+g,e[n+8]=h.x1,e[n+9]=h.y1,i[n+10]=p,i[n+11]=B,e[n+12]=c*x+v*S+d,e[n+13]=f*S+l*x+g,e[n+14]=h.x2,e[n+15]=h.y2,i[n+16]=p,i[n+17]=B,e[n+18]=c*o+v*S+d,e[n+19]=f*S+l*o+g,e[n+20]=h.x3,e[n+21]=h.y3,i[n+22]=p,i[n+23]=B}};J.extension={type:[ut.Batcher],name:"default"};let Lt=J;const C={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},qt={...C,vertex:{...C.vertex,header:C.vertex.header.replace("group(1)","group(2)")}},Jt={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class Zt{constructor(){this.batcherName="default",this.topology="triangle-list",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}destroy(){}}function Ot(r,t,e){const i=(r>>24&255)/255;t[e++]=(r&255)/255*i,t[e++]=(r>>8&255)/255*i,t[e++]=(r>>16&255)/255*i,t[e++]=i}export{Zt as B,Lt as D,lt as S,G as V,Et as a,C as b,Rt as c,Ot as d,dt as e,R as f,Ft as g,Dt as h,kt as i,Nt as j,Jt as k,qt as l,Kt as m,Wt as n,D as o,Qt as r};
