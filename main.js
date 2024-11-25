<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Google Translate Button</title>
  <style>
    #google_translate_element {
      display: none; /* إخفاء العنصر الافتراضي */
    }
  </style>
</head>
<body>
  <!-- زر مخصص لتغيير اللغة -->
  <button id="customTranslateButton" onclick="translatePage('en')">Translate to English</button>
  <button id="resetButton" onclick="translatePage('ar')">عودة إلى العربية</button>

  <!-- عنصر الترجمة الخاص بـ Google -->
  <div id="google_translate_element"></div>

  <script>
    // تحميل مكتبة Google Translate
    function loadGoogleTranslate() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.getElementsByTagName("body")[0].appendChild(script);
    }

    // تهيئة عنصر الترجمة
    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        {
          pageLanguage: "ar",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false, // تعطيل العرض التلقائي
        },
        "google_translate_element"
      );
    }

    // دالة لتغيير اللغة
    function translatePage(language) {
      var frame = document.querySelector("iframe.goog-te-menu-frame");
      if (frame) {
        // فتح قائمة Google Translate واختيار اللغة
        var frameDocument = frame.contentDocument || frame.contentWindow.document;
        var option = frameDocument.querySelector(`[value="${language}"]`);
        if (option) {
          option.click();
        }
      } else {
        alert("Google Translate not loaded yet. Please wait.");
      }
    }

    // تحميل مكتبة الترجمة عند تحميل الصفحة
    window.onload = loadGoogleTranslate;
  </script>
</body>
</html>
