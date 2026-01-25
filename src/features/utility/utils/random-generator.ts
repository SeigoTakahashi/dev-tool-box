// UUIDを生成する関数
export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(character) {
        // 0〜15のランダムな整数値を生成
        const randomValue = Math.random() * 16 | 0; 

        let generatedCharacter;
        if (character === 'x') {
            // 'x'にはランダムな値をそのまま使用
            generatedCharacter = randomValue;
        } else {
            // 'y'は、UUIDの仕様に準拠した形に調整
            generatedCharacter = (randomValue & 0x3) | 0x8;
        }

        return generatedCharacter.toString(16); // 16進数に変換して返す
    });
}

// セキュアなパスワードを生成する関数
export const generateSecurePassword = (length = 12) => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+';
    const all = lower + upper + numbers + symbols;

    let password = '';
    // 各カテゴリから最低1文字を追加
    password += lower[Math.floor(Math.random() * lower.length)];
    password += upper[Math.floor(Math.random() * upper.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // 残りの文字をランダムに追加
    for (let i = 4; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    // シャッフルしてランダム性を強化
    return password.split('').sort(() => Math.random() - 0.5).join('');
}