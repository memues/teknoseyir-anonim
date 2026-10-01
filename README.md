# TeknoSeyir için Anonim Görünüm

TeknoSeyir paylaşımlarında, yorum ve yanıt başlıklarında kullanıcı adlarını `anonim`, profil fotoğraflarını siyah gösteren bağımsız Chrome uzantısı.

- Ana akış, içerik/kişi araması, Keşfet, tekil paylaşım ve profil sayfalarında çalışır.
- Dinamik eklenen desteklenen öğelere de uygulanır.
- Veri saklama, dışarı aktarım, analitik, reklam veya uzaktan çalıştırılan kod içermez.
- Manifest V3; yalnızca `teknoseyir.com` ve `www.teknoseyir.com` sayfalarında çalışır.

Bu bir görsel sadeleştirme aracıdır. Profil bağlantıları, içerik metinleri, @etiketler, biyografiler ve normal paylaşım görselleri değişmez; tam anonimlik sağlamaz. TeknoSeyir tarafından geliştirilmemiş veya onaylanmamıştır.

## Gizlilik

[Gizlilik politikası](https://memues.github.io/teknoseyir-anonim/privacy.html)

Kullanıcı adları ve ilgili profil öğeleri yalnızca açık sekmede işlenir. Eklenti bu bilgileri kaydetmez veya herhangi bir sunucuya göndermez.

## Dosyalar ve kurulum

`extension/` klasörü, Chrome Web Store'a sunulan 1.0.0 paketinin kaynak dosyalarını içerir. `docs/`, GitHub Pages üzerinde yayımlanan proje ve gizlilik sayfalarıdır.

1. [v1.0.0 sürümündeki ZIP'i](https://github.com/memues/teknoseyir-anonim/releases/tag/v1.0.0) indirin ve çıkartın.
2. Chrome'da `chrome://extensions` sayfasını açın, geliştirici modunu etkinleştirin.
3. **Paketlenmemiş öğe yükle** ile `manifest.json` içeren klasörü seçin.
4. Açık TeknoSeyir sekmelerini yenileyin.

Kaynak deposunu indirdiyseniz üçüncü adımda `extension/` klasörünü seçin. Devre dışı bırakıp sayfayı yenileyince özgün görünüm geri gelir.

## Doğrulama

Sürüm 1.0.0 için altı gerçek sayfa yapısında 13 DOM kontrolü geçmiştir; dinamik ekleme, yeniden maskeleme, profil kontrolleri ve normal içeriklerin korunması kontrol edilmiştir. Kaynak dosyaları mağazaya sunulan paket ile bayt düzeyinde eşleştirilmiştir.

ZIP SHA-256: `547f9601f114fc712b5fafb79a4a99f094b7ba45b2ad193b55ad3598fd35c12f`

Sorunlar için [Issues](https://github.com/memues/teknoseyir-anonim/issues) kullanılabilir. Özel bilgi paylaşmayın.
