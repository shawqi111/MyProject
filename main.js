let originalHTML = ""; // متغير لحفظ النص الأصلي بالتنسيق
let isTranslated = false; // حالة لمعرفة ما إذا كان النص مترجماً
const comboOptionsMap = {};


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
      url = "NeuePrJuli.csv";
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
                window.getComputedStyle(resultsContainer5).display === "flex" &&
                window.getComputedStyle(buttonContainer).display === "none"
              ) {
                resultsContainer5.style.display = "none";
                buttonContainer.style.display = "flex";
                resultsContainer.style.display = "none";

                finalResultText.style.display = "none";

                resultsContainer2.style.display = "none";
                resultsContainer3.style.display = "none";
                resultsContainer4.style.display = "none";
                resultsContainer6.style.display = "none";
                resultsContainer7.style.display = "none";
                resultsContainer8.style.display = "none";
                resultsContainer9.style.display = "none";

                document.getElementById("showResults").style.display = "flex";
                document.getElementById("showResults").style.width = "100px";

                document.getElementById("showResults").innerText =
                  "Ergebnisse ansehen";
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
  url = "LösungPr5.csv";
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
      correctAnswers = parsedData.data.slice(2);
    })
    .catch((error) =>
      console.error("Error fetching correct answers CSV file:", error)
    );
}

function getCorrectComboFromRow(rowData) {
  const letters = ['A', 'B', 'C', 'D', 'E']; // الأعمدة
  let combo = '';

  rowData.forEach((cell, index) => {
    if (cell.trim() !== '') {
      combo += letters[index]; // اجمع الحروف غير الفارغة
    }
  });

  return combo;
}

function generateSmartCombos(correct, count = 4) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const allCombos = [];

  for (let i = 0; i < letters.length; i++) {
    for (let j = i + 1; j < letters.length; j++) {
      const combo = letters[i] + letters[j];
      allCombos.push(combo);
    }
  }

  const correctSet = new Set(correct);
  const similar = allCombos.filter(combo => {
    return combo !== correct &&
           (correctSet.has(combo[0]) || correctSet.has(combo[1]));
  });

  const random = similar.sort(() => 0.5 - Math.random()).slice(0, count - 1);
  return [...random, correct].sort(() => 0.5 - Math.random());
}

function isSingleChoiceQuestion(questionNumber) {
  const singleChoiceNumbers = [
    5, 6, 7,     // Recht
    11, 12,      // Gewerberecht
    16, 17,      // Datenschutz
    26, 27, 28, 29, 30, // BGB
    39, 40, 41, 42, 43, // Strafrecht
    44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
    54, 55, 56, 57, 58, 59, 60, 61, 62,      // Umgang mit Menschen
    66, 67,      // Waffenrecht
    73, 74, 75,  // UVV
    80, 81, 82   // Sicherheitstechnik
  ];

  return singleChoiceNumbers.includes(questionNumber);
}

