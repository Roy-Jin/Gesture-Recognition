export const initSpeechSynthesis = () => {
    let isLoaded = false;
    // 确保语音列表加载完成
    const waitForVoices = () => {
        return new Promise((resolve) => {
            // 如果语音列表已加载，直接 resolve
            if (window.speechSynthesis.getVoices().length > 0) {
                isLoaded = true;
                resolve();
                return;
            }

            // 否则监听 onvoiceschanged 事件
            window.speechSynthesis.onvoiceschanged = () => {
                isLoaded = true;
                resolve();
            };

            // 超时处理（防止某些浏览器不触发 onvoiceschanged）
            setTimeout(() => {
                if (!isLoaded) {
                    console.warn("语音列表未加载，可能浏览器不支持");
                    resolve(); // 仍然 resolve，但 isLoaded 保持 false
                }
            }, 1000);
        });
    };

    /**
     * @param {string} sentence - 需要合成的句子
     */
    const synthesizeSpeechSentenceBySentence = async (sentence) => {
        if (!window.speechSynthesis) {
            throw new Error('您的浏览器不支持语音合成API');
        }

        // 等待语音列表加载
        if (!isLoaded) {
            await waitForVoices();
        }

        // 再次检查，防止超时后仍未加载
        const voices = window.speechSynthesis.getVoices().filter(voice =>
            voice.lang.startsWith('zh')
        );
        // 支持的音色，可以自行更换 一共十七种，选择你喜欢的
        // console.log(voices);

        if (voices.length === 0) {
            throw new Error('未找到中文语音支持');
        }
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.voice = voices[6];
        utterance.rate = 1.2;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // 开始播放当前句子的语音
        window.speechSynthesis.speak(utterance);
        // 等待当前语音播放完成
        await new Promise((resolve) => {
            utterance.onend = resolve;
        });
    };
    // 初始化时尝试加载语音列表
    waitForVoices();
    return {
        synthesizeSpeechSentenceBySentence
    };
};