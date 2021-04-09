export class Base64{
  static getMimeType(url){
    let regex = /^data:(.+);base64,(.*)$/;

    let result = url.match(regex);

    return result[1];
  }

  static toFile(url){

    let mimeType = Base64.getMimeType(url);
    let ext = mimeType.split('/')[1];
    let filename = `file${Date.now()}.${ext}`;

    return fetch(url)
          .then(res =>{return res.arrayBuffer();})
          .then(buffer =>{return new File([buffer],filename,{type:mimeType})});
          
  }
}