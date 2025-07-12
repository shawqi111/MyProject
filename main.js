let originalHTML = ""; // متغير لحفظ النص الأصلي بالتنسيق
let isTranslated = false; // حالة لمعرفة ما إذا كان النص مترجماً
const comboOptionsMap = {};
const checkboxSelections = {}; // مثل: {1: 'A', 2: 'C'}


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
      url = "1eins203.csv";
    } else if (value === 15) {
      url = "2Zwei204.csv";
    } else if (value === 16) {
      url = "3Drei211.csv";
    } else if (value === 17) {
      url = "4vier213.csv";
    } else if (value === 18) {
      url = "5funf217.csv";
    } else if (value === 19) {
      url = "6sechs219.csv";
    } else if (value === 20) {
      url = "7sieben221.csv";
    } else if (value === 21) {
      url = "8MP18.csv";
    } else if (value === 22) {
      url = "9Prüfung1.csv";
    } else if (value === 23) {
      url = "10Prüfung2.csv";
    } else if (value === 24) {
      url = "11Prüfung3.csv";
    } else if (value === 25) {
      url = "12Pr4.csv";
    } else if (value === 26) {
      url = "13Pr5.csv";
    } else {
      url = "Drei211.csv";
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
                if (
                  window.getComputedStyle(resultsContainer5).display === "flex" &&
                  window.getComputedStyle(buttonContainer).display === "none"
                ) {
                  // ← هذا مكان جيد
                }
                
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
correctAnswersCheckbox = [];
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
  url = "1Lös203.csv";
} else if (value === 15) {
  url = "2Lös204.csv";
} else if (value === 16) {
  url = "3Lös211.csv";
} else if (value === 17) {
  url = "4Lös213.csv";
} else if (value === 18) {
  url = "5Lös217.csv";
} else if (value === 19) {
  url = "6Lös219.csv";
} else if (value === 20) {
  url = "7Lös221.csv";
} else if (value === 21) {
  url = "8Lös18.csv";
} else if (value === 22) {
  url = "9LösPr1.csv";
} else if (value === 23) {
  url = "10LösPr2.csv";

} else if (value === 24) {
  url = "11LösPr3.csv";
} else if (value === 25) {
  url = "12LösPr4.csv";
} else if (value === 26) {
  url = "13LösPr5.csv";
} 
else {
  url = "Lösung211.csv";
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
      correctAnswersCheckbox = parsedData.data.slice(0);

    })
    .catch((error) =>
      console.error("Error fetching correct answers CSV file:", error)
    );
}





function getCorrectComboFromRow(rowData) {
  const letters = ['A', 'B', 'C', 'D']; // الأعمدة
  let combo = '';

  rowData.forEach((cell, index) => {
    if (cell.trim() !== '') {
      combo += letters[index]; // اجمع الحروف غير الفارغة
    }
  });

  return combo;
}

