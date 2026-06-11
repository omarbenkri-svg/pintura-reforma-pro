/* gallery-standalone.js — shared lightbox data & logic for design variants */
const ALBUMS = {
    'bano-lujo': { title: 'Reforma Integral de Baño de Lujo', photos: [
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11.jpg',alt:'Reforma integral de baño de lujo'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_1.jpg',alt:'Alicatado de gran formato'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_2.jpg',alt:'Sanitarios suspendidos'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_3.jpg',alt:'Fontanería empotrada'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_4.jpg',alt:'Acabado de obra'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_5.jpg',alt:'Grifería termostática'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_6.jpg',alt:'Revestimiento de paredes'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_7.jpg',alt:'Vista general reforma'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_8.jpg',alt:'Espejo y luminaria'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_9.jpg',alt:'Plato de ducha'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_10.jpg',alt:'Pavimento gran formato'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_12.jpg',alt:'Tabiquería empotrada'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_13.jpg',alt:'Muebles de baño'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_14.jpg',alt:'Detalle acabado'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-11_15.jpg',alt:'Entrega final'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-01.webp',alt:'Escalera de mármol'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-02.webp',alt:'Mármol pulido'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-03.webp',alt:'Detalle mármol'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-04.webp',alt:'Peldaños de mármol'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-05.webp',alt:'Escalera interior'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-06.webp',alt:'Acabado escalera'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-07.webp',alt:'Vista escalera'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-08.webp',alt:'Mármol y barandilla'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-09.webp',alt:'Proceso escalera'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-10.webp',alt:'Sanitario suspendido'},
        {src:'images/projects/real/reforma-escalera-marmol-bano-11.webp',alt:'Entrega reforma'},
    ]},
    'estuco': { title: 'Estuco Veneciano y Alta Decoración', photos: [
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13.jpg',alt:'Estuco veneciano – detalle'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_1.jpg',alt:'Textura estuco'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_2.jpg',alt:'Alta decoración interior'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_3.jpg',alt:'Proceso estuco'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_4.jpg',alt:'Acabado brillante'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_5.jpg',alt:'Detalle pared'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_6.jpg',alt:'Efecto mármol'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_7.jpg',alt:'Salón con estuco'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_8.jpg',alt:'Estuco escalera'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_9.jpg',alt:'Lustre veneciano'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-59-13_10.jpg',alt:'Entrega final estuco'},
    ]},
    'bano-rustico': { title: 'Baño Rústico-Moderno', photos: [
        {src:'scratch/fotosweb/PHOTO-2026-05-18-22-54-35.jpg',alt:'Baño rústico-moderno'},
        {src:'scratch/fotosweb/PHOTO-2026-05-18-22-54-35_1.jpg',alt:'Plato de ducha pizarra'},
        {src:'scratch/fotosweb/PHOTO-2026-05-18-22-54-35_2.jpg',alt:'Grifería termostática'},
        {src:'scratch/fotosweb/PHOTO-2026-05-18-22-54-35_3.jpg',alt:'Alicatado'},
        {src:'scratch/fotosweb/PHOTO-2026-05-18-22-54-35_4.jpg',alt:'Vista general baño'},
        {src:'scratch/fotosweb/PHOTO-2026-05-18-22-54-35_5.jpg',alt:'Acabado final'},
    ]},
    'fachadas': { title: 'Rehabilitación de Fachadas', photos: [
        ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map(n=>({
            src:`images/projects/real/rehabilitacion-fachada-mataro-${String(n).padStart(2,'0')}.webp`,
            alt:`Rehabilitación fachada Mataró – foto ${n}`
        })),
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-34.jpg',alt:'Fachada Vilassar de Mar'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-34_1.jpg',alt:'Preparación fachada'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-34_2.jpg',alt:'Pintura fachada'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-34_3.jpg',alt:'Detalle acabado'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-34_4.jpg',alt:'Fachada terminada'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-34_5.jpg',alt:'Fachada Cabrils'},
    ]},
    'madera': { title: 'Barnizado y Carpintería de Madera', photos: [
        ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n=>({
            src:`images/projects/real/barnizado-madera-atico-${String(n).padStart(2,'0')}.webp`,
            alt:`Barnizado madera ático – foto ${n}`
        })),
        {src:'images/projects/real/restauracion-madera-exterior-01.webp',alt:'Carpintería exterior'},
        {src:'images/projects/real/restauracion-madera-exterior-02.webp',alt:'Madera barnizada'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-35.jpg',alt:'Esmaltado de carpintería interior – puertas y marcos'},
    ]},
    'tejados': { title: 'Tejados, Albañilería y Saneamiento', photos: [
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-55-34.jpg',alt:'Tejado chalet'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-55-34_1.jpg',alt:'Reparación tejado'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-55-34_2.jpg',alt:'Colocación tejas'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-55-34_3.jpg',alt:'Cubierta chalet'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-55-34_4.jpg',alt:'Impermeabilización'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-55-34_5.jpg',alt:'Detalle mortero'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-55-34_6.jpg',alt:'Tejado reparado'},
        ...[1,2,3,4,5,6].map(n=>({
            src:`images/projects/real/reparacion-tejado-mataro-${String(n).padStart(2,'0')}.webp`,
            alt:`Tejado Mataró – foto ${n}`
        })),
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-36.jpg',alt:'Saneamiento humedades'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-36_1.jpg',alt:'Anti-humedad'},
    ]},
    'suelos': { title: 'Microcemento y Suelos', photos: [
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-05-21.jpg',alt:'Microcemento suelo'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-05-21_1.jpg',alt:'Suelo salón'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-05-21_2.jpg',alt:'Textura microcemento'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-05-21_3.jpg',alt:'Entrega suelo'},
        ...[1,2,3,4].map(n=>({
            src:`images/projects/real/suelo-laminado-cocina-${String(n).padStart(2,'0')}.webp`,
            alt:`Suelo laminado cocina – foto ${n}`
        })),
    ]},
    'comunidades': { title: 'Comunidades y Garajes', photos: [
        ...[1,2,3,4,5,6,7].map(n=>({
            src:`images/projects/real/pintura-garaje-comunitario-${String(n).padStart(2,'0')}.webp`,
            alt:`Garaje comunitario – foto ${n}`
        })),
    ]},
    'gran-album': { title: 'Gran Álbum de Acabados de Reforma', photos: [
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40.jpg',alt:'Gran álbum acabados'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_1.jpg',alt:'Reforma interior'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_2.jpg',alt:'Pintura reforma'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_3.jpg',alt:'Parquet y suelo'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_4.jpg',alt:'Reforma terminada'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_5.jpg',alt:'Pintura molduras'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_6.jpg',alt:'Salón reformado'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_7.jpg',alt:'Detalle decorativo'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_8.jpg',alt:'Cocina reformada'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_9.jpg',alt:'Dormitorio pintado'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_10.jpg',alt:'Pasillo reformado'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_11.jpg',alt:'Acabados piso'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_12.jpg',alt:'Reforma salón'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_13.jpg',alt:'Acabados finales'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-40_14.jpg',alt:'Entrega final'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-39.jpg',alt:'Piso moderno'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-39_1.jpg',alt:'Blanco roto'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-39_2.jpg',alt:'Pisos Badalona'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-23-13-39_3.jpg',alt:'Piso pintado'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-09.jpg',alt:'Preparación y enmasillado de paredes'},
        {src:'scratch/fotoswebtrabajosrealizados/PHOTO-2026-05-18-22-57-09_1.jpg',alt:'Acabado de paredes enmasilladas'},
    ]}
};

