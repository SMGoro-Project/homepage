async function searchQuestions() {
    const response = await fetch('combined-all-exams.json');
    const allExams = await response.json();

    const searchTerm = document.getElementById('searchTerm').value;
    let bestMatch = null;
    let bestMatchScore = 0;

    for (const exam of allExams) {
        for (const question of exam.paper_data.question_data) {
            const score = similar(searchTerm, question.question_stem);
            if (score > bestMatchScore) {
                bestMatch = question;
                bestMatchScore = score;
            }

            for (const choice of question.choices) {
                const score = similar(searchTerm, choice.content);
                if (score > bestMatchScore) {
                    bestMatch = question;
                    bestMatchScore = score;
                }
            }
        }
    }

    if (bestMatch) {
        let result = `找到最匹配的题目：\n题目ID：${bestMatch.question_id}\n题目：${bestMatch.question_stem}\n选项：\n`;
        for (const choice of bestMatch.choices) {
            result += `${choice.option}. ${choice.content}\n`;
        }
        result += `正确答案：${bestMatch.correct_answer}`;
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
