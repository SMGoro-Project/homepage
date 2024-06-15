async function searchQuestions() {
    const response = await fetch('data.json');
    const allExams = await response.json();

    const searchTermQuestion = document.getElementById('searchTermQuestion').value;
    const searchTermChoice = document.getElementById('searchTermChoice').value;
    const matches = [];

    for (const exam of allExams) {
        for (const question of exam.paper_data.question_data) {
            const scoreQuestion = similar(searchTermQuestion, question.question_stem);
            if (scoreQuestion > 0.5) {
                matches.push({score: scoreQuestion, question: question});
            }

            for (const choice of question.choices) {
                const scoreChoice = similar(searchTermChoice, choice.content);
                if (scoreChoice > 0.5) {
                    matches.push({score: scoreChoice, question: question});
                }
            }
        }
    }

    // 按照匹配程度从高到低排序
    matches.sort((a, b) => b.score - a.score);

    if (matches.length > 0) {
        let result = '';
        // 最多列出三条
        for (const match of matches.slice(0, 5)) {
            result += `找到匹配的题目：\n题目ID：${match.question.question_id}\n题目：${match.question.question_stem}\n选项：\n`;
            for (const choice of match.question.choices) {
                result += `${choice.option}. ${choice.content}\n`;
            }
            result += `正确答案：${match.question.correct_answer}\n匹配程度：${match.score}\n\n`;
        }
        document.getElementById('result').innerText = result;
    } else {
        document.getElementById('result').innerText = "没有找到匹配的题目。";
    }
}

function similar(a, b) {
    if (!a || !b) return 0;
    let lengthA = a.length, lengthB = b.length;
    let indexA = 0, indexB = 0;
    let match = 0;

    while (indexA < lengthA && indexB < lengthB) {
        if (a[indexA] === b[indexB]) {
            match++;
            indexA++;
            indexB++;
        } else if (lengthA < lengthB) {
            lengthB--;
        } else if (lengthA > lengthB) {
            lengthA--;
        } else {
            indexA++;
            indexB++;
        }
    }

    return 2.0 * match / (a.length + b.length);
}