let lbAlbum = null, lbIndex = 0, lbTouchStartX = 0;

function openLightbox(albumId, startIndex) {
    startIndex = startIndex || 0;
    lbAlbum = ALBUMS[albumId];
    if (!lbAlbum) return;
    lbIndex = startIndex;
    var lb = document.getElementById('lightbox');
    lb.classList.add('lb-open');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    renderLightboxThumbs();
    loadLightboxPhoto(lbIndex, false);
    lb.focus();
}
function closeLightbox() {
    var lb = document.getElementById('lightbox');
    lb.classList.remove('lb-open');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    var img = document.getElementById('lb-img');
    if (img) img.src = '';
}
function loadLightboxPhoto(idx, animate) {
    var img = document.getElementById('lb-img');
    var loading = document.getElementById('lb-loading');
    var counter = document.getElementById('lb-counter');
    var albumName = document.getElementById('lb-album-name');
    if (!lbAlbum || !img) return;
    var photo = lbAlbum.photos[idx];
    if (!photo) return;
    if (animate) img.classList.add('lb-fading');
    loading.classList.add('active');
    var tmp = new Image();
    tmp.onload = function() { img.src = photo.src; img.alt = photo.alt; img.classList.remove('lb-fading'); loading.classList.remove('active'); };
    tmp.onerror = function() { img.classList.remove('lb-fading'); loading.classList.remove('active'); };
    tmp.src = photo.src;
    counter.textContent = (idx+1)+' / '+lbAlbum.photos.length;
    albumName.textContent = lbAlbum.title;
    document.querySelectorAll('.lb-thumb').forEach(function(t,i){ t.classList.toggle('active', i===idx); });
    var at = document.querySelector('.lb-thumb.active');
    if (at) at.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
}
function navigateLightbox(dir) {
    if (!lbAlbum) return;
    lbIndex = (lbIndex+dir+lbAlbum.photos.length)%lbAlbum.photos.length;
    loadLightboxPhoto(lbIndex,true);
}
function renderLightboxThumbs() {
    var strip = document.getElementById('lb-thumbs');
    if (!strip) return;
    strip.innerHTML = '';
    lbAlbum.photos.forEach(function(photo,i) {
        var div = document.createElement('div');
        div.className = 'lb-thumb'+(i===lbIndex?' active':'');
        div.setAttribute('role','button'); div.setAttribute('tabindex','0');
        var ti = document.createElement('img'); ti.src=photo.src; ti.alt=''; ti.loading='lazy';
        div.appendChild(ti);
        (function(ix){ div.addEventListener('click',function(){ lbIndex=ix; loadLightboxPhoto(lbIndex,true); }); })(i);
        strip.appendChild(div);
    });
}
function initGalleryLightbox() {
    document.querySelectorAll('.project-card').forEach(function(card) {
        card.setAttribute('tabindex','0'); card.setAttribute('role','button');
        card.addEventListener('click', function(){ openLightbox(card.dataset.album); });
        card.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openLightbox(card.dataset.album); } });
    });
    var lb=document.getElementById('lightbox');
    var cb=document.getElementById('lb-close'), pb=document.getElementById('lb-prev'), nb=document.getElementById('lb-next');
    if(cb) cb.addEventListener('click',closeLightbox);
    if(pb) pb.addEventListener('click',function(){ navigateLightbox(-1); });
    if(nb) nb.addEventListener('click',function(){ navigateLightbox(1); });
    if(lb) lb.addEventListener('click',function(e){ if(e.target===lb) closeLightbox(); });
    document.addEventListener('keydown',function(e){
        var el=document.getElementById('lightbox');
        if(!el||!el.classList.contains('lb-open')) return;
        if(e.key==='Escape') closeLightbox();
        if(e.key==='ArrowLeft') navigateLightbox(-1);
        if(e.key==='ArrowRight') navigateLightbox(1);
    });
    if(lb){
        lb.addEventListener('touchstart',function(e){ lbTouchStartX=e.changedTouches[0].clientX; },{passive:true});
        lb.addEventListener('touchend',function(e){ var dx=e.changedTouches[0].clientX-lbTouchStartX; if(Math.abs(dx)>50) navigateLightbox(dx<0?1:-1); },{passive:true});
    }
    // Gallery filter tabs
    document.querySelectorAll('.gallery-tab').forEach(function(tab){
        tab.addEventListener('click',function(){
            document.querySelectorAll('.gallery-tab').forEach(function(t){ t.classList.remove('active'); });
            tab.classList.add('active');
            var filter=tab.dataset.filter;
            document.querySelectorAll('.gallery-item').forEach(function(item){
                item.style.display = (filter==='all'||item.dataset.category===filter) ? '' : 'none';
            });
        });
    });
}
document.addEventListener('DOMContentLoaded', initGalleryLightbox);
