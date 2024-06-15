async function searchQuestions() {
    const response = await fetch('combined-all-exams.json');
    const allExams = await response.json();

    const searchTerm = document.getElementById('searchTerm').value;
    const matches = [];

    for (const exam of allExams) {
        for (const question of exam.paper_data.question_data) {
            const score = similar(searchTerm, question.question_stem);
            if (score > 0.5) {
                matches.push(question);
            }

            for (const choice of question.choices) {
                const score = similar(searchTerm, choice.content);
                if (score > 0.5) {
                    matches.push(question);
                }
            }
        }
    }

    if (matches.length > 0) {
        let result = '';
        for (const match of matches) {
            result += `找到匹配的题目：\n题目ID：${match.question_id}\n题目：${match.question_stem}\n选项：\n`;
            for (const choice of match.choices) {
                result += `${choice.option}. ${choice.content}\n`;
            }
            result += `正确答案：${match.correct_answer}\n\n`;
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
