exports.excerpt = (content, wordLength = 20) => {
    let data = content.split(' ');
    data = data.slice(0, wordLength - 1).join(' ') + ' ...';
    return data ;
}