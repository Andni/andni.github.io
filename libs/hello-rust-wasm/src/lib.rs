use std::fs;
use easy_signed_distance_field as sdf;
use sdf::SdfRaster;

pub fn generate() -> SdfRaster {
    let font_data:Vec<u8> = fs::read("./test_fixtures/Questrial-Regular.ttf").expect("Failed to read font file");
    let font = sdf::Font::from_bytes(font_data.as_slice(), Default::default()).expect("Failed to parse font file");

    let px:f32 = 64.0;
    let padding:i32 = 2;
    let spread:f32 = 6.0;
    let (_a_metrics, a_glyph_sdf) = font.sdf_generate(px, padding, spread, 'a').unwrap();


    return a_glyph_sdf;
    #[cfg(feature="export")]
    sdf::sdf_to_file("test_outputs/font_a.png", &a_glyph_sdf).unwrap();

    #[cfg(feature="render")]
    #[cfg(feature="export")]
    {
        let render_scale: f32 = 1.0;
        sdf::sdf_render_to_file("test_outputs/font_a_render.png", render_scale, 0.5, 0.02, &a_glyph_sdf).unwrap();
    }
}