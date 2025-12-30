// 文字数カウント
export const charCounter = (text: string): number => {
    return text.length;
}

// 改行除く文字数カウント
export const charCounterWithoutNewlines = (text: string): number => {
    return text.replace(/\r?\n/g, '').length;
}

// 改行・空白除く文字数カウント
export const charCounterNoSpace = (text: string): number => {
    return text.replace(/[\s\r\n]/g, '').length;
}

// 行数カウント
export const lineCounter = (text: string): number => {
    if (text.length === 0) return 0;
    return text.split(/\r?\n/).length;
}

// UTF-8バイト数カウント
export const utf8ByteCounter = (text: string): number => {
    return new TextEncoder().encode(text).length;
}

// UTF-16バイト数カウント
export const utf16ByteCounter = (text: string): number => {
    return text.length * 2;
}