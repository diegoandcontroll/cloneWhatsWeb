export class Format{
  static getCamelCase(text){
    let div = document.createElement('div');

    //inserindo a div para pegar o dataset
    div.innerHTML = `<div data-${text}="id"></div>`;

    //retorna o array com todas as chaves
    return Object.keys(div.firstChild.dataset)[0];
  }
  
  static toTime(duration){
    let seconds = parseInt((duration / 1000) % 60);

    let minutes = parseInt((duration / (1000 * 60)) % 60);

    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    if(hours > 0){
      return `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
    }else{
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }
  static dateToTime(date, locale = 'pt-BR'){
    return date.toLocaleTimeString(locale,{
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  static timeStampToTime(timeStamp){
    return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : ''
  }
}