import {submitDelay, inputDelay, user_config} from './config'
import {input_in, dragTo, getRanWord, getRanPhrase, sleep, click_btn} from './utils'

// 填空题
export async function doTianKone() {
    let inputs = $('.lib-fill-blank-do-input-left');

    for (let i = 0; i < user_config.loop; i++) {
        await setStatus(`第 ${i + 1} 次试错：填写答案`);

        // 先填写随机单词，获得答案
        $.each(inputs, function(i,item){
            input_in(item, getRanWord());
        });
        
        await setStatus(`第 ${i + 1} 次试错：等待提交`);
        await sleep(inputDelay());
        await setStatus(`第 ${i + 1} 次试错：提交答案`);
        await click_btn(); // Submit
        await setStatus(`第 ${i + 1} 次试错：等待继续`);
        await sleep(submitDelay());

        if (i < user_config.loop - 1) {
            await setStatus(`第 ${i + 2} 次试错：准备开始`);

            inputs = $('.lib-fill-blank-do-input-left');

            await click_btn(); // Retry
            await sleep(submitDelay());
        }

        console.log('[~] 试错:', `结束第 ${i + 1} 次试错`)
    }

    await setStatus(`答题：获取答案`);
    let answer = [], anyAnswer = false;
    $('.lib-edit-score span[data-type="1"]').each((i,item)=>{
        if(item.innerText.toLowerCase().indexOf('vary')!=-1) {
            // 任意填空
            anyAnswer = true;
            return false;
        }
        answer.push(item.innerText)
    });
    
    if(anyAnswer) {
        return;
    }

    await setStatus(`答题：准备提交答案`);
    await click_btn(); // Retry
    await sleep(submitDelay());

    // 提交正确答案
    await setStatus(`答题：填写答案`);
    inputs = $('.lib-fill-blank-do-input-left');
    $(inputs).each((i,item)=>{
        input_in(item, answer[i]);
    });
    
    await setStatus(`答题：等待提交`);
    await sleep(inputDelay());
}

// 录音题
export async function doReadRepeat() {
    let sum_record = 0;

    if($('.lib-oral-container-top').length!=0) {
        var rec_div = $('.lib-oral-container-top')
    } else {
        var rec_div = $('.lib-listen-item-right-img')
    }
    
    rec_div.each((i,div)=>{
        if($(div).find('img[title="播放"]').length!=0){
            return true;
        };
    
        let click_record = (e) => {
            console.log('click:', e);
            $(e).find('img[title="录音"],img[title="停止"]').click();
        }
        
        setTimeout(()=>{click_record(div);}, sum_record*7000);
        setTimeout(()=>{click_record(div);}, 5000 + sum_record*7000);
        sum_record ++;
    });
    await sleep(2000 + sum_record*7000)
}

// 单选题
export async function doSingleChoose() {
    let answer_map = {'A':0, 'B':1, 'C':2, 'D':3, 'E':4, 'F':5}

    for (let i = 0; i < user_config.loop; i++) {
        await setStatus(`第 ${i + 1} 次试错：填写答案`);
        // 随机选择以获得正确答案
        $('.lib-single-item-img img').click()
        
        await setStatus(`第 ${i + 1} 次试错：等待提交`);
        await sleep(inputDelay());
        await setStatus(`第 ${i + 1} 次试错：提交答案`);
        await click_btn(); // Submit
        await setStatus(`第 ${i + 1} 次试错：等待继续`);
        await sleep(submitDelay());

        if (i < user_config.loop - 1) {
            await setStatus(`第 ${i + 2} 次试错：准备开始`);

            await click_btn(); // Retry
            await sleep(submitDelay());
        }

        console.log('[~] 试错:', `结束第 ${i + 1} 次试错`)
    }

    await setStatus(`答题：获取答案`);
    let answer = []
    $('.lib-single-cs-answer').each((i,item)=>{
        answer.push(item.innerText)
    });

    await setStatus(`答题：准备提交答案`);
    await click_btn(); // Retry
    await sleep(submitDelay());

    await setStatus(`答题：填写答案`);
    $('.lib-single-box').each((i,item)=>{
        $($(item).find('.lib-single-item')[answer_map[answer[i]]]).find('img').click()
    });

    await setStatus(`答题：等待提交`);
    await sleep(inputDelay());
}