function generateSmartCombos(correct, count = 4) {
  const letters = ['A', 'B', 'C', 'D'];
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


  
  const correctRow = correctAnswersCheckbox[rowNumber] || [];


  

if (document.getElementById("answer-debug")) {
  const visibleAnswers = correctRow.filter(cell => cell.trim() !== "").join(", ");
  document.getElementById("answer-debug").textContent =
    `Neues System Prüfung ab Juli 2025`;
}
  const correctCombo = getCorrectComboFromRow(correctRow); // 🟢 أضف هذا مبكرًا!
  const correctCount = correctCombo.length;

  const isSingle = isSingleChoiceQuestion(rowNumber);
  const isComboQuestion = isSingle && correctCount === 2;
  

 

  const urlParams = new URLSearchParams(window.location.search);
  const value = parseInt(urlParams.get("value"));
  let url;
  if (value === 14) {
    url = "1eins203.csv";
  } else if (value === 15) {
    url = "2Zwei204.csv";
  } else if (value === 16) {
    url = "3Drei211.csv";
  } else if (value === 17) {
    url = "4vier213.csv";
  } else if (value === 18) {
    url = "5funf217.csv";
  } else if (value === 19) {
    url = "6sechs219.csv";
  } else if (value === 20) {
    url = "7sieben221.csv";
  } else if (value === 21) {
    url = "8MP18.csv";
  } else if (value === 22) {
    url = "9Prüfung1.csv";
  } else if (value === 23) {
    url = "10Prüfung2.csv";
  } else if (value === 24) {
    url = "11Prüfung3.csv";
  } else if (value === 25) {
    url = "12Pr4.csv";
  } else if (value === 26) {
    url = "13Pr5.csv";
  } else {
    url = "Drei211.csv";
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

          
           
            buttonContainer.querySelectorAll("button").forEach(btn => btn.disabled = true);

            

            if (index === 4) {
              const checkboxRow = document.createElement("div");
              checkboxRow.style.display = "flex";
              checkboxRow.style.justifyContent = "space-evenly";
              checkboxRow.style.alignItems = "center";
              checkboxRow.style.marginTop = "15px";
              checkboxRow.style.marginBottom = "15px";
              checkboxRow.style.width = "100%";
              checkboxRow.classList.add("checkbox-row");
            
              // ✅ تحديد عدد الإجابات الصحيحة من ملف الإجابات
              const correctRow = correctAnswers[rowNumber] || [];
              const correctCount = correctRow.filter(cell => cell.trim() !== "").length;
            
              // ✅ تحديد إن كان السؤال Single أو لا
              const isSingle = isSingleChoiceQuestion(rowNumber);
            
              // ✅ إنشاء النص الإرشادي
              const infoText = document.createElement("div");
              infoText.style.textAlign = "left";
              infoText.style.marginBottom = "5px";
              infoText.style.fontWeight = "bold";
              infoText.style.fontSize = "14px";
              infoText.style.color = "#333";
            
              if (isSingle) {
                infoText.textContent = "✅ 1 richtige Antwort auswählen";
              } else {
                infoText.textContent = "✅ 2 richtige Antworten auswählen";
              }
            
              // ✅ ضعه مباشرة في الـ container ليتوضع فوق الـ checkbox
              buttonContainer.appendChild(infoText);
            
         
            
            
            
            
             
         
            
              

              
              if (isComboQuestion) {
             
                const correctCombo = getCorrectComboFromRow(correctAnswersCheckbox[rowNumber] || []);
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
                    <input type="checkbox" value="${combo}" onchange="handleComboCheckboxChange(this)" style="width: 22px; height: 22px; margin-right: 8px;">
                    ${combo}`;
                
                  
                  
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
const availableLetters = [];
const currentRowData = rows[rowNumber]; // تأكد أن هذا موجود لديك بالفعل
for (let i = 1; i < currentRowData.length; i++) {
  const cell = currentRowData[i].trim();
  if (cell !== "" && cell !== ".") {
    const letter = String.fromCharCode(64 + i); // 65 = A
    availableLetters.push(letter);
  }
}

availableLetters.forEach((letter) => {
  const label = document.createElement("label");
  label.style.display = "flex";
  label.style.alignItems = "center";
  label.style.fontWeight = "bold";
  label.innerHTML = `
    <input type="checkbox" value="${letter}" id="chk${letter}" onchange="handleCheckboxChange(this)" style="width: 22px; height: 22px; margin-right: 8px;">
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
                  const othersClear = ['A','B','C','D'].every(letter => {
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

function handleCheckboxChange(checkbox) {
  const letter = checkbox.value;
  const btn = document.getElementById("btn" + letter);
  if (!btn) return;

  const questionNumber = parseInt(document.getElementById("labelIndex").textContent);
  const isSingle = isSingleChoiceQuestion(questionNumber);

  if (isSingle) {
    // 🟦 SINGLE-CHOICE
    document.querySelectorAll(".checkbox-row input[type='checkbox']").forEach(cb => {
      cb.checked = false;
    });

    ['A', 'B', 'C', 'D', 'E'].forEach(l => {
      const b = document.getElementById("btn" + l);
      if (b && window.getComputedStyle(b).backgroundColor === "rgb(255, 255, 3)") {
        toggleButtonColor(b);
      }
    });

    checkbox.checked = true;
    toggleButtonColor(btn);

  } else {
    // 🟨 MULTIPLE-CHOICE
    const isYellow = window.getComputedStyle(btn).backgroundColor === "rgb(255, 255, 3)";
    
    // إذا كان مفعلًا (أصفر) → ألغِه
    if (isYellow) {
      toggleButtonColor(btn);
      checkbox.checked = false;
    } else {
      toggleButtonColor(btn);
      checkbox.checked = true;
    }
  }

  // ✅ تحديث القيم المحفوظة
  const checkedLetters = [];
  ['A', 'B', 'C', 'D'].forEach(l => {
    const b = document.getElementById("btn" + l);
    if (b && window.getComputedStyle(b).backgroundColor === "rgb(255, 255, 3)") {
      checkedLetters.push(l);
    }
  });

  checkboxSelections[questionNumber] = checkedLetters.join(""); // مثل "AC"
}
function handleComboCheckboxChange(checkbox) {
  document.querySelectorAll(".checkbox-row input[type='checkbox']").forEach(cb => {
    cb.checked = false;
  });
  checkbox.checked = true;

  const comboValue = checkbox.value;
  const questionNumber = parseInt(document.getElementById("labelIndex").textContent);
  checkboxSelections[questionNumber] = comboValue;

  // إزالة التفعيل القديم
  ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
    const btn = document.getElementById("btn" + letter);
    if (btn && window.getComputedStyle(btn).backgroundColor === "rgb(255, 255, 3)") {
      toggleButtonColor(btn);
    }
  });

  // تفعيل الأزرار حسب المركب
  comboValue.split('').forEach(letter => {
    const btn = document.getElementById("btn" + letter);
    if (btn) toggleButtonColor(btn);
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
    var AntwortenZahl = document.getElementById("AntwortenZahl");
  
  
    if (
      resultsContainer5.style.display === "none" ||
      buttonContainer.style.display === "flex"
      
    ) {
    AntwortenZahl.style.display = "flex"
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
  
  // دالة لتغيير لون الزر عند النقر
  function toggleButtonColor(button) {
    const table = button.closest("table");
  
    // إذا كان الزر أصفر، نقوم بإعادته إلى الحالة الأصلية
    if (button.style.backgroundColor === "rgb(255, 255, 3)") {
      button.style.color = "#ffffff";
      button.style.backgroundColor = "#0603aa";
      table.style.backgroundColor = "#0603aa";
    } else {
      // إذا كان الزر ليس أصفر، نقوم بتغييره إلى أصفر
      button.style.color = "rgb(2, 0, 0)";
      button.style.backgroundColor = "rgb(255, 255, 3)";
      table.style.backgroundColor = "rgb(255, 255, 3)";
    }
  
    // تحديد عدد الأزرار المحددة (الأصفر)
    const allButtons = document.querySelectorAll("#button-container button");
    const selectedButtons = Array.from(allButtons).filter(
      (btn) => getComputedStyle(btn).backgroundColor === "rgb(255, 255, 3)"
    );
  
    // معرفة نوع السؤال (اختيارات متعددة أو اختيار واحد)
    const antwortText = document.getElementById("AntwortenZahl").innerText;
    const isMultipleChoice = antwortText.includes("2 Punkte");
    const maxSelections = isMultipleChoice ? 2 : 1; // 2 اختيارات لأسئلة متعددة و 1 لاختيار واحد
  
    // إذا تجاوز عدد التحديدات الحد، ألغي التحديد الأخير فورًا
   
  
    // إذا كانت الإجابة صحيحة، إضافة الزر إلى قائمة الإجابات الصحيحة
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
  
    // إزالة العنصر من القائمة إذا تم إلغاء تحديده
    const computedStyle = getComputedStyle(button);
    const backgroundColor = computedStyle.backgroundColor;
    if (backgroundColor === "rgb(6, 3, 170)") {
      const list = document.getElementById("list");
      const buttonText = button.textContent; // استخراج نص الزر
      const listItemToRemove = Array.from(list.children).find(
        (item) => item.textContent === buttonText
      ); // البحث عن العنصر لحذفه بناءً على النص
      if (listItemToRemove) {
        listItemToRemove.remove(); // إزالة العنصر من القائمة
        liIndex--; // تحديث الفهرس
      }
    }
  
    // احصل على قيمة الفهرس من العنصر HTML
    const labelIndex = parseInt(document.getElementById("labelIndex").textContent);
  
    // استخدم الفهرس لتحديد الزر المرتبط به في الجدول الآخر
    const tableBody = document.getElementById("table-body");
    const targetButton = tableBody.querySelector(
      `tr:nth-child(${labelIndex + 0}) button`
    );
  
    if (targetButton) {
      // تغيير اللون أو أي عملية أخرى حسب الحالة
      if (button.style.backgroundColor === "rgb(255, 255, 3)") {
        targetButton.style.backgroundColor = button.style.backgroundColor;
      } else {
        targetButton.style.backgroundColor = "";
      }
  
      // استدعاء أي وظائف إضافية هنا
      FarbeinTable();
    }
  }
  
  // دالة لفحص الألوان والتأكد من الإجابات
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
    FarbeinTable();
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
    const label1 = document.getElementById("label1");
    label1.style.display = "flex";
  
    const buttons = document.querySelectorAll("#button-container button");
    buttons.forEach((button) => {
      button.disabled = true;
    });
   

    const list2Element = document.getElementById("list2");
    const questionNumber = parseInt(document.getElementById("labelIndex").textContent.split(" ")[1]);
    const antwortenZahlText = document.getElementById("AntwortenZahl").innerText;
  
    const isMultipleChoice = antwortenZahlText.includes("Multiple-Choice");
    const isSingleChoice = antwortenZahlText.includes("Single-Choice");
  
    let selectedButtons = [];
    let correctSelectedCount = 0;
    let wrongSelectedCount = 0;
    let totalCorrect = 0;
  
    buttons.forEach((button, index) => {
      const correct = correctAnswers[currentRow - 1][index];
      const isSelected = button.style.backgroundColor === "rgb(255, 255, 3)";
  
      if (correct) {
        totalCorrect++;
      }
  
      if (isSelected) {
        selectedButtons.push(button);
        if (correct) {
          correctSelectedCount++;
        } else {
          wrongSelectedCount++;
        }
        document.querySelectorAll(".checkbox-row input[type='checkbox']").forEach(cb => {
          cb.disabled = true;});
      }
    });
  
    // تلوين الأزرار
    buttons.forEach((button, index) => {
      const correct = correctAnswers[currentRow - 1][index];
      const isSelected = button.style.backgroundColor === "rgb(255, 255, 3)";
  
      if (correct && isSelected) {
        button.style.backgroundColor = "green";
      } else if (correct && !isSelected) {
        button.style.backgroundColor = "green";
      } else if (!correct && isSelected) {
        button.style.backgroundColor = "red";
      }
    });
  
    // حذف النتيجة القديمة إن وجدت
    const existingItem = Array.from(list2Element.children).find(
      (item) => item.textContent.startsWith(`${questionNumber}`)
    );
    if (existingItem) existingItem.remove();
  
    const li = document.createElement("li");
  
    // منطق التقييم:
    if (isSingleChoice) {
  if (correctSelectedCount === 1 && wrongSelectedCount === 0) {
    label1.innerText = "Richtig beantwortet!";
    label1.style.color = "green";
    li.textContent = `${questionNumber}`;
    list2Element.appendChild(li);
  } else {
    label1.innerText = "Falsch beantwortet!";
    label1.style.color = "red";
    // لا يتم الإضافة للقائمة
  }

    } else if (isMultipleChoice) {
      if (selectedButtons.length > 2) {
        label1.innerText = "Falsch beantwortet!";
        label1.style.color = "red";
      } else if (correctSelectedCount === 2 && wrongSelectedCount === 0) {
        label1.innerText = "Richtig beantwortet!";
        label1.style.color = "green";
        li.textContent = `${questionNumber} (MC)`;
        list2Element.appendChild(li);
      } else if (correctSelectedCount === 1 && wrongSelectedCount === 1) {
        label1.innerText = "Teilweise richtig!";
        label1.style.color = "orange";
      
        li.textContent = `${questionNumber} (جزئية)`;
        list2Element.appendChild(li);
      }
        else if (
          correctSelectedCount === 1 &&
          wrongSelectedCount === 0 &&
          isMultipleChoice
        ) {
          label1.innerText = "Teilweise richtig!";
          label1.style.color = "orange";
        
          const li = document.createElement("li");
          li.textContent = `${questionNumber} (جزئية)`;
          list2Element.appendChild(li);
        }
        
       else {
        label1.innerText = "Falsch beantwortet!";
        label1.style.color = "red";
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
  
     // ✅ التحقق من دعم speechSynthesis قبل الاستدعاء
     if (typeof window.speechSynthesis !== 'undefined' &&
      typeof window.speechSynthesis.cancel === 'function') {
    window.speechSynthesis.cancel();
  } else {
    console.warn("speechSynthesis غير مدعومة في هذا المتصفح أو WebView.");
  }
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
    );
  
    let value = 0;
  
    itemsFromList2.forEach((item) => {
      const number = parseInt(item.textContent);
      if (number >= 1 && number <= 7) {
        const text = item.textContent;
  
      if (text.includes("(جزئية)")) {
        value += 1; // إجابة متعددة جزئية = 1 نقطة
      } else if (text.includes("(MC)")) {
        value += 2; // إجابة متعددة كاملة = 2 نقاط
      } else {
        value += 1; // إجابة فردية صحيحة = 1 نقطة
      }
    }
    });
  
    const maxValue = 11; // 4 MC * 2 + 3 SC * 1
  
    document.getElementById("subjectTitle").textContent =
      `Recht der öffentlichen Sicherheit und Ordnung (${value} von ${maxValue})`;
  
    const percentage = value > 0 ? (value / maxValue) * 100 : 0;
    document.getElementById("progressBar").style.width = `${percentage}%`;
    document.getElementById("percentage").textContent = `${percentage.toFixed(0)}%`;
    document.getElementById("progressBar").style.backgroundColor =
      percentage < 50 ? "red" : "green";
  
    return value;
  }
  
  
  function showResults2() {
    const itemsFromList2 = Array.from(document.getElementById("list2").children);
    let value2 = 0;
  
    itemsFromList2.forEach((item) => {
      const number = parseInt(item.textContent);
      if (number >= 8 && number <= 12) {
        const text = item.textContent;
  
        if (text.includes("(جزئية)")) {
          value2 += 1;
        } else if (text.includes("(MC)")) {
          value2 += 2;
        } else {
          value2 += 1;
        }
      }
    });
  
    const maxValue = 8; // 3 MC * 2 + 2 SC * 1
  
    document.getElementById("subjectTitle2").textContent = `Gewerberecht (${value2} von ${maxValue})`;
    const percentage = (value2 / maxValue) * 100;
    document.getElementById("progressBar2").style.width = `${percentage}%`;
    document.getElementById("percentage2").textContent = `${percentage.toFixed(0)}%`;
    document.getElementById("progressBar2").style.backgroundColor = percentage < 50 ? "red" : "green";
  
    return value2;
  }
  
  
  // Datenschutz
  function showResults3() {
    const itemsFromList2 = Array.from(document.getElementById("list2").children);
    let value3 = 0;
    itemsFromList2.forEach((item) => {
      const number = parseInt(item.textContent);
      if (number >= 13 && number <= 17) {
        const text = item.textContent;
        if (text.includes("(جزئية)")) value3 += 1;
        else if (text.includes("(MC)")) value3 += 2;
        else value3 += 1;
      }
    });
    const maxValue = 8;
    document.getElementById("subjectTitle3").textContent = `Datenschutz (${value3} von ${maxValue})`;
    const percentage = (value3 / maxValue) * 100;
    document.getElementById("progressBar3").style.width = `${percentage}%`;
    document.getElementById("percentage3").textContent = `${percentage.toFixed(0)}%`;
    document.getElementById("progressBar3").style.backgroundColor = percentage < 50 ? "red" : "green";
    return value3;
  }
  
  // Bürgerliches Recht
  function showResults4() {
    const itemsFromList2 = Array.from(document.getElementById("list2").children);
    let value4 = 0;
    itemsFromList2.forEach((item) => {
      const number = parseInt(item.textContent);
      if (number >= 18 && number <= 30) {
        const text = item.textContent;
        if (text.includes("(جزئية)")) value4 += 1;
        else if (text.includes("(MC)")) value4 += 2;
        else value4 += 1;
      }
    });
    const maxValue = 21;
    document.getElementById("subjectTitle4").textContent = `Bürgerliches Recht (${value4} von ${maxValue})`;
    const percentage = (value4 / maxValue) * 100;
    document.getElementById("progressBar4").style.width = `${percentage}%`;
    document.getElementById("percentage4").textContent = `${percentage.toFixed(0)}%`;
    document.getElementById("progressBar4").style.backgroundColor = percentage < 50 ? "red" : "green";
    return value4;
  }
  
  // Strafrecht
  function showResults5() {
    const itemsFromList2 = Array.from(document.getElementById("list2").children);
    let value5 = 0;
    itemsFromList2.forEach((item) => {
      const number = parseInt(item.textContent);
      if (number >= 31 && number <= 43) {
        const text = item.textContent;
        if (text.includes("(جزئية)")) value5 += 1;
        else if (text.includes("(MC)")) value5 += 2;
        else value5 += 1;
      }
    });
    const maxValue = 21;
    document.getElementById("subjectTitle5").textContent = `Strafrecht (${value5} von ${maxValue})`;
    const percentage = (value5 / maxValue) * 100;
    document.getElementById("progressBar5").style.width = `${percentage}%`;
    document.getElementById("percentage5").textContent = `${percentage.toFixed(0)}%`;
    document.getElementById("progressBar5").style.backgroundColor = percentage < 50 ? "red" : "green";
    return value5;
  }
  
  // BWL
  function showResults6() {
    const itemsFromList2 = Array.from(document.getElementById("list2").children);
    let value6 = 0;
    itemsFromList2.forEach((item) => {
      const number = parseInt(item.textContent);
      if (number >= 44 && number <= 62) {
        const text = item.textContent;
        if (text.includes("(جزئية)")) value6 += 1;
        else if (text.includes("(MC)")) value6 += 2;
        else value6 += 1;
      }
    });
    const maxValue = 19;
    document.getElementById("subjectTitle6").textContent = `Umgang mit Menschen (${value6} von ${maxValue})`;
    const percentage = (value6 / maxValue) * 100;
    document.getElementById("progressBar6").style.width = `${percentage}%`;
    document.getElementById("percentage6").textContent = `${percentage.toFixed(0)}%`;
    document.getElementById("progressBar6").style.backgroundColor = percentage < 50 ? "red" : "green";
    return value6;
  }
  
  // VWL
  function showResults7() {
    const itemsFromList2 = Array.from(document.getElementById("list2").children);
    let value7 = 0;
    itemsFromList2.forEach((item) => {
      const number = parseInt(item.textContent);
      if (number >= 63 && number <= 67) {
        const text = item.textContent;
        if (text.includes("(جزئية)")) value7 += 1;
        else if (text.includes("(MC)")) value7 += 2;
        else value7 += 1;
      }
    });
    const maxValue = 8;
    document.getElementById("subjectTitle7").textContent = `Waffenrecht (${value7} von ${maxValue})`;
    const percentage = (value7 / maxValue) * 100;
    document.getElementById("progressBar7").style.width = `${percentage}%`;
    document.getElementById("percentage7").textContent = `${percentage.toFixed(0)}%`;
    document.getElementById("progressBar7").style.backgroundColor = percentage < 50 ? "red" : "green";
    return value7;
  }
  
  // Steuerrecht
  function showResults8() {
    const itemsFromList2 = Array.from(document.getElementById("list2").children);
    let value8 = 0;
    itemsFromList2.forEach((item) => {
      const number = parseInt(item.textContent);
      if (number >= 68 && number <= 75) {
        const text = item.textContent;
        if (text.includes("(جزئية)")) value8 += 1;
        else if (text.includes("(MC)")) value8 += 2;
        else value8 += 1;
      }
    });
    const maxValue = 13;
    document.getElementById("subjectTitle8").textContent = `Unfallverhütungsvorschriften (${value8} von ${maxValue})`;
    const percentage = (value8 / maxValue) * 100;
    document.getElementById("progressBar8").style.width = `${percentage}%`;
    document.getElementById("percentage8").textContent = `${percentage.toFixed(0)}%`;
    document.getElementById("progressBar8").style.backgroundColor = percentage < 50 ? "red" : "green";
    return value8;
  }
  
  // Rechnungswesen
  function showResults9() {
    const itemsFromList2 = Array.from(document.getElementById("list2").children);
    let value9 = 0;
    itemsFromList2.forEach((item) => {
      const number = parseInt(item.textContent);
      if (number >= 76 && number <= 82) {
        const text = item.textContent;
        if (text.includes("(جزئية)")) value9 += 1;
        else if (text.includes("(MC)")) value9 += 2;
        else value9 += 1;
      }
    });
    const maxValue = 11;
    document.getElementById("subjectTitle9").textContent = `Sicherheitstechnik (${value9} von ${maxValue})`;
    const percentage = (value9 / maxValue) * 100;
    document.getElementById("progressBar9").style.width = `${percentage}%`;
    document.getElementById("percentage9").textContent = `${percentage.toFixed(0)}%`;
    document.getElementById("progressBar9").style.backgroundColor = percentage < 50 ? "red" : "green";
    return value9;
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
  
    var AntwortenZahl = document.getElementById("AntwortenZahl");
    AntwortenZahl.style.display = "none";
  
  }
  
  document.querySelector("#showResults").addEventListener("click", () => {
    if (document.getElementById("showResults").innerText === "Prüfung abgeben") {
      Shawqi();
    }
  
  
  
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
    ).innerText = `Zeit verbraucht: ${elapsedMinutes} Min. ${elapsedSeconds} Sek.`;
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
      finalResultText.innerHTML = `<p><strong>Ergebnis</strong>; <span style="color: rgb(226, 80, 65); font-size: 22px;">NICHT BESTANDEN</span><br><strong>Gesamtpunkte: &quot;<span style="font-size: 25px;">${totalPercentage} von 120</span>&quot; Punkte</strong></p>`;
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
  
    const tableButtons = document.querySelectorAll("#table-body button");
  
    tableButtons.forEach((button, index) => {
      let found = false;
      let isPartial = false;
  
      for (let i = 0; i < list2Items.length; i++) {
        const text = list2Items[i].textContent.trim();
        const number = parseInt(text);
        if (number === index + 1) {
          found = true;
  
          if (text.includes("جزئية")) {
            isPartial = true;
          }
  
          break;
        }
      }
  
      if (found) {
        if (isPartial) {
          button.style.backgroundColor = "#ff9d00"; // برتقالي للإجابة الجزئية
        } else {
          button.style.backgroundColor = "green"; // أخضر للإجابة الصحيحة
        }
      } else {
        button.style.backgroundColor = "red"; // أحمر للإجابة الخاطئة أو غير المجابة
      }
    });
  }
  
  
  function Shawqi() {
    document.getElementById("label1").style.display = "none";
    const listenButton = document.getElementById("listenButton");
    if (listenButton.innerText === "Stop") {
      listenButton.innerText = "Hören";
      adjustSpeechRate("male", 1.0); // بدء النطق
    } else {
      listenButton.innerText = "Hören";
      if (typeof window.speechSynthesis !== 'undefined' &&
        typeof window.speechSynthesis.cancel === 'function') {
      window.speechSynthesis.cancel();
    } else {
      console.warn("speechSynthesis غير مدعومة في هذا المتصفح أو WebView.");
    }
  }
 
  
    let answerCorrect = true;
  
    const buttons = document.querySelectorAll("#button-container button");
    const labels = [
      document.getElementById("label40"),
      document.getElementById("label50"),
      document.getElementById("label60"),
      document.getElementById("label70"),
      document.getElementById("label80")
    ];
  
    // حساب الحالات اللونية
    let hasGreenAndYellow = false;
    let hasGreenAndBlue = false;
  
    buttons.forEach((button, index) => {
      const correct = correctAnswers[currentRow - 1][index];
      const isSelected = button.style.backgroundColor === "rgb(255, 255, 3)";
  
      if (correct) {
        if (isSelected) {
          hasGreenAndYellow = true;
        } else {
          hasGreenAndBlue = true;
        }
      }
    });
  
    buttons.forEach((button, index) => {
      const correctAnswer = correctAnswers[currentRow - 1][index];
      const labelIndex = parseInt(document.getElementById("labelIndex").textContent);
      const tableBody = document.getElementById("table-body");
      const targetButton = tableBody.querySelector(`tr:nth-child(${labelIndex}) button`);
  
      if (button.style.backgroundColor === "rgb(255, 255, 3)") {
        targetButton.style.backgroundColor = button.style.backgroundColor;
      }
  
      // تحديث النتائج في الوسوم بناءً على الحالة
      if (hasGreenAndYellow && !hasGreenAndBlue) {
        labels[index].textContent = 1;
      } else if (hasGreenAndYellow && hasGreenAndBlue) {
        labels[index].textContent = 0.5;
      } else {
        labels[index].textContent = 0;
      }
  
      // التحقق من الخطأ إذا كانت القيمة 1 بدون تحديد الزر بالأصفر
      if (
        labels[index].textContent === "1" &&
        labels[index].style.backgroundColor !== "rgb(255, 255, 3)"
      ) {
        answerCorrect = false;
      }
      const questionNumber = parseInt(document.getElementById("labelIndex").textContent);
      const savedValue = checkboxSelections[questionNumber];
      
   
      if (
        savedValue &&
        document.getElementById("showResults").innerText === "Ergebnisse ansehen"
      ) {
        if (
          savedValue.length === 1 ||
          (savedValue.length > 1 &&
           !document.querySelector(`.checkbox-row input[value="${savedValue}"]`))
        ) {
          savedValue.split('').forEach(letter => {
            const cb = document.getElementById("chk" + letter);
            if (cb) cb.checked = true;
          });
        } else {
          const savedCheckbox = document.querySelector(
            `.checkbox-row input[type="checkbox"][value="${savedValue}"]`
          );
          if (savedCheckbox) savedCheckbox.checked = true;
        }
      
    
      
      }
      
      
      if (document.getElementById("showResults").innerText === "Ergebnisse ansehen") {
        document.querySelectorAll(".checkbox-row input[type='checkbox']").forEach(cb => {
          cb.disabled = true;
          document.getElementById("AntwortenZahl").style.marginBottom = "30px";

        });
      }
      


    });
  
    // التقييم العام وعرض النتيجة
    const list2Element = document.getElementById("list2");
    const questionNumber = parseInt(document.getElementById("labelIndex").textContent.split(" ")[1]);
  
    const existingItem = Array.from(list2Element.children).find(
      (item) => item.textContent.startsWith(`${questionNumber}`)
    );
    if (existingItem) existingItem.remove();
  
    const antwortenZahlText = document.getElementById("AntwortenZahl").innerText;
    const isMultipleChoice = antwortenZahlText.includes("Multiple-Choice");
  
    if (hasGreenAndYellow && !hasGreenAndBlue) {
      label1.innerText = "Richtig beantwortet!";
      label1.style.color = "green";
  
      const li = document.createElement("li");
      li.textContent = isMultipleChoice ? `${questionNumber} (MC)` : `${questionNumber}`;
      list2Element.appendChild(li);
  
    } else if (hasGreenAndYellow && hasGreenAndBlue) {
      label1.innerText = "Teilweise richtig!";
      label1.style.color = "orange";
  
      const li = document.createElement("li");
      li.textContent = `${questionNumber} (جزئية)`;
      list2Element.appendChild(li);
  
    } else {
      label1.innerText = "Falsch beantwortet!";
      label1.style.color = "red";
      // لا يتم الإضافة للفهرس في حالة الخطأ الكامل
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
      ).textContent = ` ${minutes} Min. ${seconds} Sek.`;
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
  `✅ Neues System  → Prüfung ab Juli 2025]`;


  
  
  
