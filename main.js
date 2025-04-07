let originalHTML = ""; // متغير لحفظ النص الأصلي بالتنسيق
let isTranslated = false; // حالة لمعرفة ما إذا كان النص مترجماً

if (!localStorage.getItem('userId_standard')) {
  window.location.href = '2UnrerrIndex.html';
}





async function translateText() {
  const container = document.getElementById("button-container");
  const languageSelector = document.getElementById("languageSelector");
  const restoreButton = document.getElementById("restoreButton");
  const buttons = container.querySelectorAll("button"); // الأزرار
  const labels = container.querySelectorAll("label:first-child"); // النصوص داخل label:first-child

  const targetLanguage = languageSelector.value;

  // حفظ النص الأصلي فقط عند أول ترجمة
  if (!isTranslated) {
    originalHTML = container.innerHTML; // حفظ النص الأصلي بالتنسيقات
    isTranslated = true; // تحديث الحالة
  }

  // إذا كانت اللغة المختارة هي اللغة الافتراضية (الأصلية)، قم بإرجاع النص الأصلي
  if (targetLanguage === "de") {
    restoreOriginalText();
    return;
  }

  // إخفاء قائمة اختيار اللغة وإظهار زر "الرجوع إلى النص الأصلي"
  languageSelector.style.display = "none";
  restoreButton.style.display = "inline-block";

  // دالة لتنظيف النصوص من النقاط مع الفراغات والفراغات الزائدة
  const cleanText = (text) => {
    return text.replace(/\. /g, ".").replace(/\s+/g, " ").trim();
  };

  // دالة لترجمة النصوص
  const translateNode = async (textToTranslate) => {
    const cleanedText = cleanText(textToTranslate); // تنظيف النص قبل الترجمة
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(
      cleanedText
    )}`;
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      return result[0][0][0]; // النص المترجم
    } catch (error) {
      console.error("خطأ أثناء الترجمة:", error);
      return textToTranslate; // إذا حدث خطأ، أعد النص الأصلي
    }
  };

  // ترجمة النصوص داخل `label:first-child`
  for (const label of labels) {
    const textToTranslate = label.textContent.trim();
    const translatedText = await translateNode(textToTranslate);

    // تحديث نص الـ label
    label.textContent = translatedText;

    // إذا كانت اللغة عربية، اجعل النص على اليمين
    if (targetLanguage === "ar") {
      label.style.direction = "rtl"; // النص يبدأ من اليمين
      label.style.textAlign = "right"; // محاذاة النص
    } else {
      label.style.direction = "ltr";
      label.style.textAlign = "left";
    }
  }

  // ترجمة النصوص داخل الأزرار
  for (const button of buttons) {
    const textToTranslate = button.textContent.trim();
    const translatedText = await translateNode(textToTranslate);

    // تحديث نص الزر
    button.textContent = translatedText;

    // إذا كانت اللغة عربية، اجعل النص على اليمين
    if (targetLanguage === "ar") {
      button.style.direction = "rtl"; // النص يبدأ من اليمين
      button.style.textAlign = "right"; // محاذاة النص
    } else {
      button.style.direction = "ltr";
      button.style.textAlign = "left";
    }
  }
}

function restoreOriginalText() {
  const container = document.getElementById("button-container");
  const languageSelector = document.getElementById("languageSelector");
  const restoreButton = document.getElementById("restoreButton");

  // إعادة تحميل النصوص من المصدر استنادًا إلى الفهرس الحالي
  displayRow(currentRow); // أو استخدم updatePageElements(currentRow)

  // تحديث الحالة لإظهار قائمة اختيار اللغة وإخفاء زر "الرجوع إلى النص الأصلي"
  isTranslated = false; // إعادة الحالة إلى غير مترجم
  languageSelector.style.display = "inline-block";
  restoreButton.style.display = "none";

  // إعادة تعيين الخيار الافتراضي للقائمة المنسدلة
  languageSelector.value = ""; // ضبط القائمة على الخيار الافتراضي
}














var tableContainer = document.querySelector(".table-container");
var body = document.body;

let isFunctionCalled = false; // متغير مؤقت للتحقق مما إذا تم استدعاء الدالة مسبقًا أم لا

function FarbeinTable() {
  const urlParams = new URLSearchParams(window.location.search);
  const value = parseInt(urlParams.get("value"));

  if (!isFunctionCalled) {
    let url;
    if (value === 14) {
      url = "eins203.csv";
    } else if (value === 15) {
      url = "Zwei204.csv";
    } else if (value === 16) {
      url = "Drei211.csv";
    } else if (value === 17) {
      url = "vier213.csv";
    } else if (value === 18) {
      url = "funf217.csv";
    } else if (value === 19) {
      url = "sechs219.csv";
    } else if (value === 20) {
      url = "sieben221.csv";
    } else if (value === 21) {
      url = "MP18.csv";
    } else if (value === 22) {
      url = "Prüfung 1.csv";
    } else if (value === 23) {
      url = "Prüfung 2.csv";
    } else if (value === 24) {
      url = "Prüfung 3.csv";
    } else if (value === 25) {
      url = "Pr4.csv";
    } else if (value === 26) {
      url = "Pr5.csv";
    } else {
      url = "Unterrichtung.csv";
    }
    if (url) {
      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          const parsedData = Papa.parse(data, {
            delimiter: ",",
            quoteChar: '"',
            header: false,
          });
          const correctAnswers = parsedData.data.slice(1); // استبعاد السطر الأول (الرأس)

          const tableBody = document.getElementById("table-body");
          for (let i = 0; i < correctAnswers.length; i++) {
            const row = correctAnswers[i];
            const tr = document.createElement("tr");
            const button = document.createElement("button");
            button.textContent = row[0]; // قيمة العمود الأول

            const buttons = document.querySelectorAll("button");
            buttons.forEach((button) => {
              button.style.backgroundColor =
                button.dataset.initialBackgroundColor;
              button.style.transform = "scale(1)"; // إعادة تعيين حجم الزر إلى الحجم الأصلي
              button.style.boxShadow = "none"; // إزالة الظل عن الزر
            });
            button.addEventListener("click", () => {
              if (
                document.getElementById("showResults").innerText ===
                "Prüfung abgeben"
              ) {
                Shawqi();
                restoreOriginalText();
              }

              currentRow = i + 1; // تحديث الصف الحالي
              currentRowIndex = i; // تحديث الفهرس الحالي للصف
              displayRow(currentRow);

              Punkte.style.display = "flex";
              button.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)"; // إضافة ظل للزر

              // إزالة تأثير التمييز من الأزرار الأخرى
              const allButtons = document.querySelectorAll("button");
              allButtons.forEach((btn) => {
                if (btn !== button) {
                  btn.style.boxShadow = "none";
                }
              });

              if (
                window.getComputedStyle(resultsContainer9).display === "flex" &&
                window.getComputedStyle(buttonContainer).display === "none"
              ) {
                resultsContainer5.style.display = "none";
                buttonContainer.style.display = "flex";
                resultsContainer.style.display = "none";

                finalResultText.style.display = "none";

                
                resultsContainer9.style.display = "none";
                var richtige = document.getElementById("Richtige Antworten Zahl");
                var falsche = document.getElementById("Falsche Antworten Zahl");
                richtige.style.display = "none";
                falsche.style.display = "none";
                
                document.getElementById("showResults").style.display = "flex";
                document.getElementById("showResults").style.width = "100px";


               
                
                

              }
            });

            // بقية الكود

            const td = document.createElement("td");
            td.appendChild(button);
            tr.appendChild(td);
            tableBody.appendChild(tr);

            // تخزين اللون الأصلي للزر
            button.dataset.initialBackgroundColor =
              button.style.backgroundColor;

            // إذا كان لون الزر هو اللون المطلوب وكان في نفس الفهرس، قم بتغيير لونه
            const computedStyle = getComputedStyle(button);
            const backgroundColor = computedStyle.backgroundColor;
            const targetButton = document.querySelector(
              `tr:nth-child(${i + 1}) button`
            );
            if (backgroundColor === "rgb(255, 255, 3)" && targetButton) {
              targetButton.style.backgroundColor = button.style.backgroundColor;
            }
          }
        })

        .catch((error) =>
          console.error("Error fetching correct answers CSV file:", error)
        );

      // بعد تحميل البيانات وإنشاء الأزرار، ضع العلامة isFunctionCalled إلى القيمة true
      isFunctionCalled = true;
    }
  }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", FarbeinTable);

function displayRow(rowNumber) {
  // اكتب هنا السلوك المطلوب عند النقر على الزر
  console.log("تم النقر على الصف رقم:", rowNumber);
}

function displayRow(rowNumber) {
  // تنفيذ السلوك المطلوب عند النقر على الزر
  // يمكنك استخدام rowNumber لتحديد الصفحة المطلوبة لعرضها
  // مثال: window.location.href = 'العنوان الخاص بالصفحة ' + rowNumber;
  console.log("عرض الصفحة رقم:", rowNumber);
}

function displayCorrespondingRow(rowIndex) {
  // حذف العناصر القديمة في ButtonContainer إذا كانت موجودة
  buttonContainer.innerHTML = "";

  // جلب البيانات للصف المقابل من الجدول الثاني
  const correspondingRowData = correctAnswers[rowIndex];

  // عرض الصف المقابل في ButtonContainer
  correspondingRowData.forEach((column, index) => {
    const button = document.createElement("button");
    button.textContent = column.trim();
    button.addEventListener("click", () => {
      // تنفيذ السلوك الخاص بالزر هنا، على سبيل المثال تغيير لون الزر أو تنفيذ إجراء إضافي
      alert("تم النقر على " + column.trim());
    });
    buttonContainer.appendChild(button);
  });
}

let currentRow = 1;
let liIndex = 0; // تعريف متغير لتتبع معرف العناصر الفريدة
const buttonContainer = document.getElementById("button-container");
let correctAnswers = [];
let list2 = [];
let currentRowIndex = 0;
let totalRows = 0;

// تعريف دالة لإضافة الفهرس إلى list2
function addIndexToList2(index) {
  list2.push(index);
}

const urlParams = new URLSearchParams(window.location.search);
const value = parseInt(urlParams.get("value"));

let url;
if (value === 14) {
  url = "Lösung203.csv";
} else if (value === 15) {
  url = "lösung204.csv";
} else if (value === 16) {
  url = "Lösung211.csv";
} else if (value === 17) {
  url = "Lösung213.csv";
} else if (value === 18) {
  url = "Lösung217.csv";
} else if (value === 19) {
  url = "Lösung219.csv";
} else if (value === 20) {
  url = "Lösung221.csv";
} else if (value === 21) {
  url = "MPLös18.csv";
} else if (value === 22) {
  url = "LösungPr1.csv";
} else if (value === 23) {
  url = "LösungPr2.csv";

} else if (value === 24) {
  url = "LösungPr3.csv";
} else if (value === 25) {
  url = "LösungPr4.csv";
} else if (value === 26) {
  url = "LösungPr5.csv";
} 
else {
  url = "Lösung203.csv";
} 
 
 
if (url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const parsedData = Papa.parse(data, {
        delimiter: ",",
        quoteChar: '"',
        header: false,
      });
      correctAnswers = parsedData.data.slice(1);
    })
    .catch((error) =>
      console.error("Error fetching correct answers CSV file:", error)
    );
}

// دالة لعرض صف الجدول المحدد
function displayRow(rowNumber) {
  const urlParams = new URLSearchParams(window.location.search);
  const value = parseInt(urlParams.get("value"));
  let url, pageTitle;

  if (value === 14) {
    url = "eins203.csv";
    pageTitle = "Recht der öffentlichen Sicherheit und Ordnung";
  } else if (value === 15) {
    url = "Zwei204.csv";
    pageTitle = "Gewerberecht";
  } else if (value === 16) {
    url = "Drei211.csv";
    pageTitle = "Datenschutz";
  } else if (value === 17) {
    url = "vier213.csv";
    pageTitle = "Bürgerliches Gesetzbuch";
  } else if (value === 18) {
    url = "funf217.csv";
    pageTitle = "Strafgesetzbuch";
  } else if (value === 19) {
    url = "sechs219.csv";
    pageTitle = "Unfallverhütungsvorschriften";
  } else if (value === 20) {
    url = "sieben221.csv";
    pageTitle = "Waffenrecht";
  } else if (value === 21) {
    url = "MP18.csv";
    pageTitle = "Umgang mit Menschen";
  } else if (value === 22) {
    url = "Prüfung 1.csv";
    pageTitle = "Sicherheitstechnik";
  } else if (value === 23) {
    url = "Prüfung 2.csv";
    pageTitle = "Ergebnisse";
  } else if (value === 24) {
    url = "Prüfung 3.csv";
    pageTitle = "Weitere Themen";
  } else if (value === 25) {
    url = "Pr4.csv";
    pageTitle = "Zusätzliche Informationen";
  } else if (value === 26) {
    url = "Pr5.csv";
    pageTitle = "Vertiefung";
  } else {
    url = "Unterrichtung.csv";
    pageTitle = "Standard Titel";
  }

  document.title = pageTitle;
 document.getElementById('title-bar').innerHTML = `<h1>${pageTitle}</h1>`;

  if (url) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const parsedData = Papa.parse(data, {
          delimiter: ",",
          quoteChar: '"',
          header: false,
        });

        const rows = parsedData.data;
        const currentRowData = rows[rowNumber - 0];
         totalRows = rows.length - 1;
        buttonContainer.innerHTML = "";

        currentRowData.forEach((column, index) => {
          const labelId = "label" + (index + 4) * 10; // بناء معرف العنصر label المقابل لكل زر
          const label = document.getElementById(labelId);
          if (label) {
            // التأكد من وجود العنصر قبل تعديله
            label.style.backgroundColor = ""; // إعادة تعيين لون الخلفية للون الافتراضي
            label.textContent = "nothing";
          }

          if (column.trim() !== ".")
            if (column.trim() !== "") {
              // Ignorieren Sie Zellen mit einem Punkt
              const table = document.createElement("table");
              const tr = document.createElement("tr");
              const td = document.createElement("td");
              if (index === 0) {
                const label = document.createElement("label");
                label.textContent = column.trim();
                td.appendChild(label);
              } else {
                const button = document.createElement("button");
                button.textContent = column.trim();
                button.addEventListener("click", () => {
                  toggleButtonColor(button);
                });
                td.appendChild(button);

                // Hier wird überprüft, ob die Hintergrundfarbe des Buttons in FarbeinTable geändert werden soll
              }
              tr.appendChild(td);
              table.appendChild(tr);
              buttonContainer.appendChild(table);

              const emptyRow = document.createElement("div");
              emptyRow.style.height = "0px";
              buttonContainer.appendChild(emptyRow);
              if (index === 0) {
                table.style.backgroundColor = "#ccc";
              }
            }
        });

        // تحديث المتغير currentRow
        currentRow = rowNumber;

        // تحديث عناصر الصفحة الأخرى
        updatePageElements(rowNumber);
      })
      .catch((error) => console.error("Error fetching CSV file:", error));
  }
}

// تحديث عناصر الصفحة الأخرى
function updatePageElements(rowNumber) {
  // تحديث المتغير currentRowIndex
  currentRowIndex = rowNumber - 1;

  // Aktualisieren der aktuellen Frage Nummer
  const questionNumber = rowNumber + 0;

  // Anzeigen der Frage Nummer in labelIndex
  document.getElementById("labelIndex").textContent = ` ${questionNumber}`;
  document.getElementById("label1").textContent = ``;

  // Aktualisieren und nächsten Buttons basierend auf der Frage Nummer
  if (questionNumber === 1) {
    document.getElementById("back").style.display = "none";
  } else {
    document.getElementById("back").style.display = "block";
  }

  if (questionNumber >= totalRows) {
    document.getElementById("next").style.display = "none";
  } else {
    document.getElementById("next").style.display = "block";


  }

  // Nach Anzeige der neuen Frage, führen Sie die checkTextMatch Funktion aus
  checkTextMatch();

  // Hinzufügen des Index zur Liste 2
  addIndexToList2(rowNumber);

  Shawqi();

  const labelIndex = parseInt(
    document.getElementById("labelIndex").textContent
  );

  // استخدم الفهرس لتحديد الزر المرتبط به في الجدول الآخر
  const tableBody = document.getElementById("table-body");
  const targetButton = tableBody.querySelector(
    `tr:nth-child(${labelIndex + 0}) button`
  );

  var resultsContainer9 = document.getElementById("resultsContainer9");
  var buttonContainer = document.getElementById("button-container");

  if (
    resultsContainer9.style.display === "none" ||
    buttonContainer.style.display === "flex"
  ) {
    checkAnswers(); // استدعاء الدالة checkAnswers()

    if (targetButton) {
      targetButton.style.backgroundColor = label1.style.color;
    }

    // استدعاء أي وظائف إضافية هنا
    FarbeinTable();
  }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  displayRow(1); // عرض الصف الأول عند تحميل الصفحة
});

// تعريف دالة لتبديل لون الزر
function toggleButtonColor(button) {
  // كود لتبديل لون الزر هنا
}

// تعريف دالة لإضافة الفهرس إلى list2
function addIndexToList2(index) {
  // كود لإضافة الفهرس إلى list2 هنا
}

function toggleButtonColor(button) {
  const table = button.closest("table");
  if (button.style.backgroundColor === "rgb(255, 255, 3)") {
    button.style.color = "#ffffff";
    button.style.backgroundColor = "#0603aa";
    table.style.backgroundColor = "#0603aa";
  } else {
    button.style.color = "rgb(2, 0, 0)";
    button.style.backgroundColor = "rgb(255, 255, 3)";
    table.style.backgroundColor = "rgb(255, 255, 3)";
  }

  // Check if the button is the first button in the button-container
  const buttons = document.querySelectorAll("#button-container button");
  if (button === buttons[0]) {
    const label40 = document.getElementById("label40");
    label40.style.backgroundColor = button.style.backgroundColor;
  }

  if (button === buttons[1]) {
    const label50 = document.getElementById("label50");
    label50.style.backgroundColor = button.style.backgroundColor;
  }

  if (button === buttons[2]) {
    const label60 = document.getElementById("label60");
    label60.style.backgroundColor = button.style.backgroundColor;
  }

  if (button === buttons[3]) {
    const label70 = document.getElementById("label70");
    label70.style.backgroundColor = button.style.backgroundColor;
  }

  if (button === buttons[4]) {
    const label80 = document.getElementById("label80");
    label80.style.backgroundColor = button.style.backgroundColor;
  }

  if (table.style.backgroundColor === "rgb(255, 255, 3)") {
    const ButtonText = button.textContent;
    const listItems = document.getElementById("list").textContent.trim();
    if (!listItems.includes(ButtonText)) {
      const li = document.createElement("li");
      li.textContent = ButtonText;
      li.id = `listItem${liIndex++}`; // Assign a unique ID to each <li> element
      document.getElementById("list").appendChild(li);
      checkTextMatch();
      FarbeinTable();
    }
  }

  const computedStyle = getComputedStyle(button);
  const backgroundColor = computedStyle.backgroundColor;
  if (backgroundColor === "rgb(6, 3, 170)") {
    const list = document.getElementById("list");
    const buttonText = button.textContent; // Extract the button text
    const listItemToRemove = Array.from(list.children).find(
      (item) => item.textContent === buttonText
    ); // Search for the item to remove based on its text
    if (listItemToRemove) {
      listItemToRemove.remove(); // Remove the item from the list if found
      liIndex--; // Update the index for subsequent items
    }
  }

  // احصل على قيمة الفهرس من العنصر HTML
  const labelIndex = parseInt(
    document.getElementById("labelIndex").textContent
  );

  // استخدم الفهرس لتحديد الزر المرتبط به في الجدول الآخر
  const tableBody = document.getElementById("table-body");
  const targetButton = tableBody.querySelector(
    `tr:nth-child(${labelIndex + 0}) button`
  );

  if (targetButton) {
    // قم بتغيير اللون أو أي عملية أخرى حسب الحالة
    if (button.style.backgroundColor === "rgb(255, 255, 3)") {
      targetButton.style.backgroundColor = button.style.backgroundColor;
    } else {
      targetButton.style.backgroundColor = "";
    }

    // استدعاء أي وظائف إضافية هنا
    FarbeinTable();
  }
}

function checkTextMatch() {
  const buttons = document.querySelectorAll("#button-container button");
  const listItems = document.getElementById("list").textContent.trim();

  buttons.forEach((button) => {
    const buttonText = button.textContent.trim();

    // التحقق من مطابقة النصوص وتغيير الألوان بناءً على ذلك
    if (listItems.includes(buttonText)) {
      button.style.backgroundColor = "rgb(255, 255, 3)";
      button.style.color = "#000"; // تغيير لون النص لزيادة وضوحه
    } else {
      button.style.backgroundColor = "#0603aa";
      button.style.color = "#fff"; // إعادة لون النص للون الأصلي
    }

    const table = button.closest("table"); // تحديد الجدول المرتبط بالزر
    if (table) {
      // تغيير لون الجدول بناءً على حالة الزر
      if (button.style.backgroundColor === "rgb(255, 255, 3)") {
        table.style.backgroundColor = "rgb(255, 255, 3)";
      } else {
        table.style.backgroundColor = "#0603aa";
      }
    }

    // تحديد الزر في الجدول وتغيير لونه بناءً على حالة الزر
    if (button === buttons[0]) {
      const label40 = document.getElementById("label40");
      label40.style.backgroundColor = button.style.backgroundColor;
    }

    if (button === buttons[1]) {
      const label50 = document.getElementById("label50");
      label50.style.backgroundColor = button.style.backgroundColor;
    }

    if (button === buttons[2]) {
      const label60 = document.getElementById("label60");
      label60.style.backgroundColor = button.style.backgroundColor;
    }

    if (button === buttons[3]) {
      const label70 = document.getElementById("label70");
      label70.style.backgroundColor = button.style.backgroundColor;
    }

    if (button === buttons[4]) {
      const label80 = document.getElementById("label80");
      label80.style.backgroundColor = button.style.backgroundColor;
    }
  });
}

// عرض السؤال الأول عند بداية التحميل
displayRow(currentRow);

document.getElementById("next").addEventListener("click", () => {
  Shawqi();
  restoreOriginalText();
  const labelIndex = parseInt(
    document.getElementById("labelIndex").textContent
  );
  const nextLabelIndex = labelIndex + 1;

  // هنا يمكنك استخدام nextLabelIndex لجلب السؤال التالي وعرضه
  displayRow(nextLabelIndex);
  currentRow = nextLabelIndex;
});

document.getElementById("back").addEventListener("click", () => {
  Shawqi();
  restoreOriginalText();

  // التأكد من أن الصف الحالي أكبر من 1 قبل الانتقال للخلف

  const labelIndex = parseInt(
    document.getElementById("labelIndex").textContent
  );
  const previousLabelIndex = labelIndex - 1;
  // استخدام previousLabelIndex لجلب السؤال السابق وعرضه
  displayRow(previousLabelIndex);
  // تحديث الصف الحالي بعد الانتقال للخلف
  currentRow = previousLabelIndex;
});

const buttons = document.querySelectorAll("#button-container button");
buttons.forEach((button, index) => {
  const answer = button.textContent.trim();
  const correctAnswer = correctAnswers[currentRow - 1][index];

  if (!correctAnswer) {
    if (button.style.backgroundColor === "rgb(255, 255, 3)") {
      button.style.backgroundColor = "red";
      if (button === buttons[0]) {
        const label40 = document.getElementById("label40");
        document.getElementById("label40").innerText = "0";
      }
    }
  } else {
    button.style.backgroundColor = "green";
    const ButtonText = button.textContent;
    document.getElementById("label1").textContent = answer + ", ";

    if (button === buttons[0]) {
      const label40 = document.getElementById("label40");
      document.getElementById("label40").innerText = "1";
    }
  }
  const table = button.closest("table");
  if (table.style.backgroundColor === "rgb(255, 255, 3)") {
    const ButtonText = button.textContent;
    document.getElementById(
      "list"
    ).innerHTML += `<li id="${button.id}">${ButtonText}</li>`; // تعيين معرف فريد لكل عنصر <li>
  }
});

function checkAnswers() {
  document.getElementById("label1").display = "flex";

  var label1 = document.getElementById("label1");
  label1.style.display = "flex";
  const buttons_Answers = document.querySelectorAll("#button-container button");
  buttons_Answers.forEach((button) => {
    button.disabled = true;
  });

  if (correctAnswers.length === 0) {
    alert("Seite wird geladen. Bitte warten...");
    return;
  }

  let answerCorrect = true; // تفترض الإجابة الصحيحة في البداية

  const buttons = document.querySelectorAll("#button-container button");
  buttons.forEach((button, index) => {
    const answer = button.textContent.trim();
    const correctAnswer = correctAnswers[currentRow - 1][index];
    const table = button.closest("table");

    // التحقق من صحة الإجابة وتحديد لون الزر والنص في الوسم
    if (!correctAnswer) {
      if (button.style.backgroundColor === "rgb(255, 255, 3)") {
        button.style.backgroundColor = "red";
        answerCorrect = false; // إذا كان هناك زر لونه أحمر فإن الإجابة خاطئة
      }
    } else {
      button.style.backgroundColor = "green";
      document.getElementById("label1").textContent = answer + ", ";

      // إذا كانت الإجابة صحيحة، أضف الفهرس (index) إلى list2
    }

    // التحقق من لون خلفية الجدول وتحديد صحة الإجابة بناءً على ذلك
    if (
      button.style.backgroundColor === "green" &&
      (!table || table.style.backgroundColor !== "rgb(255, 255, 3)")
    ) {
      answerCorrect = false;
    }
  });
  const currentCorrectAnswers = correctAnswers[currentRowIndex - 1];

  // تعيين النص بناءً على صحة الإجابة
  if (answerCorrect) {
    document.getElementById("label1").innerText = "Richtig beantwortet!";
    document.getElementById("label1").style.color = "green";

    const list2Element = document.getElementById("list2");
    const questionNumber = parseInt(
      document.getElementById("labelIndex").textContent.split(" ")[1]
    );
    const listItems = list2Element.textContent.trim();

    if (!listItems.includes(questionNumber.toString())) {
      // تأكد من عدم وجود العنصر في القائمة بالفعل
      const li = document.createElement("li");
      li.textContent = questionNumber;
      list2Element.appendChild(li);
    }
  } else {
    document.getElementById("label1").innerText = "Falsch beantwortet!";
    document.getElementById("label1").style.color = "red";

    const list2Element = document.getElementById("list2");
    const questionNumber = parseInt(
      document.getElementById("labelIndex").textContent.split(" ")[1]
    );
    const listItems = list2Element.textContent.trim();

    if (listItems.includes(questionNumber.toString())) {
      // تحقق مما إذا كان العنصر موجودًا في الفهرس
      const listItemToRemove = Array.from(list2Element.children).find(
        (item) => item.textContent === questionNumber.toString()
      ); // البحث عن العنصر المراد حذفه بناء على النص
      if (listItemToRemove) {
        listItemToRemove.remove(); // حذف العنصر من القائمة إذا تم العثور عليه
        liIndex--; // إزالة العنصر من الفهرس
      }
    }
  }
}

document.getElementById("checkAnswers").addEventListener("click", checkAnswers);

document.getElementById("listenButton").addEventListener("click", () => {
  const listenButton = document.getElementById("listenButton");
  if (listenButton.innerText === "Hören") {
    listenButton.innerText = "Stop";

    // بدء النطق
    adjustSpeechRate("male", 1.0);
  } else {
    listenButton.innerText = "Hören";

    // إيقاف النطق
    window.speechSynthesis.cancel();
  }
});

function adjustSpeechRate(gender, speed) {
  // كود إعداد النص للنطق
  const buttons = document.querySelectorAll(
    "#button-container label, #button-container button"
  );
  let textToSpeak = "";
  buttons.forEach((button) => {
    textToSpeak += button.textContent.trim() + ". ";
  });

  // إنشاء كائن النطق
  const speechSynthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = "de-DE";

  // تعيين السرعة والصوت
  if (gender === "male") {
    utterance.pitch = 0.0; // قد يختلف هذا الرقم حسب المتصفح
  } else if (gender === "female") {
    utterance.pitch = 3.0; // قد يختلف هذا الرقم حسب المتصفح
  }

  // تعيين سرعة النطق
  utterance.rate = speed; // القيمة الافتراضية هي 1.0

  // بدء النطق
  speechSynthesis.speak(utterance);
}



function showResults9() {
  // تأكد من أن rows يحتوي فقط على الصفوف التي تحتوي على بيانات غير فارغة
  const rows = Array.from(document.querySelectorAll("table tr"))
                    .filter(row => row.querySelectorAll("td, th").length > 0); // تأكد من أن الصف يحتوي على خلايا

  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));

  const count = itemsFromList2.length;

  // تحديد الحد الأقصى (تجاهل الصف الأول)
  const maxScore = totalRows > 1 ? totalRows : 1; // تأكد أن maxScore لا يكون أقل من 1

  // تحديد value9 بناءً على count و maxScore
  const value9 = count > maxScore ? maxScore : count;

  // عرض عدد الإجابات الصحيحة والخاطئة
  const correctAnswers = value9;
  const wrongAnswers = maxScore - value9;

  document.getElementById("Richtige Antworten Zahl").textContent =
    `Fragen richtig beantwortet: ${correctAnswers}`;
  document.getElementById("Falsche Antworten Zahl").textContent =
    `Fragen falsch beantwortet: ${wrongAnswers}`;

  document.getElementById(
    "subjectTitle9"
  ).textContent = `Punkte: (${value9} von ${maxScore})`;

  // حساب النسبة
  const percentage = (value9 / maxScore) * 100;
  document.getElementById("progressBar9").style.width = `${percentage}%`;
  document.getElementById("percentage9").textContent = `${percentage.toFixed(0)}%`;

  // تغيير لون الشريط بناءً على النسبة
  document.getElementById("progressBar9").style.backgroundColor =
    percentage < 50 ? "red" : "green";

  return value9;
}


const totalAverage =

  showResults9();

console.log("المتوسط العام:", totalAverage);

function hideResultsDisplay() {
 var resultsContainer9 = document.getElementById("resultsContainer9");
 resultsContainer9.style.display = "flex";

  

  var next = document.getElementById("next");
  next.style.display = "none";

  var back = document.getElementById("back");
  back.style.display = "none";

  var showResults = document.getElementById("showResults");
  showResults.style.display = "none";

  var checkAnswers = document.getElementById("checkAnswers");
  checkAnswers.style.display = "none";
  var listenButton = document.getElementById("listenButton");
  listenButton.style.display = "none";

  var buttonContainer = document.getElementById("button-container");
  buttonContainer.style.display = "none"; // إظهار عنصر الأزرار

  var footer = document.querySelector("footer");
  footer.style.display = "none";

  var richtige = document.getElementById("Richtige Antworten Zahl");
  var falsche = document.getElementById("Falsche Antworten Zahl");
  richtige.style.display = "block";
  falsche.style.display = "block";
  
}

document.querySelector("#showResults").addEventListener("click", () => {
  if (document.getElementById("showResults").innerText === "Prüfung abgeben") {
    Shawqi(); // استدعاء الدالة Shawqi
  }
  

  Punkte.style.display = "block";


  var listenButton = document.getElementById("listenButton");

  if (document.getElementById("showResults").innerHTML == "Prüfung abgeben") {
    const confirmation = confirm(
      "Möchtest du wirklich den Test beenden und deine Ergebnisse sehen?"
    );

    // التحقق من رد المستخدم
    if (confirmation) {

      // قم بتنفيذ الأوامر
      executeResults();
      document.getElementById("showResults").innerText = "Ergebnisse ansehen";


    }
  } else {
    // إذا كان مخفيًا، قم بتنفيذ الأوامر مباشرة
    executeResults();
  }
});

// دالة لتنفيذ الأوامر المشتركة في كلتا الحالتين
function executeResults() {
  hideResultsDisplay();
 
  showResults9();

  activateFinalResult();
  AlleFarben();
  pageTitle = "Ergebnisse";
  document.getElementById("title-bar").innerHTML = `<h1>${pageTitle}</h1>`;
  var label1 = document.getElementById("label1");
  label1.style.display = "none";

  // const currentTime = new Date().getTime();
  // const elapsedTime = startTime - currentTime;
  // const totalDuration = 120 * 60 * 1000;
  // const elapsedMinutes = Math.floor(
  //   (elapsedTime % totalDuration) / (1000 * 60)
  // );
  // const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  // document.getElementById(
   // "countdown-timer"
  //.innerText = `Zeit verbraucht: ${elapsedMinutes} Minuten ${elapsedSeconds} Sekunden`;
}

function activateFinalResult() {
  const totalPercentage =
 
    showResults9();

  const finalResultText = document.getElementById("finalResultText");
  if (isNaN(totalPercentage)) {
    finalResultText.textContent = "DU SOLLTEST MEHR ÜBEN";
    finalResultText.style.color = "red";
    finalResultText.style.fontWeight = "bold";
  } else if (totalPercentage < 50) {
    finalResultText.innerHTML = `<p><strong>Bewertung</strong>; <span style="color: rgb(226, 80, 65); font-size: 22px;">"DU SOLLTEST MEHR ÜBEN"</span><br><strong>Gesamtpunkte: &quot;<span style="font-size: 22px;">${totalPercentage}</span>&quot; Punkte</strong></p>`;
  } else {
    finalResultText.innerHTML = `<p><strong>Bewertung</strong>&nbsp; <strong><span style="font-size: 22px; color: rgb(97, 189, 109);">"GUT"</span></strong></p>
<p><strong>Gesamtpunkte: </strong><span style="font-size: 22px;">${totalPercentage}</span> Punkte erreicht</p>`;
  }
  finalResultText.style.display = "block";
}

document.getElementById("Pro").addEventListener("click", () => {
  const buttons_Answers = document.querySelectorAll("#button-container button");
  buttons_Answers.forEach((button) => {
    button.disabled = true;
  });

  if (correctAnswers.length === 0) {
    alert("Seite wird geladen. Bitte warten....");
    return;
  }

  let answerCorrect = true; // تفترض الإجابة الصحيحة في البداية

  const buttons = document.querySelectorAll("#button-container button");
  buttons.forEach((button, index) => {
    const answer = button.textContent.trim();
    const correctAnswer = correctAnswers[currentRow - 1][index];
    const table = button.closest("table");

    if (correctAnswer || !correctAnswer) {
      const labelIndex = parseInt(
        document.getElementById("labelIndex").textContent
      );
      const tableBody = document.getElementById("table-body");
      const targetButton = tableBody.querySelector(
        `tr:nth-child(${labelIndex + 0}) button`
      );

      if (button.style.backgroundColor == "rgb(255, 255, 3)") {
        targetButton.style.backgroundColor = "rgb(255, 255, 3)";
        FarbeinTable();
      }
    }

    // التحقق من صحة الإجابة وتحديد لون الزر والنص في الوسم
    if (!correctAnswer) {
      if (button.style.backgroundColor === "rgb(255, 255, 3)") {
        answerCorrect = false;
        if (button === buttons[0]) {
          const label40 = document.getElementById("label40");
          label40.textContent = 0;
        }
        if (button === buttons[1]) {
          const label50 = document.getElementById("label50");
          label50.textContent = 0;
        }
        if (button === buttons[2]) {
          const label60 = document.getElementById("label60");
          label60.textContent = 0;
        }
        if (button === buttons[3]) {
          const label70 = document.getElementById("label70");
          label70.textContent = 0;
        }
        if (button === buttons[4]) {
          const label80 = document.getElementById("label80");
          label80.textContent = 0;
        }
      }
    } else {
      document.getElementById("label1").textContent = answer + ", ";
      if (button === buttons[0]) {
        const label40 = document.getElementById("label40");
        label40.textContent = 1;
      }
      if (button === buttons[1]) {
        const label50 = document.getElementById("label50");
        label50.textContent = 1;
      }
      if (button === buttons[2]) {
        const label60 = document.getElementById("label60");
        label60.textContent = 1;
      }
      if (button === buttons[3]) {
        const label70 = document.getElementById("label70");
        label70.textContent = 1;
      }
      if (button === buttons[4]) {
        const label80 = document.getElementById("label80");
        label80.textContent = 1;
      }
    }

    if (
      (label40.textContent === "1" &&
        label40.style.backgroundColor !== "rgb(255, 255, 3)") ||
      (label50.textContent === "1" &&
        label50.style.backgroundColor !== "rgb(255, 255, 3)") ||
      (label60.textContent === "1" &&
        label60.style.backgroundColor !== "rgb(255, 255, 3)") ||
      (label70.textContent === "1" &&
        label70.style.backgroundColor !== "rgb(255, 255, 3)") ||
      (label80.textContent === "1" &&
        label80.style.backgroundColor !== "rgb(255, 255, 3)")
    ) {
      answerCorrect = false;
    }
  });
  const currentCorrectAnswers = correctAnswers[currentRowIndex - 1];

  // تعيين النص بناءً على صحة الإجابة
  if (answerCorrect) {
    document.getElementById("label1").innerText = "Richtig beantwortet!";
    document.getElementById("label1").style.color = "green";

    const list2Element = document.getElementById("list2");
    const questionNumber = parseInt(
      document.getElementById("labelIndex").textContent.split(" ")[1]
    );
    const listItems = list2Element.textContent.trim();

    if (!listItems.includes(questionNumber.toString())) {
      // تأكد من عدم وجود العنصر في القائمة بالفعل
      const li = document.createElement("li");
      li.textContent = questionNumber;
      list2Element.appendChild(li);
    }
  } else {
    document.getElementById("label1").innerText = "Falsch beantwortet!";
    document.getElementById("label1").style.color = "red";

    const list2Element = document.getElementById("list2");
    const questionNumber = parseInt(
      document.getElementById("labelIndex").textContent.split(" ")[1]
    );
    const listItems = list2Element.textContent.trim();

    if (listItems.includes(questionNumber.toString())) {
      // تحقق مما إذا كان العنصر موجودًا في الفهرس
      const listItemToRemove = Array.from(list2Element.children).find(
        (item) => item.textContent === questionNumber.toString()
      ); // البحث عن العنصر المراد حذفه بناء على النص
      if (listItemToRemove) {
        listItemToRemove.remove(); // حذف العنصر من القائمة إذا تم العثور عليه
        liIndex--; // إزالة العنصر من الفهرس
      }
    }
  }
});

function AlleFarben() {
  const list2Items = document
    .getElementById("list2")
    .getElementsByTagName("li");

  // تحديد أزرار الجدول
  const tableButtons = document.querySelectorAll("#table-body button");

  // الاستمرار في فحص كل زر في الجدول
  tableButtons.forEach((button, index) => {
    let found = false; // مؤشر للتحقق مما إذا كان العنصر موجودًا في list2 أم لا
    for (let i = 0; i < list2Items.length; i++) {
      const listItemText = parseInt(list2Items[i].textContent);
      if (listItemText === index + 1) {
        // +1 لأن list2 يبدأ من 1 و index يبدأ من 0
        found = true;
        break;
      }
    }
    // تغيير لون الزر بناءً على العثور على العنصر في list2
    if (found) {
      button.style.backgroundColor = "green"; // لون الزر الأخضر لوجود العنصر في list2
    } else {
      button.style.backgroundColor = "red"; // لون الزر الأحمر لعدم وجود العنصر في list2
    }
  });
}

function Shawqi() {
  document.getElementById("label1").style.display = "none";
  const listenButton = document.getElementById("listenButton");
  if (listenButton.innerText === "Stop") {
    listenButton.innerText = "Hören";

    // بدء النطق
    adjustSpeechRate("male", 1.0);
  } else {
    listenButton.innerText = "Hören";

    // إيقاف النطق
    window.speechSynthesis.cancel();
  }

  if (correctAnswers.length === 0) {
    alert("Seite wird geladen. Bitte warten...");
    return;
  }

  let answerCorrect = true; // تفترض الإجابة الصحيحة في البداية

  const buttons = document.querySelectorAll("#button-container button");
  buttons.forEach((button, index) => {
    const answer = button.textContent.trim();
    const correctAnswer = correctAnswers[currentRow - 1][index];
    const table = button.closest("table");

    if (correctAnswer || !correctAnswer) {
      const labelIndex = parseInt(
        document.getElementById("labelIndex").textContent
      );
      const tableBody = document.getElementById("table-body");
      const targetButton = tableBody.querySelector(
        `tr:nth-child(${labelIndex + 0}) button`
      );

      if (button.style.backgroundColor === "rgb(255, 255, 3)") {
        targetButton.style.backgroundColor = button.style.backgroundColor;
      }
    }

    // التحقق من صحة الإجابة وتحديد لون الزر والنص في الوسم
    if (!correctAnswer) {
      if (button.style.backgroundColor === "rgb(255, 255, 3)") {
        answerCorrect = false;
        if (button === buttons[0]) {
          const label40 = document.getElementById("label40");
          label40.textContent = 0;
        }
        if (button === buttons[1]) {
          const label50 = document.getElementById("label50");
          label50.textContent = 0;
        }
        if (button === buttons[2]) {
          const label60 = document.getElementById("label60");
          label60.textContent = 0;
        }
        if (button === buttons[3]) {
          const label70 = document.getElementById("label70");
          label70.textContent = 0;
        }
        if (button === buttons[4]) {
          const label80 = document.getElementById("label80");
          label80.textContent = 0;
        }
      }
    } else {
      document.getElementById("label1").textContent = answer + ", ";
      if (button === buttons[0]) {
        const label40 = document.getElementById("label40");
        label40.textContent = 1;
      }
      if (button === buttons[1]) {
        const label50 = document.getElementById("label50");
        label50.textContent = 1;
      }
      if (button === buttons[2]) {
        const label60 = document.getElementById("label60");
        label60.textContent = 1;
      }
      if (button === buttons[3]) {
        const label70 = document.getElementById("label70");
        label70.textContent = 1;
      }
      if (button === buttons[4]) {
        const label80 = document.getElementById("label80");
        label80.textContent = 1;
      }
    }

    if (
      (label40.textContent === "1" &&
        label40.style.backgroundColor !== "rgb(255, 255, 3)") ||
      (label50.textContent === "1" &&
        label50.style.backgroundColor !== "rgb(255, 255, 3)") ||
      (label60.textContent === "1" &&
        label60.style.backgroundColor !== "rgb(255, 255, 3)") ||
      (label70.textContent === "1" &&
        label70.style.backgroundColor !== "rgb(255, 255, 3)") ||
      (label80.textContent === "1" &&
        label80.style.backgroundColor !== "rgb(255, 255, 3)")
    ) {
      answerCorrect = false;
    }
  });
  const currentCorrectAnswers = correctAnswers[currentRowIndex - 1];

  // تعيين النص بناءً على صحة الإجابة
  if (answerCorrect) {
    document.getElementById("label1").innerText = "Richtig beantwortet!";
    document.getElementById("label1").style.color = "green";

    const list2Element = document.getElementById("list2");
    const questionNumber = parseInt(
      document.getElementById("labelIndex").textContent.split(" ")[1]
    );
    const listItems = list2Element.innerText.trim();

    if (!listItems.includes(questionNumber.toString())) {
      // تأكد من عدم وجود العنصر في القائمة بالفعل
      const li = document.createElement("li");
      li.textContent = questionNumber;
      list2Element.appendChild(li);
    }
  } else {
    document.getElementById("label1").innerText = "Falsch beantwortet!";
    document.getElementById("label1").style.color = "red";

    const list2Element = document.getElementById("list2");
    const questionNumber = parseInt(
      document.getElementById("labelIndex").textContent.split(" ")[1]
    );
    const listItems = list2Element.innerText.trim();

    if (listItems.includes(questionNumber.toString())) {
      // تحقق مما إذا كان العنصر موجودًا في الفهرس
      const listItemToRemove = Array.from(list2Element.children).find(
        (item) => item.textContent === questionNumber.toString()
      ); // البحث عن العنصر المراد حذفه بناء على النص
      if (listItemToRemove) {
        listItemToRemove.remove(); // حذف العنصر من القائمة إذا تم العثور عليه
        liIndex--; // إزالة العنصر من الفهرس
      }
    }
  }
}
const startTime = new Date().getTime();
const duration = 120 * 60 * 1000; // 120 دقيقة محولة إلى ميلي ثانية
const endTime = startTime + duration; // تحديد وقت الانتهاء

// دالة عرض الوقت المتبقي
function displayCountdown(minutes, seconds) {
  if (listenButton.style.display === "") {
    document.getElementById("countdown-timer").textContent = "";
  }
}


// بدء العد التنازلي
const countdownInterval = setInterval(() => {
  const currentTime = new Date().getTime();
  const remainingTime = endTime - currentTime;

  // تحويل الوقت المتبقي إلى دقائق وثواني
  const minutes = Math.floor((remainingTime % (1000 * 60 * 120)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  // عرض الوقت المتبقي
  displayCountdown(minutes, seconds);

  // عند انتهاء الوقت
  if (remainingTime <= 0) {
    clearInterval(countdownInterval); // توقف العد التنازلي
    console.log("Die Zeit ist abgelaufen!"); // أداء الإجراء المطلوب عند انتهاء الوقت
  }
}, 1000); // يتم تحديث العد كل ثانية
function iconeHeder() {
  const icone = document.querySelector(".icon");
  const tableContainer = document.querySelector(".table-container");

  // إضافة مستمع الحدث عند النقر على الأيقونة
  icone.addEventListener("click", function (event) {
    event.stopPropagation(); // منع الحدث من الانتقال إلى العناصر الأب
    tableContainer.classList.toggle("tableAdd");
  });

  // إضافة مستمع الحدث للنقر على النافذة
  window.addEventListener("click", function (event) {
    // التحقق إذا كان النقر ليس داخل الـ tableContainer أو الأيقونة
    if (!tableContainer.contains(event.target) && event.target !== icone) {
      tableContainer.classList.remove("tableAdd"); // إزالة الكلاس
    }
  });
}

iconeHeder();



// إضافة خاصية التمرير إلى الأعلى لزر "Weiter"
document.getElementById('next').addEventListener('click', function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

// إضافة خاصية التمرير إلى الأعلى لزر "Zurück"
document.getElementById('back').addEventListener('click', function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

function iconeHeder() {
  const icone = document.querySelector(".icon");
  const tableContainer = document.querySelector(".table-container");

  // إضافة مستمع الحدث عند النقر على الأيقونة
  icone.addEventListener("click", function (event) {
    event.stopPropagation(); // منع الحدث من الانتقال إلى العناصر الأب
    tableContainer.classList.toggle("tableAdd");
  });

  // إضافة مستمع الحدث للنقر على النافذة
  window.addEventListener("click", function (event) {
    // التحقق إذا كان النقر ليس داخل الـ tableContainer أو الأيقونة
    if (!tableContainer.contains(event.target) && event.target !== icone) {
      tableContainer.classList.remove("tableAdd"); // إزالة الكلاس
    }
      if (tableContainer.contains(event.target) && event.target !== icone) {
        tableContainer.classList.remove("tableAdd"); // إزالة الكلاس
      }
    
  });
}



