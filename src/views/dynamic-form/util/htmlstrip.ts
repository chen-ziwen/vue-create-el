export function useFiltersHtmlstrip(html: string, replace: { [key: string]: any }, br: boolean) {
    let raw = html.replace(/</g, "&lt;").replace(/>/, "&gt;").replace(/\\u003c/g, '&lt;').replace(/\\u003e/g, '&gt;');
    // 这里表示允许的html
    if (br) {
        raw = raw.replace(/\n/g, "<br/>");
    }
    return raw;
}