// دالة لعرض صف الجدول المحدد
function displayRow(rowNumber) {
  const correctRow = correctAnswers[rowNumber] || [];
  

if (document.getElementById("answer-debug")) {
  const visibleAnswers = correctRow.filter(cell => cell.trim() !== "").join(", ");
  document.getElementById("answer-debug").textContent =
    `Frage ${rowNumber}: Lösungen geladen → [${visibleAnswers}]`;
}
  const correctCombo = getCorrectComboFromRow(correctRow); // 🟢 أضف هذا مبكرًا!
  const correctCount = correctCombo.length;

  const isSingle = isSingleChoiceQuestion(rowNumber);
  const isComboQuestion = isSingle && correctCount === 2;
  

 

  const urlParams = new URLSearchParams(window.location.search);
  const value = parseInt(urlParams.get("value"));
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
    url = "Pr5.csv";
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

        const rows = parsedData.data;
        const currentRowData = rows[rowNumber - 0]; // لأن الصفوف تبدأ من 0
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
                
                // 🟡 أضف هذا السطر لتعيين الـ ID مباشرة عند الإنشاء
                const letter = String.fromCharCode(64 + index); // 65 = A → A, B, C...
                
                button.addEventListener("click", () => {
                  toggleButtonColor(button);
                });
                
                button.id = "btn" + letter;



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

            if (index === 4) {
              const checkboxRow = document.createElement("div");
              checkboxRow.style.display = "flex";
              checkboxRow.style.justifyContent = "space-evenly";
              checkboxRow.style.alignItems = "center";
              checkboxRow.style.marginTop = "10px";
              checkboxRow.style.marginBottom = "10px";
              checkboxRow.style.width = "100%";
              checkboxRow.classList.add("checkbox-row");
            
            
              

              
              if (isComboQuestion) {
             
                const correctCombo = getCorrectComboFromRow(correctAnswers[rowNumber] || []);
                let comboOptions = comboOptionsMap[rowNumber];
                
                
                if (!comboOptions) {
                  comboOptions = generateSmartCombos(correctCombo);
                  comboOptionsMap[rowNumber] = comboOptions; // تخزين دائم
                }
// إضافة label وهمي لتفادي تأثير :first-child في CSS
const dummyLabel = document.createElement("label");
dummyLabel.style.display = "none"; // لا يظهر
checkboxRow.appendChild(dummyLabel);



                                comboOptions.forEach((combo) => {
                  const label = document.createElement("label");
                  label.style.display = "flex";
                  label.style.alignItems = "center";
                  label.style.fontWeight = "bold";
                  label.innerHTML = `
                    <input type="checkbox" value="${combo}" onchange="handleComboCheckboxChange(this)" style="margin-right: 5px;">
                    ${combo}
                  `;
                  checkboxRow.appendChild(label);
                });
                buttonContainer.appendChild(checkboxRow);

                const savedCombo = checkboxSelections[rowNumber];
                if (savedCombo) {
                  const savedCheckbox = checkboxRow.querySelector(`input[value="${savedCombo}"]`);
                  if (savedCheckbox) {
                    savedCheckbox.checked = true;
                    savedCombo.split('').forEach(letter => {
                      const btn = document.getElementById("btn" + letter);
                      if (btn) toggleButtonColor(btn);
                    });
                  }
                }
              } else {
                const dummyLabel = document.createElement("label");
dummyLabel.style.display = "none"; // لا يظهر
checkboxRow.appendChild(dummyLabel);
                ['A', 'B', 'C', 'D'].forEach((letter) => {
                  const label = document.createElement("label");
                  label.style.display = "flex";
                  label.style.alignItems = "center";
                  label.style.fontWeight = "bold";
                  label.innerHTML = `
                    <input type="checkbox" value="${letter}" id="chk${letter}" onchange="handleCheckboxChange(this)" style="margin-right: 5px;">
                    ${letter}
                  `;
                  checkboxRow.appendChild(label);
                });
            
                // مزامنة التحديد مع الأزرار الصفراء
                setTimeout(() => {
                  ['A', 'B', 'C', 'D'].forEach((letter) => {
                    const btn = document.getElementById("btn" + letter);
                    const chk = document.getElementById("chk" + letter);
                    if (btn && chk) {
                      const computedStyle = window.getComputedStyle(btn);
                      if (computedStyle.backgroundColor === "rgb(255, 255, 3)") {
                        chk.checked = true;
                      }
                    }
                  });
                }, 0);
              }
              setTimeout(() => {
                const yellowColor = "rgb(255, 255, 3)";
                
                document.querySelectorAll(".checkbox-row input[type='checkbox']").forEach((chk) => {
                  const combo = chk.value; // مثل "AB"
                  const letters = combo.split("");
              
                  // تحقق أن كل زر في الخيار لونه أصفر
                  const allMatch = letters.every(letter => {
                    const btn = document.getElementById("btn" + letter);
                    return btn && window.getComputedStyle(btn).backgroundColor === yellowColor;
                  });
              
                  // تحقق أنه لا يوجد زر زائد بلون أصفر
                  const othersClear = ['A','B','C','D','E'].every(letter => {
                    if (!letters.includes(letter)) {
                      const btn = document.getElementById("btn" + letter);
                      if (!btn) return true;
                      return window.getComputedStyle(btn).backgroundColor !== yellowColor;
                    }
                    return true;
                  });
              
                  if (allMatch && othersClear) {
                    chk.checked = true;
                  }
                });
              }, 0);
              
              
              buttonContainer.appendChild(checkboxRow);
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
// متغير عالمي لحفظ اختيارات المستخدمين لكل سؤال
const checkboxSelections = {}; // مثل: {1: 'A', 2: 'C'}

function handleCheckboxChange(checkbox) {
  // السماح فقط بـ checkbox واحد
  
  const letter = checkbox.value;
  const btn = document.getElementById("btn" + letter);
  if (!btn) return;

  // 🟡 محاكاة الضغط على الزر
  toggleButtonColor(btn);

  // 📝 حفظ التحديد بناءً على رقم السؤال الحالي
  const questionNumber = parseInt(document.getElementById("labelIndex").textContent);
  checkboxSelections[questionNumber] = letter;
}

function handleComboCheckboxChange(checkbox) {
  // إلغاء تحديد كل checkboxes في نفس المجموعة
  document.querySelectorAll(".checkbox-row input[type='checkbox']").forEach(cb => {
    cb.checked = false;
  });
  checkbox.checked = true;

  const comboValue = checkbox.value; // مثل "AB"
  const questionNumber = parseInt(document.getElementById("labelIndex").textContent);
  checkboxSelections[questionNumber] = comboValue;

  // 🔄 إلغاء تفعيل الأزرار المفعلّة حاليًا (أي التي لونها أصفر فقط)
  ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
    const btn = document.getElementById("btn" + letter);
    if (btn) {
      const color = window.getComputedStyle(btn).backgroundColor;
      if (color === "rgb(255, 255, 3)") {
        toggleButtonColor(btn); // ⛔️ نلغي فقط الأزرار المفعلّة
      }
    }
  });

  // ✅ تفعيل الأزرار الجديدة
  comboValue.split('').forEach(letter => {
    const btn = document.getElementById("btn" + letter);
    if (btn) toggleButtonColor(btn); // تفعل فقط الأزرار المطلوبة
  });
}


