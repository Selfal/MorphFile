let Az = require('az');
let fs = require('fs');

class MorphFile{

    // Инициализация
    init(file) {

        let str = this.readContent(file);
        str = str.replace(/[.–?!,«»–:;{}\[\]\|`()…—*&#'@№<>"|-]/g, '');
        str = str.replace(/[A-Za-z]/g, '')
        str = str.replace(/[0-9]/g, '');
        str = str.replace(/(\r\n|\n|\r|\t)/gm, " ").split(' ');
        str = str.filter(element => element !== '');
        console.log(str)
        this.check(str);
    }

    // подсчет каждых элементов
    check(arr) {
        let partsOfSpeech = {
            VERB: 0, // Глагол
            ADVB: 0, // Наречие
            ADJF: 0, // Прилагательное
        }
        let word;
        Az.Morph.init(function () {
            for (let i = 0; i < arr.length; i++) {
                try {
                    word = Az.Morph(arr[i]);
                    partsOfSpeech[word[0].tag.POS.toString()] += 1;
                }catch (e) {
                    
                }
            }
            console.group();
            console.log(`Глаголов: ${partsOfSpeech['VERB']}`);
            console.log(`Наречий: ${partsOfSpeech['ADVB']}`)
            console.log(`Прилагательных: ${partsOfSpeech['ADJF']}`)
            console.groupCollapsed();
        });
    }

    // Чтение из файла
    readContent(file) {
        let contents = fs.readFileSync(file, 'utf8');
        return contents;
    }
}

let morph = new MorphFile();
morph.init('./avidreaders.ru__voyna-i-mir-tom-1.txt');