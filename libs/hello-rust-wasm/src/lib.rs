use std::char;

use easy_signed_distance_field as sdf;
use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub struct WasmSdfRaster {
    pub width: u32,
    pub height: u32,
    data: Vec<f32>,
}

#[wasm_bindgen]
impl WasmSdfRaster {
    #[wasm_bindgen(getter)]
    pub fn data(&self) -> Vec<f32> {
        self.data.clone()
    }
}

#[wasm_bindgen]
pub fn generate_sdf(font_data: &[u8], char: char) -> WasmSdfRaster {
    let font: sdf::Font = sdf::Font::from_bytes(font_data, Default::default()).expect("Failed to parse font file");

    let px:f32 = 64.0;
    let padding:i32 = 2;
    let spread:f32 = 6.0;
    let (_a_metrics, a_glyph_sdf) = font.sdf_generate(px, padding, spread, char).unwrap();


    return WasmSdfRaster {
        width: a_glyph_sdf.width,
        height: a_glyph_sdf.height,
        data: a_glyph_sdf.buffer,
    };

    // #[cfg(feature="export")]
    // sdf::sdf_to_file("test_outputs/font_a.png", &a_glyph_sdf).unwrap();

    // #[cfg(feature="render")]
    // #[cfg(feature="export")]
    // {
    //     let render_scale: f32 = 1.0;
    //     sdf::sdf_render_to_file("test_outputs/font_a_render.png", render_scale, 0.5, 0.02, &a_glyph_sdf).unwrap();
    // }
}