// خارج أي دالة – هذا متغير عالمي لحفظ اختيارات المستخدم

// تحديث عناصر الصفحة الأخرى
function updatePageElements(rowNumber) {
  // تحديث المتغير currentRowIndex
  currentRowIndex = rowNumber - 1;

  // Aktualisieren der aktuellen Frage Nummer
  const questionNumber = rowNumber + 0;

  // Anzeigen der Frage Nummer in labelIndex
  document.getElementById("labelIndex").textContent = ` ${questionNumber}`;
  document.getElementById("label1").textContent = ``;


  let pageTitle;

  if (questionNumber >= 1 && questionNumber <= 7) {
    pageTitle = "Recht der öffentlichen Sicherheit und Ordnung";
    if (questionNumber >= 1 && questionNumber <= 4) {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#ff9d00";
      document.getElementById("AntwortenZahl").innerText = "(Multiple-Choice Fragen) 2 Punkte";
    } else {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#3453b177";
      document.getElementById("AntwortenZahl").innerText = "(Single-Choice Fragen) 1 Punkt";
    }
  } else if (questionNumber >= 8 && questionNumber <= 12) {
    pageTitle = "Gewerberecht";
    if (questionNumber >= 8 && questionNumber <= 10) {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#ff9d00";
      document.getElementById("AntwortenZahl").innerText = "(Multiple-Choice Fragen) 2 Punkte";
    } else {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#3453b177";
      document.getElementById("AntwortenZahl").innerText = "(Single-Choice Fragen) 1 Punkt";
    }
  } else if (questionNumber >= 13 && questionNumber <= 17) {
    pageTitle = "Datenschutz";
    if (questionNumber >= 13 && questionNumber <= 15) {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#ff9d00";
      document.getElementById("AntwortenZahl").innerText = "(Multiple-Choice Fragen) 2 Punkte";
    } else {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#3453b177";
      document.getElementById("AntwortenZahl").innerText = "(Single-Choice Fragen) 1 Punkt";
    }
  } else if (questionNumber >= 18 && questionNumber <= 30) {
    pageTitle = "Bürgerliches Recht";
    if (questionNumber >= 18 && questionNumber <= 25) {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#ff9d00";
      document.getElementById("AntwortenZahl").innerText = "(Multiple-Choice Fragen) 2 Punkte";
    } else {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#3453b177";
      document.getElementById("AntwortenZahl").innerText = "(Single-Choice Fragen) 1 Punkt";
    }
  } else if (questionNumber >= 31 && questionNumber <= 43) {
    pageTitle = "Straf- und Verfahrensrecht";
    if (questionNumber >= 31 && questionNumber <= 38) {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#ff9d00";
      document.getElementById("AntwortenZahl").innerText = "(Multiple-Choice Fragen) 2 Punkte";
    } else {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#3453b177";
      document.getElementById("AntwortenZahl").innerText = "(Single-Choice Fragen) 1 Punkt";
    }
  } else if (questionNumber >= 44 && questionNumber <= 62) {
    pageTitle = "Umgang mit Menschen";
    document.getElementById("AntwortenZahl").style.backgroundColor = "#3453b177";
    document.getElementById("AntwortenZahl").innerText = "(Single-Choice Fragen) 1 Punkt";
  } else if (questionNumber >= 63 && questionNumber <= 67) {
    pageTitle = "Waffenrecht";
    if (questionNumber >= 63 && questionNumber <= 65) {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#ff9d00";
      document.getElementById("AntwortenZahl").innerText = "(Multiple-Choice Fragen) 2 Punkte";
    } else {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#3453b177";
      document.getElementById("AntwortenZahl").innerText = "(Single-Choice Fragen 1 Punkt)";
    }
  } else if (questionNumber >= 68 && questionNumber <= 75) {
    pageTitle = "Unfallverhütungsvorschriften";
    if (questionNumber >= 68 && questionNumber <= 72) {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#ff9d00";
      document.getElementById("AntwortenZahl").innerText = "(Multiple-Choice Fragen) 2 Punkte";
    } else {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#3453b177";
      document.getElementById("AntwortenZahl").innerText = "(Single-Choice Fragen) 1 Punkt";
    }
  } else if (questionNumber >= 76 && questionNumber <= 82) {
    pageTitle = "Sicherheitstechnik";
    if (questionNumber >= 76 && questionNumber <= 79) {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#ff9d00";
      document.getElementById("AntwortenZahl").innerText = "(Multiple-Choice Fragen) 2 Punkte";
    } else {
      document.getElementById("AntwortenZahl").style.backgroundColor = "#3453b177";
      document.getElementById("AntwortenZahl").innerText = "(Single-Choice Fragen) 1 Punkt";
    }
  } else {
    pageTitle = "Ergebnisse";
  }
  

  // Ändern des Seitentitels
  document.title = pageTitle;

  // Aktualisieren der title-bar mit den Buttons
  document.getElementById("title-bar").innerHTML = `<h6>${pageTitle}</h6>`;

  // Anzeigen oder Ausblenden der vorherigen und nächsten Buttons basierend auf der Frage Nummer
  if (questionNumber === 1) {
    document.getElementById("back").style.display = "none"; // Verstecken Sie die Zurück-Taste
  } else if (questionNumber === 82) {
    document.getElementById("next").style.display = "none"; // Verstecken Sie die Nächste-Taste
  } else {
    // Wenn die Frage im Bereich von 2 bis 71 liegt, können Sie die Buttons wieder anzeigen
    document.getElementById("back").style.display = "block";
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

  var resultsContainer5 = document.getElementById("resultsContainer5");
  var buttonContainer = document.getElementById("button-container");

  if (
    resultsContainer5.style.display === "none" ||
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

function showResults() {
  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));
  const selectedNumbers = itemsFromList2.filter((item) =>
    [1, 2, 3, 4].includes(item)
  );
  const count = selectedNumbers.length;
  const value = count > 4 ? 8 : count * 2;

  document.getElementById(
    "subjectTitle"
  ).textContent = ` Recht der öffentlichen Sicherheit und Ordnung (${value} von 8)`;
  const percentage = value > 0 ? (value / 8) * 100 : 0;
  document.getElementById("progressBar").style.width = `${percentage}%`;
  document.getElementById("percentage").textContent = `${percentage}%`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(
    0
  )}%`; // تحويل النسبة إلى صيغة عادية بدون أرقام عشرية

  document.getElementById("progressBar").style.backgroundColor =
    percentage < 50 ? "red" : "green"; // تغيير لون الشريط

  return value; // إرجاع القيمة لحساب المتوسط
}

function showResults2() {
  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));
  const selectedNumbers = itemsFromList2.filter((item) =>
    [5, 6, 7, 8].includes(item)
  );
  const count = selectedNumbers.length;
  const value2 = count > 4 ? 8 : count * 1;

  document.getElementById(
    "subjectTitle2"
  ).textContent = ` Gewerberecht (${value2} von 4)`;
  const percentage = (value2 / 4) * 100; // تصحيح الخطأ هنا
  document.getElementById("progressBar2").style.width = `${percentage}%`;
  document.getElementById("percentage2").textContent = `${percentage}%`;
  document.getElementById("percentage2").textContent = `${percentage.toFixed(
    0
  )}%`; // تحويل النسبة إلى صيغة عادية بدون أرقام عشرية

  document.getElementById("progressBar2").style.backgroundColor =
    percentage < 50 ? "red" : "green"; // تغيير لون الشريط
  return value2;
}

function showResults3() {
  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));
  const selectedNumbers = itemsFromList2.filter((item) =>
    [9, 10, 11, 12].includes(item)
  );
  const count = selectedNumbers.length;
  const value3 = count > 4 ? 8 : count * 1;

  document.getElementById(
    "subjectTitle3"
  ).textContent = ` Datenschutz (${value3} von 4)`;
  const percentage = (value3 / 4) * 100;
  document.getElementById("progressBar3").style.width = `${percentage}%`;
  document.getElementById("percentage3").textContent = `${percentage}%`;
  document.getElementById("percentage3").textContent = `${percentage.toFixed(
    0
  )}%`; // تحويل النسبة إلى صيغة عادية بدون أرقام عشرية

  document.getElementById("progressBar3").style.backgroundColor =
    percentage < 50 ? "red" : "green"; // تغيير لون الشريط
  return value3;
}

function showResults4() {
  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));
  const selectedNumbers = itemsFromList2.filter((item) =>
    [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].includes(item)
  );
  const count = selectedNumbers.length;
  const value4 = count > 12 ? 24 : count * 2;

  document.getElementById(
    "subjectTitle4"
  ).textContent = `Bürgliches Gesetzbuch (${value4} von 24)`;
  const percentage = (value4 / 24) * 100;
  document.getElementById("progressBar4").style.width = `${percentage}%`;
  document.getElementById("percentage4").textContent = `${percentage.toFixed(
    0
  )}%`; // تحويل النسبة إلى صيغة عادية بدون أرقام عشرية
  document.getElementById("progressBar4").style.backgroundColor =
    percentage < 50 ? "red" : "green"; // تغيير لون الشريط
  return value4;
}

function showResults5() {
  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));
  const selectedNumbers = itemsFromList2.filter((item) =>
    [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].includes(item)
  );
  const count = selectedNumbers.length;
  const value5 = count > 12 ? 24 : count * 2;

  document.getElementById(
    "subjectTitle5"
  ).textContent = `Strafgesetzbuch (${value5} von 24)`;
  const percentage = (value5 / 24) * 100;
  document.getElementById("progressBar5").style.width = `${percentage}%`;
  document.getElementById("percentage5").textContent = `${percentage.toFixed(
    0
  )}%`; // تحويل النسبة إلى صيغة عادية بدون أرقام عشرية
  document.getElementById("progressBar5").style.backgroundColor =
    percentage < 50 ? "red" : "green"; // تغيير لون الشريط
  return value5;
}

function showResults6() {
  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));
  const selectedNumbers = itemsFromList2.filter((item) =>
    [37, 38, 39, 40, 41, 42, 43, 44].includes(item)
  );
  const count = selectedNumbers.length;
  const value6 = count > 4 ? 8 : count * 1;

  document.getElementById(
    "subjectTitle6"
  ).textContent = ` Unfallverhütungsvorschriften (${value6} von 8)`;
  const percentage = (value6 / 8) * 100;
  document.getElementById("progressBar6").style.width = `${percentage}%`;
  document.getElementById("percentage6").textContent = `${percentage}%`;
  document.getElementById("percentage6").textContent = `${percentage.toFixed(
    0
  )}%`; // تحويل النسبة إلى صيغة عادية بدون أرقام عشرية

  document.getElementById("progressBar6").style.backgroundColor =
    percentage < 50 ? "red" : "green"; // تغيير لون الشريط
  return value6;
}

function showResults7() {
  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));
  const selectedNumbers = itemsFromList2.filter((item) =>
    [45, 46, 47, 48].includes(item)
  );
  const count = selectedNumbers.length;
  const value7 = count > 2 ? 4 : count * 1;

  document.getElementById(
    "subjectTitle7"
  ).textContent = ` Waffenrecht (${value7} von 4)`;
  const percentage = (value7 / 4) * 100;
  document.getElementById("progressBar7").style.width = `${percentage}%`;
  document.getElementById("percentage7").textContent = `${percentage}%`;
  document.getElementById("percentage7").textContent = `${percentage.toFixed(
    0
  )}%`; // تحويل النسبة إلى صيغة عادية بدون أرقام عشرية

  document.getElementById("progressBar7").style.backgroundColor =
    percentage < 50 ? "red" : "green"; // تغيير لون الشريط
  return value7;
}

function showResults8() {
  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));
  const selectedNumbers = itemsFromList2.filter((item) =>
    [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64].includes(
      item
    )
  );
  const count = selectedNumbers.length;
  const value8 = count > 8 ? 16 : count * 1; // تعريف المتغير value8 كمتغير محلي لهذه الدالة

  document.getElementById(
    "subjectTitle8"
  ).textContent = ` Umgang mit Menschen (${value8} von 16)`;
  const percentage = (value8 / 16) * 100;
  document.getElementById("progressBar8").style.width = `${percentage}%`;
  document.getElementById("percentage8").textContent = `${percentage}%`;
  document.getElementById("percentage8").textContent = `${percentage.toFixed(
    0
  )}%`; // تحويل النسبة إلى صيغة عادية بدون أر��ام عشرية

  document.getElementById("progressBar8").style.backgroundColor =
    percentage < 50 ? "red" : "green"; // تغيير لون الشريط

  return value8; // إرجاع قيمة value8
}

function showResults9() {
  const itemsFromList2 = Array.from(
    document.getElementById("list2").children
  ).map((item) => parseInt(item.textContent));
  const selectedNumbers = itemsFromList2.filter((item) =>
    [65, 66, 67, 68, 69, 70, 71, 72].includes(item)
  );
  const count = selectedNumbers.length;
  const value9 = count > 4 ? 8 : count * 1; // تعريف المتغير value9 كمتغير محلي لهذه الدالة

  document.getElementById(
    "subjectTitle9"
  ).textContent = ` Sicherheitstechnik (${value9} von 8)`;
  const percentage = (value9 / 8) * 100;
  document.getElementById("progressBar9").style.width = `${percentage}%`;
  document.getElementById("percentage9").textContent = `${percentage}%`;
  document.getElementById("percentage9").textContent = `${percentage.toFixed(
    0
  )}%`; // تحويل النسبة إلى صيغة عادية بدون أرقام عشرية

  document.getElementById("progressBar9").style.backgroundColor =
    percentage < 50 ? "red" : "green"; // تغيير لون الشريط

  return value9; // إرجاع قيمة value9
}

const totalAverage =
  showResults() +
  showResults2() +
  showResults3() +
  showResults4() +
  showResults5() +
  showResults6() +
  showResults7() +
  showResults8() +
  showResults9();
console.log("المتوسط العام:", totalAverage);

function hideResultsDisplay() {
  var resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.style.display = "flex";

  var resultsContainer2 = document.getElementById("resultsContainer2");
  resultsContainer2.style.display = "flex";

  var resultsContainer3 = document.getElementById("resultsContainer3");
  resultsContainer3.style.display = "flex";

  var resultsContainer4 = document.getElementById("resultsContainer4");
  resultsContainer4.style.display = "flex";

  var resultsContainer5 = document.getElementById("resultsContainer5");
  resultsContainer5.style.display = "flex";

  var resultsContainer6 = document.getElementById("resultsContainer6");

  resultsContainer6.style.display = "flex";

  var resultsContainer7 = document.getElementById("resultsContainer7");

  resultsContainer7.style.display = "flex";

  var resultsContainer8 = document.getElementById("resultsContainer8");

  resultsContainer8.style.display = "flex";

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
}

document.querySelector("#showResults").addEventListener("click", () => {
  if (document.getElementById("showResults").innerText === "Prüfung abgeben") {
    Shawqi();
  }

  Punkte.style.display = "none";

  var listenButton = document.getElementById("listenButton");

  if (document.getElementById("showResults").innerHTML == "Prüfung abgeben") {
    const confirmation = confirm(
      "Möchtest du wirklich den Test beenden und deine Ergebnisse sehen?"
    );

    // التحقق من رد المستخدم
    if (confirmation) {
      // قم بتنفيذ الأوامر
      executeResults();
    }
  } else {
    // إذا كان مخفيًا، قم بتنفيذ الأوامر مباشرة
    executeResults();
  }
});

// دالة لتنفيذ الأوامر المشتركة في كلتا الحالتين
function executeResults() {
  hideResultsDisplay();
  showResults();
  showResults2();
  showResults3();
  showResults4();
  showResults5();
  showResults6();
  showResults7();
  showResults8();
  showResults9();
  activateFinalResult();
  AlleFarben();
  pageTitle = "Ergebnisse";
  document.getElementById("title-bar").innerHTML = `<h1>${pageTitle}</h1>`;
  var label1 = document.getElementById("label1");
  label1.style.display = "none";

  const currentTime = new Date().getTime();
  const elapsedTime = startTime - currentTime;
  const totalDuration = 120 * 60 * 1000;
  const elapsedMinutes = Math.floor(
    (elapsedTime % totalDuration) / (1000 * 60)
  );
  const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  document.getElementById(
    "countdown-timer"
  ).innerText = `Zeit verbraucht: ${elapsedMinutes} Minuten ${elapsedSeconds} Sekunden`;
}

function activateFinalResult() {
  const totalPercentage =
    showResults() +
    showResults2() +
    showResults3() +
    showResults4() +
    showResults5() +
    showResults6() +
    showResults7() +
    showResults8() +
    showResults9();
  const finalResultText = document.getElementById("finalResultText");
  if (isNaN(totalPercentage)) {
    finalResultText.textContent = "Leider nicht Bestanden";
    finalResultText.style.color = "red";
    finalResultText.style.fontWeight = "bold";
  } else if (totalPercentage < 50) {
    finalResultText.innerHTML = `<p><strong>Ergebnis</strong>; <span style="color: rgb(226, 80, 65); font-size: 22px;">NICHT BESTANDEN</span><br><strong>Gesamtpunkte: &quot;<span style="font-size: 22px;">${totalPercentage}</span>&quot; Punkte</strong></p>`;
  } else {
    finalResultText.innerHTML = `<p><strong>Ergebnis:</strong>&nbsp; <strong><span style="font-size: 22px; color: rgb(97, 189, 109);">BESTANDEN</span></strong></p>
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
    document.getElementById(
      "countdown-timer"
    ).textContent = ` ${minutes} Minuten ${seconds} Sekunden`;
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

// ✅ أنشئ العنصر مرة واحدة فقط
if (!document.getElementById("answer-debug")) {
  const debugDiv = document.createElement("div");
  debugDiv.id = "answer-debug";
  debugDiv.style.position = "fixed";
  debugDiv.style.bottom = "0";
  debugDiv.style.left = "0";
  debugDiv.style.right = "0";
  debugDiv.style.backgroundColor = "#222";
  debugDiv.style.color = "#0f0";
  debugDiv.style.padding = "10px";
  debugDiv.style.fontFamily = "monospace";
  debugDiv.style.fontSize = "14px";
  debugDiv.style.zIndex = "9999";
  debugDiv.style.textAlign = "center";
  debugDiv.textContent = "Debug Info: Waiting...";
  document.body.appendChild(debugDiv);
}

// ✅ داخل دالة displayRow(rowNumber) بعد هذا السطر مباشرة:
const correctRow = correctAnswers[rowNumber] || [];

// ✅ ثم أضف هذا السطر لعرض ما تم قراءته
document.getElementById("answer-debug").textContent =
  `✅ Frage ${rowNumber} → Lösungen geladen: [${correctRow.filter(cell => cell.trim() !== "").join(", ")}]`;