// 下拉选择题
export async function doDropChoose() {

    for (let i = 0; i < user_config.loop; i++) {
        await setStatus(`第 ${i + 1} 次试错：填写答案`);
        // 随机选择以获得正确答案
        $('.ant-select-dropdown-menu-item').click();
        
        await setStatus(`第 ${i + 1} 次试错：等待提交`);
        await sleep(inputDelay());
        await setStatus(`第 ${i + 1} 次试错：提交答案`);
        await click_btn(); // Submit
        await setStatus(`第 ${i + 1} 次试错：等待继续`);
        await sleep(submitDelay());

        if (i < user_config.loop - 1) {
            await setStatus(`第 ${i + 2} 次试错：准备开始`);

            await click_btn(); // Retry
            await sleep(submitDelay());
        }

        console.log('[~] 试错:', `结束第 ${i + 1} 次试错`)
    }

    await setStatus(`答题：获取答案`);
    let answer = [];
    $('.wy-lib-cs-key + span').each((i,item)=>{
        answer.push(item.innerText)
    });
    
    await setStatus(`答题：准备提交答案`);
    await click_btn(); // Retry
    await sleep(submitDelay());

    await setStatus(`答题：填写答案`);
    $('.ant-select-dropdown-menu').each((i,div)=>{
        $(div).find('li').each((index, item)=>{
            if($.trim(item.innerText) == answer[i]) {
                $(item).click();
                return false;
            }
        });
    });

    await setStatus(`答题：等待提交`);
    await sleep(inputDelay());
}

// 角色扮演
export async function doRolePlay() {
    $('.lib-role-select-item img')[0].click()
    $('.lib-role-select-start button').click()

    await sleep(120000);
}

// 听力/图片填空
export async function doListenImgAnswer() {
    let inputs = $('.lib-textarea-container, .img-blank-answer');
    $.each(inputs, function(i,item){
        input_in(item, getRanPhrase());
    });
    
    await setStatus(`答题：等待提交`);
    await sleep(inputDelay());
}

// 托块
export async function doDrag() {
    let answerbox = $('.lib-drag-answer-list');
    let boxes = $('.lib-drag-box');

    for (let i = 0; i < user_config.loop; i++) {
        await setStatus(`第 ${i + 1} 次试错：填写答案`);

        for(let i=0;i<answerbox.length;i++) {
            await dragTo(boxes[i], answerbox[i]);
        };

        await setStatus(`第 ${i + 1} 次试错：等待提交`);
        await sleep(inputDelay());
        await setStatus(`第 ${i + 1} 次试错：提交答案`);
        await click_btn(); // Submit
        await setStatus(`第 ${i + 1} 次试错：等待继续`);
        await sleep(submitDelay());
        
        if (i < user_config.loop - 1) {
            await setStatus(`第 ${i + 2} 次试错：准备开始`);

            await click_btn(); // Retry
            await sleep(submitDelay());

            answerbox = $('.lib-drag-answer-list');
            boxes = $('.lib-drag-box');
        }

        console.log('[~] 试错:', `结束第 ${i + 1} 次试错`)
    }

    await setStatus(`答题：获取答案`);
    let answer = [];
    $('.lib-drag-stu-info-answer').each((i,item)=>{
        let temp = [];
        $(item).find('span').each((j, answer)=> {
            temp.push(answer.innerText)
        });
        answer.push(temp)
    });
    
    await setStatus(`答题：准备提交答案`);
    await click_btn(); // Retry
    await sleep(submitDelay());

    await setStatus(`答题：填写答案`);
    let flag = []; // 保证每个托快只被托一次
    answerbox = $('.lib-drag-answer-list');
    boxes = $('.lib-drag-box');
    for(let i=0; i<answerbox.length; i++) {
        let dict = {}; // 保证每个 answerbox 不会有重复
        for (let j = 0; j < boxes.length; j++) {
            const text = $(boxes[j]).find('span')[0].innerText;
            if(flag[j] || dict[text]) continue;

            if(answer[i]!=undefined && answer[i].includes(text)) {
                dict[text] = true, flag[j] = true;
                await dragTo(boxes[j], answerbox[i]);
            }
        }
    };

    await setStatus(`答题：等待提交`);
    await sleep(inputDelay());
}

