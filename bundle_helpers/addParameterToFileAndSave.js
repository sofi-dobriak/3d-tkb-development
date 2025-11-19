const fs = require('fs');

function addParameterToFileAndSave(filePath, keyToAdd, dataToAdd) {
    // Спочатку зчитуємо вміст файлу
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Помилка читання файлу:', err);
            return;
        }

        try {
            // Парсимо JSON
            const jsonData = JSON.parse(data);

            // Додаємо параметр
            jsonData[keyToAdd] = dataToAdd;

            // Перетворюємо змінений об'єкт назад у рядок JSON
            const updatedJsonString = JSON.stringify(jsonData, null, 2);

            // Зберігаємо змінений JSON у той же файл
            fs.writeFile(filePath, updatedJsonString, 'utf8', (err) => {
                if (err) {
                    console.error('Помилка збереження файлу:', err);
                    return;
                }

                console.log('Файл успішно оновлено.');
            });
        } catch (jsonError) {
            console.error('Помилка парсингу JSON:', jsonError);
        }
    });
}

module.exports = addParameterToFileAndSave;