// 视频
export async function doVideo() {
    await sleep(2000);

    let player = unsafeWindow['yunPlayer'];
    if(player == undefined) {
        console.error('yunPlayer is undefined!');
        return;
    }
    player.play();
    await sleep(1000);
    player.seek(player.getDuration() - 5);
    await sleep(8000);
}

// 多选
export async function doMutiChoose() {
    let answer_map = {'A':0, 'B':1, 'C':2, 'D':3, 'E':4, 'F':5, 'G':6, 'H':7, 'I':8, 'J':9}

    for (let i = 0; i < user_config.loop; i++) {
        await setStatus(`第 ${i + 1} 次试错：填写答案`);

        // 随机选择以获得正确答案
        $('.lib-single-item-img img').click()
        
        await setStatus(`第 ${i + 1} 次试错：等待提交`);
        await sleep(inputDelay());
        await setStatus(`第 ${i + 1} 次试错：提交答案`);
        await click_btn(); // Submit
        await setStatus(`第 ${i + 1} 次试错：等待继续`);
        await sleep(submitDelay());

        if (i < user_config.loop - 1) {
            await setStatus(`第 ${i + 2} 次试错：准备开始`);
            await click_btn(); // Retry
            await sleep(submitDelay());
        }

        console.log('[~] 试错:', `结束第 ${i + 1} 次试错`)
    }

    await setStatus(`答题：获取答案`);
    let answer = []
    $('.lib-single-cs-answer').each((i,item)=>{
        answer.push(item.innerText)
    });

    await setStatus(`答题：准备提交答案`);
    await click_btn(); // Retry
    await sleep(submitDelay());

    await setStatus(`答题：填写答案`);
    $('.lib-single-box').each((i,item)=>{
        for(const answer_single of answer[i])
            $($(item).find('.lib-single-item')[answer_map[answer_single]]).find('img').click()
    });

    await setStatus(`答题：等待提交`);
    await sleep(inputDelay());
}

// 不支持体型
export async function unSupposedOrSkip(params) {
    console.log('[!]', '遇到不支持体型或未选择，自动跳过。。。');
}


// EX-

export async function doTF() {
    const columns = {}
    let columnsNum = 0
    $(".lib-judge-right-frist .lib-judge-right-item-text").each((i,item)=>{
        columns[item.innerText]=i;
        columnsNum++;
    })

    for (let i = 0; i < user_config.loop; i++) {
        await setStatus(`第 ${i + 1} 次试错：填写答案`);
        // 随机选择以获得正确答案
        $('.lib-judge-radio').each((i,item)=>{
            if((i+1)%columnsNum==1) item.click();
        })

        await setStatus(`第 ${i + 1} 次试错：等待提交`);
        await sleep(inputDelay());
        await setStatus(`第 ${i + 1} 次试错：提交答案`);
        await click_btn(); // Submit
        await setStatus(`第 ${i + 1} 次试错：等待继续`);
        await sleep(submitDelay());
        
        if (i < user_config.loop - 1) {
            await setStatus(`第 ${i + 2} 次试错：准备开始`);
            await click_btn(); // Retry
            await sleep(submitDelay());
        }

        console.log('[~] 试错:', `结束第 ${i + 1} 次试错`)
    }

    await setStatus(`答题：获取答案`);
    let answer = []
    $(".lib-judge-info .lib-judge-info-text").each((i,item)=>{
        answer.push(item.innerText);
    })
    //console.log(columns)
    // console.log(answer)
    await setStatus(`答题：准备提交答案`);
    await click_btn(); // Retry
    await sleep(submitDelay());

    await setStatus(`答题：填写答案`);
    let loop = 0
    let order = 0
    $('.lib-judge-radio').each((i,item)=>{
        const rightAnswer = answer[loop];
        const soTheOrder = columns[rightAnswer];

        if(order == soTheOrder){
            item.click();
        }
        if(order==columnsNum-1){
            loop++;
            order=0;
        }else{
            order++;
        }
    })

    await setStatus(`答题：等待提交`);
    await sleep(inputDelay());
}

export let setStatus = async (t)=> {
    console.log('[~] 答题:', t);
    $('#dom_status').text(''+t);
};